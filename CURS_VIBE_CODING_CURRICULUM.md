# 🎓 Curriculum Curs Vibe Coding
**Plan detaliat pentru fiecare sesiune - 8 săptămâni**

---

## 📋 Structura Generală

**Durată:** 8 săptămâni (16 sesiuni de 2h)
**Format:** 2 sesiuni/săptămână
**Target:** Începători fără experiență în programare
**Rezultat final:** Portfolio cu 3-5 proiecte live + capstone project

---

## 🎯 Obiective Curs

La finalul cursului, studenții vor putea:
- ✅ Comunica eficient cu Claude Code pentru orice proiect
- ✅ Construi aplicații web complete (frontend + backend + database)
- ✅ Deploy proiecte live pe internet (Vercel, Netlify)
- ✅ Folosi Git pentru backup și colaborare
- ✅ Integra API-uri externe (Stripe, OpenAI, etc.)
- ✅ Debug probleme și rezolva erori independent
- ✅ Avea un portfolio live pe GitHub cu proiecte reale

---

# SĂPTĂMÂNA 1: INTRODUCERE ÎN VIBE CODING

## 📅 Sesiunea 1.1: Ce este Vibe Coding? (2h)

### **Obiective:**
- Înțelegerea conceptului de Vibe Coding
- Primul proiect funcțional (Calculator web)
- Setup mediu de lucru (VSCode, Git, Claude Code)

### **Agenda:**

#### **Partea 1: Teorie (30 min)**
- Ce este AI-assisted programming?
- Diferența: programare tradițională vs vibe coding
- Când folosești Claude Code vs când înveți manual
- Demo live: "De la idee la aplicație în 15 minute"

#### **Partea 2: Setup (30 min)**
```
Tools necesare:
1. VSCode (editor de cod)
2. Git (backup + versioning)
3. Claude Code (AI assistant)
4. GitHub account (portfolio)
5. Node.js (pentru a rula aplicații)
```

**Live demo:** Instalarea tuturor tool-urilor

#### **Partea 3: Primul Proiect - Calculator Web (1h)**

**Live Coding Session:**
```
Student type: "Bună Claude! Sunt [nume], student la cursul de Vibe Coding.
Vreau să creez un calculator web simplu cu operații de bază (+, -, *, /).
N-am experiență în programare. Ajută-mă pas cu pas."
```

**Claude va crea:**
```
📁 calculator/
├── index.html       # Interfața (butoane, display)
├── style.css        # Design (culori, layout)
├── script.js        # Logică (calculele)
└── README.md        # Documentație
```

**Toată clasa construiește în paralel, tu ghidezi:**
- Cum să comunici cu Claude (specific, nu vag)
- Cum să testezi fiecare schimbare
- Cum să ceri modificări ("Vreau butoanele mai mari")

### **Livrabil:**
- ✅ Calculator funcțional deschis în browser (localhost)
- ✅ Studenții înțeleg structura HTML + CSS + JS (conceptual)
- ✅ Primul "conversation flow" cu Claude

### **Temă pentru acasă:**
```
"Personalizează calculatorul:
1. Schimbă culorile (roșu → albastru)
2. Adaugă un buton de Clear
3. Schimbă fontul
Documentează în README.md ce ai schimbat."
```

---

## 📅 Sesiunea 1.2: Git, GitHub și Deploy (2h)

### **Obiective:**
- Înțelegerea Git (backup, versioning)
- Primul deployment pe internet (Netlify/Vercel)
- Conceptul de portfolio pe GitHub

### **Agenda:**

#### **Partea 1: Git pentru Începători (45 min)**

**Concepte esențiale:**
```
Git = Sistem de backup automat pentru cod
GitHub = Google Drive pentru programatori
Commit = Salvare versiune ("checkpoint")
Push = Upload pe GitHub (backup cloud)
```

**Demo live:**
```bash
# În folderul calculator/
git init                              # "Activează Git aici"
git add .                             # "Pregătește toate fișierele"
git commit -m "Primul meu calculator" # "Salvează versiunea"

# Creează repo pe GitHub (GUI)
git remote add origin [URL]           # "Conectează la GitHub"
git push -u origin main               # "Urcă codul"
```

**Exercițiu:** Toată clasa face primul commit + push

#### **Partea 2: Deployment - Calculator Live pe Internet (45 min)**

**Demo: Deploy pe Netlify (cel mai simplu):**
```
1. Drag & drop folderul calculator/ pe netlify.com/drop
2. Instant live URL: https://my-calculator-abc123.netlify.app
3. Share URL cu clasa
```

**Exercițiu:** Fiecare student își face deploy + share link în chat

#### **Partea 3: Portfolio Setup (30 min)**

**Creați împreună un README.md de portfolio:**
```markdown
# [Nume Student] - Portfolio Vibe Coding

## Proiecte

### 1. Calculator Web
🔗 [Live Demo](https://my-calculator.netlify.app)
📂 [Code](https://github.com/username/calculator)

**Tech:** HTML, CSS, JavaScript
**Features:**
- Operații matematice de bază
- Design responsive
- Clear function

**Ce am învățat:**
- Cum să comunic cu Claude Code
- Structura unui proiect web (HTML/CSS/JS)
- Git și deployment
```

### **Livrabil:**
- ✅ Calculator live pe internet cu URL public
- ✅ Cod pe GitHub
- ✅ Portfolio README.md început

### **Temă pentru acasă:**
```
"Review UNIVERSAL_WORKFLOW.md secțiunile 1-5.
Pregătește-te pentru proiectul 2: Todo List.
Think: Ce features vrei în Todo List-ul tău?"
```

---

# SĂPTĂMÂNA 2: FUNDAMENTALS - INTERACTIVITATE ȘI STATE

## 📅 Sesiunea 2.1: Todo List App (2h)

### **Obiective:**
- Conceptul de "state" (date care se schimbă)
- CRUD operations (Create, Read, Update, Delete)
- Local storage (salvare date în browser)

### **Agenda:**

#### **Partea 1: Planning Session (20 min)**

**Brainstorming împreună:**
```
Ce features are un Todo List?
✅ Add new task
✅ Mark as complete
✅ Delete task
✅ Edit task (optional)
✅ Filter (all/active/completed)
```

**Prioritizare:**
```
MVP (Minimum Viable Product) - Săptămâna 2:
1. Add task
2. Mark complete
3. Delete task

V2 (Polish) - Temă acasă:
4. Edit task
5. Filters
6. Local storage (salvează când închizi browser)
```

#### **Partea 2: Live Coding - MVP (1h 20min)**

