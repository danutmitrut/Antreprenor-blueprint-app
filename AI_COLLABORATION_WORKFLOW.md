# 🤖 Manual de Lucru cu Claude și Antigravity

## Ghid complet pentru colaborare fără conflicte între AI agents

---

## 📋 Cuprins

1. [Înainte de Fiecare Sesiune](#-înainte-de-fiecare-sesiune)
2. [În Timpul Sesiunii](#-în-timpul-sesiunii)
3. [La Sfârșitul Sesiunii](#-la-sfârșitul-sesiunii)
4. [Schimbarea Între Agents](#-schimbarea-între-agents)
5. [Rezolvarea Conflictelor](#-rezolvarea-conflictelor)
6. [Best Practices](#-best-practices)
7. [Troubleshooting](#-troubleshooting)

---

## 🚀 Înainte de Fiecare Sesiune

### Checklist Obligatoriu

```bash
# 1. Sincronizează codul local cu GitHub
git pull origin main

# 2. Verifică că build-ul funcționează
npm run build

# 3. Verifică statusul curent
git status

# 4. Citește ultimele modificări
git log --oneline -3
```

### ⚠️ Dacă `git pull` arată conflicte:

**NU continua până nu rezolvi conflictele!**

Urmează pașii din secțiunea [Rezolvarea Conflictelor](#-rezolvarea-conflictelor).

---

## 💬 În Timpul Sesiunii

### Comunică Context Agent-ului

#### Când lucrezi cu **Claude**:

```
"Antigravity tocmai a modificat [fișier/feature].
Verifică dacă modificările tale sunt compatibile."
```

**Exemplu concret:**
```
"Antigravity a implementat RAG cu OpenAI în app/api/chat/route.ts.
Verifică că modificările tale nu strică integrarea RAG."
```

#### Când lucrezi cu **Antigravity**:

```
"Claude tocmai a fix-uit [bug/feature] în [fișier].
Asigură-te că modificările tale nu revin la versiunea bugată."
```

**Exemplu concret:**
```
"Claude a fix-uit logica de completion în app/test/page.tsx.
Nu schimba useEffect-ul de la liniile 41-52."
```

### Specializarea Agents (Recomandare)

| Task Type | Agent Recomandat | De ce? |
|-----------|------------------|--------|
| **Bug Fixes** | Claude | Analiză detaliată, debugging logic |
| **Validări & Constraints** | Claude | Pattern recognition, edge cases |
| **Features Noi** | Antigravity | Implementare rapidă, integrări |
| **Infrastructură** | Antigravity | Supabase, Stripe, env setup |
| **Optimizări Performance** | Claude | Profiling, refactoring |
| **UI/UX Fixes** | Claude | State management, React patterns |

---

## ✅ La Sfârșitul Sesiunii

### Checklist Obligatoriu

```bash
# 1. Verifică build-ul
npm run build

# 2. Testează manual în browser (dacă e posibil)
npm run dev
# Deschide http://localhost:3000 și verifică funcționalitatea

# 3. Verifică modificările
git diff

# 4. Commit cu mesaj clar
git add -A
git commit -m "Session with [Claude/Antigravity]: [ce s-a făcut]"

# Exemplu:
git commit -m "Session with Claude: Fix test completion logic + report blocking"

# 5. Push la GitHub
git push origin main

# 6. Actualizează session log (opțional dar recomandat)
# Editează SESSION_LOG.md
```

### Template pentru Commit Messages

```
Session with [Agent]: [Scurtă descriere]

Modificări:
- [Fișier 1]: [ce s-a schimbat]
- [Fișier 2]: [ce s-a schimbat]

Fixes: #[issue number] (dacă există)
```

**Exemple bune:**
```
Session with Claude: Fix test completion logic

Modificări:
- app/test/page.tsx: Added useEffect for completion detection
- app/chat/page.tsx: Changed blocking logic to trigger after Chapter V

Fixes: Test showing 98% at completion
```

```
Session with Antigravity: Implement RAG with OpenAI

Modificări:
- app/api/chat/route.ts: Added RAG context search
- lib/rag.ts: Created searchDocuments function
- .env.local: Added OPENAI_API_KEY

New feature: Semantic search for HEXACO documentation
```

---

## 🔄 Schimbarea Între Agents

### De la Claude la Antigravity

```bash
# 1. Verifică că ai commit-uit toate modificările
git status
# Ar trebui să vezi: "nothing to commit, working tree clean"

# 2. Dacă ai modificări necommit-uite:
git add -A
git commit -m "Session with Claude: [descriere]"
git push origin main

# 3. Informează Antigravity despre ultimele modificări:
```

**Template mesaj pentru Antigravity:**
```
Claude tocmai a modificat următoarele:
- [Fișier 1]: [scurtă descriere]
- [Fișier 2]: [scurtă descriere]

Te rog verifică compatibilitatea înainte să continui.
```

### De la Antigravity la Claude

```bash
# Aceiași pași ca mai sus

# Template mesaj pentru Claude:
```

**Template mesaj pentru Claude:**
```
Antigravity tocmai a implementat:
- [Feature 1]: [scurtă descriere]
- [Feature 2]: [scurtă descriere]

Verifică dacă există conflicte cu modificările anterioare.
```

---

## 🔧 Rezolvarea Conflictelor

### Când Apar Conflicte Git

#### Scenariul 1: Conflict la `git pull`

```bash
# 1. Git îți va arăta:
Auto-merging app/test/page.tsx
CONFLICT (content): Merge conflict in app/test/page.tsx

# 2. Deschide fișierul în VS Code
# Vei vedea marcaje de genul:

<<<<<<< HEAD
// Codul tău local (modificările lui Claude sau Antigravity)
const isCompleted = checkCompletion();
=======
// Codul de pe GitHub (de la celălalt agent)
const isCompleted = validateAllAnswers();
>>>>>>> origin/main

# 3. Alege versiunea corectă:
# - Păstrezi HEAD (versiunea locală)?
# - Păstrezi origin/main (versiunea de pe GitHub)?
# - Combine both (folosești ambele)?

# 4. După ce rezolvi manual:
git add app/test/page.tsx
git commit -m "Merge conflict resolution: [ce ai păstrat]"
git push origin main
```

#### Scenariul 2: Agent-ul A rescrie codul Agent-ului B

**Semne:**
- Feature-uri care nu mai merg
- Validări care dispar
- Erori în console

**Soluție:**

```bash
# 1. Identifică commit-ul bun
git log --oneline -10

# 2. Compară cu commit-ul curent
git diff [commit-hash-bun] HEAD

# 3. Opțiuni:
# A) Revert ultimul commit:
git revert HEAD
git push origin main

# B) Rollback la commit-ul bun:
git reset --hard [commit-hash-bun]
git push origin main --force  # ⚠️ ATENȚIE: Șterge istoricul

# C) Cherry-pick doar modificările bune:
git checkout [commit-hash-bun] -- app/test/page.tsx
git commit -m "Restore test logic from previous session"
git push origin main
```

---

## 💡 Best Practices

### 1. **Commit Frecvent**

✅ **Bine:**
```bash
# După fiecare 2-3 modificări mari:
git add app/test/page.tsx
git commit -m "Fix completion detection logic"

git add app/chat/page.tsx
git commit -m "Update blocking behavior after Chapter V"

git push origin main
```

❌ **Rău:**
```bash
# La sfârșitul unei sesiuni întregi de 2 ore:
git add -A
git commit -m "Fixed stuff"
git push origin main
```

### 2. **Branch-uri pentru Features Mari**

Pentru features complexe care durează >1 sesiune:

```bash
# Creează branch:
git checkout -b feature/rag-implementation
# [lucrezi cu Antigravity]
git push origin feature/rag-implementation

# Când e gata:
git checkout main
git merge feature/rag-implementation
git push origin main
```

### 3. **Session Log (FOARTE RECOMANDAT)**

Creează un fișier `SESSION_LOG.md` în root:

```markdown
# Session Log - Antreprenor Blueprint

## 2025-01-23 09:00 - Claude
**Status:** ✅ Deployed
**Modificări:**
- app/test/page.tsx: Fixed completion logic (useEffect monitoring)
- app/chat/page.tsx: Changed blocking to trigger after Chapter V
**Build:** ✅ Success
**Issues Fixed:** Test showing 98% at completion

## 2025-01-23 07:00 - Antigravity
**Status:** ✅ Deployed
**Modificări:**
- app/api/chat/route.ts: Implemented RAG with OpenAI
- lib/rag.ts: Created semantic search function
- supabase/vector_setup.sql: Added pgvector support
**Build:** ✅ Success
**New Features:** RAG integration for HEXACO documentation

## 2025-01-22 22:00 - Claude
...
```

### 4. **Verificare Build După Fiecare Sesiune**

```bash
# Rulează ÎNTOTDEAUNA înainte de commit:
npm run build

# Dacă failuiește:
# 1. Cere agent-ului să fixeze
# 2. NU face commit până nu trece build-ul
```

### 5. **Environment Variables Sync**

Când un agent adaugă variabile noi:

```bash
# 1. Verifică .env.local
cat .env.local

# 2. Verifică .env.example
cat .env.example

# 3. Dacă lipsește din .env.example:
echo "OPENAI_API_KEY=your-key-here" >> .env.example
git add .env.example
git commit -m "Add OPENAI_API_KEY to env example"
```

---

## 🆘 Troubleshooting

### Problema 1: Build Failuiește După Sesiune

**Simptome:**
```bash
npm run build
# ✗ TypeScript compilation failed
```

**Soluție:**
```bash
# 1. Verifică ultimul commit:
git log -1 --stat

# 2. Rollback temporar:
git stash

# 3. Build din nou:
npm run build
# Dacă merge → problema e în ultimele modificări

# 4. Readucă modificările și cere agent-ului să fixeze:
git stash pop

# 5. Informează agent-ul:
"Build-ul failuiește cu următoarea eroare: [copiază eroarea].
Te rog fixează înainte de commit."
```

### Problema 2: Features Nu Mai Merg

**Simptome:**
- Testul se blochează din nou
- Validările dispar
- API route returnează erori

**Soluție:**
```bash
# 1. Identifică când a apărut problema:
git log --oneline --all --graph

# 2. Testează commit cu commit:
git checkout [commit-hash]
npm run dev
# Testează manual în browser

# 3. Când găsești commit-ul stricat:
git checkout main
git revert [commit-hash-stricat]
git push origin main

# 4. Informează agent-ul care a făcut modificarea:
"Commit-ul [hash] a stricat [feature].
Te rog reverifică logica."
```

### Problema 3: Git Conflicts Complexe

**Când ai conflicte în >5 fișiere:**

```bash
# 1. Abort merge-ul:
git merge --abort

# 2. Creează backup:
git branch backup-$(date +%Y%m%d-%H%M%S)

# 3. Alege o strategie:

# Opțiunea A: Păstrează versiunea locală
git pull origin main --strategy-option ours

# Opțiunea B: Păstrează versiunea remote
git pull origin main --strategy-option theirs

# Opțiunea C: Merge manual (recomandat pentru >10 conflicte)
# Folosește VS Code merge editor
git pull origin main
# Rezolvă fiecare conflict în VS Code
git add .
git commit -m "Resolved merge conflicts between Claude and Antigravity sessions"
```

### Problema 4: Duplicate Logic

**Simptome:**
- Același lucru e implementat în 2 locuri
- Validări duplicate
- State management inconsistent

**Soluție:**
```bash
# 1. Identifică duplicatele:
git diff [commit-1] [commit-2]

# 2. Cere unui agent să facă cleanup:
"Am găsit logică duplicată în:
- [Fișier 1]: [linie X]
- [Fișier 2]: [linie Y]

Te rog unifică logica și elimină duplicatele."
```

---

## 📊 Quick Reference Commands

### Git Basics
```bash
# Status curent
git status

# Ultimele 5 commits
git log --oneline -5

# Diferențe față de ultimul commit
git diff HEAD

# Diferențe între 2 commits
git diff [commit-1] [commit-2]

# Revert ultimul commit (păstrează modificările)
git reset HEAD~1

# Revert ultimul commit (ȘTERGE modificările)
git reset --hard HEAD~1

# Undo merge
git merge --abort

# Creează branch
git checkout -b feature/[nume]

# Schimbă branch
git checkout [branch-name]

# Lista branch-uri
git branch -a
```

### Build & Test
```bash
# Build production
npm run build

# Dev server
npm run dev

# TypeScript check
npx tsc --noEmit

# Clear cache
rm -rf .next
npm run build
```

### Environment
```bash
# Verifică .env.local
cat .env.local

# Compară cu .env.example
diff .env.local .env.example

# Copiază .env.example → .env.local
cp .env.example .env.local
```

---

## 🎯 Workflow Recomandat (Rezumat)

### Înainte:
1. ✅ `git pull origin main`
2. ✅ `npm run build`
3. ✅ Informează agent-ul despre ultimele modificări

### În Timpul:
1. ✅ Comunică context
2. ✅ Specializează agents pe tipuri de tasks
3. ✅ Commit frecvent (la 2-3 modificări)

### După:
1. ✅ `npm run build`
2. ✅ `git add -A && git commit -m "..."`
3. ✅ `git push origin main`
4. ✅ Actualizează SESSION_LOG.md

### Schimbare Agent:
1. ✅ Verifică `git status`
2. ✅ Commit + push toate modificările
3. ✅ Informează noul agent despre context

---

## 📝 Template Files

### SESSION_LOG.md
Creează acest fișier în root pentru tracking:

```markdown
# Session Log - Antreprenor Blueprint

Format:
## [Data] [Ora] - [Agent Name]
**Status:** [✅ Deployed / ⚠️ In Progress / ❌ Failed]
**Modificări:**
- [file]: [change description]
**Build:** [✅ Success / ❌ Failed]
**Issues Fixed:** [description]
**Issues Found:** [description]

---

## 2025-01-23 09:00 - Claude
**Status:** ✅ Deployed
**Modificări:**
- app/test/page.tsx: Fixed completion logic
**Build:** ✅ Success
**Issues Fixed:** Test completion showing 98%
```

### .github/COMMIT_TEMPLATE.md (Opțional)
```markdown
Session with [Claude/Antigravity]: [Short description]

Modificări:
- [file1]: [change]
- [file2]: [change]

Fixes: [issue description]
Build: [✅/❌]
```

---

## 🔐 Emergency Procedures

### Dacă Tot Se Strică

```bash
# 1. BACKUP IMEDIAT
git branch emergency-backup-$(date +%Y%m%d-%H%M%S)

# 2. Găsește ultimul commit bun
git log --oneline -20
# Testează fiecare cu:
git checkout [commit-hash]
npm run build

# 3. Când găsești commit-ul bun:
git checkout main
git reset --hard [commit-hash-bun]
git push origin main --force

# 4. Informează ambii agents:
"Am făcut rollback la commit [hash] pentru că [motiv].
Te rog re-implementează [feature] ținând cont de [lesson learned]."
```

---

## ✨ Success Metrics

Știi că workflow-ul funcționează când:

- ✅ Build-ul trece după fiecare sesiune
- ✅ Nu ai conflicte git >1/săptămână
- ✅ Features nu se strică după ce schimbi agent-ul
- ✅ Poți identifica rapid cine a modificat ce
- ✅ Recovery time după probleme <10 minute

---

**Creat:** 2025-01-23
**Ultima actualizare:** 2025-01-23
**Versiune:** 1.0

Pentru întrebări sau probleme, consultă:
- [Git Documentation](https://git-scm.com/doc)
- [Next.js Build Errors](https://nextjs.org/docs/messages)
