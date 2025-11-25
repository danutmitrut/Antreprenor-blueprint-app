# 🚀 Program AI Vibe Coding - 3 Luni (Simplificat)
**3 Aplicații Principale | Cohort-Based Live | Toți Construiesc Același Lucru**

---

## 🎯 Filozofia Simplificată

### **3 Apps. 3 Months. Everyone Builds The Same Thing.**

**NU mai sunt 13 proiecte mici.**
**SUNT 3 aplicații complexe, full-featured.**

Toate predefinite de conducătorul cursului.
Toată cohort-ul construiește **exact aceeași aplicație**, **în același timp**, **cu aceleași features**.

### **De ce 3 Apps?**
- ✅ **Management ultra-simplu** (știi exact ce face fiecare student)
- ✅ **Debug eficient** (toți au aceleași bug-uri, fix-uri standard)
- ✅ **Progres măsurabil** (checkpoints identice pentru toți)
- ✅ **Peer support maxim** (dacă cineva a rezolvat X, poate ajuta pe alții)
- ✅ **Focus pe profunzime** (înveți TOTUL despre fiecare app, nu surface-level)

---

## 📱 Cele 3 Aplicații (Predefinite)

### **App 1: HABIT TRACKER** (Luna 1)
*Full-featured habit tracking app cu gamification*

**Tech Stack:**
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth (email/password)
- Deployment: Vercel (frontend) + Railway (backend)

**Features Complete:**
```
✅ User Authentication (register, login, logout, password reset)
✅ Create Habits (name, frequency: daily/weekly, category)
✅ Daily Check-ins (mark habit as done today)
✅ Streak Tracking (consecutive days completed)
✅ Progress Visualization (charts per habit)
✅ Calendar View (see all check-ins în calendar)
✅ Gamification:
   - Points system (10 pts/check-in, 50 pts/week streak)
   - Levels (Beginner → Intermediate → Advanced → Master)
   - Badges (achievements: "7 Day Streak", "30 Day Warrior", etc.)
✅ User Profile (stats, level, badges earned)
✅ Dark Mode Toggle
✅ Responsive Design (mobile-first)
```

**Learning Objectives:**
- Frontend basics (React components, state, hooks)
- Backend API design (REST endpoints)
- Database schema design (users, habits, check-ins, badges)
- Authentication flow complete
- Data visualization (Chart.js)
- Deploy full-stack app

**Timeline:** 4 săptămâni (8 sesiuni live)

---

### **App 2: EXPENSE TRACKER PRO** (Luna 2)
*Professional expense management cu rapoarte și insights*

**Tech Stack:**
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth (refolosim din App 1)
- External API: OpenAI API (AI-powered insights)
- Deployment: Vercel + Railway

**Features Complete:**
```
✅ User Authentication (same system ca App 1)
✅ Add Expenses (amount, category, description, date, receipt photo upload)
✅ Expense Categories (predefined + custom)
✅ Filtering & Search:
   - By date range (last week, last month, custom)
   - By category (Food, Transport, Entertainment, etc.)
   - By amount (min-max range)
✅ Visualizations:
   - Pie chart (spending by category)
   - Line chart (spending over time)
   - Bar chart (monthly comparison)
✅ Budgets:
   - Set monthly budget per category
   - Alerts când depășești (email notification)
   - Progress bars (spent vs budget)
✅ Recurring Expenses (Netflix, rent, etc. - auto-add monthly)
✅ AI Insights (OpenAI):
   - "You spent 30% more on dining out this month"
   - "Suggestion: Set a $200 food budget"
   - "Pattern detected: You overspend on weekends"
✅ Export to PDF (monthly report)
✅ Multi-currency support (USD, EUR, RON)
```

**Learning Objectives:**
- Advanced React patterns (context, custom hooks)
- Complex database queries (aggregations, filtering)
- File uploads (Supabase Storage pentru receipts)
- External API integration (OpenAI pentru insights)
- Email notifications (Resend/SendGrid)
- PDF generation (jsPDF)
- Scheduled tasks (cron jobs pentru recurring expenses)

