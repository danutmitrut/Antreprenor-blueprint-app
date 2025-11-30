# 📅 Săptămâna 1: Fundații Vibe Coding

**Obiectiv:** Înțelegere conceptuală + Setup complet
**Zero cod scris manual** - Focus pe mindset și tools

---

## 🎯 Obiective Săptămâna 1

La final, studenții vor înțelege:
- ✅ Ce este Vibe Coding și cum diferă de programare tradițională
- ✅ Cine e arhitectul, cine e executorul (roluri clare)
- ✅ Workflow-ul complet (de la idee la aplicație live)
- ✅ Tools și protocol de lucru
- ✅ Cum să comunice eficient cu Claude Code

**NU vor scrie cod.** Vor înțelege PROCESUL.

---

## 📚 Sesiunea Live (2-3h)

### **Partea 1: Ce este Vibe Coding? (30 min)**

#### **1.1 Programare Tradițională vs Vibe Coding**

**Programare Tradițională:**
```
Tu:
1. Înveți sintaxă (HTML, CSS, JS) - 6 luni
2. Înveți frameworks (React, Node.js) - 6 luni
3. Înveți best practices - 1 an
4. Construiești aplicația - 3 luni
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: ~2 ani până construiești ceva serios
```

**Vibe Coding:**
```
Tu + Claude Code:
1. Înveți să comunici cu AI - 1 săptămână
2. Înveți concepte (ce e un API? ce e un database?) - 1 lună
3. Construiești aplicația - 2 luni
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: ~3 luni până construiești ceva serios
```

**Diferența:**
```
Programare Tradițională:
- Tu scrii FIECARE linie de cod
- Tu memorezi sintaxă
- Tu debug-uiești singur
- Tu cauți pe Google fiecare eroare

Vibe Coding:
- Tu decizi CE construiești (architect)
- Claude scrie codul (executor)
- Claude explică ce face codul
- Tu înveți CONCEPTE, nu sintaxă
```

#### **1.2 Roluri Clare**

**TU = ARHITECT**
```
Responsabilități:
✅ Decizi CE construiești (features, design)
✅ Spui CUM vrei să arate (UI/UX)
✅ Testezi dacă funcționează
✅ Decizi ce schimbi/îmbunătățești
✅ Înveți CONCEPTE (ce e un API? ce e o bază de date?)

NU faci:
❌ NU scrii cod manual (doar când modifici mici detalii)
❌ NU memorezi sintaxă
❌ NU pierzi timp cu erori de sintaxă
```

**CLAUDE CODE = EXECUTOR**
```
Responsabilități:
✅ Scrie tot codul
✅ Explică ce face fiecare parte
✅ Sugerează soluții (best practices)
✅ Debug-uiește erori tehnice
✅ Optimizează performanța

Limitări:
❌ NU decide CE construiești (tu decizi)
❌ NU știe ce vrei tu (trebuie să-i spui clar)
❌ NU testează aplicația (tu testezi)
```

#### **1.3 Ce poți construi cu Vibe Coding?**

**Exemple concrete:**
```
✅ Landing pages (site-uri pentru business)
✅ Aplicații web (todo lists, habit trackers, expense trackers)
✅ Platforme SaaS (subscriptions, payments, user management)
✅ E-commerce (produse, coș, checkout)
✅ Dashboards (analytics, rapoarte, grafice)
✅ AI-powered apps (chat bots, content generators)
✅ Internal tools (CRM-uri simple, time trackers)
```

**Ce NU poți construi (încă):**
```
❌ Facebook-level scale (milioane de useri simultan)
❌ Low-level systems (operating systems, drivers)
❌ Aplicații ultra-complexe (Google Maps-level)
```

**Dar 99% din aplicații sunt în categoria "poți construi".**

#### **1.4 Unde se încarcă codul? Unde apare aplicația?**

**Workflow vizual:**
```
1. TU (Architect)
   ↓ descrii ce vrei

2. CLAUDE CODE (Executor)
   ↓ scrie codul

3. VSCODE (Editor)
   ↓ salvezi codul aici (fișiere pe laptop)

4. GITHUB (Backup Cloud)
   ↓ încărci codul (git push)

5. VERCEL (Deployment)
   ↓ Vercel ia codul de pe GitHub
   ↓ construiește aplicația
   ↓ publică la un URL public

6. APLICAȚIA LIVE
   ↓ Oricine poate accesa: https://app-ta.vercel.app
```

**Analogie simplă:**
```
VSCODE = Word (scrii documentul local)
GITHUB = Google Drive (backup în cloud)
VERCEL = Print Shop (transformă documentul în poster și-l afișează public)
```

