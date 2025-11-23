# 🚀 Quick Start - AI Collaboration

Ghid rapid pentru lucrul cu Claude și Antigravity fără conflicte.

---

## ⚡ Workflow în 3 Pași

### 1️⃣ Înainte de Sesiune

```bash
./scripts/pre-session-check.sh
```

**SAU manual:**
```bash
git pull origin main
npm run build
git log --oneline -3
```

✅ **Totul OK?** → Continuă la pasul 2
❌ **Erori?** → Fixează-le înainte să continui

---

### 2️⃣ În Timpul Sesiunii

**Informează AI agent-ul:**

```
"[Celălalt agent] tocmai a modificat [fișier/feature].
Verifică compatibilitatea înainte să continui."
```

**Specializează task-urile:**
- **Claude:** Bug fixes, validări, optimizări
- **Antigravity:** Features noi, integrări, infrastructură

**Commit frecvent:**
```bash
git add -A
git commit -m "Session with [Agent]: [ce s-a făcut]"
git push origin main
```

---

### 3️⃣ După Sesiune

```bash
./scripts/post-session-commit.sh
```

**SAU manual:**
```bash
npm run build                    # Verifică build
git add -A
git commit -m "Session with [Agent]: [descriere]"
git push origin main
# Actualizează SESSION_LOG.md
```

---

## 📋 Checklist Rapid

### Înainte de a începe:
- [ ] `git pull origin main`
- [ ] `npm run build` → ✅ Success
- [ ] Citit ultimele 3 commits
- [ ] Informat agent-ul despre modificări recente

### În timpul lucrului:
- [ ] Comunică context agent-ului
- [ ] Commit la fiecare 2-3 modificări mari
- [ ] Nu face modificări în același fișier ca celălalt agent

### După ce termini:
- [ ] `npm run build` → ✅ Success
- [ ] Commit cu mesaj clar
- [ ] Push la GitHub
- [ ] Actualizat SESSION_LOG.md

---

## 🆘 Probleme Comune

### Build failuiește
```bash
npm run build
# Citește eroarea, cere agent-ului să fixeze
```

### Git conflicts
```bash
git status
# Rezolvă manual conflictele în VS Code
git add .
git commit -m "Merge conflict resolution"
git push origin main
```

### Features se strică după schimbarea agent-ului
```bash
git log --oneline -10
git checkout [commit-hash-bun]
# Testează
git checkout main
git revert [commit-hash-stricat]
```

---

## 🛠️ Scripts Utile

```bash
# Pre-session check
./scripts/pre-session-check.sh

# Post-session commit
./scripts/post-session-commit.sh

# Manual build check
npm run build

# Git status
git status

# Recent commits
git log --oneline -5

# Rollback to previous commit
git reset --hard HEAD~1
```

---

## 📚 Documentație Completă

- **[AI_COLLABORATION_WORKFLOW.md](./AI_COLLABORATION_WORKFLOW.md)** - Manual complet
- **[scripts/README.md](./scripts/README.md)** - Documentație scripts
- **[SESSION_LOG.md](./SESSION_LOG.md)** - Istoric sesiuni

---

## 💡 Pro Tips

1. **Commit frecvent** - la fiecare 2-3 modificări
2. **Build înainte de commit** - verifică că totul compilează
3. **Comunică context** - spune agent-ului ce s-a modificat recent
4. **Specializează agents** - Claude pentru fixes, Antigravity pentru features
5. **Folosește scripts** - automatizează verificările

---

**🎯 Obiectiv:** Zero conflicte, build-uri success, deployment rapid!

**Ultima actualizare:** 2025-01-23