**Timeline:** 4 săptămâni (8 sesiuni live)

---

### **App 3: FREELANCE TIME TRACKER + INVOICING** (Luna 3)
*Complete freelance management tool cu time tracking, invoicing și client management*

**Tech Stack:**
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Payments: Stripe (invoice payments)
- Real-time: Socket.io (live timer sync across devices)
- Email: Resend (send invoices)
- PDF: jsPDF (invoice generation)
- Deployment: Vercel + Railway

**Features Complete:**
```
✅ User Authentication (multi-user support)
✅ Client Management:
   - Add clients (name, email, company, hourly rate)
   - Client list with search/filter
   - Client history (toate proiectele + invoices)

✅ Project Management:
   - Create projects (linked to client)
   - Set project budget (fixed or hourly)
   - Project status (Active, Completed, On Hold)
   - Project notes & attachments

✅ Time Tracking:
   - Start/Stop timer (cu descriere task)
   - Manual time entry (add retrospectiv)
   - Edit/Delete time entries
   - Timer sync real-time (Socket.io - dacă pornești pe desktop, vezi pe mobile)
   - Idle detection (pauză automată după X min inactivitate)

✅ Reporting:
   - Time breakdown (by project, by client, by date)
   - Charts (hours worked per week/month)
   - Billable vs Non-billable hours
   - Detailed timesheets (exportable)

✅ Invoicing:
   - Generate invoice (from time entries)
   - Invoice template customization (logo, colors, terms)
   - Invoice preview (PDF)
   - Send invoice via email (Resend)
   - Invoice status tracking (Sent, Paid, Overdue)
   - Payment link (Stripe Checkout)
   - Automatic payment reminders (overdue invoices)

✅ Dashboard:
   - Total hours this week/month
   - Total earnings this week/month
   - Outstanding invoices (amount + count)
   - Recent activity feed
   - Quick actions (start timer, add expense, create invoice)

✅ Settings:
   - Profile (name, email, company info, logo)
   - Invoice defaults (tax rate, payment terms, bank details)
   - Notification preferences
   - Integrations (Stripe, OpenAI, etc.)
```

**Learning Objectives:**
- Complex app architecture (multiple modules)
- Real-time features (Socket.io pentru timer sync)
- Advanced database design (relații complexe: users → clients → projects → time_entries → invoices)
- Payment integration complete (Stripe Checkout + webhooks)
- Email automation (send invoices, reminders)
- PDF generation (professional invoices)
- Cron jobs (automatic reminders pentru overdue invoices)
- Multi-tenant considerations (data isolation per user)

**Timeline:** 4 săptămâni (8 sesiuni live)

---

# 📅 STRUCTURA CELOR 3 LUNI

## LUNA 1: HABIT TRACKER (Săptămânile 1-4)

### **Săptămâna 1: Setup & Authentication**

#### **Sesiunea 1.1: Environment Setup + Project Kickoff (Marți, 2h)**
```
00:00-00:30 | Welcome & Program Overview
- Ce construim: 3 apps complexe (demo video)
- Cum funcționează programul (live sessions, Discord, support)
- Meet your cohort (breakout rooms)

00:30-01:00 | Tools Setup (Împreună)
- VSCode + extensions (Prettier, ESLint, Tailwind CSS IntelliSense)
- Git + GitHub account
- Claude Code setup + best practices
- Node.js + npm verification
- Create repo: "habit-tracker" (toți în același timp)

01:00-01:50 | Project Architecture Walkthrough
- Database schema (desenat împreună):
  * users table
  * habits table
  * check_ins table
  * badges table
  * user_badges table (join)
- API endpoints needed (listă completă)
- Component structure React (hierarchy diagram)
- Folder structure (create împreună)

01:50-02:00 | Homework Assignment
- Finalizează setup local
- Creează Supabase account
- Read UNIVERSAL_WORKFLOW.md (secțiunea Authentication)
```

