# Supabase Setup Guide

Acest ghid te ajută să configurezi baza de date Supabase pentru proiectul Antreprenor Blueprint.

## 📋 Pași de Configurare

### 1. Creează un Proiect Supabase

1. Du-te la [Supabase Dashboard](https://supabase.com/dashboard)
2. Click pe "New Project"
3. Completează detaliile:
   - **Name**: antreprenor-blueprint
   - **Database Password**: Salvează-l într-un loc sigur!
   - **Region**: Alege cel mai aproape de utilizatorii tăi
4. Așteaptă ~2 minute pentru inițializare

### 2. Obține Cheile API

1. În dashboard-ul proiectului, mergi la **Settings** → **API**
2. Copiază următoarele:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (Secret!) → `SUPABASE_SERVICE_ROLE_KEY`
3. Actualizează fișierul `.env.local`

### 3. Rulează Schema-urile SQL

#### Opțiunea A: SQL Editor (Recomandat)

1. În dashboard, mergi la **SQL Editor**
2. Click pe "New Query"
3. Copiază conținutul din `supabase/schema.sql` și rulează-l
4. Creează un alt query nou
5. Copiază conținutul din `supabase/rate_limit.sql` și rulează-l

#### Opțiunea B: Supabase CLI

```bash
# Instalează CLI-ul
npm install -g supabase

# Login
supabase login

# Link proiectul
supabase link --project-ref <your-project-id>

# Rulează migrations
supabase db push
```

### 4. Verificare Tabele Create

După rularea script-urilor, ar trebui să vezi următoarele tabele în **Table Editor**:

- ✅ `users` - Profiluri utilizatori
- ✅ `subscriptions` - Abonamente Stripe
- ✅ `reports` - Rapoarte HEXACO generate
- ✅ `rate_limits` - Rate limiting pentru API

### 5. Testează Funcțiile și Trigger-urile

Verifică că următoarele au fost create în **Database** → **Functions**:

- ✅ `handle_new_user()` - Trigger pentru crearea automată de utilizatori

### 6. Configurare Row Level Security (RLS)

Toate tabelele ar trebui să aibă RLS activat automat prin script-urile SQL.

Verifică în **Authentication** → **Policies** că există:

**users table:**
- Users can view their own data
- Users can update their own data

**subscriptions table:**
- Users can view their own subscriptions

**reports table:**
- Users can view their own reports
- Users can insert their own reports

**rate_limits table:**
- Anon can insert rate limits
- Anon can view their own rate limits

### 7. Configurare Autentificare Email

1. Mergi la **Authentication** → **Providers**
2. Activează **Email**
3. (Opțional) Configurează **SMTP Settings** pentru email-uri custom
4. (Opțional) Customizează template-urile de email

### 8. Testare Conexiune

Rulează aplicația local:

```bash
npm run dev
```

Încearcă să te înregistrezi la `/auth/setup` (după un checkout Stripe de test) și verifică că:
- ✅ Se creează un user în tabelul `users`
- ✅ Trigger-ul `handle_new_user()` funcționează
- ✅ Poți accesa datele utilizatorului

## 🔒 Securitate

### Важно (Important):

1. **NU expune niciodată** `SUPABASE_SERVICE_ROLE_KEY` în cod client
2. **Verifică** că toate tabelele au RLS activat
3. **Testează** politicile RLS în SQL Editor:
   ```sql
   -- Testează ca utilizator anonim
   SELECT * FROM users;  -- Ar trebui să returneze 0 rânduri
   ```

## 📊 Schema Vizuală

```
auth.users (Supabase Auth - managed)
    ↓ (trigger: on_auth_user_created)
public.users
    ├── id (FK → auth.users.id)
    ├── email
    ├── full_name
    └── stripe_customer_id
        ↓
    public.subscriptions
        ├── id (Stripe Subscription ID)
        ├── user_id (FK → users.id)
        ├── status
        └── plan_id

    public.reports
        ├── id
        ├── user_id (FK → users.id)
        └── content (JSONB)

public.rate_limits (independent)
    ├── ip_address
    ├── endpoint
    └── created_at
```

## 🐛 Troubleshooting

### Problema: "relation public.users does not exist"
**Soluție:** Rulează `supabase/schema.sql` în SQL Editor

### Problema: "permission denied for table users"
**Soluție:** Verifică că RLS policies sunt create corect

### Problema: Trigger-ul nu creează user
**Soluție:** Verifică logs în **Database** → **Functions** → `handle_new_user`

### Problema: Rate limiting nu funcționează
**Soluție:** Verifică că tabelul `rate_limits` există și are index-ul creat

## 📚 Resurse

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Functions](https://supabase.com/docs/guides/database/functions)
- [CLI Reference](https://supabase.com/docs/reference/cli)

---

**Data ultimei actualizări:** 2025-01-22
