#!/bin/bash

# Clear Rate Limits Script
# Use this to clear rate limit data for testing

echo "🧹 Clear Rate Limits - Development Tool"
echo "======================================="
echo ""

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${YELLOW}⚠️  WARNING: This will delete rate limit records from the database!${NC}"
echo ""
echo "Use cases:"
echo "1. Testing rate limiting logic during development"
echo "2. Resetting your own rate limit counter"
echo "3. Clearing test data"
echo ""

read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Choose what to clear:"
echo "1) Clear ALL rate limits (all IPs)"
echo "2) Clear only 'unknown' IP (development/localhost)"
echo "3) Clear specific IP"
echo "4) Show current rate limits (no deletion)"

read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo -e "${RED}This will delete ALL rate limit records!${NC}"
        read -p "Type 'DELETE ALL' to confirm: " final_confirm
        if [ "$final_confirm" = "DELETE ALL" ]; then
            echo "Executing SQL to delete all rate limits..."
            echo "Note: You need to run this SQL in Supabase Dashboard > SQL Editor:"
            echo ""
            echo "DELETE FROM rate_limits;"
            echo ""
            echo -e "${YELLOW}Copy the SQL above and run it in your Supabase dashboard.${NC}"
        else
            echo "Cancelled."
        fi
        ;;
    2)
        echo "Executing SQL to delete 'unknown' IP rate limits..."
        echo "Note: You need to run this SQL in Supabase Dashboard > SQL Editor:"
        echo ""
        echo "DELETE FROM rate_limits WHERE ip_address = 'unknown';"
        echo ""
        echo -e "${YELLOW}Copy the SQL above and run it in your Supabase dashboard.${NC}"
        ;;
    3)
        read -p "Enter IP address to clear: " ip_address
        echo "Executing SQL to delete rate limits for IP: $ip_address"
        echo "Note: You need to run this SQL in Supabase Dashboard > SQL Editor:"
        echo ""
        echo "DELETE FROM rate_limits WHERE ip_address = '$ip_address';"
        echo ""
        echo -e "${YELLOW}Copy the SQL above and run it in your Supabase dashboard.${NC}"
        ;;
    4)
        echo "To view current rate limits, run this SQL in Supabase Dashboard:"
        echo ""
        echo "SELECT ip_address, endpoint, created_at"
        echo "FROM rate_limits"
        echo "ORDER BY created_at DESC"
        echo "LIMIT 50;"
        echo ""
        echo -e "${GREEN}Copy the SQL above and run it in your Supabase dashboard.${NC}"
        ;;
    *)
        echo -e "${RED}Invalid choice.${NC}"
        exit 1
        ;;
esac

echo ""
echo "================================"
echo "How to run SQL in Supabase:"
echo "1. Go to: https://supabase.com/dashboard"
echo "2. Select your project"
echo "3. Click 'SQL Editor' in the left sidebar"
echo "4. Paste the SQL query above"
echo "5. Click 'Run'"
echo "================================"