**Deliverable:** Project setup complet, repo GitHub creat

---

#### **Sesiunea 1.2: Database Schema + Authentication (Joi, 2h)**
```
00:00-00:15 | Setup Verification
- Screen share: fiecare arată setup (quick check)
- Troubleshoot issues comune

00:15-00:45 | Supabase Setup (Synchronized)
- Toți creează Supabase project
- Create tables (SQL împreună):
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT,
    frequency TEXT, -- 'daily' or 'weekly'
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE check_ins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(habit_id, date)
  );

00:45-01:45 | Build Authentication System
- Prompt pentru Claude (citit împreună):
  "Vreau un sistem de autentificare pentru Habit Tracker:
   - Register page (email + password + confirm)
   - Login page (email + password)
   - Logout button
   - Protected routes (redirect to login if not authenticated)
   Use Supabase Auth + React Router."

- Live coding synchronized:
  ✅ Checkpoint 1: Register page funcționează (user creat în Supabase)
  ✅ Checkpoint 2: Login page funcționează (redirect to /dashboard)
  ✅ Checkpoint 3: Logout funcționează
  ✅ Checkpoint 4: Protected routes (can't access /dashboard fără login)

01:45-02:00 | Testing & Deploy
- Test cu 2 accounts (data separation?)
- Deploy pe Vercel (skeleton app)
- Share URL în Discord
```

**Deliverable:** Auth system complet + deployed

**Homework Săptămâna 1:**
```
📝 Tema:
1. Adaugă Forgot Password flow:
   - "Forgot password?" link
   - Reset password page
   - Test flow complet

2. Styling improvements:
   - Design login/register pages (modern UI cu Tailwind)
   - Add logo/branding

3. Deploy updates + test

⏱️ Time: 4-6h
💡 Resources: Supabase Auth docs, UNIVERSAL_WORKFLOW.md
```

---

### **Săptămâna 2: Core Features - Habits CRUD**

#### **Sesiunea 2.1: Create & List Habits (Marți, 2h)**
```
00:00-00:20 | Homework Review
- 3 studenți demo forgot password flow
- Common styling patterns share

00:20-01:50 | Build Habits Dashboard
- Prompt (synchronized):
  "Dashboard pentru Habit Tracker:
   Frontend:
   - Navbar (logo, user menu, logout)
   - Main section:
     * 'Add Habit' button (opens modal)
     * List of user's habits (cards cu nume, category, frequency)
     * Empty state (când nu ai habits)

   Backend:
   - POST /api/habits (create habit)
   - GET /api/habits?user_id=X (list habits)

   Features:
   - Modal pentru Add Habit (nume, category dropdown, frequency radio)
   - Habits afișate în grid (3 columns desktop, 1 mobile)
   - Delete button pe fiecare habit (cu confirmare)"

- Checkpoints:
  ✅ Navbar funcționează (logout redirect to login)
  ✅ Add Habit modal opens/closes
  ✅ POST /api/habits creează habit în Supabase
  ✅ GET /api/habits returnează user's habits
  ✅ Habits afișate în dashboard
  ✅ Delete habit funcționează

01:50-02:00 | Deploy & Test
```

**Deliverable:** Habits CRUD (Create, Read, Delete)

---

#### **Sesiunea 2.2: Daily Check-ins & Streaks (Joi, 2h)**
```
00:00-00:15 | Review Habits CRUD

00:15-01:50 | Add Check-in System
- Prompt:
  "Adaugă check-in functionality:
   - Fiecare habit card: checkbox 'Mark as done today'
   - Click checkbox → POST /api/check-ins (habit_id, date: TODAY)
   - Visual feedback (checkmark animation)
   - Streak counter (consecutive days completed)
   - Display streak on habit card ('🔥 5 days')

   Backend:
   - POST /api/check-ins (create check-in)
   - GET /api/check-ins?habit_id=X (list check-ins pentru streak calculation)
   - Calculate streak logic (consecutive days)"

- Checkpoints:
  ✅ Checkbox funcționează (check-in creat)
  ✅ Checkbox disabled după check-in (can't check twice same day)
  ✅ Streak calculation correct (test cu manual check-ins)
  ✅ Streak displayed pe habit card

01:50-02:00 | Deploy + Test Streaks
```