---

### **Partea 2: Tools Setup (45 min)**

#### **2.1 Instalare Tools (Toți Împreună)**

**Tool 1: VSCode** (5 min)
```
Ce face? Editor de cod (ca Word pentru programatori)
Download: code.visualstudio.com
Install: Next, Next, Finish
First launch: Alege dark theme (optional)
```

**Tool 2: Git** (5 min)
```
Ce face? Salvează versiuni ale codului (time machine pentru cod)
Download: git-scm.com
Install: Default settings (doar Next)
Verify în terminal: git --version
Config:
  git config --global user.name "Numele Tău"
  git config --global user.email "email@example.com"
```

**Tool 3: GitHub Account** (5 min)
```
Ce face? Cloud storage pentru cod (Google Drive pentru programatori)
Sign up: github.com
Verify email
Create first repo: "test-repo" (public)
```

**Tool 4: Claude Code** (5 min)
```
Ce face? AI care scrie cod pentru tine
Access: claude.ai (browser) SAU desktop app
Login/Sign up
Test conversation: "Hello Claude, what can you help me build?"
```

**Tool 5: Node.js** (5 min)
```
Ce face? Permite rularea JavaScript pe laptop (backend apps)
Download: nodejs.org (LTS version - recommended)
Install: Default settings
Verify: node --version, npm --version
```

**Checkpoint Break (10 min)**
```
Verificare:
- Toată lumea are toate tools instalate? ✅
- Cineva blocat? → Help 1-on-1 (breakout room)
- Screenshot setup complete în Discord
```

#### **2.2 Ce Face Fiecare Tool? (10 min)**

**Demo vizual (instructor share screen):**

**VSCode:**
```
- Deschide folder "test-project"
- Creează fișier "index.html"
- Scrie ceva simplu: <h1>Hello</h1>
- Salvează (Cmd/Ctrl + S)

→ Codul e salvat LOCAL pe laptop
```

**Git:**
```
În terminal (VSCode integrated terminal):
  git init          → "Git, urmărește acest folder"
  git add .         → "Pregătește toate fișierele"
  git commit -m "First commit"  → "Salvează versiunea cu mesaj"

→ Codul e salvat ca "versiune" (snapshot)
```

**GitHub:**
```
În browser:
  - Create new repo "test-project"
  - Copy URL

În terminal:
  git remote add origin [URL]
  git push -u origin main

→ Codul e urcat în cloud (backup)
```

**Vercel (demo quick):**
```
În browser:
  - vercel.com → Login with GitHub
  - Import repository "test-project"
  - Deploy (automatic)

→ Aplicația e LIVE la https://test-project-xyz.vercel.app
```

**Claude Code:**
```
În claude.ai:
  "Claude, creează un fișier HTML simplu cu un heading"
  → Claude generează codul
  → Tu copy-paste în VSCode
  → Save → Git → GitHub → Vercel → LIVE

→ Claude = partenerul care scrie cod
```

---

### **Partea 3: Protocol de Lucru (30 min)**

#### **3.1 Workflow Standard (Pas cu Pas)**

**Flow pentru orice proiect:**

**STEP 1: Planifică (5 min)**
```
Întrebări:
- Ce construiesc? (ex: "Landing page pentru freelancing")
- Cine e user-ul? (ex: "Clienți potențiali care vor să mă contacteze")
- Ce features? (ex: "About, Services, Portfolio, Contact form")
```

**STEP 2: Cere lui Claude să genereze (10 min)**
```
Prompt:
"Claude, creează un landing page pentru freelancer cu:
- Hero section (nume, tagline, CTA button)
- About section (bio)
- Services section (listă cu 3 servicii)
- Portfolio section (3 project cards)
- Contact form (nume, email, mesaj)
Design modern, responsive."

Claude generează cod → Tu copy-paste în VSCode
```

**STEP 3: Testează Local (5 min)**
```
În VSCode:
- Deschide cu Live Server (right click → Open with Live Server)
- Vezi pagina în browser
- Testează: butoanele funcționează? formul arată bine?
```

**STEP 4: Modifică/Îmbunătățește (iterativ)**
```
Cere lui Claude:
"Schimbă culoarea butonului în albastru"
"Adaugă o imagine în hero section"
"Fă fontul mai mare"

Copy-paste cod nou → Refresh browser → Verifică
Repeat până e perfect.
```

**STEP 5: Salvează Versiune (Git)**
```
În terminal:
git add .
git commit -m "Add landing page"
```

**STEP 6: Upload pe GitHub**
```
git push
→ Codul e în cloud (backup sigur)
```