**Prompt pentru Claude:**
```
"Claude, vreau să creez un Todo List app.
Features MVP:
1. Input pentru task nou + buton Add
2. Lista de tasks afișată
3. Checkbox pentru mark as complete
4. Buton Delete pentru fiecare task

Interfață simplă, design modern (Tailwind CSS dacă poți).
Hai pas cu pas."
```

**Claude creează structura:**
```
📁 todo-list/
├── index.html
├── style.css
├── app.js
└── README.md
```

**Tu explici conceptele pe măsură ce apar în cod:**

**Concept 1: State (Data Management)**
```javascript
// State = datele aplicației (ce tasks există?)
let tasks = [
  { id: 1, text: "Învață Vibe Coding", completed: false },
  { id: 2, text: "Build Todo App", completed: false }
];
```
*"State = fotografie a datelor în acest moment. Când adaugi task, state-ul se schimbă."*

**Concept 2: Functions (Acțiuni)**
```javascript
function addTask(text) {
  // Creează task nou
}

function deleteTask(id) {
  // Șterge task
}

function toggleTask(id) {
  // Marchează complete/incomplete
}
```
*"Functions = acțiuni pe care le poate face aplicația. Ca butoane pe o telecomandă."*

**Concept 3: DOM Manipulation (Update UI)**
```javascript
function renderTasks() {
  // Afișează tasks-urile pe ecran
}
```
*"DOM = pagina web. Când state-ul se schimbă, trebuie să actualizăm ce vede user-ul."*

#### **Partea 3: Testing împreună (20 min)**

**Checklist de testare:**
```
✅ Add task → apare în listă?
✅ Mark complete → se barează?
✅ Delete task → dispare?
✅ Add task gol → eroare sau se blochează?
✅ Add 10 tasks → se scrollează frumos?
```

### **Livrabil:**
- ✅ Todo List funcțional (MVP)
- ✅ Înțelegerea state, functions, DOM
- ✅ Testing mindset

### **Temă pentru acasă:**
```
"Extinde Todo List:
1. Adaugă Local Storage (tasks rămân după refresh)
2. Adaugă Edit functionality
3. Adaugă filters (All/Active/Completed)
4. Deploy pe Netlify
5. Actualizează Portfolio README

🤔 Challenge (optional): Adaugă due dates pentru tasks."
```

---

## 📅 Sesiunea 2.2: Debugging & Best Practices (2h)

### **Obiective:**
- Rezolvarea erorilor comune
- Browser DevTools (Console, Network, Elements)
- Best practices: clean code, naming, documentation

### **Agenda:**

#### **Partea 1: Common Errors Workshop (45 min)**

**Scenario-based learning:**

**Eroare 1: "Uncaught ReferenceError: addTask is not defined"**
```javascript
❌ Problem:
<button onclick="addTask()">Add</button>
// Dar funcția e scrisă greșit: function addTasks() {...}

✅ Solution:
Verifică că numele funcției e exact la fel.
```

**Eroare 2: "Cannot read property 'value' of null"**
```javascript
❌ Problem:
const input = document.getElementById('taskInput');
const text = input.value; // input e null

✅ Solution:
Verifică că ID-ul din HTML e corect: id="taskInput"
```

**Eroare 3: "Tasks nu se salvează după refresh"**
```javascript
❌ Problem:
Uiți să salvezi în localStorage

✅ Solution:
function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Call după fiecare modificare
```

**Live Debugging Session:**
- Tu introduci intențional un bug în cod
- Studenții îl identifică folosind Console
- Rezolvați împreună

#### **Partea 2: Browser DevTools Crash Course (30 min)**

**Console Tab:**
```javascript
console.log('Tasks:', tasks);  // Vezi datele
console.error('Bug aici!');    // Marchează erori
```

**Elements Tab:**
```
- Inspectează HTML live
- Modifică CSS pe loc (testează culori)
- Vezi structura paginii
```

**Network Tab:**
```
- Vezi requests (useful pentru API-uri mai târziu)
- Debug why API call fails
```

**Exercițiu:**
```
"Deschide DevTools (F12), modifică culoarea unui buton
direct din Elements tab. Nu schimba codul, doar testează."
```

#### **Partea 3: Clean Code Principles (45 min)**

**Principii esențiale:**

**1. Naming (Nume descriptive)**
```javascript
❌ const x = document.getElementById('input');
✅ const taskInput = document.getElementById('taskInput');

❌ function doStuff() {...}
✅ function addTaskToList() {...}
```

**2. Comments (Comentarii utile)**
```javascript
❌ // This is a function
function addTask() {...}

✅ // Adds new task to list and saves to localStorage
function addTask(text) {...}
```

**3. Consistent Formatting**
```javascript
❌ Messy:
function addTask(){let task={id:Date.now(),text:text}
tasks.push(task)}

✅ Clean:
function addTask(text) {
  const task = {
    id: Date.now(),
    text: text
  };
  tasks.push(task);
}
```

**4. README Documentation**
```markdown
✅ Good README:
# Todo List App

## Features
- Add tasks
- Mark as complete
- Delete tasks
- Persistent storage (localStorage)

## How to Run
1. Open index.html in browser
2. Start adding tasks!

## Tech Stack
- HTML, CSS, JavaScript
- No frameworks (vanilla JS)
```

### **Livrabil:**
- ✅ Studenții știu să folosească DevTools
- ✅ Pot debug erori simple independent
- ✅ Înțeleg clean code principles

### **Temă pentru acasă:**
```
"Refactorizează codul Todo List:
1. Adaugă comentarii la funcții importante
2. Rename variabile cu nume mai clare
3. Actualizează README.md cu screenshots
4. Pregătește 3 întrebări pentru Q&A next session"
```

---

# SĂPTĂMÂNA 3: API INTEGRATION & EXTERNAL DATA

## 📅 Sesiunea 3.1: Weather App cu API Integration (2h)

### **Obiective:**
- Conceptul de API (Application Programming Interface)
- HTTP requests (fetch data din internet)
- Environment variables (.env pentru API keys)
- Async/await (cod care așteaptă răspuns)

### **Agenda:**

#### **Partea 1: Ce este un API? (20 min)**

**Explicație vizuală:**
```
API = Restaurant Menu

Tu (Frontend):     "Vreau vreme pentru București"
                      ↓
API (Waiter):      Duce comanda la bucătărie
                      ↓
Server (Backend):  Pregătește datele (temperatură, umiditate, etc.)
                      ↓
API (Waiter):      Aduce înapoi datele
                      ↓
Tu (Frontend):     Afișezi vremea user-ului
```

**API-uri gratuite pentru învățare:**
- OpenWeather API (vreme)
- Random User API (user profiles fake)
- Dog API (random dog pictures)
- Quote API (citate motivaționale)