**Deliverable:** Check-in system + streak tracking

**Homework Săptămâna 2:**
```
📝 Tema:
1. Adaugă Edit Habit:
   - Edit button pe habit card
   - Modal pre-filled cu date existente
   - PUT /api/habits/:id (update)

2. Adaugă Calendar View (basic):
   - New page /calendar
   - Show current month
   - Highlight days cu check-ins (green dots)

3. Styling polish:
   - Consistent colors (Tailwind theme)
   - Icons (Lucide React)
   - Animations (Framer Motion)

⏱️ Time: 6-8h
```

---

### **Săptămâna 3: Gamification - Points & Levels**

#### **Sesiunea 3.1: Points System (Marți, 2h)**
```
00:00-00:20 | Calendar View Showcase

00:20-01:50 | Implement Points & Levels
- Database update (add columns):
  ALTER TABLE users ADD COLUMN points INT DEFAULT 0;
  ALTER TABLE users ADD COLUMN level TEXT DEFAULT 'Beginner';

- Prompt:
  "Adaugă gamification:
   - Points system:
     * 10 points per check-in
     * 50 bonus points per 7-day streak
     * Display total points în navbar

   - Levels (based on points):
     * 0-100: Beginner
     * 101-500: Intermediate
     * 501-1000: Advanced
     * 1000+: Master

   - Level indicator în navbar (badge cu level + progress bar)

   Backend:
   - Update points când se face check-in (POST /api/check-ins)
   - Calculate level based on points
   - GET /api/users/:id/stats (points, level, total check-ins)"

- Checkpoints:
  ✅ Points awarded per check-in
  ✅ Bonus points per 7-day streak
  ✅ Level calculated correct
  ✅ Navbar shows points + level
  ✅ Progress bar to next level

01:50-02:00 | Test & Deploy
```

**Deliverable:** Points system + levels

---

#### **Sesiunea 3.2: Badges & Achievements (Joi, 2h)**
```
00:00-00:15 | Points System Review

00:15-01:50 | Implement Badges
- Database:
  CREATE TABLE badges (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- emoji or icon name
    criteria JSON -- { type: 'streak', value: 7 }
  );

  CREATE TABLE user_badges (
    user_id UUID REFERENCES users(id),
    badge_id UUID REFERENCES badges(id),
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, badge_id)
  );

- Seed badges (insert împreună):
  INSERT INTO badges VALUES
  ('...', 'First Step', 'Complete your first check-in', '👟', '{"type": "check_ins", "value": 1}'),
  ('...', '7 Day Warrior', 'Maintain a 7-day streak', '🔥', '{"type": "streak", "value": 7}'),
  ('...', '30 Day Champion', 'Maintain a 30-day streak', '👑', '{"type": "streak", "value": 30}'),
  ('...', 'Habit Master', 'Create 10 habits', '🎯', '{"type": "habits_created", "value": 10}');

- Prompt:
  "Adaugă badges system:
   - Check badge criteria după fiecare check-in
   - Award badge dacă criteria met (insert în user_badges)
   - Notification toast când badge earned ('🎉 You earned: 7 Day Warrior!')
   - Profile page: display all earned badges (grid)
   - Badge details modal (click pe badge)"

- Checkpoints:
  ✅ Badges awarded automatic
  ✅ Toast notification funcționează
  ✅ Profile page shows badges
  ✅ Badge details modal

01:50-02:00 | Deploy & Celebrate 🎉
```

