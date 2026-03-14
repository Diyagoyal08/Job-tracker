# 📋 Job Tracker — React Learning Project

A full-featured job application tracker built with **Vite + React + Tailwind CSS + Redux Toolkit**. Every file in this project maps directly to a concept from the React roadmap — nothing is a throwaway exercise.

---

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tool & dev server |
| React 18 | UI library |
| Tailwind CSS | Styling |
| React Router DOM | Client-side routing |
| Redux Toolkit | Global state management |
| Axios | API communication |
| React Redux | Redux bindings for React |

---

## 📁 File Structure

```
job-tracker/
├── index.html                  # Single HTML entry point (lesson 2–4)
├── vite.config.js              # Vite bundler config (lesson 2)
├── tailwind.config.js          # Tailwind CSS setup
├── package.json                # Dependencies & scripts
│
└── src/
    ├── main.jsx                # App entry — Redux Provider + BrowserRouter (lesson 3, 22, 32)
    ├── App.jsx                 # Root component + all routes (lesson 21–23)
    ├── index.css               # Global Tailwind directives
    │
    ├── components/
    │   ├── ui/                 # Generic reusable UI primitives (lesson 6–8)
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Badge.jsx
    │   │   └── Spinner.jsx
    │   │
    │   ├── layout/             # Page shell — layout routes (lesson 23)
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── ProtectedRoute.jsx
    │   │
    │   └── jobs/               # Feature-specific components (lesson 6–15)
    │       ├── JobCard.jsx
    │       ├── JobList.jsx
    │       ├── JobForm.jsx
    │       ├── JobFilters.jsx
    │       └── JobStats.jsx
    │
    ├── pages/                  # Top-level page components (lesson 21–25)
    │   ├── Dashboard.jsx
    │   ├── JobsPage.jsx
    │   ├── AddJobPage.jsx
    │   ├── JobDetailPage.jsx
    │   ├── LoginPage.jsx
    │   ├── ProfilePage.jsx
    │   └── NotFoundPage.jsx
    │
    ├── hooks/                  # Custom hooks (lesson 19–20)
    │   ├── useJobs.js
    │   ├── useLocalStorage.js
    │   ├── useDebounce.js
    │   ├── useAuth.js
    │   └── useFetch.js
    │
    ├── store/                  # Redux Toolkit (lesson 31–33)
    │   ├── store.js
    │   └── slices/
    │       ├── jobsSlice.js
    │       ├── authSlice.js
    │       └── uiSlice.js
    │
    ├── context/                # React Context API (lesson 24–25)
    │   ├── ThemeContext.jsx
    │   └── AuthContext.jsx
    │
    ├── services/               # API communication layer (lesson 34)
    │   ├── api.js
    │   ├── jobsService.js
    │   └── authService.js
    │
    ├── utils/                  # Pure helper functions (lesson 27–29)
    │   ├── formatDate.js
    │   ├── jobHelpers.js
    │   ├── validators.js
    │   └── constants.js
    │
    └── assets/                 # Static files
        ├── logo.svg
        └── icons/
```

---

## 🗺️ Roadmap → File Mapping

Every lesson from the roadmap has a real home in this project.

### Lessons 1–5 · React Foundations

| Lesson | File |
|--------|------|
| React intro & roadmap | `README.md` (this file) |
| Creating project with Vite | `vite.config.js`, `package.json` |
| React flow & project structure | `src/main.jsx`, `src/App.jsx` |
| JSX deep dive | Every `.jsx` file — start with `JobCard.jsx` |
| Mini React / JSX understanding | Build `Button.jsx` from scratch before adding Tailwind |

### Lessons 6–10 · Components & UI Basics

| Lesson | File |
|--------|------|
| Functional components | `components/ui/Button.jsx`, `Badge.jsx`, `Spinner.jsx` |
| Component reusability | All `components/ui/` — write once, use everywhere |
| Props in React | `JobCard.jsx` receives a `job` object as props |
| Rendering lists & keys | `JobList.jsx` — `jobs.map(job => <JobCard key={job.id} />)` |
| Conditional rendering | `Badge.jsx` changes color/label based on status prop |

### Lessons 11–15 · React Hooks Basics

| Lesson | File |
|--------|------|
| `useState` fundamentals | `JobForm.jsx` — one state per field |
| Handling events | `JobForm.jsx` — onChange, onSubmit handlers |
| Counter / simple state project | `components/ui/Input.jsx` as a controlled input |
| Understanding re-rendering | Add console.log to `JobList.jsx`, watch renders |
| `useEffect` basics | `JobsPage.jsx` — fetch jobs on component mount |

### Lessons 16–20 · Projects + Hooks Practice

