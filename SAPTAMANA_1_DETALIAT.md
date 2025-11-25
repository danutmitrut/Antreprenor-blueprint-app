# 📅 Săptămâna 1: Setup & First Code

**Durată:** 1 sesiune live (2-3h) + temă acasă
**Obiectiv:** De la zero la prima pagină web funcțională
**Mentalitate:** Claude Code scrie, tu înveți prin observare și modificare

---

## 🎯 Obiective Săptămâna 1

La finalul săptămânii, studenții vor putea:
- ✅ Să instaleze și folosească tools-urile de bază (VSCode, Git, Claude Code)
- ✅ Să comunice eficient cu Claude Code (prompt basics)
- ✅ Să înțeleagă structura unei pagini web (HTML)
- ✅ Să stylizeze elementele (CSS basics)
- ✅ Să creeze primul repository pe GitHub
- ✅ Să aibă o pagină web locală funcțională

---

## 📚 Sesiunea Live (2-3h)

### **Partea 1: Welcome & Setup (45 min)**

#### **1.1 Introducere Program (10 min)**
```
- Ce construim în 3 luni? (overview cele 3 apps)
- Cum funcționează: Claude Code = pair programmer, nu cheater
- Expectations: 1 sesiune/săptămână + temă (6-8h)
- Discord community setup (unde cer ajutor?)
```

#### **1.2 Tools Installation (30 min)**
**Toți instalează împreună, pas cu pas:**

**Tool 1: VSCode**
```
- Download de pe code.visualstudio.com
- Install (next, next, finish)
- First launch: theme selection (dark mode recommended)
- Extensions install:
  * Prettier (format code automatic)
  * Live Server (preview HTML în browser)
```

**Tool 2: Git**
```
- Download de pe git-scm.com
- Install (default settings OK)
- Verify în terminal: git --version
- Config initial:
  git config --global user.name "Numele Tău"
  git config --global user.email "email@example.com"
```

**Tool 3: GitHub Account**
```
- Sign up pe github.com
- Verify email
- Create first repository (test-repo)
- Clone local:
  git clone [URL]
```

**Tool 4: Claude Code**
```
- Access via browser SAU desktop app (dacă există)
- Login/Sign up
- First conversation test: "Hello Claude, explain what HTML is"
```

**Tool 5: Node.js (quick install, pentru viitor)**
```
- Download de pe nodejs.org (LTS version)
- Install (default settings)
- Verify: node --version, npm --version
```

#### **1.3 Verification Check (5 min)**
```
Checkpoint: Toată lumea are toate tools instalate?
- VSCode deschis ✅
- Git funcționează ✅
- GitHub account creat ✅
- Claude Code accessible ✅
- Node.js instalat ✅

Dacă cineva e blocat → breakout room cu mentor pentru debugging
```

---

### **Partea 2: First Conversation with Claude Code (20 min)**

#### **2.1 Cum să comunici cu Claude Code**

**Concept:** Claude Code = coleg care scrie codul pentru tine, dar tu trebuie să-i spui CE vrei.

**Exemple de prompts (bune vs rele):**

**❌ Prompt prost:**
```
"Fă un site"
→ Prea vag. Claude nu știe ce fel de site, ce features, ce design.
```

**✅ Prompt bun:**
```
"Vreau o pagină web personală cu:
- Titlu cu numele meu
- O poză de profil (rotundă)
- O scurtă bio (2-3 paragrafe)
- O listă cu 3 hobby-uri
- Link-uri către social media (GitHub, LinkedIn, Twitter)
Design simplu, modern, culori: albastru și alb."
```

**De ce e bun?**
- Specific (ce elemente vrei)
- Clar (cum ar trebui să arate)
- Concis (nu 10 pagini de text)

#### **2.2 Exercițiu Live: First Prompt**

**Instructor demonstrează:**
```
Prompt către Claude:
"Claude, creează o pagină HTML simplă cu:
- Un heading (H1) cu textul 'Bine ai venit!'
- Un paragraf care spune 'Aceasta este prima mea pagină web.'
- Un buton care spune 'Click aici'

Folosește HTML simplu, fără CSS deocamdată."
```

**Claude răspunde cu cod:**
```html
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prima Mea Pagină</title>
</head>
<body>
    <h1>Bine ai venit!</h1>
    <p>Aceasta este prima mea pagină web.</p>
    <button>Click aici</button>
</body>
</html>
```