**Deliverable:** Complete gamification system

**Homework Săptămâna 3:**
```
📝 Tema:
1. Adaugă Progress Visualization:
   - Charts per habit (line chart: check-ins over time)
   - Use Chart.js sau Recharts
   - Display pe habit card (expandable section)

2. Adaugă Dark Mode:
   - Toggle în navbar (moon/sun icon)
   - Save preference în localStorage
   - Tailwind dark: classes

3. Polish & Testing:
   - Fix orice bug găsit
   - Test toate flow-urile (register → add habit → check-in → earn badge)
   - Cross-browser test

⏱️ Time: 6-8h
💡 Luna 1 = COMPLETĂ! Habit Tracker production-ready 🎉
```

---

### **Săptămâna 4: Polish & Advanced Features**

#### **Sesiunea 4.1: Calendar View Advanced + Data Viz (Marți, 2h)**
```
00:00-00:20 | Showcase Progress Viz + Dark Mode

00:20-01:50 | Advanced Features
- Calendar view improvements (FullCalendar library)
- Advanced data visualizations (habit completion rate, best time of day, etc.)
- Export data (CSV download)
- Social sharing (share streak pe Twitter/LinkedIn)

01:50-02:00 | Code Review & Refactoring
```

---

#### **Sesiunea 4.2: Final Polish + Luna 1 Demo Day (Joi, 2h)**
```
00:00-01:30 | Final Bug Fixes & Polish
- Performance optimization (lazy loading, memoization)
- SEO (meta tags, Open Graph)
- Accessibility (keyboard navigation, ARIA labels)
- Mobile responsive final check

01:30-02:00 | Demo Day - Habit Tracker
- Fiecare student: 3 min demo live
- Vote: Best customization (design/extra features)
- Feedback & learnings
- Celebrate Luna 1 complete 🎉
```

**Deliverable Luna 1:**
- ✅ **Habit Tracker** complet, production-ready
- ✅ Deployed cu URL public
- ✅ GitHub repo cu README documentation

---

## LUNA 2: EXPENSE TRACKER PRO (Săptămânile 5-8)

### **Săptămâna 5: Setup + Core Features**

#### **Sesiunea 5.1: Project Setup + Expenses CRUD (Marți, 2h)**
```
- Create new repo: "expense-tracker-pro"
- Database schema (împreună)
- Auth system (refolosim din Habit Tracker, copy-paste + adapt)
- Add Expense form (amount, category, description, date)
- List expenses (table view cu sorting/filtering)
```

#### **Sesiunea 5.2: Categories & File Upload (Joi, 2h)**
```
- Predefined categories + custom categories
- Receipt photo upload (Supabase Storage)
- Display receipt în expense details
- Delete expense (cu confirmare)
```

**Homework:** Add Edit Expense, Filtering by date range

---

### **Săptămâna 6: Visualizations & Budgets**

#### **Sesiunea 6.1: Charts & Reports (Marți, 2h)**
```
- Pie chart (spending by category)
- Line chart (spending over time)
- Bar chart (monthly comparison)
- Summary cards (total spent, avg per day, etc.)
```

#### **Sesiunea 6.2: Budget System (Joi, 2h)**
```
- Set monthly budget per category
- Progress bars (spent vs budget)
- Alerts când depășești (visual + email notification)
- Budget history (track over months)
```

**Homework:** Recurring Expenses feature, Multi-currency support

---

### **Săptămâna 7: AI Integration & Advanced Features**

#### **Sesiunea 7.1: OpenAI Insights (Marți, 2h)**
```
- OpenAI API setup
- Generate spending insights (prompt engineering)
- Display insights în dashboard
- Suggestions based on patterns
```

#### **Sesiunea 7.2: PDF Export & Email (Joi, 2h)**
```
- Generate PDF report (jsPDF)
- Monthly report layout (professional design)
- Email report (Resend/SendGrid integration)
- Schedule automatic monthly reports (cron job)
```