| Lesson | File |
|--------|------|
| Background changer project | `context/ThemeContext.jsx` — toggle dark/light mode |
| Password generator project | `utils/validators.js` — build a random string generator |
| Understanding `useRef` | `components/ui/Modal.jsx` — trap focus with useRef |
| Building custom hooks | All files in `hooks/` |
| Currency converter (custom hook) | `hooks/useFetch.js` — generic data fetching hook |

### Lessons 21–25 · Routing + State Management

| Lesson | File |
|--------|------|
| Intro to routing | `src/App.jsx` — add your first `<Routes>` |
| React Router | `App.jsx`, `Navbar.jsx` — `<Link>`, `useNavigate` |
| Nested & layout routes | `components/layout/Layout.jsx` wraps all pages via `<Outlet>` |
| Context API intro | `context/ThemeContext.jsx` |
| Context API project | `context/ThemeContext.jsx` — full theme toggler |

### Lessons 26–30 · Advanced React Concepts

| Lesson | File |
|--------|------|
| Local storage with React | `hooks/useLocalStorage.js` |
| Production folder structure | This entire project layout |
| Performance optimization | `hooks/useDebounce.js`, `JobFilters.jsx` |
| `useMemo` & `useCallback` | `JobStats.jsx` — memoize expensive calculations |
| Component optimization | `JobList.jsx` — wrap in `React.memo` |

### Lessons 31–35 · Advanced + Ecosystem

| Lesson | File |
|--------|------|
| Redux intro | `store/store.js` |
| Redux Toolkit basics | `store/slices/uiSlice.js` |
| Redux Toolkit project | `store/slices/jobsSlice.js` — full CRUD |
| API handling (Axios/Fetch) | `services/api.js`, `services/jobsService.js` |
| Final large project | This entire app wired together end-to-end |

---

## 🏗️ Build Order

Follow this sequence — each step produces something visible in the browser.

**Step 1 — Static UI (Lessons 1–10)**
```
main.jsx → App.jsx → JobCard.jsx → JobList.jsx → Badge.jsx
```
Goal: A hardcoded list of job cards renders on screen.

**Step 2 — Interactivity (Lessons 11–15)**
```
JobForm.jsx (useState + events) → JobsPage.jsx (useEffect fetch)
```
Goal: You can add a job via a form and it appears in the list.

**Step 3 — Custom Hooks (Lessons 19–20)**
```
hooks/useFetch.js → hooks/useDebounce.js → hooks/useJobs.js
```
Goal: Extract all stateful logic out of components into reusable hooks.

**Step 4 — Routing (Lessons 21–23)**
```
App.jsx routes → Layout.jsx → ProtectedRoute.jsx → JobDetailPage.jsx
```
Goal: Multiple pages with a shared navbar/sidebar, URL-based navigation.

**Step 5 — Context (Lessons 24–25)**
```
context/ThemeContext.jsx → wrap App in ThemeProvider
```
Goal: Dark/light mode toggle that persists across pages.

**Step 6 — Redux (Lessons 31–33)**
```
store/store.js → jobsSlice.js → authSlice.js → uiSlice.js
```
Goal: All app state lives in the Redux store, zero prop drilling.

**Step 7 — API Layer (Lesson 34)**
```
services/api.js → services/jobsService.js → async thunks in jobsSlice.js
```
Goal: Real API calls with loading/error states, JWT auth token attached automatically.

**Step 8 — Performance (Lessons 28–30)**
```
JobStats.jsx (useMemo) → JobList.jsx (React.memo) → hooks/useDebounce.js
```
Goal: App stays fast even with hundreds of job entries.

---

## ⚡ Getting Started

```bash
# 1. Create the project
npm create vite@latest job-tracker -- --template react
cd job-tracker

# 2. Install dependencies
npm install react-router-dom @reduxjs/toolkit react-redux axios

# 3. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Start dev server
npm run dev
```

Add to `tailwind.config.js`:
```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🏷️ Badge Legend

| Badge | Meaning |
|-------|---------|
| `foundation` | Core React & Vite setup (lessons 1–5) |
| `hooks` | useState, useEffect, useRef, custom hooks (lessons 11–20) |
| `redux` | Redux Toolkit store & slices (lessons 31–33) |
| `routing` | React Router DOM (lessons 21–23) |
| `context` | Context API (lessons 24–25) |
| `api` | Axios / Fetch / async thunks (lesson 34) |
| `perf` | useMemo, useCallback, React.memo (lessons 28–30) |

---

## 📝 Notes

- Start simple — hardcode data before wiring up the API
- Each custom hook in `hooks/` should be built right after its corresponding lesson
- `context/ThemeContext.jsx` and `store/slices/uiSlice.js` both manage UI state — comparing the two approaches teaches you *when* to use Context vs Redux
- `utils/` functions are pure JS — write and test them before wrapping in `useMemo`
- The `ProtectedRoute.jsx` pattern is used in almost every real-world React app — understand it well

---

*Built while following the React roadmap — lessons 1 through 35.*