**Instructor explică (Claude poate explica și el):**
```
- <!DOCTYPE html>: Spune browserului "acesta e un fișier HTML"
- <html>: Container pentru toată pagina
- <head>: Informații despre pagină (nu se văd pe ecran)
  * <title>: Titlul din tab-ul browserului
- <body>: Tot ce se vede pe pagină
  * <h1>: Heading mare (titlu)
  * <p>: Paragraf (text normal)
  * <button>: Buton (deocamdată nu face nimic)
```

#### **2.3 Test Live**
```
Toți studenții:
1. Creează folder nou: "saptamana-1"
2. Creează fișier: "index.html"
3. Copy-paste codul de la Claude
4. Deschide cu Live Server (right-click → Open with Live Server)
5. Vezi pagina în browser ✅

Dacă merge → SUCCESS! Prima ta pagină web funcționează.
```

---

### **Partea 3: HTML Basics prin Exemple (30 min)**

**Concept:** Nu memorezi tag-uri. Ceri lui Claude și înveți prin observare.

#### **3.1 Structură Pagină Personală (Live Coding)**

**Prompt către Claude:**
```
"Creează o pagină HTML pentru un personal landing page cu:
- Header cu numele meu (Dan Mitrut) și job title (AI Developer)
- Secțiune About cu bio (3 paragrafe despre mine)
- Secțiune Skills cu listă de skills (bullet points)
- Secțiune Contact cu link-uri (GitHub, LinkedIn, Email)
- Footer cu copyright

Structură HTML curată, fără CSS încă."
```

**Claude generează cod (studiul îl observă):**
```html
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Dan Mitrut - AI Developer</title>
</head>
<body>
    <!-- Header -->
    <header>
        <h1>Dan Mitrut</h1>
        <p>AI Developer & Educator</p>
    </header>

    <!-- About Section -->
    <section id="about">
        <h2>Despre Mine</h2>
        <p>Sunt developer cu experiență în AI și educație tehnologică...</p>
        <p>Pasionat de învățarea prin practică...</p>
        <p>Creez aplicații care rezolvă probleme reale...</p>
    </section>

    <!-- Skills Section -->
    <section id="skills">
        <h2>Skills</h2>
        <ul>
            <li>React & Node.js</li>
            <li>AI Integration (OpenAI, Claude)</li>
            <li>Full-Stack Development</li>
            <li>Teaching & Mentoring</li>
        </ul>
    </section>

    <!-- Contact Section -->
    <section id="contact">
        <h2>Contact</h2>
        <ul>
            <li><a href="https://github.com/username">GitHub</a></li>
            <li><a href="https://linkedin.com/in/username">LinkedIn</a></li>
            <li><a href="mailto:dan@example.com">Email</a></li>
        </ul>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 Dan Mitrut. Built with Claude Code.</p>
    </footer>
</body>
</html>
```

#### **3.2 Instructor Walkthrough (Explică HTML)**

**Nu trebuie să memoreze, doar să înțeleagă conceptele:**

```
<header>: Zona de sus (antet) - de obicei logo + navigație
<section>: Bloc de conținut (ca un capitol în carte)
<h1>, <h2>: Headings (titluri) - h1 = cel mai important, h2 = secundar
<p>: Paragraf (text normal)
<ul>: Unordered List (listă cu bullet points)
<li>: List Item (un element din listă)
<a href="...">: Link (anchor) - duce către alt URL
<footer>: Zona de jos (footer) - de obicei copyright, links

Observă structura:
- Header (sus)
- Secțiuni (About, Skills, Contact)
- Footer (jos)

Asta e un pattern clasic pentru landing pages.
```

#### **3.3 Student Task (15 min)**
```
Fiecare student:
1. Cere lui Claude să creeze PROPRIA sa pagină personală
   - Cu numele tău
   - Cu bio-ul tău (real sau inventat)
   - Cu skills-urile tale (reale sau aspiraționale)
   - Cu link-urile tale (sau placeholder-e)

2. Test în browser (Live Server)

3. Modifică ceva manual:
   - Schimbă numele
   - Adaugă încă un skill
   - Schimbă textul din footer

Scopul: Observă cum e structurat HTML-ul. Înveți prin modificare.
```

---

### **Partea 4: CSS Basics - First Styling (30 min)**

**Concept:** HTML = structură, CSS = design

#### **4.1 De ce CSS?**

**Arată pagina fără CSS (plain HTML):**
```
- Totul e alb pe fundal alb
- Font-uri default (urâte)
- Zero spacing (totul lipit)
- Nu arată profesional
```

**Întrebare către Claude:**
```
"Claude, adaugă CSS la pagina mea pentru:
- Fundal gri deschis (#f5f5f5)
- Font modern (sans-serif)
- Header centrat cu fundal albastru închis (#2c3e50), text alb
- Secțiuni cu padding (spațiu în interior)
- Footer centrat, text mic, gri
- Link-uri fără underline, albastru la hover

Folosește CSS inline în <style> tag în <head>."
```

