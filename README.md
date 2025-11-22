# 🚀 Antreprenor Blueprint

**Platformă AI pentru analiza personalității antreprenoriale bazată pe metodologia HEXACO**

O aplicație Next.js full-stack care generează rapoarte personalizate de analiză psihologică pentru antreprenori, folosind Claude AI, Supabase pentru autentificare și Stripe pentru procesarea plăților.

---

## 📋 Cuprins

- [Funcționalități](#-funcționalități)
- [Tech Stack](#️-tech-stack)
- [Instalare](#-instalare)
- [Configurare](#️-configurare)
- [Structura Proiectului](#-structura-proiectului)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Documentație Suplimentară](#-documentație-suplimentară)

---

## ✨ Funcționalități

### Core Features

- **🧠 Test HEXACO Interactiv** - Chestionar de 100 de întrebări bazat pe modelul HEXACO de personalitate
- **📊 Vizualizare Rezultate** - Grafic radar interactiv cu cei 6 factori HEXACO
- **🤖 AI Report Generator** - Rapoarte personalizate de 6700+ cuvinte generate cu Claude Sonnet 4.5
- **📄 Export DOCX** - Export rapoarte formatate în Microsoft Word
- **💬 Chat Conversațional** - Interacțiune pas-cu-pas cu agentul AI pentru generarea raportului

### Business Features

- **💳 Stripe Integration** - Plăți recurente cu Stripe Checkout
- **🔐 Supabase Auth** - Sistem complet de autentificare (signup, login, reset parolă)
- **🚦 Rate Limiting** - Protecție anti-abuz (3 rapoarte/24h pentru utilizatori gratuiți)
- **📧 MailerLite Integration** - Segmentare automată a utilizatorilor plătitori
- **🔄 Webhook Handling** - Procesare automată evenimente Stripe

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router + Turbopack)
- **React 19.2** cu Hooks
- **TypeScript 5**
- **Tailwind CSS 4**
- **Framer Motion** - Animații
- **Recharts** - Grafice
- **React Markdown** - Formatare rapoarte

### Backend & AI
- **Anthropic Claude Sonnet 4.5** - Generare rapoarte AI
- **Vercel AI SDK** - Streaming responses
- **Supabase** - Database PostgreSQL + Auth
- **Stripe** - Procesare plăți
- **Edge Runtime** - API routes optimizate

### Export & Utils
- **docx** - Generare fișiere Word
- **file-saver** - Download management
- **clsx** + **tailwind-merge** - Utility classes

---

## 📥 Instalare

### Prerequisite

- Node.js 20+ și npm
- Cont Supabase (gratuit)
- Cont Stripe (test mode)
- API Key Anthropic Claude

### Pași

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd antreprenor-blueprint
   ```

2. **Instalează dependințe**
   ```bash
   npm install
   ```

3. **Configurează variabile de mediu**
   ```bash
   cp .env.example .env.local
   ```
   Completează toate variabilele în `.env.local` (vezi [Configurare](#️-configurare))

4. **Setup Supabase database**

   Urmează ghidul complet: [supabase/SETUP.md](./supabase/SETUP.md)

   Quick start:
   ```bash
   # Rulează în Supabase SQL Editor:
   # 1. supabase/schema.sql
   # 2. supabase/rate_limit.sql
   ```

5. **Pornește development server**
   ```bash
   npm run dev
   ```

   Aplicația va rula pe [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configurare

### Environment Variables

Creează fișierul `.env.local` cu următoarele variabile:

```bash
# === ANTHROPIC (AI) ===
ANTHROPIC_API_KEY=sk-ant-xxx
# Obține de la: https://console.anthropic.com/

# === SUPABASE (Database & Auth) ===
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
# Obține de la: https://supabase.com/dashboard/project/_/settings/api

# === STRIPE (Payments) ===
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_PRICE_ID=price_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
# Obține de la: https://dashboard.stripe.com/test/apikeys

# === MAILERLITE (Optional - Email Marketing) ===
MAILERLITE_API_KEY=xxx
MAILERLITE_GROUP_ID=xxx
MAILERLITE_CLIENT_GROUP_ID=xxx
# Obține de la: https://dashboard.mailerlite.com/integrations/api

# === OPTIONAL ===
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Stripe Webhook Setup

Pentru a primi evenimente Stripe în development:

```bash
# Instalează Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copiază `webhook signing secret` afișat și adaugă-l în `.env.local` ca `STRIPE_WEBHOOK_SECRET`.

---

## 📁 Structura Proiectului

```
antreprenor-blueprint/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # AI chat cu Claude + rate limiting
│   │   ├── stripe/
│   │   │   ├── checkout/          # Stripe Checkout Session
│   │   │   ├── verify-session/    # Verificare plată
│   │   │   └── webhook/           # Procesare evenimente Stripe
│   │   └── subscribe/             # MailerLite integration
│   ├── auth/
│   │   ├── login/                 # Login page
│   │   ├── setup/                 # Account setup după plată
│   │   ├── forgot-password/       # Reset parolă
│   │   └── update-password/       # Schimbare parolă
│   ├── chat/page.tsx              # Chat cu AI agent
│   ├── test/page.tsx              # Test HEXACO
│   ├── rezultate/page.tsx         # Rezultate + grafic
│   ├── obiective/page.tsx         # Setare obiective
│   ├── start/page.tsx             # User info form
│   └── page.tsx                   # Landing page
├── lib/
│   ├── scoring.ts                 # Logică calcul HEXACO scores
│   ├── questions.ts               # 100 întrebări HEXACO
│   └── supabase.ts                # Supabase client setup
├── supabase/
│   ├── schema.sql                 # Database schema (users, subscriptions, reports)
│   ├── rate_limit.sql             # Rate limiting table
│   └── SETUP.md                   # Ghid setup Supabase
├── .env.example                   # Template variabile de mediu
├── TESTING.md                     # Ghid de testare complet
└── README.md                      # Acest fișier
```

---

## 💻 Development

### Comenzi Disponibile

```bash
# Development
npm run dev          # Pornește dev server (localhost:3000)

# Production
npm run build        # Build pentru producție
npm run start        # Pornește production server

# Code Quality
npm run lint         # Rulează ESLint
npx tsc --noEmit     # Verifică TypeScript errors
```

### Key Files to Know

- **[app/api/chat/route.ts](./app/api/chat/route.ts)** - API endpoint principal pentru AI
  - Streaming cu Claude Sonnet 4.5
  - Rate limiting pe IP (3/24h gratuit)
  - Integrare cu Supabase pentru verificare limită

- **[lib/scoring.ts](./lib/scoring.ts)** - Logica de calcul HEXACO
  - Calcul factori (Onestitate, Emoționalitate, Extraversie, etc.)
  - Calcul fațete (4 per factor)
  - Reverse scoring pentru întrebări negative

- **[app/chat/page.tsx](./app/chat/page.tsx)** - UI Chat
  - Streaming real-time
  - Export DOCX cu formatare
  - Subscription modal flow

---

## 🧪 Testing

Pentru un ghid complet de testare, vezi **[TESTING.md](./TESTING.md)**

### Quick Test Flow

1. **Test HEXACO Flow**
   ```
   / → /start → /test → /rezultate → /obiective → /chat
   ```

2. **Test AI Generation** (magic command)
   ```
   În chat, scrie: /test-finish
   # Trigger-uiește direct flow-ul de finalizare
   ```

3. **Test Stripe Payment** (card de test)
   ```
   Card: 4242 4242 4242 4242
   Expiry: 12/34
   CVC: 123
   ```

4. **Verificare Rate Limiting**
   ```sql
   -- În Supabase SQL Editor
   SELECT * FROM rate_limits ORDER BY created_at DESC LIMIT 10;
   ```

---

## 🚀 Deployment

### Vercel (Recomandat)

1. **Push la GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy pe Vercel**
   - Conectează repository-ul pe [vercel.com](https://vercel.com)
   - Setează environment variables (Settings → Environment Variables)
   - Deploy automat la fiecare push

3. **Configurează Stripe Webhook**
   - În Stripe Dashboard: Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Selectează evenimente:
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
     - `customer.subscription.updated`
   - Copiază webhook secret în Vercel env vars

### Environment Variables în Producție

**IMPORTANT:** În producție:
- ✅ Folosește Stripe **Live Mode** keys (nu test)
- ✅ Actualizează `NEXT_PUBLIC_BASE_URL` cu domeniul tău
- ✅ Verifică că toate API keys sunt live/production
- ✅ Configurează CORS dacă e necesar

---

## 📚 Documentație Suplimentară

- **[supabase/SETUP.md](./supabase/SETUP.md)** - Ghid complet setup Supabase
- **[TESTING.md](./TESTING.md)** - Checklist de testare detaliat
- **[.env.example](./.env.example)** - Template variabile de mediu

### Resurse Externe

- [Next.js Documentation](https://nextjs.org/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Supabase Guides](https://supabase.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

---

## 🤝 Contributing

Acest proiect este în active development. Contribuțiile sunt binevenite!

### Process:

1. Fork repository-ul
2. Creează un branch pentru feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push la branch (`git push origin feature/AmazingFeature`)
5. Deschide un Pull Request

---

## 📄 License

Acest proiect este proprietate privată. Toate drepturile rezervate.

---

## 🐛 Issues & Support

Pentru bug reports sau feature requests, deschide un issue pe GitHub.

Pentru întrebări de setup, consultă:
1. [TESTING.md](./TESTING.md) - Troubleshooting section
2. [supabase/SETUP.md](./supabase/SETUP.md) - Supabase issues
3. GitHub Issues

---

**Built with ❤️ using Next.js, Claude AI, and Supabase**

**Last Updated:** 2025-01-22