#### **Partea 2: Setup OpenWeather API (15 min)**

**Live demo:**
```
1. Du-te pe openweathermap.org
2. Sign up (gratis)
3. Du-te la API Keys
4. Copy API key

API Key = parolă care dă acces la date
⚠️ NICIODATĂ în cod public! (Use .env)
```

**Creează .env file:**
```bash
WEATHER_API_KEY=abc123xyz789
```

**Adaugă în .gitignore:**
```
.env
```

#### **Partea 3: Build Weather App (1h 10min)**

**Prompt pentru Claude:**
```
"Vreau să creez un Weather App care:
1. User introduce nume oraș
2. Click pe Search
3. Aplicația afișează:
   - Temperatură
   - Descriere (sunny, cloudy, etc.)
   - Umiditate
   - Iconiță pentru vreme

Folosește OpenWeather API.
API key-ul e în .env file.
Design modern, responsive."
```

**Structure:**
```
📁 weather-app/
├── index.html
├── style.css
├── app.js
├── .env              # API key (NU se urcă pe Git!)
├── .env.example      # Template (se urcă pe Git)
└── README.md
```

**Concepte noi explicate live:**

**1. Async/Await (Așteptare răspuns)**
```javascript
// ❌ Cod normal = instant
const x = 5 + 5; // instant result

// ✅ API call = trebuie să aștepți
async function getWeather(city) {
  const response = await fetch(apiUrl); // așteaptă răspuns
  const data = await response.json();   // convertește în JSON
  return data;
}
```

**2. Fetch API (Request la server)**
```javascript
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const response = await fetch(apiUrl);

// response = răspuns de la server
// Poate fi: success (200), not found (404), error (500)
```

**3. Error Handling**
```javascript
try {
  const data = await getWeather(city);
  displayWeather(data);
} catch (error) {
  console.error('Eroare:', error);
  alert('Orașul nu a fost găsit!');
}
```

#### **Partea 4: Testing & Edge Cases (15 min)**

**Checklist:**
```
✅ Oraș valid → afișează vremea?
✅ Oraș invalid → mesaj de eroare?
✅ Internet offline → handling?
✅ API key invalid → ce se întâmplă?
✅ Loading state → spinner în timp ce așteaptă?
```

### **Livrabil:**
- ✅ Weather App funcțional cu date live
- ✅ Înțelegerea API, async/await, error handling
- ✅ .env setup corect

### **Temă pentru acasă:**
```
"Extinde Weather App:
1. Adaugă forecast 5 zile (nu doar azi)
2. Adaugă iconiță animată pentru vreme
3. Salvează ultimul oraș căutat (localStorage)
4. Deploy pe Netlify (cu env var în dashboard)
5. Actualizează Portfolio

🤔 Challenge: Adaugă geolocation (detectează orașul automat)."
```

---

## 📅 Sesiunea 3.2: Random Quote Generator + API Exploration (2h)

### **Obiective:**
- Explorarea altor API-uri (diversitate)
- Refresh pe API concepts
- Creativitate în design

### **Agenda:**

#### **Partea 1: API Exploration (30 min)**

**Explorați împreună Public APIs:**
- https://github.com/public-apis/public-apis

**Categorii interesante:**
- Animals (Dog API, Cat API)
- Quotes (Quotable, ZenQuotes)
- Games (Pokémon API, Trivia API)
- Finance (Crypto prices, Stock market)

**Exercițiu:**
```
"Alege un API din listă și citește documentația.
Identifică:
1. Endpoint-ul (URL-ul de request)
2. Ce date returnează (response format)
3. Trebuie API key sau nu?"
```

#### **Partea 2: Build Random Quote Generator (1h)**

**Prompt pentru Claude:**
```
"Vreau un Random Quote Generator:
- Un buton 'Get Quote'
- Afișează un citat random
- Autor citatelor
- Animație subtilă când apare quote-ul nou
- Design minimalist

Folosește Quotable API: https://api.quotable.io/random"
```

**Features suplimentare (student choice):**
```
Opțional:
- Tweet button (share pe Twitter)
- Copy to clipboard
- Favorite quotes (salvează în localStorage)
- Filter by category (inspirational, funny, etc.)
```

#### **Partea 3: Showcase & Feedback (30 min)**

**Mini-prezentări:**
- Fiecare student își arată Quote Generator-ul (5 min)
- Ce features au adăugat?
- Ce dificultăți au întâmpinat?
- Feedback de la colegi

### **Livrabil:**
- ✅ Quote Generator funcțional
- ✅ Deployed pe Netlify
- ✅ Portfolio cu 3 proiecte

### **Temă pentru acasă:**
```
"Free Project: Alege un API din Public APIs list și
construiește ceva creativ. Poate fi:
- Dog Picture Gallery
- Pokémon Search
- Trivia Quiz Game
- Crypto Price Tracker

Folosește UNIVERSAL_WORKFLOW.md pentru ghidare.
Prezentare next session (5 min)."
```

---

# SĂPTĂMÂNA 4: INTERMEDIATE - FRAMEWORKS & MODERN TOOLS

## 📅 Sesiunea 4.1: Introducere în React (2h)

### **Obiective:**
- De ce frameworks? (React, Vue, Svelte)
- Setup React project cu Vite
- Components & Props
- Rebuild Todo List în React

### **Agenda:**

#### **Partea 1: De ce React? (20 min)**

**Vanilla JS vs React:**
```javascript
// ❌ Vanilla JS = mult cod repetitiv
function renderTasks() {
  const container = document.getElementById('tasks');
  container.innerHTML = '';
  tasks.forEach(task => {
    const div = document.createElement('div');
    div.textContent = task.text;
    container.appendChild(div);
  });
}

// ✅ React = mai simplu
function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.text}</div>
      ))}
    </div>
  );
}
```

**Beneficii React:**
- Componente reutilizabile (ca Lego blocks)
- State management mai simplu
- Ecosystem imens (librării, tools)
- Industry standard (job-uri)

#### **Partea 2: Setup React Project (20 min)**

**Live demo:**
```bash
npm create vite@latest todo-react -- --template react
cd todo-react
npm install
npm run dev
```

**Structură proiect React:**
```
📁 todo-react/
├── src/
│   ├── App.jsx          # Componenta principală
│   ├── components/      # Componente reutilizabile
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   └── AddTask.jsx
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js
```

#### **Partea 3: React Basics (1h)**

**Concept 1: Components**
```jsx
// Component = funcție care returnează HTML (JSX)
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}
```

**Concept 2: State (useState hook)**
```jsx
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  function addTask(text) {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  }

  return (
    <div>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}
```