**STEP 7: Deploy pe Vercel**
```
Vercel detectează automat push-ul pe GitHub
→ Build automatic
→ Deploy la URL public
→ Share URL cu lumea
```

#### **3.2 Protocol Zilnic**

**Când lucrezi la proiect:**
```
1. Deschide VSCode (folder proiect)
2. Deschide Claude Code (browser/app)
3. Lucrează (cere lui Claude features noi)
4. Testează (Live Server în browser)
5. Commit (git add + commit)
6. Push (git push)

Repeat daily.
```

**Când finalizezi o zi de lucru:**
```
git add .
git commit -m "Describe ce ai făcut azi"
git push

→ Backup sigur, poți continua mâine
```

---

### **Partea 4: Workbook Claude Code (30 min)**

#### **4.1 Cum să Comunici Eficient cu Claude**

**Structura unui Prompt Bun:**

**Template:**
```
"Claude, vreau să construiesc [TIP APLICAȚIE] cu:

Features:
- [Feature 1]
- [Feature 2]
- [Feature 3]

Design:
- [Culori/stil]
- [Layout preferences]

Tech stack:
- [Dacă ai preferințe: React, vanilla JS, etc.]

Comenzi pas cu pas, te rog."
```

**Exemplu Concret:**
```
"Claude, vreau să construiesc un habit tracker cu:

Features:
- User poate adăuga habits (nume + frequency: daily/weekly)
- User poate marca habit ca 'done' pentru ziua curentă
- Afișează streak (câte zile consecutive)
- Afișează toate habits într-o listă

Design:
- Minimalist, culori: albastru și alb
- Cards pentru fiecare habit
- Responsive (mobile-friendly)

Tech stack:
- HTML, CSS, JavaScript (vanilla, fără frameworks)

Începe cu structura HTML, apoi adaugăm CSS și JS."
```

#### **4.2 Prompt Patterns (Workbook)**

**Pattern 1: Creează de la zero**
```
"Claude, creează [APLICAȚIE] cu features:
1. [Feature A]
2. [Feature B]
3. [Feature C]

Design: [descriere]"
```

**Pattern 2: Modifică ceva existent**
```
"Claude, am codul acesta: [paste cod]

Vreau să schimbi:
- [Schimbare 1]
- [Schimbare 2]

Arată-mi codul modificat."
```

**Pattern 3: Explică codul**
```
"Claude, poți explica ce face acest cod?
[paste cod]

Explică ca pentru un începător."
```

**Pattern 4: Debug eroare**
```
"Claude, am eroarea: [paste error message]

Codul meu:
[paste cod]

Ce e greșit și cum fix?"
```

**Pattern 5: Îmbunătățește codul**
```
"Claude, am acest cod: [paste]

Cum pot să-l fac:
- Mai rapid?
- Mai sigur?
- Mai ușor de citit?

Arată îmbunătățiri."
```

**Pattern 6: Best practices**
```
"Claude, pentru [TASK specific], care e best practice?
Ex: 'Pentru formulare de contact, care e best practice pentru validare?'"
```

#### **4.3 DO's and DON'Ts**

**✅ DO:**
```
✅ Fii specific (ce vrei exact)
✅ Descrie design-ul (culori, layout)
✅ Cere explicații când nu înțelegi
✅ Iterează (cere modificări pas cu pas)
✅ Testează după fiecare schimbare
✅ Salvează versions (git commit frecvent)
```

**❌ DON'T:**
```
❌ Nu fi vag ("fă ceva frumos")
❌ Nu cere 10 features deodată (una pe rând)
❌ Nu copia cod fără să testezi
❌ Nu ignori erorile (cere lui Claude să le rezolve)
❌ Nu uiți să faci backup (git push)
```

#### **4.4 Exercițiu Live (15 min)**

**Toți studenții în paralel:**

**Task:**
```
Cere lui Claude să genereze:
"O pagină HTML simplă cu:
- Un heading: 'Bine ai venit la cursul de Vibe Coding'
- Un paragraf: 'Aceasta e prima mea interacțiune cu Claude Code'
- Un buton: 'Start Learning'

Stil simplu, fundal albastru deschis."
```

**Steps:**
1. Deschide Claude Code
2. Scrie prompt-ul de mai sus
3. Copy codul generat
4. Paste în VSCode (fișier nou: "test.html")
5. Deschide cu Live Server
6. Verifică în browser

**Debrief:**
- A funcționat pentru toată lumea? ✅
- Cineva are erori? → troubleshoot live
- Întrebări despre proces?

---

### **Partea 5: Recap & Homework (15 min)**

#### **5.1 Ce am învățat azi?**

