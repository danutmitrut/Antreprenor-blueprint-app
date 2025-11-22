# 🧪 Testing Checklist - Antreprenor Blueprint

Ghid complet de testare pentru toate funcționalitățile aplicației.

## 🎯 Pre-requisite

Înainte de a începe testarea, asigură-te că:

- ✅ `npm install` rulat cu succes
- ✅ `.env.local` configurat cu toate variabilele
- ✅ Supabase database setup complet (vezi `supabase/SETUP.md`)
- ✅ Stripe account în test mode
- ✅ `npm run dev` pornit pe `http://localhost:3000`

---

## 📝 Test 1: HEXACO Test Flow

**Obiectiv:** Verifică fluxul complet de completare a testului HEXACO

### Pași:

1. **Navighează la homepage**
   ```
   URL: http://localhost:3000
   ```
   - [ ] Pagina se încarcă corect
   - [ ] Butonul "Începe Testul" este vizibil

2. **Completează informații utilizator**
   ```
   URL: http://localhost:3000/start
   ```
   - [ ] Formular cu câmpuri: Nume, Prenume, Email, Vârstă, Gen, Experiență, Industrie, Rol
   - [ ] Validare pentru câmpuri obligatorii
   - [ ] Click "Continuă" → redirect la `/test`

3. **Completează testul HEXACO**
   ```
   URL: http://localhost:3000/test
   ```
   - [ ] 100 de întrebări se afișează
   - [ ] Progress bar funcționează
   - [ ] Poți răspunde cu 1-5 (Dezacord total → Acord total)
   - [ ] Buton "Trimite răspunsurile" activ după toate răspunsurile
   - [ ] Click "Trimite" → redirect la `/rezultate`

4. **Vizualizează rezultate**
   ```
   URL: http://localhost:3000/rezultate
   ```
   - [ ] Grafic radar cu cei 6 factori HEXACO
   - [ ] Scoruri afișate corect (1-5)
   - [ ] Buton "Continuă la Obiective" funcționează

5. **Setează obiective**
   ```
   URL: http://localhost:3000/obiective
   ```
   - [ ] 3 obiective personalizabile
   - [ ] Buton "Generează Raportul" → redirect la `/chat`

**Verificare Date:**
- [ ] `localStorage.getItem('hexaco_answers')` conține răspunsurile
- [ ] `localStorage.getItem('hexaco_scores')` conține scorurile calculate
- [ ] `localStorage.getItem('user_info')` conține informațiile utilizatorului
- [ ] `localStorage.getItem('user_goals')` conține obiectivele

---

## 💬 Test 2: AI Chat & Report Generation

**Obiectiv:** Testează generarea raportului HEXACO cu Claude

### Pași:

1. **Acces pagina Chat**
   ```
   URL: http://localhost:3000/chat
   ```
   - [ ] Mesaj de bun venit personalizat cu prenumele utilizatorului
   - [ ] Buton "Export Raport" în header
   - [ ] Input pentru răspuns activ

2. **Generează Capitolul I**
   - [ ] Scrie "Da" sau "Începe"
   - [ ] Agentul începe să genereze Capitolul I
   - [ ] Streaming funcționează (vezi text apărând în timp real)
   - [ ] Buton "Stop" (pătrat roșu) funcționează pentru a opri generarea
   - [ ] Format corect: Bold pentru factori și fațete, structură clară
   - [ ] Mesaj de tranziție la final: "Capitolul I s-a încheiat..."

3. **Continuă cu restul capitolelor**
   - [ ] Răspunde "Da" pentru fiecare capitol
   - [ ] Capitolul al II-lea (Analiza contextuală) - max 900 cuvinte
   - [ ] Capitolul al III-lea (Strategii) - max 800 cuvinte
   - [ ] Capitolul al IV-lea (Obiective) - max 700 cuvinte
   - [ ] Capitolul al V-lea (Concluzii) - max 700 cuvinte

4. **Verifică mesajul final**
   - [ ] După Capitolul V: mesaj "Analiza s-a încheiat"
   - [ ] Instrucțiuni de salvare a raportului
   - [ ] După 6 secunde: modal de subscription apare automat

**Verificare Tehnică:**
- [ ] Nu există erori în console
- [ ] API `/api/chat` returnează 200
- [ ] Rate limiting funcționează (vezi logs în Supabase `rate_limits`)