**Concept 3: Props (date între componente)**
```jsx
// Parent Component
<TaskItem
  task={task}              // Trimite data
  onToggle={toggleTask}    // Trimite function
/>

// Child Component
function TaskItem({ task, onToggle }) {
  // Primește props
}
```

#### **Partea 4: Build Todo in React (împreună) (20 min)**

**Prompt pentru Claude:**
```
"Vreau să recreez Todo List-ul în React (Vite).
Componente:
- App.jsx (state principal)
- AddTask.jsx (input + buton)
- TaskList.jsx (listă)
- TaskItem.jsx (un singur task)

Features: add, toggle, delete
Design modern cu Tailwind CSS."
```

### **Livrabil:**
- ✅ Todo List în React funcțional
- ✅ Înțelegerea components, state, props

### **Temă pentru acasă:**
```
"Extinde React Todo:
1. Adaugă Edit functionality
2. Adaugă Filters (All/Active/Completed)
3. LocalStorage persistence
4. Deploy pe Vercel (suportă React out-of-the-box)
5. Compară cu vanilla JS version: ce e mai ușor?"
```

---

## 📅 Sesiunea 4.2: Pomodoro Timer (React Project) (2h)

### **Obiective:**
- Consolidare React concepts
- useEffect hook (side effects)
- Timer logic (setInterval/setTimeout)
- Audio/notifications

### **Agenda:**

#### **Partea 1: Planning Pomodoro App (15 min)**

**Ce este Pomodoro Technique?**
```
25 min work → 5 min break → Repeat 4x → 15 min long break
```

**Features:**
```
MVP:
1. Timer (countdown de la 25:00)
2. Start/Pause/Reset buttons
3. Automatic switch work ↔ break
4. Display current mode (Work/Break)

V2 (optional):
5. Sound notification when timer ends
6. Custom durations (user sets minutes)
7. Statistics (cât ai lucrat azi?)
8. Browser notifications
```

#### **Partea 2: Build Pomodoro Timer (1h 30min)**

**Prompt pentru Claude:**
```
"Vreau un Pomodoro Timer în React:
- Countdown de la 25:00 la 0:00
- Buttons: Start, Pause, Reset
- După 25 min work → auto switch la 5 min break
- Sunet când se termină timer-ul
- Design minimalist, focus pe timer

Use React hooks (useState, useEffect)."
```

**New Concept: useEffect**
```jsx
import { useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(1500); // 25 min
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup
  }, [isActive, seconds]);

  return <div>{Math.floor(seconds / 60)}:{seconds % 60}</div>;
}
```

**Explicație:**
```
useEffect = "Fă ceva când se întâmplă X"
- Când component-ul apare pe ecran
- Când o variabilă se schimbă (seconds, isActive)
- Cleanup când component-ul dispare
```

#### **Partea 3: Testing & Polish (15 min)**

**Test scenarios:**
```
✅ Timer countdown-ul funcționează?
✅ Pause/Resume funcționează?
✅ Reset resetează la 25:00?
✅ Auto-switch work → break?
✅ Sound play-ul funcționează?
✅ Multiple tabs open → timer se sincronizează?
```

### **Livrabil:**
- ✅ Pomodoro Timer funcțional
- ✅ useEffect understanding
- ✅ Deployed pe Vercel

### **Temă pentru acasă:**
```
"Extinde Pomodoro:
1. Adaugă statistics (total time worked today)
2. Adaugă custom durations (user input)
3. Adaugă browser notifications (Notification API)
4. Salvează preferences în localStorage

Pregătește portfolio pentru Mid-Course Review next week."
```

---

# SĂPTĂMÂNA 5: BACKEND & DATABASES

## 📅 Sesiunea 5.1: Introducere în Backend (Node.js + Express) (2h)

### **Obiective:**
- Frontend vs Backend (diferența)
- Setup Node.js server cu Express
- API endpoints (GET, POST, PUT, DELETE)
- Testare cu Postman/Thunder Client

### **Agenda:**

#### **Partea 1: Ce este Backend? (20 min)**

**Analogie:**
```
Frontend = Restaurant (ce vede clientul)
- Meniu (UI)
- Mese, scaune (Design)
- Chelner (interactions)

Backend = Bucătăria (ce nu vede clientul)
- Chef (logică business)
- Frigider (database)
- Rețete (algorithms)
```

**De ce ai nevoie de backend?**
```
✅ Database (salvează date permanent, nu doar localStorage)
✅ Authentication (login, register securizat)
✅ Business logic (calculații complexe, procesare)
✅ API-uri private (API keys hidden)
✅ File uploads (imagini, documente)
```

#### **Partea 2: Setup Node.js + Express (30 min)**

**Live demo:**
```bash
mkdir expense-tracker-api
cd expense-tracker-api
npm init -y
npm install express cors dotenv
```

**Primul server:**
```javascript
// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Rulează:**
```bash
node server.js
# Visit: http://localhost:3000
```

#### **Partea 3: Build Expense Tracker API (1h)**

**Endpoints necesare:**
```
GET    /api/expenses          # Get all expenses
POST   /api/expenses          # Create new expense
PUT    /api/expenses/:id      # Update expense
DELETE /api/expenses/:id      # Delete expense
```

**Live coding:**
```javascript
// In-memory storage (pentru demo, mai târziu database)
let expenses = [];

// GET all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// POST new expense
app.post('/api/expenses', (req, res) => {
  const { amount, category, description } = req.body;
  const expense = {
    id: Date.now(),
    amount,
    category,
    description,
    date: new Date()
  };
  expenses.push(expense);
  res.status(201).json(expense);
});

// DELETE expense
app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(e => e.id !== parseInt(id));
  res.json({ message: 'Deleted' });
});
```

#### **Partea 4: Testing cu Postman/Thunder Client (10 min)**

**Demo:**
```
1. Install Thunder Client (VSCode extension)
2. Test GET http://localhost:3000/api/expenses
3. Test POST cu body:
   {
     "amount": 50,
     "category": "Food",
     "description": "Pizza"
   }
4. Test DELETE http://localhost:3000/api/expenses/123456
```

### **Livrabil:**
- ✅ Backend API funcțional
- ✅ Înțelegerea REST API (GET, POST, DELETE)
- ✅ Testare cu Thunder Client

### **Temă pentru acasă:**
```
"1. Adaugă PUT endpoint (update expense)
2. Adaugă GET /api/expenses/stats (total spent, by category)
3. Adaugă error handling (ce se întâmplă la ID invalid?)
4. Citește despre databases pentru next session."
```

---

## 📅 Sesiunea 5.2: Database Integration (Supabase) (2h)

### **Obiective:**
- Ce este un database?
- SQL basics (SELECT, INSERT, UPDATE, DELETE)
- Supabase setup (Postgres database gratuit)
- Connect backend la database

### **Agenda:**

#### **Partea 1: Database Fundamentals (20 min)**

**Ce este un database?**
```
Database = Excel on steroids
- Tabele (sheets)
- Rânduri (rows = entries)
- Coloane (columns = fields)