**Homework:** Polish, Testing, Performance optimization

---

### **Săptămâna 8: Polish + Luna 2 Demo Day**

#### **Sesiunea 8.1: Final Features (Marți, 2h)**
```
- Advanced filtering (multiple criteria)
- Search functionality (fuzzy search)
- Mobile app feel (PWA setup)
- Offline support (basic caching)
```

#### **Sesiunea 8.2: Demo Day - Expense Tracker Pro (Joi, 2h)**
```
- Student demos (5 min each)
- Vote: Best feature implementation
- Code review session
- Celebrate Luna 2 🎉
```

**Deliverable Luna 2:**
- ✅ **Expense Tracker Pro** complet
- ✅ AI-powered insights funcționale
- ✅ PDF export + email automation

---

## LUNA 3: FREELANCE TIME TRACKER + INVOICING (Săptămânile 9-12)

### **Săptămâna 9: Setup + Client/Project Management**

#### **Sesiunea 9.1: Project Setup + Database Design (Marți, 2h)**
```
- Create repo: "freelance-time-tracker"
- Complex database schema (users → clients → projects → time_entries → invoices)
- Auth system setup
- Client Management UI (CRUD clients)
```

#### **Sesiunea 9.2: Project Management (Joi, 2h)**
```
- CRUD projects (linked to clients)
- Project details page
- Project status tracking
- Client <> Projects relationship views
```

**Homework:** Polish Client/Project management, Add search/filter

---

### **Săptămâna 10: Time Tracking + Real-time Sync**

#### **Sesiunea 10.1: Timer Implementation (Marți, 2h)**
```
- Start/Stop timer UI
- Timer logic (useEffect + setInterval)
- Manual time entry form
- Time entries list (per project)
- Edit/Delete time entries
```

#### **Sesiunea 10.2: Socket.io Real-time Sync (Joi, 2h)**
```
- Socket.io setup (backend + frontend)
- Timer sync across devices (desktop ↔ mobile)
- Live updates (dacă pornești timer pe desktop, vezi pe mobile)
- Connection status indicator
```

**Homework:** Idle detection, Time entries reporting (breakdown by project/client)

---

### **Săptămâna 11: Invoicing + Stripe Integration**

#### **Sesiunea 11.1: Invoice Generation (Marți, 2h)**
```
- Generate invoice from time entries
- Invoice template (professional design)
- Invoice preview (PDF)
- Invoice CRUD (save drafts, edit, delete)
```

#### **Sesiunea 11.2: Stripe + Email (Joi, 2h)**
```
- Stripe Checkout integration (payment link în invoice)
- Send invoice via email (Resend + PDF attachment)
- Invoice status tracking (Sent, Paid, Overdue)
- Webhooks (mark invoice Paid când payment succeeds)
```

**Homework:** Automatic payment reminders (cron job pentru overdue invoices), Multi-invoice view

---

### **Săptămâna 12: Polish + FINAL DEMO DAY**

#### **Sesiunea 12.1: Dashboard + Analytics (Marți, 2h)**
```
- Complete dashboard (total hours, earnings, outstanding invoices)
- Advanced reporting (billable vs non-billable, revenue trends)
- Settings page (profile, invoice defaults, integrations)
- Final polish (animations, loading states, error handling)
```

#### **Sesiunea 12.2: FINAL DEMO DAY + GRADUATION (Joi, 2h)**
```
00:00-01:30 | Final Presentations
- Fiecare student: 7 min prezentare (cele 3 apps)
- Showcase portfolio GitHub
- Learnings & challenges overcome

01:30-01:50 | Winners & Prizes
- Best Overall Implementation
- Most Creative Customization
- Best Code Quality
- People's Choice

01:50-02:00 | Graduation Ceremony
- Certificates
- Alumni network invite
- Next steps (job hunting, freelancing, launching SaaS)
- Group celebration 🎉
```