**Magic Command pentru Testing:**
```
/test-finish
```
- [ ] Trigger-uiește imediat flow-ul de finalizare fără să generezi toate capitolele

---

## 📄 Test 3: Export DOCX

**Obiectiv:** Verifică funcționalitatea de export Word

### Pași:

1. **Click pe "Export Raport"** în header
   - [ ] Se descarcă un fișier `.docx`
   - [ ] Numele fișierului: `Raport de evaluare a personalitatii antreprenoriale [Nume].docx`

2. **Deschide fișierul în Word/Google Docs**
   - [ ] Formatare corectă: Bold pentru titluri și concepte cheie
   - [ ] Header cu nume, dată, ocupație, industrie
   - [ ] Tot conținutul din chat este inclus
   - [ ] Font: Roboto, 12pt pentru text, 14-18pt pentru titluri
   - [ ] Line spacing: 0.9
   - [ ] Culoare titluri: Dark blue (#1e3a8a)

---

## 💳 Test 4: Stripe Payment Flow

**Obiectiv:** Testează fluxul complet de plată și onboarding

### Setup Stripe Test Mode:

```bash
# Test Card Numbers (nu cere verificare)
Card: 4242 4242 4242 4242
Expiry: 12/34
CVC: 123
ZIP: 12345
```

### Pași:

1. **Trigger modal de subscription**
   - Opțiunea A: Generează raportul complet și așteaptă 6 secunde
   - Opțiunea B: Folosește `/test-finish` în chat
   - [ ] Modal "Deblochează Potențialul Maxim" apare

2. **Click "Vreau să știu mai multe"**
   - [ ] Se deschide modalul detaliat cu 3 card-uri (Board Member AI, Memorie Infinită, Evoluție Continuă)
   - [ ] Preț afișat: 30 RON/lună
   - [ ] Buton "Activează Abonamentul"

3. **Click "Activează Abonamentul"**
   - [ ] Redirect la Stripe Checkout
   - [ ] Email și nume pre-populat din user info
   - [ ] Subscription plan corect (30 RON/lună)

4. **Completează plata (Test Mode)**
   - [ ] Introdu cardul de test: `4242 4242 4242 4242`
   - [ ] Click "Subscribe"
   - [ ] Redirect la `/auth/setup?session_id=...`

5. **Setup Account**
   ```
   URL: http://localhost:3000/auth/setup?session_id=cs_test_...
   ```
   - [ ] Email pre-populat (disabled)
   - [ ] Câmp pentru parolă (min 6 caractere)
   - [ ] Click "Creează Contul"
   - [ ] Redirect la `/chat`

**Verificare Backend:**
- [ ] Check Stripe Dashboard → Customers: utilizatorul este creat
- [ ] Check Stripe Dashboard → Subscriptions: subscription activ
- [ ] Check Supabase → `users`: user creat cu `stripe_customer_id`
- [ ] Check Supabase → `subscriptions`: subscription cu status 'active'

---

## 🔐 Test 5: Authentication Flow

**Obiectiv:** Testează login, logout, reset parolă

### Test Login:

1. **Navighează la `/auth/login`**
   - [ ] Formulare pentru Email și Parolă
   - [ ] Link "Forgot Password?"

2. **Login cu credențiale corecte**
   - [ ] Mesaj de succes sau redirect
   - [ ] Session salvat

3. **Login cu credențiale greșite**
   - [ ] Mesaj de eroare clar

### Test Forgot Password:

1. **Click "Forgot Password?" pe `/auth/login`**
   - [ ] Redirect la `/auth/forgot-password`
   - [ ] Câmp pentru email
   - [ ] Click "Trimite link de resetare"
   - [ ] Verifică email-ul (sau check Supabase Auth logs)

2. **Reset password**
   - [ ] Click pe link din email
   - [ ] Redirect la `/auth/update-password`
   - [ ] Setează parolă nouă
   - [ ] Redirect și confirmare

---

## 🚦 Test 6: Rate Limiting

**Obiectiv:** Verifică că limitarea funcționează pentru utilizatori gratuiți

### Setup:

- Deschide browser în **Incognito Mode** (IP identic, fără auth)

### Pași:

1. **Generează primul raport**
   - [ ] Completează test → generează raport
   - [ ] Funcționează normal

2. **Generează al doilea raport** (Incognito nou)
   - [ ] Completează test → generează raport
   - [ ] Funcționează normal

3. **Generează al treilea raport** (Incognito nou)
   - [ ] Completează test → generează raport
   - [ ] Funcționează normal

4. **Generează al patrulea raport** (Incognito nou)
   - [ ] Completează test → încearcă să generezi raport
   - [ ] API returnează **429 Too Many Requests**
   - [ ] Mesaj: "Ai atins limita de rapoarte gratuite pe 24h."

**Verificare Database:**
```sql
-- În Supabase SQL Editor
SELECT * FROM rate_limits
WHERE endpoint = '/api/chat'
ORDER BY created_at DESC
LIMIT 10;
```
- [ ] 3 intrări pentru același IP în ultimele 24h

---

## 🔄 Test 7: Webhook Handling (Stripe)

**Obiectiv:** Testează procesarea evenimentelor Stripe

### Setup Webhook Local (Stripe CLI):

```bash
# Instalează Stripe CLI
brew install stripe/stripe-cli/stripe  # Mac
# sau descarcă de la: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks la local
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Pași:

1. **Pornește forward-ul webhook**
   - [ ] Copiază webhook signing secret afișat
   - [ ] Actualizează `.env.local` → `STRIPE_WEBHOOK_SECRET`
   - [ ] Restart `npm run dev`

2. **Trigger evenimente de test**

**Test: checkout.session.completed**
```bash
stripe trigger checkout.session.completed
```
- [ ] Webhook primit în `/api/stripe/webhook`
- [ ] User creat/actualizat în `users` table
- [ ] Subscription creat în `subscriptions` table
- [ ] Log în MailerLite (dacă configurat)

**Test: invoice.payment_succeeded**
```bash
stripe trigger invoice.payment_succeeded
```
- [ ] Subscription status actualizat

**Test: customer.subscription.updated**
```bash
stripe trigger customer.subscription.updated
```
- [ ] Subscription status actualizat în DB

**Verificare Logs:**
```bash
# În terminal cu stripe listen
# Ar trebui să vezi:
✓ checkout.session.completed [200]
✓ invoice.payment_succeeded [200]
```

---

## 🌐 Test 8: Production Environment

**Obiectiv:** Verifică că aplicația funcționează în producție

### Setup:

```bash
npm run build
npm start
```

### Verificare:

- [ ] Build-ul se finalizează fără erori
- [ ] Aplicația pornește pe port 3000
- [ ] Toate paginile se încarcă corect
- [ ] API routes funcționează
- [ ] Environment variables sunt citite corect

**Verificare Edge Runtime:**
- [ ] `/api/chat` funcționează cu streaming
- [ ] Nu există erori legate de module incompatibile cu Edge

---

## 🐛 Common Issues & Solutions

### 1. "Missing ANTHROPIC_API_KEY"
**Soluție:** Verifică `.env.local` și restart server

### 2. Rate limiting nu funcționează
**Soluție:** Verifică că tabelul `rate_limits` există în Supabase

### 3. Stripe webhook fail
**Soluție:** Verifică `STRIPE_WEBHOOK_SECRET` în `.env.local`

### 4. Supabase auth fail
**Soluție:** Verifică că trigger-ul `handle_new_user()` există

### 5. Export DOCX broken
**Soluție:** Verifică că `docx` și `file-saver` sunt instalate

### 6. Build fail cu TypeScript
**Soluție:** Rulează `npx tsc --noEmit` pentru detalii

---

## ✅ Final Checklist

Înainte de deployment în producție:

- [ ] Toate testele de mai sus trec
- [ ] `.env.local` → `.env.production` cu chei de producție
- [ ] Stripe în **Live Mode** (nu test mode)
- [ ] Supabase database backup
- [ ] Rate limiting testat și configurat corect
- [ ] Webhook Stripe configurat cu URL-ul de producție
- [ ] CORS configurat dacă e necesar
- [ ] Error monitoring setup (Sentry, LogRocket, etc.)
- [ ] Analytics setup (Google Analytics, Plausible, etc.)

---

**Baftă la testing! 🚀**

Pentru întrebări, verifică documentația:
- [Supabase Setup](./supabase/SETUP.md)
- [Environment Variables](./.env.example)