SQL = Limbajul pentru a vorbi cu database-ul
```

**Exemple SQL:**
```sql
-- Create table
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  amount DECIMAL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert
INSERT INTO expenses (amount, category, description)
VALUES (50, 'Food', 'Pizza');

-- Select all
SELECT * FROM expenses;

-- Delete
DELETE FROM expenses WHERE id = 1;
```

#### **Partea 2: Supabase Setup (30 min)**

**Live demo:**
```
1. Du-te pe supabase.com
2. Sign up (gratis)
3. Create new project
4. Wait 2 min (creează database)
5. Copy connection details
```

**Creează tabel în Supabase:**
```sql
CREATE TABLE expenses (
  id BIGSERIAL PRIMARY KEY,
  amount DECIMAL NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **Partea 3: Connect Backend to Database (1h)**

**Install Supabase client:**
```bash
npm install @supabase/supabase-js
```

**Update server.js:**
```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// GET all expenses (now from database!)
app.get('/api/expenses', async (req, res) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST new expense
app.post('/api/expenses', async (req, res) => {
  const { amount, category, description } = req.body;

  const { data, error } = await supabase
    .from('expenses')
    .insert([{ amount, category, description }])
    .select();

  if (error) return res.status(400).json({ error });
  res.status(201).json(data[0]);
});

// DELETE expense
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error });
  res.json({ message: 'Deleted' });
});
```

#### **Partea 4: Build Frontend (React) for Expense Tracker (10 min)**

**Quick setup cu Claude:**
```
"Vreau un frontend React pentru Expense Tracker API:
- Form: amount, category, description + Add button
- List: toate expenses cu buton Delete
- Total spent displayed
- Connect la http://localhost:3000/api/expenses"
```

### **Livrabil:**
- ✅ Full-stack Expense Tracker (Frontend + Backend + Database)
- ✅ Data persists în Supabase
- ✅ CRUD operations complete

### **Temă pentru acasă:**
```
"1. Adaugă categories filter în frontend
2. Adaugă Edit functionality (frontend + backend)
3. Adaugă charts (total per category) cu Chart.js
4. Deploy backend pe Railway.app
5. Deploy frontend pe Vercel
6. Test full-stack app live"
```

---

# SĂPTĂMÂNA 6: AUTHENTICATION & SECURITY

## 📅 Sesiunea 6.1: User Authentication (Supabase Auth) (2h)

### **Obiective:**
- Conceptul de authentication (cine ești?)
- Authorization (ce poți face?)
- Supabase Auth setup (email/password)
- Protected routes (doar useri logați)

### **Agenda:**

#### **Partea 1: Auth Fundamentals (20 min)**

**Concepte:**
```
Authentication = "Cine ești?"
- Login (verify identity)
- Register (create account)
- Session (stay logged in)

Authorization = "Ce poți face?"
- User normal vs Admin
- Public data vs Private data
```

**Flow-ul tipic:**
```
1. User Register → Database creează account
2. User Login → Server verifică parolă
3. Server returnează Token (JWT)
4. Frontend salvează Token
5. Fiecare request → trimite Token
6. Server verifică Token → allow/deny
```

#### **Partea 2: Supabase Auth Setup (30 min)**

**Enable Auth în Supabase:**
```
1. Supabase Dashboard → Authentication → Settings
2. Enable Email provider
3. Configure redirect URLs
```

**Frontend - Register:**
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(URL, KEY);

async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) console.error(error);
  else console.log('User created:', data.user);
}
```

**Frontend - Login:**
```javascript
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) console.error(error);
  else console.log('Logged in:', data.session);
}
```

**Frontend - Get Current User:**
```javascript
const { data: { user } } = await supabase.auth.getUser();
if (user) console.log('Logged in as:', user.email);
else console.log('Not logged in');
```

#### **Partea 3: Build Auth System (1h)**

**Prompt pentru Claude:**
```
"Vreau să adaug authentication la Expense Tracker:
- Register page (email, password, confirm password)
- Login page (email, password)
- Logout button
- Protected routes (redirect to login if not authenticated)
- User-specific expenses (fiecare user vede doar expense-urile lui)

Use Supabase Auth + React Router."
```

**New concepts:**
```jsx
// Protected Route Component
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

#### **Partea 4: User-Specific Data (10 min)**

**Update backend pentru user-specific data:**
```javascript
// Supabase Row Level Security (RLS)
// SQL în Supabase:
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own expenses"
ON expenses
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own expenses"
ON expenses
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### **Livrabil:**
- ✅ Full auth system (register, login, logout)
- ✅ Protected routes
- ✅ User-specific data

### **Temă pentru acasă:**
```
"1. Adaugă 'Forgot Password' functionality
2. Adaugă Email verification (Supabase config)
3. Adaugă User Profile page (edit email, change password)
4. Test cu 2 accounts diferite (data separation?)
5. Deploy cu auth functional"
```

---

## 📅 Sesiunea 6.2: Security Best Practices (2h)

### **Obiective:**
- Environment variables (.env securizat)
- HTTPS vs HTTP (encryption)
- CORS (Cross-Origin Resource Sharing)
- Input validation & sanitization
- Common vulnerabilities (XSS, SQL injection)

### **Agenda:**

#### **Partea 1: Environment Variables (20 min)**

**De ce .env?**
```
❌ API keys în cod:
const apiKey = "sk_live_abc123";  // ORICINE vede pe GitHub!

✅ API keys în .env:
// .env
API_KEY=sk_live_abc123

// code
const apiKey = process.env.API_KEY;

// .gitignore
.env
```

**Best practices:**
```
1. Niciodată commit .env
2. Creează .env.example (template fără valori reale)
3. Documentează fiecare variabilă
4. Diferite keys pentru dev/prod
```

#### **Partea 2: CORS & HTTPS (20 min)**

**CORS explained:**
```
Browser security:
"Frontend pe vercel.app nu poate accesa API pe railway.app"

Solution:
// Backend
const cors = require('cors');
app.use(cors({
  origin: 'https://myapp.vercel.app', // Allow specific domain
  credentials: true
}));
```

**HTTP vs HTTPS:**
```
HTTP  = Date în clar (oricine poate citi)
HTTPS = Date encriptate (securizate)

