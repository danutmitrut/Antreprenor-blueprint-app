# 🚀 Workflow Proiect - Antreprenor Blueprint
**Ghid complet de lucru cu Claude Code & Antigravity**

---

## 📋 Cuprins

1. [Structură Proiect](#-structură-proiect)
2. [Protocol de Lucru cu AI](#-protocol-de-lucru-cu-ai)
3. [Comenzi și Termeni Cheie](#-comenzi-și-termeni-cheie)
4. [Workflow Standard](#-workflow-standard)
5. [Scenarii Comune](#-scenarii-comune)
6. [Best Practices](#-best-practices)

---

## 🏗️ Structură Proiect

### **Fișiere de Protocol**
```
📁 antreprenor-blueprint/
├── SESSION_LOG.md                  # Protocol Antigravity - istoric sesiuni
├── SESSION_YYYY-MM-DD_TOPIC.md     # Documentație detaliată pe sesiune
├── AI_COLLABORATION_WORKFLOW.md    # Manual colaborare AI
├── WORKFLOW.md                     # Acest ghid (workflow rapid)
└── .env.example                    # Template environment variables
```

### **Fișiere Tehnice**
```
📁 app/
├── api/                  # Backend API routes
│   ├── auth/            # Autentificare (register, login, reset-password)
│   ├── chat/            # AI chat pentru generare rapoarte
│   ├── stripe/          # Payment & webhook
│   ├── subscription/    # Subscription status
│   └── reports/         # User reports
├── auth/                # Auth pages (login, forgot-password, reset-password)
├── dashboard/           # User dashboard
├── chat/                # AI chat interface
├── test/                # HEXACO test
└── ...

📁 lib/
├── auth.ts              # Auth utilities (JWT, bcrypt, user CRUD)
├── email.ts             # Resend email templates
├── supabase.ts          # Supabase client
└── rag.ts               # RAG pentru documentație HEXACO

📁 supabase/
├── auth_schema.sql                     # Custom auth tables
├── add_user_id_to_rate_limits.sql      # Migration rate limiting
└── drop_and_recreate.sql               # Cleanup script
```

---

## 🤖 Protocol de Lucru cu AI

### **Când folosești Claude Code?**
✅ Bug fixes rapide
✅ Modificări mici de cod (1-3 fișiere)
✅ Deployment și configurare
✅ Debugging și troubleshooting
✅ Documentație și protocoale
✅ Recuperare după închidere accidentală

### **Când folosești Antigravity?**
✅ Funcționalități noi complexe (5+ fișiere)
✅ Refactoring major
✅ Integrări noi (API-uri, librării)
✅ Schimbări de arhitectură
✅ Optimizări de performanță

### **🔄 Tranziție între agenți**

#### **La sfârșitul unei sesiuni (orice agent):**
```bash
# 1. Agent actualizează SESSION_LOG.md
# 2. Agent face commit + push
# 3. Agent creează SESSION_YYYY-MM-DD_TOPIC.md (opțional, pentru sesiuni complexe)
```

#### **La începutul unei noi sesiuni:**
```
"Am închis sesiunea cu [Claude/Antigravity].
Vreau să recuperez contextul."
```

**Agent va:**
1. Citi `SESSION_LOG.md` pentru ultimele modificări
2. Verifica `git log` și `git status`
3. Citi fișierele relevante pentru task-ul curent

---

## 💬 Comenzi și Termeni Cheie

### **Termeni pentru Recuperare Context**
```
"Am închis sesiunea din greșeală"
→ Agent citește SESSION_LOG.md + git status

"Recuperează sesiunea"
→ Agent citește ultimul entry din SESSION_LOG.md

"Ce am lucrat ultima dată?"
→ Agent analizează git log + SESSION_LOG.md

"Unde m-am oprit?"
→ Agent verifică git diff + uncommitted changes
```

### **Termeni pentru Deployment**
```
"Deploy pe Vercel"
→ Commit + push + verifică environment variables

"Build local"
→ npm run build

"Testează build-ul"
→ npm run build && verifică erori

"Push modificările"
→ git add + commit + push (cu protocol Antigravity)
```

### **Termeni pentru Configurare**
```
"Configurează [service]"
→ Agent verifică .env.example + ghidează setup

"Generează [secret/key]"
→ Agent folosește openssl/crypto pentru generare

"Adaugă environment variable în Vercel"
→ Agent explică pașii + oferă valoarea generată
```

### **Termeni pentru Testing**
```
"Testează [feature]"
→ Agent creează plan de testare + pași

"Verifică [functionality]"
→ Agent citește codul + explică flow-ul

"Debug [error]"
→ Agent analizează logs + propune soluții
```

---

## 🔄 Workflow Standard

### **1. Începutul Zilei / Sesiunii Noi**

```
Tu: "Bună! Vreau să lucrez la [feature/bug]."
```

**Agent face:**
1. ✅ Citește `SESSION_LOG.md` pentru context
2. ✅ Verifică `git status` (uncommitted changes?)
3. ✅ Verifică `git log -3` (ultimele commits)
4. ✅ Întreabă dacă vrei să continui ceva sau să începi fresh

---

### **2. Dezvoltare Feature Nou**

#### **Pasul 1: Planning**
```
Tu: "Vreau să adaug [feature X]."

Agent:
1. Creează todo list (TodoWrite tool)
2. Propune plan de implementare
3. Identifică fișierele care trebuie modificate
4. Sugerează structura
```

#### **Pasul 2: Implementare**
```
Agent:
1. Marchează task-uri ca "in_progress"
2. Implementează cod
3. Marchează task-uri ca "completed"
4. Verifică build local (npm run build)
```

#### **Pasul 3: Testing**
```
Agent:
1. Propune plan de testare
2. Testează manual/automat
3. Documentează rezultatele
```

#### **Pasul 4: Deployment**
```
Agent:
1. git status (verifică ce s-a modificat)
2. git add -A
3. git commit cu mesaj descriptiv (protocol Antigravity)
4. git push
5. Verifică deployment pe Vercel
```

---

### **3. Bug Fixing**

```
Tu: "Am eroarea [error message]."

Agent:
1. Analizează error message
2. Citește codul relevant
3. Identifică cauza
4. Propune fix
5. Implementează fix
6. Testează
7. Commit + push
```

---

### **4. Deployment & Configurare**

#### **Pentru Environment Variables:**
```
Tu: "Trebuie să adaug [SERVICE_KEY] în Vercel."

Agent:
1. Verifică dacă există în .env.local
2. Dacă nu există, generează/cere valoarea
3. Actualizează .env.example cu documentație
4. Explică pașii pentru Vercel Dashboard
5. Verifică deployment după adăugare
```

#### **Pentru External Services (Stripe, Resend, etc.):**
```
Tu: "Trebuie să configurez [Service]."

Agent:
1. Citește codul pentru a înțelege ce trebuie configurat
2. Explică pașii în dashboard-ul serviciului
3. Verifică că toate variabilele sunt setate
4. Ghidează testarea integrării
```

---

### **5. Sfârșitul Sesiunii**

```
Tu: "Fac pauză. Salvează progresul."

Agent:
1. Actualizează SESSION_LOG.md cu entry nou
2. Creează SESSION_YYYY-MM-DD_TOPIC.md (pentru sesiuni complexe)
3. git add + commit + push cu documentația
4. Rezumă ce s-a realizat
5. Sugerează next steps
```

---

## 🎯 Scenarii Comune

### **Scenariu 1: Sesiune Închisă Accidental**

```
Tu: "Am închis din greșeală Claude Code. Cum recuperez sesiunea?"

Agent:
1. Citește SESSION_LOG.md (ultimul entry)
2. git status (uncommitted changes?)
3. git diff (ce modificări sunt în curs?)
4. Prezintă rezumat: "Lucrai la X, ai modificat Y, mai trebuie Z"
5. Întreabă: "Vrei să continui de unde ai rămas?"
```

---

### **Scenariu 2: Build Failed pe Vercel**

```
Tu: "Build-ul pe Vercel a eșuat. Uite error-ul: [paste error]"

Agent:
1. Analizează error message
2. Identifică cauza (de obicei: missing env vars, import errors, syntax)
3. Propune soluție
4. Dacă e env var: explică cum să-l adaugi în Vercel
5. Dacă e cod: face fix + commit + push
6. Verifică redeploy
```

---

### **Scenariu 3: Trebuie să Generez un Secret/Key**

```
Tu: "Am nevoie de un JWT_SECRET."

Agent:
1. openssl rand -base64 32
2. Afișează output-ul
3. Explică unde să-l adaugi (Vercel, .env.local)
4. Actualizează .env.example cu documentație
```

---

### **Scenariu 4: Vreau să Testez un Feature**

```
Tu: "Cum testez [feature X]?"

Agent:
1. Citește codul pentru feature X
2. Explică flow-ul (user perspective)
3. Creează checklist de testare:
   - [ ] Step 1: ...
   - [ ] Step 2: ...
   - [ ] Step 3: ...
4. Sugerează ce să verifici (UI, API responses, database)
```

---

### **Scenariu 5: Vreau să Adaug o Integrare Nouă**

```
Tu: "Vreau să integrez [Service Y]."

Agent:
1. Întreabă: "Ai cont/API key pentru Service Y?"
2. Propune plan de implementare (todo list)
3. Implementează cod
4. Actualizează .env.example
5. Explică pașii de configurare în dashboard Service Y
6. Testează integrarea
7. Commit + push + deploy
```

---

## 🎨 Best Practices

### **✅ DO's**

#### **Comunicare cu AI:**
- ✅ Fii specific: "Vreau să adaug autentificare cu Google OAuth"
- ✅ Atașează error messages: "Build-ul a eșuat cu eroarea: [paste]"
- ✅ Menționează fișierele relevante: "Verifică `app/api/chat/route.ts`"
- ✅ Confirmă înainte de deploy: "Verifică build-ul local înainte de push"

#### **Git & Deployment:**
- ✅ Commit frecvent (după fiecare feature/fix complet)
- ✅ Mesaje de commit descriptive (protocol Antigravity)
- ✅ Push după fiecare commit (pentru backup)
- ✅ Verifică build local înainte de push (`npm run build`)

#### **Environment Variables:**
- ✅ Actualizează `.env.example` când adaugi variabile noi
- ✅ Documentează fiecare variabilă (ce face, de unde o iei)
- ✅ Generează secrets securizați (`openssl rand -base64 32`)
- ✅ Adaugă în Vercel pentru toate environments (Prod + Preview + Dev)

#### **Documentație:**
- ✅ Actualizează `SESSION_LOG.md` după fiecare sesiune
- ✅ Creează `SESSION_YYYY-MM-DD_TOPIC.md` pentru sesiuni complexe
- ✅ Documentează decizii importante în cod (comentarii)

---

### **❌ DON'Ts**

#### **Comunicare cu AI:**
- ❌ Nu fi vag: ~~"Fixează app-ul"~~ → "Fixează eroarea de login pe `/auth/login`"
- ❌ Nu presupune context: Agent nu știe ce ai făcut în alte sesiuni (citește SESSION_LOG)
- ❌ Nu sari pașii: Dacă agent sugerează verificare, fă-o înainte de deploy

#### **Git & Deployment:**
- ❌ Nu lăsa uncommitted changes între sesiuni (commit sau stash)
- ❌ Nu face push fără build local reușit
- ❌ Nu uita să verifici Vercel dashboard după push
- ❌ Nu modifica codul direct pe Vercel (doar prin git push)

#### **Environment Variables:**
- ❌ Nu commit-ui `.env.local` (e în `.gitignore` - bine!)
- ❌ Nu folosești aceleași secrets în dev și production
- ❌ Nu uiți să adaugi variabile noi în Vercel
- ❌ Nu folosești valori weak pentru secrets (ex: "secret123")

#### **Coding:**
- ❌ Nu merge codul fără testare (măcar manual)
- ❌ Nu adaugi dependencies fără să verifici licența/reputația
- ❌ Nu ștergi cod fără să verifici dacă e folosit în altă parte
- ❌ Nu face refactoring masiv fără backup (commit înainte)

---

## 🔑 Termeni Speciali - AI Commands

### **Context & Recovery**
```
"Recuperează context"           → Citește SESSION_LOG + git status
"Ce s-a lucrat ultima dată?"    → Analizează ultimul entry SESSION_LOG
"Unde m-am oprit?"              → git diff + uncommitted changes
"Continuăm de unde am rămas?"   → Setează context din ultimul task
```

### **Planning & Execution**
```
"Planifică [feature]"           → TodoWrite tool + plan detaliat
"Implementează [feature]"       → Cod + testare + commit
"Fixează [bug]"                 → Debug + fix + verificare + commit
"Refactorizează [code]"         → Analiză + plan + implementare
```

### **Deployment & Config**
```
"Deploy pe Vercel"              → Build + commit + push + verificare
"Configurează [service]"        → Setup + env vars + testare
"Generează [secret]"            → openssl/crypto + documentație
"Adaugă env var în Vercel"      → Ghid pas cu pas
```

### **Testing & Verification**
```
"Testează [feature]"            → Plan de testare + execuție
"Verifică build-ul"             → npm run build + analiză erori
"Debug [error]"                 → Analiză + reproducere + fix
"Rulează teste"                 → npm test (dacă există)
```

### **Documentation**
```
"Salvează progresul"            → Update SESSION_LOG + commit + push
"Documentează sesiunea"         → Creează SESSION_YYYY-MM-DD.md
"Actualizează README"           → Update cu ultimele features
"Fac pauză"                     → Save everything + push
```

---

## 📊 Template Mesaj pentru AI

### **La început de sesiune:**
```
"Bună! [Claude/Antigravity aici]
Vreau să lucrez la [feature/bug/config].
[Opțional: Context specific sau error message]"
```

### **Pentru bug-uri:**
```
"Am eroarea: [paste error message]
Apare când fac: [pași de reproducere]
Fișierul relevant: [file path dacă știi]"
```

### **Pentru deployment:**
```
"Vreau să fac deploy.
Build local: [✅ trecut / ❌ eșuat / nu am rulat]
Environment variables: [✅ setate / ❌ lipsesc / nu știu]"
```

### **Pentru pauză:**
```
"Fac pauză. Salvează tot și actualizează SESSION_LOG."
```

---

## 🚨 Troubleshooting Rapid

### **Build eșuat local:**
```bash
1. Verifică error message (TypeScript? Import? Syntax?)
2. Citește fișierul menționat în eroare
3. Fixează eroarea
4. Rulează din nou: npm run build
```

### **Build eșuat pe Vercel:**
```bash
1. Verifică logs în Vercel Dashboard
2. Caută "Error:" sau "Missing"
3. De obicei: missing environment variables
4. Adaugă în Vercel Settings → Environment Variables
5. Redeploy
```

### **Feature nu funcționează:**
```bash
1. Verifică console (browser DevTools)
2. Verifică Network tab (API calls failed?)
3. Verifică Vercel logs (backend errors?)
4. Reproducere pas cu pas + note pentru AI
```

### **Git conflicts:**
```bash
1. git status (vezi ce fișiere sunt în conflict)
2. Deschide fișierele cu <<< === >>>
3. Rezolvă manual sau cere ajutor AI-ului
4. git add <resolved-files>
5. git commit
```

---

## 📚 Resurse Rapide

### **Documentație Proiect:**
- `SESSION_LOG.md` - Istoric complet sesiuni
- `SESSION_YYYY-MM-DD_*.md` - Detalii sesiuni complexe
- `AI_COLLABORATION_WORKFLOW.md` - Manual colaborare AI
- `.env.example` - Template environment variables
- `README.md` - Overview proiect

### **External Dashboards:**
- **Vercel:** https://vercel.com/dashboard
- **Supabase:** https://supabase.com/dashboard
- **Stripe:** https://dashboard.stripe.com/
- **Resend:** https://resend.com/dashboard

### **Comenzi Utile:**
```bash
npm run dev          # Dev server (localhost:3000)
npm run build        # Production build (verifică erori)
git status           # Vezi uncommitted changes
git log -5           # Ultimele 5 commits
git diff             # Vezi modificările curente
```

---

## 🎯 Quick Checklist Deployment

Înainte de fiecare deployment:

- [ ] Build local reușit (`npm run build`)
- [ ] Git status curat (toate changes committed)
- [ ] Environment variables actualizate în Vercel (dacă ai adăugat ceva nou)
- [ ] `.env.example` actualizat cu documentație
- [ ] `SESSION_LOG.md` actualizat
- [ ] Commit message descriptiv (protocol Antigravity)
- [ ] Push pe GitHub
- [ ] Verifică Vercel dashboard (build success?)
- [ ] Testează pe producție (basic smoke test)

---

## 💡 Pro Tips

1. **Comunică clar cu AI:**
   - "Vreau să adaug X" = clar
   - "Fă ceva" = neclar

2. **Verifică înainte de deploy:**
   - Build local întotdeauna
   - Commit frecvent (backup)

3. **Documentează constant:**
   - SESSION_LOG după fiecare sesiune
   - .env.example când adaugi variables

4. **Testează incremental:**
   - Nu adăuga 10 features deodată
   - Test după fiecare feature

5. **Backup automat:**
   - Push după fiecare commit
   - Git = backup gratuit

---

**Happy Coding! 🚀**

*Pentru întrebări sau probleme, deschide o nouă sesiune cu Claude Code sau Antigravity și folosește termenii din acest ghid.*
