# X-Ray — Execution Debugger

X-Ray is a lightweight execution debugger designed to make **multi-step, non-deterministic decision systems explainable**. Instead of answering *“what happened?”*, X-Ray focuses on answering **“why did the system make this decision?”**

It models each run as a structured execution composed of ordered steps, where every step captures inputs, outputs, evaluations, and explicit reasoning.

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or later recommended)
- npm
- A modern browser


### Backend Setup
```bash
cd backend
npm install
npm run dev
``` 

The backend runs on **[http://localhost:3000](http://localhost:3000)**

Available endpoints:
- `POST /run-demo` → triggers a demo execution
- `GET /executions` → returns all executions
- `GET /executions/:id` → returns a single execution


### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **[http://localhost:5173](http://localhost:5173)**

You can trigger executions either:
- From the UI using the **Run Demo** button
- Directly via the backend API

---

## Approach & Design

### Core Idea
- Traditional logs and traces capture *events*. X-Ray captures **decisions**.
- Each execution is treated as a first-class entity consisting of ordered steps.
- Each step explicitly records:
    * Start and end time
    * Input and output
    * Optional evaluations (pass/fail + reasons)
    * Human-readable reasoning.
- This makes it possible to reconstruct *why* a final outcome occurred.

### Backend Design
- Built with **Node.js, Express, and TypeScript**
- Executions are created via a central `Recorder`
- Execution completion is auto-registered to prevent accidental data loss
- Uses an **in-memory singleton store** to preserve execution order and ensure simplicity
- Designed to be extensible for additional steps such as LLM relevance checks or ranking

### Frontend Design
- Built with **React + Vite**
- Debugger-style UI with:
  * Execution list (chronological)
  * Step-by-step timeline
  * Evaluation tables showing pass/fail reasons
- Minimal styling to prioritize clarity over visual noise

---

## Known Limitations
- These are intentional trade-offs given the scope and time constraints:
    * Executions are stored **in memory** and do not persist across server restarts
    * No authentication or access control
    * No large-scale performance optimizations
    * Demo data is mocked and not connected to real APIs or LLMs.
- The focus of this project is **execution modeling and explainability**, not production infrastructure.

---

## Future Improvements

- With more time, the following extensions would be natural next steps:
    * Persistent storage (database-backed execution store)
    * Advanced querying and filtering across executions and steps
    * Execution comparison and diffing
    * Native support for LLM prompts, responses, and confidence scores
    * Streaming or partial execution visualization for long-running pipelines
    * Role-based access and multi-tenant support.
- The current architecture intentionally keeps these additions straightforward.