**Deliverable Luna 3:**
- ✅ **Freelance Time Tracker + Invoicing** complet
- ✅ Stripe payments funcționale
- ✅ Real-time sync cu Socket.io

---

# 📊 PROGRAM SUMMARY

## 🎯 Cele 3 Apps (Predefinite de Profesor)

### **1. Habit Tracker** (Luna 1)
- Authentication
- CRUD habits
- Check-ins & streaks
- Gamification (points, levels, badges)
- Data visualization
- Dark mode

### **2. Expense Tracker Pro** (Luna 2)
- CRUD expenses cu file upload
- Categories & budgets
- Advanced charts & reports
- AI insights (OpenAI)
- PDF export
- Email automation
- Multi-currency

### **3. Freelance Time Tracker** (Luna 3)
- Client & project management
- Time tracking cu timer
- Real-time sync (Socket.io)
- Invoice generation
- Stripe payments
- Email invoices
- Dashboard & analytics

---

## 💰 Pricing

**Program Fee: $997** (one-time) sau **3x $350/lună**

**Ce Include:**
- ✅ 24 sesiuni live (48h total)
- ✅ 3 aplicații complete (predefinite)
- ✅ Discord 24/7 support
- ✅ Office Hours săptămânale (12 x 1h)
- ✅ Code review final
- ✅ Certificat absolvire
- ✅ Alumni network (lifetime)

---

## 📅 Schedule

**Live Sessions:**
- Marți: 19:00-21:00 EEST
- Joi: 19:00-21:00 EEST

**Office Hours:**
- Vineri: 18:00-19:00 EEST

**Time Commitment:**
- Live: 4h/săptămână
- Homework: 6-8h/săptămână
- Total: **10-12h/săptămână**

---

## 🎓 Prerequisites

**Mandatory:**
- Laptop cu internet
- Basic computer skills
- English reading (docs, errors)
- Commitment (10-12h/săptămână)

**NOT Required:**
- Programming experience (învățăm de la zero!)
- CS degree
- Math skills

---

## 🏆 Student Outcomes

**După 3 Luni:**
- ✅ **3 aplicații production-ready** deployed
- ✅ **GitHub portfolio** cu cod profesional
- ✅ **Full-stack skills** (React, Node.js, Supabase, Stripe, Socket.io)
- ✅ **AI-assisted development** mastery
- ✅ **Job-ready** (freelancing sau remote dev roles)

**Career Paths:**
- Freelancing ($25-50/h junior dev)
- Remote Junior Dev jobs
- Launch propriul SaaS
- Build pentru clienți locali

---

## ❓ FAQs

**Q: De ce doar 3 apps?**
**A:** Profunzime > Cantitate. Fiecare app e complexă, full-featured, production-ready. Înveți TOTUL despre fiecare, nu surface-level.

**Q: Pot să customizez apps?**
**A:** Features core sunt identice (management simplu). După finalizare, poți customiza design, adăuga features bonus (optional).

**Q: Ce dacă nu termin un app la timp?**
**A:** Office Hours + Discord support. Dacă rămâi mult în urmă, oferim catch-up session 1-on-1 (30 min).

**Q: Primesc certificate pentru fiecare app?**
**A:** Un singur certificat la final (după prezentarea celor 3 apps).

**Q: Apps sunt predefinate? Nu aleg eu?**
**A:** Corect. Toate predefinite de profesor. Toată cohort-ul construiește exact aceleași apps. Simplitate maximă în management.

---

## 📞 Apply Now

**Next Cohort:** [Data start]
**Spots:** 25 studenți max

**Application:**
1. Fill form
2. 15 min call cu mentor
3. Payment + onboarding
4. Week 0: Setup tools

**Contact:**
- Email: [email]
- Discord: [invite]
- Website: [URL]

---

**3 Apps. 3 Months. Production-Ready Portfolio.** 🚀

**Built with Claude Code** 🤖