**Claude generează CSS:**
```html
<head>
    <meta charset="UTF-8">
    <title>Dan Mitrut - AI Developer</title>
    <style>
        /* Reset și basics */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }

        /* Header */
        header {
            background-color: #2c3e50;
            color: white;
            text-align: center;
            padding: 40px 20px;
        }

        header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        /* Sections */
        section {
            max-width: 800px;
            margin: 40px auto;
            padding: 30px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        section h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }

        /* Lists */
        ul {
            list-style-position: inside;
            margin-left: 20px;
        }

        li {
            margin-bottom: 10px;
        }

        /* Links */
        a {
            color: #3498db;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 20px;
            color: #7f8c8d;
            font-size: 0.9rem;
        }
    </style>
</head>
```

#### **4.2 CSS Walkthrough (Quick Explanation)**

**Instructor explică concepte (nu detalii):**

```
CSS = reguli de styling

Sintaxă:
selector {
    property: value;
}

Exemple:
body { background-color: #f5f5f5; }
→ "Totul din <body> are fundal gri deschis"

header { padding: 40px; }
→ "Header-ul are spațiu interior de 40px"

a:hover { text-decoration: underline; }
→ "Când pui mouse pe link, apare underline"

Nu trebuie să memorezi proprietăți.
Claude știe toate proprietățile CSS.
Tu doar spui CE vrei, el scrie CUM.
```

#### **4.3 Student Task (10 min)**
```
Fiecare student cere lui Claude:
"Schimbă culorile paginii mele:
- Fundal verde deschis
- Header roz închis
- Link-uri portocalii"

SAU

"Fă headerul mai mare, cu o imagine de background
(poți folosi un URL de pe unsplash.com)"

Scopul: Experimentează cu styling prin prompts.
Observă ce se schimbă în cod când ceri modificări.
```

---

### **Partea 5: Git & GitHub Basics (20 min)**

**Concept:** Git = salvează versiuni ale codului (backup automat)

#### **5.1 De ce Git?**

**Scenarii fără Git:**
```
❌ "Am șters din greșeală codul, nu am backup"
❌ "Funcționa ieri, acum nu mai merge, nu știu ce am schimbat"
❌ "Am 10 versiuni: index_final_v3_FINAL_final.html"
```

**Cu Git:**
```
✅ Fiecare schimbare e salvată (cu mesaj: "ce am făcut")
✅ Poți reveni la orice versiune veche
✅ Backup automat pe GitHub (cloud)
✅ Colaborare cu alții (fără să vă suprascrieți codul)
```

#### **5.2 Comenzi Esențiale (Live Demo)**

**Step 1: Init Git**
```bash
# În folderul proiectului (saptamana-1/)
git init

→ Creează .git folder (invizibil)
→ Git acum "urmărește" schimbările din folder
```

**Step 2: Add Files**
```bash
git add index.html

SAU (adaugă tot din folder):
git add .

→ Pregătește fișierele pentru salvare
```

**Step 3: Commit (Salvare Versiune)**
```bash
git commit -m "Add personal landing page with CSS"

→ Salvează versiunea cu un mesaj
→ Mesajul descrie CE ai făcut
```

**Step 4: Push to GitHub**
```bash
# First time (link la repo GitHub)
git remote add origin https://github.com/username/saptamana-1.git
git branch -M main
git push -u origin main

# Next times (după ce ai legătura)
git push

→ Urcă codul pe GitHub (backup cloud)
```

#### **5.3 Student Task (10 min)**
```
Toți studenții:
1. Creează repo pe GitHub: "saptamana-1-landing-page"
2. În terminal (VSCode integrated terminal):
   - git init
   - git add .
   - git commit -m "First landing page"
   - git remote add origin [URL-ul repo-ului]
   - git push -u origin main

3. Verifică pe GitHub → codul tău e acolo! ✅

Dacă apare eroare:
- Check username/email config
- Check URL repo (copy-paste corect?)
- Mentor help în chat
```

---

### **Partea 6: Recap & Homework Assignment (10 min)**

#### **6.1 Ce am învățat azi?**

**Tools:**
- ✅ VSCode (editor)
- ✅ Git (version control)
- ✅ GitHub (cloud backup)
- ✅ Claude Code (AI pair programmer)

**Concepts:**
- ✅ HTML = structură (headings, paragraphs, lists, links)
- ✅ CSS = design (colors, spacing, fonts)
- ✅ Prompting = cum să comunici cu Claude
- ✅ Git basics = save versions (init, add, commit, push)