Always use HTTPS in production!
Vercel/Netlify → HTTPS automat ✅
```

#### **Partea 3: Input Validation (30 min)**

**Never trust user input!**
```javascript
// ❌ Pericol: SQL Injection
app.get('/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  // User trimite: id=1 OR 1=1 → returnează TOȚ userii!
});

// ✅ Sigur: Parameterized queries
app.get('/user/:id', async (req, res) => {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.params.id); // Supabase sanitizează automat
});
```

**Validare cu Zod (librărie):**
```javascript
const { z } = require('zod');

const expenseSchema = z.object({
  amount: z.number().positive(),
  category: z.string().min(1).max(50),
  description: z.string().max(200).optional()
});

app.post('/api/expenses', async (req, res) => {
  try {
    const validated = expenseSchema.parse(req.body);
    // Continuă cu validated data
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});
```

#### **Partea 4: Security Checklist (30 min)**

**Workshop: Audit Expense Tracker**

**Checklist:**
```
✅ Environment variables pentru secrets?
✅ .env în .gitignore?
✅ HTTPS enabled în production?
✅ CORS configurat corect?
✅ Input validation pe toate endpoints?
✅ Authentication pe endpoints sensibile?
✅ Rate limiting (prevent spam)?
✅ Error messages nu expun detalii sensibile?
```

**Live fix-uri:**
- Adaugă validare cu Zod
- Configurează CORS
- Test cu inputs invalid (ce erori apar?)

#### **Partea 5: Deployment cu Securitate (20 min)**

**Railway (backend) + Vercel (frontend):**
```
Railway:
1. Connect GitHub repo
2. Add environment variables în dashboard
3. Deploy → primești HTTPS URL automat

Vercel:
1. Connect GitHub repo (frontend)
2. Add env vars (VITE_API_URL, VITE_SUPABASE_URL, etc.)
3. Deploy → HTTPS automat
4. Update CORS în backend cu Vercel URL
```

### **Livrabil:**
- ✅ App securizată (validation, CORS, HTTPS)
- ✅ Deployed cu env vars corecte
- ✅ Security checklist passed

### **Temă pentru acasă:**
```
"Security Audit pe toate proiectele tale:
1. Verifică că .env nu e pe GitHub
2. Adaugă input validation unde lipsește
3. Test deployed apps: HTTPS funcționează?
4. Pregătește prezentare Mid-Course Review:
   - 3-5 proiecte live
   - Ce ai învățat?
   - Challenges?"
```

---

# SĂPTĂMÂNA 7: ADVANCED - PAYMENTS & REAL-TIME

## 📅 Sesiunea 7.1: Mid-Course Review & Stripe Integration (2h)

### **Obiective:**
- Review progres (showcase proiecte)
- Introducere în Stripe (payment processing)
- Build simple e-commerce checkout

### **Agenda:**

#### **Partea 1: Mid-Course Review (45 min)**

**Student Presentations (5 min fiecare):**
```
Prezintă:
1. Proiectele tale (demo live)
2. Favorite project & why?
3. Biggest challenge overcome?
4. Ce vrei să construiești în Săptămâna 7-8?

Feedback de la:
- Colegi (1 compliment, 1 sugestie)
- Profesor (tehnic + mindset)
```

#### **Partea 2: Stripe Fundamentals (30 min)**

**Ce este Stripe?**
```
Stripe = Procesare plăți online
- Credit cards, Google Pay, Apple Pay
- Subscriptions (recurring payments)
- Webhooks (notifications la events)
```

**Setup Stripe:**
```
1. Du-te pe stripe.com
2. Sign up (test mode = gratis, fake cards)
3. Get API keys (Publishable + Secret)
4. Add în .env
```

**Test cards:**
```
4242 4242 4242 4242  → Success
4000 0000 0000 0002  → Decline
```

#### **Partea 3: Build Simple Checkout (45 min)**

**Scenario:**
```
E-commerce pentru produse digitale:
- Product page (listă produse)
- Buy button → Stripe Checkout
- Success page (după plată)
- Webhook (confirmă plata în backend)
```

**Prompt pentru Claude:**
```
"Vreau un simple e-commerce checkout cu Stripe:
Frontend (React):
- Product cards (imagine, titlu, preț, Buy button)
- Click Buy → redirect la Stripe Checkout

Backend (Node.js):
- POST /create-checkout-session → creează Stripe session
- POST /webhook → primește confirmări de la Stripe

Products:
1. E-book ($10)
2. Video Course ($50)
3. 1-on-1 Coaching ($100)

Use Stripe test mode."
```

**Flow:**
```
1. User click Buy → frontend call /create-checkout-session
2. Backend creează Stripe session, returnează URL
3. Frontend redirect la Stripe Checkout page
4. User introduce card (test card)
5. Stripe procesează plata
6. Stripe redirect la Success page
7. Stripe trimite webhook → backend confirmă plata
```

### **Livrabil:**
- ✅ Stripe checkout funcțional (test mode)
- ✅ Webhook setup pentru confirmări

### **Temă pentru acasă:**
```
"Extinde e-commerce:
1. Adaugă database (salvează orders)
2. Adaugă email confirmation după purchase (Resend/SendGrid)
3. Adaugă admin dashboard (vezi toate orders)
4. Deploy (webhook trebuie HTTPS!)
5. Test cu Stripe test cards"
```

---

## 📅 Sesiunea 7.2: Real-Time Features (Socket.io) (2h)

### **Obiective:**
- Ce înseamnă "real-time"?
- WebSockets vs HTTP
- Setup Socket.io (chat app)
- Build live chat application

### **Agenda:**

#### **Partea 1: Real-Time Explained (20 min)**

**HTTP (normal) vs WebSockets (real-time):**
```
HTTP = Scrisoare prin poștă
- User trimite request → așteaptă răspuns
- Lent pentru updates frecvente (refresh page manual)

WebSocket = Telefon
- Conexiune constantă (always on)
- Server trimite updates instant
- Perfect pentru: chat, notifications, live updates
```

**Use cases:**
```
✅ Chat apps (messages instant)
✅ Multiplayer games (real-time sync)
✅ Live dashboards (stock prices, analytics)
✅ Collaborative tools (Google Docs)
✅ Notifications (new message, new like)
```

#### **Partea 2: Socket.io Setup (30 min)**

**Backend:**
```bash
npm install socket.io
```

```javascript
// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for messages
  socket.on('message', (data) => {
    // Broadcast to all users
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Frontend (React):**
```bash
npm install socket.io-client
```

```jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for messages from server
    socket.on('message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => socket.off('message');
  }, []);

  function sendMessage() {
    socket.emit('message', {
      text: input,
      user: 'Me',
      timestamp: new Date()
    });
    setInput('');
  }

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i}>{msg.user}: {msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
```

#### **Partea 3: Build Chat App (1h)**

**Prompt pentru Claude:**
```
"Vreau un live chat app cu Socket.io:
Features:
- Username selection (join with name)
- Live message feed (toate mesajele apar instant)
- "User is typing..." indicator
- User list (who's online?)
- Message timestamps
- Scroll to latest message

Design: Modern chat UI (Telegram/WhatsApp style)."
```

**Advanced features (opțional):**
```
- Private rooms (create/join specific channels)
- Direct messages (1-on-1)
- File sharing (images în chat)
- Reactions (emoji reactions la messages)
```

#### **Partea 4: Testing Multi-User (10 min)**

**Test scenarios:**
```
1. Deschide 2-3 tabs/browsers
2. Login cu useri diferiți
3. Trimite messages → apar instant în toate tabs?
4. Close un tab → user dispare din "online list"?
5. Test "typing indicator" → funcționează?
```

### **Livrabil:**
- ✅ Live chat app funcțional
- ✅ Real-time messaging între multiple users
- ✅ Deployed (Railway pentru backend, Vercel pentru frontend)

### **Temă pentru acasă:**
```
"Extinde Chat App:
1. Adaugă room selection (multiple channels)
2. Adaugă message persistence (Supabase)
3. Adaugă user authentication (Supabase Auth)
4. Adaugă typing indicator
5. Deploy full-stack
6. Test cu prieteni (share URL)

🤔 Challenge: Adaugă video call (WebRTC + Socket.io)."
```

---

# SĂPTĂMÂNA 8: CAPSTONE PROJECT

## 📅 Sesiunea 8.1: Capstone Project Planning & Kickoff (2h)

### **Obiective:**
- Alege proiect personal (rezolvă o problemă reală)
- Plan detaliat (features, tech stack, timeline)
- Setup project structure
- Primele features implementate

### **Agenda:**

#### **Partea 1: Brainstorming & Ideation (30 min)**

**Întrebări ghid:**
```
1. Ce problemă vrei să rezolvi?
   - Pentru tine personal?
   - Pentru comunitatea ta?
   - Pentru un client potențial?

2. Cine e target audience?
   - Studenți? Freelanceri? Antreprenori?
   - Tech-savvy sau beginners?

3. Ce feature-uri sunt ESENȚIALE (MVP)?
   - Fără ce nu funcționează proiectul?

4. Ce tech stack vrei să folosești?
   - React? Vue? Vanilla JS?
   - Node.js + Express? Supabase?
   - Ce API-uri externe?
```

**Exemple proiecte bune:**
```
✅ Habit Tracker pentru studenți (gamification)
✅ Freelance Time Tracker (invoicing automat)
✅ Local Events Aggregator (scrape-uiește evenimente)
✅ AI Study Buddy (flashcards + quiz cu OpenAI)
✅ Meal Prep Planner (rețete + shopping list)
✅ Portfolio Builder (template-uri no-code)
```

#### **Partea 2: Project Planning (45 min)**

**Template de planning:**
```markdown
# [Project Name]

## Problema
[Ce problemă rezolvă?]

## Target User
[Cine folosește?]

## Features (MVP)
1. [Feature esențial 1]
2. [Feature esențial 2]
3. [Feature esențial 3]

## Features (V2 - Nice to have)
4. [Feature bonus 1]
5. [Feature bonus 2]

## Tech Stack
- Frontend: [React/Vue/etc.]
- Backend: [Node.js/Supabase/etc.]
- Database: [Supabase/MongoDB/etc.]
- External APIs: [Stripe/OpenAI/etc.]
- Deployment: [Vercel/Railway/etc.]

## Timeline
- Sesiunea 8.1: Setup + Feature 1-2
- Temă acasă: Feature 3-4
- Sesiunea 8.2: Feature 5-6 + Polish
- Weekend: Testing + Deploy
- Prezentare finală: Demo + Feedback

## Success Criteria
- [ ] MVP funcțional
- [ ] Deployed cu URL public
- [ ] Minim 3 users test-uiesc
- [ ] Documentation (README + video demo)
```

**Exercițiu:** Fiecare student completează template-ul (15 min)

#### **Partea 3: Project Setup & Kickoff (45 min)**

**Live coding începe:**
```
1. Creează repo GitHub (new project)
2. Setup tech stack (React + Vite / Node.js + Express / etc.)
3. Structură folder
4. README.md cu plan
5. Primul commit

6. Implementează Feature 1 (cel mai simplu)
7. Test + commit
8. Deploy skeleton (funcționalitate minimă live)
```

**Profesor circulă și ajută fiecare student:**
- Debug setup issues
- Clarificări la plan
- Sugestii de simplificare (avoid over-engineering)

### **Livrabil:**
- ✅ Project plan detaliat
- ✅ Repo GitHub creat
- ✅ Tech stack setup
- ✅ Primul feature implementat
- ✅ Skeleton deployed (chiar dacă incomplet)

### **Temă pentru acasă:**
```
"Work on Capstone:
1. Implementează features 2-4 (din MVP)
2. Commit frecvent (după fiecare feature)
3. Test pe parcurs (nu aștepți la final)
4. Deploy updates (continuous deployment)
5. Cere feedback de la 2-3 prieteni (test usability)

Pregătește pentru Sesiunea 8.2:
- Demo ce ai făcut
- Challenges întâmpinate
- Features rămase"
```

---

## 📅 Sesiunea 8.2: Capstone Completion & Final Presentations (2h)

### **Obiective:**
- Finalizare MVP capstone projects
- Polish (design, UX, bug fixes)
- Prezentări finale (5-7 min fiecare)
- Feedback & next steps

### **Agenda:**

#### **Partea 1: Final Push - Polish & Bug Fixes (45 min)**

**Checklist finalizare:**
```
✅ Toate MVP features funcționează?
✅ Design e consistent (fonts, culori)?
✅ Mobile responsive (testează pe telefon)?
✅ Erori sunt handle-uite (nu crash-uri)?
✅ Loading states (spinners când așteaptă)?
✅ README.md complet (screenshots, instructions)?
✅ Deployed și accesibil public?
✅ Minim 3 oameni l-au testat?
```

**Workshop:**
- Profesor ajută fiecare student să finalizeze
- Peer review (studenții se testează între ei)
- Quick wins (polish-uri rapide care fac impact mare)

#### **Partea 2: Final Presentations (1h 15min)**

**Format prezentare (5-7 min):**
```
1. Introducere (30 sec)
   - "Bună, sunt [nume]. Am construit [proiect]."

2. Problema (1 min)
   - Ce problemă rezolvă?
   - De ce e relevant?

3. Demo Live (3 min)
   - Arată features principale
   - User flow complet (de la start la finish)
   - Highlight: ce e cel mai cool feature?

4. Tech Stack & Challenges (1 min)
   - Ce tehnologii ai folosit?
   - Care a fost cel mai mare challenge?
   - Cum l-ai rezolvat?

5. Next Steps (30 sec)
   - Ce vrei să adaugi în V2?
   - Planuri cu proiectul (lansare? portfolio? open-source?)

6. Q&A (1 min)
   - Întrebări de la colegi și profesor
```

**După fiecare prezentare:**
- 2-3 întrebări de la audience
- Feedback pozitiv (ce a ieșit super bine?)
- 1 sugestie constructivă (ce ar putea fi îmbunătățit?)

#### **Partea 3: Course Wrap-Up & Next Steps (20 min)**

**Retrospectivă curs:**
```
1. Ce ai învățat? (skills)
   - Vibe Coding cu Claude
   - Frontend (React, vanilla JS)
   - Backend (Node.js, Express)
   - Databases (Supabase)
   - API integration
   - Deployment
   - Git & GitHub

2. Ce proiecte ai construit? (portfolio)
   - 6-8 proiecte mici
   - 1 capstone project complex
   - Toate live pe internet

3. Mindset shift?
   - De la "nu știu să programez"
   - La "pot construi orice îmi imaginez"
```

**Next Steps post-curs:**
```
✅ Continuă să construiești (1 project/lună)
✅ Contribuie open-source (GitHub)
✅ Freelancing (Upwork, Fiverr cu portfolio-ul tău)
✅ Apply la jobs (junior dev roles)
✅ Join communities (Discord, Reddit: r/webdev)
✅ Învață constant (new frameworks, tools)
```

**Resources pentru după curs:**
```
📚 Learning:
- freeCodeCamp.org
- MDN Web Docs
- YouTube: Fireship, Web Dev Simplified

💼 Freelancing:
- Upwork, Fiverr (portfolio ready!)
- LocalFreelancers (clienți locali)

👥 Community:
- Discord servers (web dev, React, Node.js)
- Twitter (#100DaysOfCode)
- Dev.to (write about your learning)

🎯 Goals:
- Build 1 project/month
- Learn 1 new tech/quarter
- Help 1 beginner/week (teach = solidify knowledge)
```

### **Livrabil Final:**
- ✅ Capstone project complet și deployed
- ✅ Portfolio cu 7-9 proiecte live
- ✅ GitHub activ cu commits consistente
- ✅ Skills: Full-stack development cu AI assistance
- ✅ Confidence să construiască orice proiect

### **Post-Curs:**
```
"Certificare de finalizare + LinkedIn recommendation.

Stay in touch:
- Alumni Discord channel
- Office hours (1/lună)
- Showcase channel (share ce construiești)

Keep vibing! 🚀"
```

---

# 📊 ANEXE

## Anexa A: Template Sesiune (Pentru Profesor)

**Pregătire pre-sesiune:**
```
□ Testează demo project (funcționează?)
□ Pregătește cod de starter (dacă e relevant)
□ Verifică că toate tool-urile merg (Claude Code, Git, etc.)
□ Review teme de acasă studenți (ce patterns de erori apar?)
```

**Structura sesiune:**
```
1. Check-in (5 min)
   - Ce ai lucrat de la ultima sesiune?
   - Blocaje? Întrebări?

2. Review temă (10-15 min)
   - 2-3 studenți prezintă soluția (3 min)
   - Discutați diferite abordări

3. Concepte noi (20-30 min)
   - Teorie minimă (cu analogii, nu jargon)
   - Demo live (show, don't tell)

4. Live coding împreună (60-90 min)
   - Toată clasa construiește în paralel
   - Pauză la 45 min (5 min break)
   - Profesor ghidează, studenții execută

5. Wrap-up (10 min)
   - Recap: ce am învățat azi?
   - Preview: ce urmează next session?
   - Temă de acasă (clară, specifică)

6. Q&A (5-10 min)
   - Office hours scheduling
```

---

## Anexa B: Grading Rubric (Opțional)

**Participare (20%):**
- Prezență la sesiuni
- Engagement în coding sessions
- Ajutor colegilor (peer support)

**Proiecte Mici (40%):**
- 6-8 proiecte funcționale (săptămâna 1-7)
- Deployed pe internet
- Cod pe GitHub
- README documentation

**Capstone Project (30%):**
- Funcționalitate (MVP complet?)
- Creativitate (rezolvă problemă reală?)
- Code quality (clean, commented)
- Prezentare finală

**Portfolio (10%):**
- GitHub activ (commits consistente)
- README cu screenshots
- Deployed projects cu URLs

---

## Anexa C: Resources Hub

**Tools Esențiale:**
- VSCode (editor)
- Git (versioning)
- Claude Code (AI assistant)
- GitHub (portfolio)
- Node.js (runtime)

**Deployment Platforms:**
- Vercel (frontend, serverless)
- Netlify (static sites)
- Railway (backend, databases)
- Supabase (database + auth)

**Design Resources:**
- Tailwind CSS (utility-first CSS)
- Unsplash (free images)
- Flaticon (icons)
- Google Fonts (typography)
- Coolors (color palettes)

**Learning:**
- freeCodeCamp
- MDN Web Docs
- UNIVERSAL_WORKFLOW.md (acest ghid!)

---

## Anexa D: Common Issues & Solutions

**Issue: "Claude nu înțelege ce vreau"**
```
Solution:
- Fii mai specific (nu "fă ceva", ci "adaugă buton roșu")
- Oferă exemple
- Iterează (primește draft → dă feedback → repeat)
```

**Issue: "Build-ul eșuează"**
```
Solution:
- Citește error message complet (nu panic la prima linie)
- Google exact error message
- Verifică că toate dependencies sunt instalate (npm install)
```

**Issue: "Deploy-ul nu merge"**
```
Solution:
- Verifică environment variables (în Vercel/Netlify dashboard)
- Verifică logs (deployment logs în dashboard)
- Test local înainte de deploy (npm run build)
```

**Issue: "Sunt blocat, nu știu ce să fac"**
```
Solution:
- Break problema în părți mici
- Rezolvă cea mai mică parte
- Ask for help (colegi, profesor, Claude)
- Ia pauză (fresh perspective)
```

---

**Succes cu cursul de Vibe Coding! 🚀**

*Remember: Goal-ul nu e să memoreze sintaxă, ci să construiască lucruri reale și să învețe să gândească ca un developer.*
