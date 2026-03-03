import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createHash, randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const JWT_SECRET = process.env.JWT_SECRET;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const AUTH_COOKIE_NAME = 'abs_auth';
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable');
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables');
}

// Supabase client with service role (bypasses RLS)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function buildSessionFingerprint(passwordHash: string): string {
    return createHash('sha256').update(passwordHash).digest('hex').slice(0, 24);
}

function hashOpaqueToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
}

function extractCookieValue(cookieHeader: string | null, name: string): string | null {
    if (!cookieHeader) return null;

    for (const part of cookieHeader.split(';')) {
        const [rawName, ...rest] = part.trim().split('=');
        if (rawName === name) {
            return decodeURIComponent(rest.join('='));
        }
    }

    return null;
}

export function getAuthCookieName(): string {
    return AUTH_COOKIE_NAME;
}

export function getAuthCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
        maxAge: AUTH_COOKIE_MAX_AGE,
    };
}

export function getExpiredAuthCookieOptions() {
    return {
        ...getAuthCookieOptions(),
        maxAge: 0,
    };
}

export function getAuthTokenFromRequest(req: Request): string | null {
    const authHeader = req.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    return extractCookieValue(req.headers.get('cookie'), AUTH_COOKIE_NAME);
}

// =====================================================
// PASSWORD UTILITIES
// =====================================================

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
    password: string,
    passwordHash: string
): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
}

// =====================================================
// JWT UTILITIES
// =====================================================

export interface JWTPayload {
    userId: string;
    email: string;
    sessionFingerprint: string;
    iat?: number;
    exp?: number;
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(
    payload: Omit<JWTPayload, 'sessionFingerprint' | 'iat' | 'exp'>,
    passwordHash: string
): string {
    return jwt.sign(
        {
            ...payload,
            sessionFingerprint: buildSessionFingerprint(passwordHash),
        },
        JWT_SECRET!,
        {
            expiresIn: '7d',
        }
    );
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET!) as JWTPayload;
        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}

// =====================================================
// PASSWORD RESET UTILITIES
// =====================================================

/**
 * Generate a random token for password reset
 */
export function generateResetToken(): string {
    return randomBytes(32).toString('hex');
}

/**
 * Generate a random token for email verification
 */
export function generateVerificationToken(): string {
    return randomBytes(32).toString('hex');
}

// =====================================================
// USER DATABASE UTILITIES
// =====================================================

export interface User {
    id: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    email_verified: boolean;
    email_verification_token: string | null;
    password_reset_token: string | null;
    password_reset_expires: string | null;
    stripe_customer_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface Subscription {
    id: string;
    user_id: string;
    stripe_subscription_id: string;
    stripe_price_id: string;
    status: string;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        console.error('Get user by email error:', error);
        return null;
    }

    return data as User;
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Get user by ID error:', error);
        return null;
    }

    return data as User;
}

export async function authenticateRequest(req: Request): Promise<{
    token: string;
    payload: JWTPayload;
    user: User;
} | null> {
    const token = getAuthTokenFromRequest(req);
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    const user = await getUserById(payload.userId);
    if (!user) return null;

    if (payload.sessionFingerprint !== buildSessionFingerprint(user.password_hash)) {
        return null;
    }

    return { token, payload, user };
}

/**
 * Get user by password reset token
 */
export async function getUserByResetToken(
    token: string
): Promise<User | null> {
    const hashedToken = hashOpaqueToken(token);

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('password_reset_token', hashedToken)
        .single();

    if (error) {
        console.error('Get user by reset token error:', error);
        return null;
    }

    return data as User;
}

/**
 * Create a new user
 */
export async function createUser(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    stripe_customer_id?: string;
}): Promise<{ user: User | null; error: string | null }> {
    try {
        const existingUser = await getUserByEmail(userData.email);
        if (existingUser) {
            return { user: null, error: 'Email already exists' };
        }

        const password_hash = await hashPassword(userData.password);
        const email_verification_token = hashOpaqueToken(generateVerificationToken());

        const { data, error } = await supabase
            .from('users')
            .insert({
                email: userData.email,
                password_hash,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email_verification_token,
                stripe_customer_id: userData.stripe_customer_id || null,
            })
            .select()
            .single();

        if (error) {
            console.error('Create user error:', error);
            return { user: null, error: error.message };
        }

        return { user: data as User, error: null };
    } catch (error: any) {
        console.error('Create user exception:', error);
        return { user: null, error: error.message };
    }
}

/**
 * Update user password
 */
export async function updateUserPassword(
    userId: string,
    newPassword: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const password_hash = await hashPassword(newPassword);

        const { error } = await supabase
            .from('users')
            .update({
                password_hash,
                password_reset_token: null,
                password_reset_expires: null,
            })
            .eq('id', userId);

        if (error) {
            console.error('Update password error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (error: any) {
        console.error('Update password exception:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Set password reset token for user
 */
export async function setPasswordResetToken(
    userId: string,
    token: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        const hashedToken = hashOpaqueToken(token);

        const { error } = await supabase
            .from('users')
            .update({
                password_reset_token: hashedToken,
                password_reset_expires: expires,
            })
            .eq('id', userId);

        if (error) {
            console.error('Set reset token error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (error: any) {
        console.error('Set reset token exception:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Verify email for user
 */
export async function verifyUserEmail(
    token: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const hashedToken = hashOpaqueToken(token);

        const { data, error } = await supabase
            .from('users')
            .update({
                email_verified: true,
                email_verification_token: null,
            })
            .eq('email_verification_token', hashedToken)
            .select()
            .single();

        if (error || !data) {
            return { success: false, error: 'Invalid verification token' };
        }

        return { success: true, error: null };
    } catch (error: any) {
        console.error('Verify email exception:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get user's active subscription
 */
export async function getUserSubscription(
    userId: string
): Promise<Subscription | null> {
    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

    if (error) {
        console.error('Get subscription error:', error);
        return null;
    }

    return data as Subscription;
}

/**
 * Check if user has active subscription
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
    const subscription = await getUserSubscription(userId);
    if (!subscription) return false;

    const now = new Date();
    const periodEnd = new Date(subscription.current_period_end);

    return subscription.status === 'active' && periodEnd > now;
}