**Mindset:**
- ✅ Claude scrie codul, tu înveți prin observare
- ✅ Nu memorezi sintaxă, memorezi CONCEPTE
- ✅ Experimental: "Ce se întâmplă dacă schimb X?"

#### **6.2 Homework Săptămâna 1**

**Task Principal:**
```
Creează-ți propria pagină de landing page personal, dar mai complexă:

Secțiuni obligatorii:
1. Hero Section (header mare cu nume + tagline + poză profil)
2. About Me (bio + ce faci + ce îți place)
3. Projects (listă cu 3 proiecte - pot fi inventate sau reale)
   - Fiecare project: titlu, descriere scurtă, link (fake SAU real)
4. Skills (listă cu skills - poate fi design cu progress bars)
5. Contact (formular simplu: nume, email, mesaj - doar UI, fără funcționalitate)
6. Footer (social links + copyright)

Design requirements:
- Culori custom (alege o paletă de pe coolors.co)
- Font custom (Google Fonts - ex: Poppins, Roboto)
- Responsive hints (cel puțin mobile-friendly width)
- Hover effects pe butoane/links

Extra challenge (opțional):
- Adaugă animații simple (CSS transitions)
- Smooth scroll între secțiuni
- Dark mode toggle (doar CSS, fără JS încă)
```

**Deliverable:**
```
1. Fișier: index.html (cu HTML + CSS inline în <style>)
2. Pushed pe GitHub (repo: "landing-page-personal")
3. Screenshot în Discord (#showcase channel)
4. Short description: "Ce ți-a plăcut cel mai mult? Ce a fost challenging?"
```

**Resurse:**
```
- Cere lui Claude orice nu înțelegi
- Google Fonts: fonts.google.com
- Color palettes: coolors.co
- Icons (opțional): fontawesome.com sau lucide.dev
- Unsplash pentru imagini: unsplash.com
```

**Time estimate:** 4-6h (weekend work)

**Due:** Duminică 23:59 (înainte de următoarea sesiune)

---

## 📚 Resurse Suplimentare

**Documentație (pentru cei curioși):**
- MDN HTML Basics: developer.mozilla.org/en-US/docs/Learn/HTML
- MDN CSS Basics: developer.mozilla.org/en-US/docs/Learn/CSS
- Git Cheat Sheet: education.github.com/git-cheat-sheet-education.pdf

**Videos (opțional):**
- "HTML in 100 Seconds" - Fireship (YouTube)
- "CSS in 100 Seconds" - Fireship (YouTube)

**Tools:**
- Can I Use (check browser support): caniuse.com
- HTML Validator: validator.w3.org

---

## 🎯 Success Criteria Săptămâna 1

**Student e considerat "done" dacă:**
- ✅ Are toate tools instalate și funcționale
- ✅ Poate comunica basic cu Claude Code (prompts clare)
- ✅ Înțelege structura HTML (headings, paragraphs, lists, links)
- ✅ Poate adăuga CSS basic (colors, spacing, fonts)
- ✅ A făcut primul commit + push pe GitHub
- ✅ Are o pagină web funcțională (chiar dacă simplă)

**Red flags (student needs help):**
- ❌ Tools nu sunt instalate corect (erori constante)
- ❌ Nu înțelege cum să ceară ceva de la Claude
- ❌ Nu poate deschide pagina în browser
- ❌ Git commands dau erori (nu a reușit push)

→ Dacă student are red flags: catch-up session 1-on-1 cu mentor (30 min)

---

## 💡 Tips pentru Instructor

**Pacing:**
- ⏱️ Nu te grăbi prin setup (tools install e critical)
- ⏸️ Pause pentru întrebări după fiecare secțiune
- 🔄 Repeat concepte cheie (HTML = structură, CSS = design, Git = backup)

**Engagement:**
- 🎤 Ask questions: "Ce credeți că face acest tag?"
- 👀 Screen share students (showcase diverse solutions)
- 🏆 Celebrate wins: "Perfect, toată lumea are pagina funcțională!"

**Common Issues:**
- Git authentication (GitHub token vs password)
- Live Server nu pornește (wrong folder open?)
- CSS nu se aplică (typo în selector? syntax error?)

**Mindset Emphasis:**
- "Nu trebuie să știi tot HTML-ul și CSS-ul din cap"
- "Claude e colegul tău care știe sintaxa"
- "Tu faci decisions (CE vrei), Claude execută (CUM)"
- "Învățarea vine din: observare → modificare → experimentare"

---

**Săptămâna 1 done! Students au first working webpage + GitHub repo.** ✅