**Concepte:**
- ✅ Vibe Coding = Tu decizi CE, Claude scrie CUM
- ✅ Tu = Architect, Claude = Executor
- ✅ Workflow: Planifică → Claude generează → Testezi → Modifici → Deploy
- ✅ Tools: VSCode (editor), Git (versions), GitHub (backup), Vercel (deploy), Claude (AI)

**Protocol:**
- ✅ Cum instalăm și folosim fiecare tool
- ✅ Workflow zilnic (develop → test → commit → push)
- ✅ Cum să comunicăm eficient cu Claude (prompt patterns)

**Mindset:**
- ✅ Nu trebuie să știi sintaxă
- ✅ Focus pe CONCEPTE (ce e un API? ce e un database?)
- ✅ Claude scrie, tu înveți prin observare și modificare
- ✅ Iterativ: cere → testează → îmbunătățește → repeat

#### **5.2 Homework Săptămâna 1**

**Task:**
```
Creează o pagină web personală (landing page) folosind Claude Code.

Conținut obligatoriu:
1. Header (nume + tagline)
2. About section (cine ești, ce faci)
3. Skills section (listă cu 3-5 skills)
4. Contact section (email + social links)

Proces:
1. Cere lui Claude să genereze codul (folosește prompt pattern)
2. Copy-paste în VSCode
3. Testează local (Live Server)
4. Modifică ceva (cere lui Claude să schimbe culori SAU layout)
5. Commit pe Git
6. Push pe GitHub
7. Deploy pe Vercel (optional, dar recomandat)

Deliverable:
- Link GitHub repo
- Screenshot pagină în Discord (#week-1-showcase)
- 1 paragraf: "Ce a fost cel mai interesant? Ce întrebare mai ai?"
```

**Due:** Duminică 23:59

**Resurse:**
- Workbook Claude Code (din sesiune - acest document)
- UNIVERSAL_WORKFLOW.md (pentru referință)
- Discord #help (pentru întrebări)

**Time estimate:** 3-4h (weekend)

---

## 📚 Resurse Suplimentare

**Pentru studenți:**
- VSCode Shortcuts: code.visualstudio.com/shortcuts
- Git Cheat Sheet: education.github.com/git-cheat-sheet-education.pdf
- Markdown Guide (pentru README): markdownguide.org

**Video (opțional):**
- "Git Explained in 100 Seconds" - Fireship
- "How The Internet Works" - Code.org

---

## 🎯 Success Criteria

**Student e "done" cu Săptămâna 1 dacă:**
- ✅ Înțelege diferența: Programare Tradițională vs Vibe Coding
- ✅ Înțelege roluri: Tu = Architect, Claude = Executor
- ✅ Înțelege workflow: VSCode → Git → GitHub → Vercel
- ✅ Are toate tools instalate și funcționale
- ✅ Poate scrie un prompt clar către Claude
- ✅ A creat o pagină web (chiar dacă simplă)
- ✅ A făcut primul commit + push pe GitHub

**Red flags:**
- ❌ Nu înțelege "de ce Vibe Coding?" (explică din nou cu analogii)
- ❌ Nu poate instala tools (help 1-on-1)
- ❌ Nu știe cum să comunice cu Claude (arată exemple de prompts)
- ❌ E confuz de workflow (desenează diagrama din nou)

---

## 💡 Tips pentru Instructor

**Pacing:**
- ⏱️ Partea 1 (Concepte) = 30 min MAX (nu te extinde)
- ⏸️ Pause după fiecare tool install (verification)
- 🔄 Repeat workflow vizual (desenează pe whiteboard/screen)

**Engagement:**
- 🎤 Ask: "Cine a mai folosit AI tools?" (raise hands)
- 👀 Show examples: "Uite ce app am construit eu în 2h cu Claude"
- 🏆 Celebrate: "Perfect, toată lumea are tools instalate!"

**Analogii pentru concepte:**
- Architect vs Executor = Director film vs Cameraman
- Git = Time machine pentru cod
- GitHub = Google Drive pentru programatori
- Vercel = "Print shop" care publică aplicația

**Common issues:**
- Git authentication (token vs password - show demo)
- Claude Code rate limits (free tier limits - explain)
- Vercel build errors (de obicei env vars - pentru viitor)

**Mindset emphasis:**
- "Nu ești developer tradițional"
- "Ești product builder care folosește AI"
- "Focus: creează lucruri utile, nu memorează sintaxă"
- "Claude e colegul tău, nu cheater-ul tău"

---

**Săptămâna 1 = Fundații mentale + Tools + Protocol**
**Zero presiune să scrie cod manual**
**Totul e despre ÎNȚELEGERE și PROCES** ✅
