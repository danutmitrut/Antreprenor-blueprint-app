# 🛠️ Automation Scripts

Scripts pentru workflow-ul de colaborare între AI agents (Claude și Antigravity).

## 📋 Scripts Disponibile

### 1. `pre-session-check.sh`

**Când să-l folosești:** Înainte de a începe orice sesiune cu un AI agent.

**Ce face:**
- ✅ Verifică dacă ai uncommitted changes
- ✅ Verifică dacă trebuie să faci `git pull`
- ✅ Rulează `npm run build` pentru a verifica că codul compilează
- ✅ Arată ultimele 3 commits
- ✅ Verifică variabilele de environment
- ✅ Arată statusul din SESSION_LOG.md

**Cum să-l folosești:**
```bash
./scripts/pre-session-check.sh
```

**Output exemplu:**
```
🤖 AI Collaboration - Pre-Session Check
========================================

📋 Checking Git Status...
✅ Working tree is clean

🔄 Checking for remote updates...
✅ Local is up to date with remote

🔨 Running build check...
✅ Build successful

📝 Recent commits (last 3):
99dc2a7 feat: Add pre-session and post-session automation scripts
53c692b chore: Add git commit message template
890ad58 docs: Add AI collaboration workflow manual and session tracking

========================================
✅ All checks passed! Ready to work.

Next steps:
1. Inform the AI agent about recent changes
2. Start your session
3. Commit frequently
```

---

### 2. `post-session-commit.sh`

**Când să-l folosești:** După ce termini o sesiune cu un AI agent.

**Ce face:**
- ✅ Verifică final build
- ✅ Arată toate modificările
- ✅ Creează commit message standardizat
- ✅ Face commit + push la GitHub
- ✅ Actualizează SESSION_LOG.md automat

**Cum să-l folosești:**
```bash
./scripts/post-session-commit.sh
```

**Proces interactiv:**
```
🤖 AI Collaboration - Post-Session Commit
==========================================

🔨 Running final build check...
✅ Build successful

📋 Changes to be committed:
M  app/test/page.tsx
M  app/chat/page.tsx

Which AI agent did you work with?
1) Claude
2) Antigravity
Enter choice (1 or 2): 1

Short description of changes: Fix test completion logic

Commit message:
---
Session with Claude: Fix test completion logic

Modificări:
- app/test/page.tsx
- app/chat/page.tsx

Build: ✅ Success
---

Commit with this message? (y/n): y
✅ Changes committed!

Push to GitHub? (y/n): y
✅ Pushed to GitHub!

Update SESSION_LOG.md? (y/n): y
✅ SESSION_LOG.md updated!

🎉 Session complete!
```

---

## 🚀 Quick Start

### Setup (doar prima dată)

```bash
# Dă permisiuni de executare script-urilor
chmod +x scripts/*.sh

# Opțional: Adaugă alias în ~/.zshrc sau ~/.bashrc
echo "alias ai-start='./scripts/pre-session-check.sh'" >> ~/.zshrc
echo "alias ai-done='./scripts/post-session-commit.sh'" >> ~/.zshrc
source ~/.zshrc
```

Apoi poți folosi:
```bash
ai-start    # Înainte de sesiune
ai-done     # După sesiune
```

### Workflow Complet

```bash
# 1. Înainte de sesiune
./scripts/pre-session-check.sh

# 2. Lucrezi cu AI agent-ul (Claude sau Antigravity)
# ...

# 3. După sesiune
./scripts/post-session-commit.sh
```

---

## 🔧 Configurare Avansată

### Custom Checks

Poți edita `pre-session-check.sh` pentru a adăuga verificări custom:

```bash
# Exemplu: Verifică dacă Vercel CLI e instalat
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI installed"
else
    echo "⚠️  Vercel CLI not found"
fi
```

### Custom Commit Template

Editează `.github/COMMIT_TEMPLATE` pentru a schimba formatul commit messages.

---

## 📊 Integration cu VS Code

Adaugă în `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Pre-Session Check",
      "type": "shell",
      "command": "./scripts/pre-session-check.sh",
      "group": "build",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Post-Session Commit",
      "type": "shell",
      "command": "./scripts/post-session-commit.sh",
      "group": "build",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

Apoi apasă `Cmd+Shift+P` → "Tasks: Run Task" → selectează task-ul.

---

## 🆘 Troubleshooting

### Script nu rulează

```bash
# Verifică permisiunile
ls -la scripts/

# Dacă nu sunt executabile:
chmod +x scripts/*.sh
```

### Build failuiește în pre-session-check

Asta e **OK** - scriptul te avertizează să fixezi build-ul înainte să continui.

```bash
# Rulează manual pentru detalii:
npm run build
```

### Git conflicts la push

```bash
# Pull mai întâi:
git pull origin main

# Rezolvă conflictele manual, apoi:
git add .
git commit -m "Merge conflicts resolution"
git push origin main
```

---

## 📝 Notes

- Script-urile sunt **non-destructive** - nu modifică codul, doar verifică și commit-uiesc
- Poți opri oricând procesul cu `Ctrl+C`
- Toate mesajele sunt colorate pentru lizibilitate
- Session log-ul se actualizează automat cu template-ul corect

---

**Creat:** 2025-01-23
**Versiune:** 1.0
**Maintained by:** Workflow automation pentru colaborare AI
