# 🧪 Validare Formulare - STRICT MODE v3.0

## Rezumat Validări Stricte

### `/start` - Date Personale
- ✅ **Minim 2 litere consecutive** (nu "a", "1b")
- ✅ **Nu doar cifre** (nu "123")  
- ✅ **Nu doar semne** (nu "...", "!!!")
- ✅ **Email valid**
- ✅ **Vârstă 18-100**

### `/obiective` - Obiective
- ✅ **Minim 80 caractere** (~2 propoziții)
- ✅ **Minim 10 cuvinte** (cuvinte ≥ 2 litere)
- ✅ **Punctuație obligatorie** (., !, ?, ,, ;)
- ✅ **Nu doar cifre/semne**

---

## Test Quick

### ❌ RESPINGE:
- Prenume: "12" → Doar cifre
- Prenume: "a" → Sub 2 litere
- Prenume: "!!!" → Doar semne
- Obiectiv: "Vreau bani" → Sub 80 char
- Obiectiv: "123..." → Doar cifre/semne

### ✅ ACCEPTĂ:
- Prenume: "Ion"
- Email: "ion@test.com"
- Obiectiv: "Vreau să cresc veniturile de la 50K la 200K. Plan: diversificare produse."
