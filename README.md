# X-Ray Execution Debugger

X-Ray is a lightweight execution observability system designed to **explain _why_ decisions were made**, not just _what_ happened.

It captures structured execution steps, inputs, outputs, and evaluations, and renders them in a debugger-style UI optimized for reasoning and traceability.

---

## 🎯 Problem Statement

In modern pipelines (retrieval, filtering, scoring, ranking, LLM workflows), debugging is hard because:

- Logs are scattered
- Decision rationale is lost
- Failures are opaque

**X-Ray solves this by making decisions first-class data.**

---

## 🧠 Core Idea

Each execution is recorded as an ordered sequence of **steps**:

- Step metadata (name, type)
- Inputs & outputs (structured JSON)
- Evaluations (pass/fail + reasons)

The frontend renders this as a **timeline debugger**.

---

## 🏗️ Architecture

### Backend
- **Node.js + Express**
- TypeScript
- In-memory singleton execution store
- UUID-based execution IDs
- Auto-registration of executions on completion

### Frontend
- **React + Vite**
- TypeScript
- Plain CSS (debugger-style UI)
- Oldest-first execution ordering

---

## 📂 Project Structure

```

root/
│
├── backend/
│   ├── api/
│   ├── demo-pipeline/
│   ├── store/
│   ├── xray-sdk/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── types/
│   │   ├── api/
│   │   ├── App.tsx
│   │   └── index.css
│   └── package.json
│
└── README.md

````

---

## ▶️ How to Run

### Backend
```bash
cd backend
npm install
npm run dev
````

Runs on:
`http://localhost:3000`

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:
`http://localhost:5173`

---

## 🧪 Demo Execution

* Backend exposes a demo endpoint
* Clicking **“Run Demo”** in UI triggers a new execution
* Execution auto-appears in sidebar

---

## 🔍 What You Can Observe

* Step-by-step execution flow
* Input/output JSON per step
* Candidate-level evaluation results
* Clear failure reasons

---

## 🚀 Extensibility

Designed to support future steps such as:

* LLM relevance evaluation
* Ranking & selection
* Confidence scoring
* Human-in-the-loop overrides

Steps are fully pluggable.

---

## 🧠 Design Principles

* Reasoning > Metrics
* Structure > Logs
* Explainability first
* Clean, explicit TypeScript models

---

## 📌 Use Cases

* LLM pipelines
* Search & ranking systems
* Data validation workflows
* Decision auditing systems

---