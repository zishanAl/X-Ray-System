// src/App.tsx

import { useEffect, useState } from "react";

import type { XRayExecution } from "./types/xray";
import { fetchExecutions, runDemo } from "./api/xrayApi";
import { ExecutionList } from "./components/ExecutionList";
import { ExecutionDetails } from "./components/ExecutionDetails";

export default function App() {
  const [executions, setExecutions] = useState<XRayExecution[]>([]);
  const [selectedExecutionId, setSelectedExecutionId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    loadExecutions();
  }, []);

  async function loadExecutions() {
    try {
      setLoading(true);
      setError(undefined);

      const data = await fetchExecutions();
      setExecutions(data);

      if (!selectedExecutionId && data.length > 0) {
        setSelectedExecutionId(data[0].id);
      }
    } catch (err) {
      setError("Failed to load executions");
    } finally {
      setLoading(false);
    }
  }

  async function handleRunDemo() {
    try {
      setLoading(true);
      await runDemo();
      await loadExecutions();
    } catch {
      setError("Failed to run demo");
    }
  }

  const selectedExecution = executions.find(
    (e) => e.id === selectedExecutionId
  );

  return (
    <div className="app-container">
      <aside className="sidebar">
        <button onClick={handleRunDemo} disabled={loading}>
          Run Demo
        </button>

        <ExecutionList
          executions={executions}
          selectedExecutionId={selectedExecutionId}
          onSelect={setSelectedExecutionId}
        />
      </aside>

      <main className="main-content">
        {loading && <div className="status">Loading…</div>}
        {error && <div className="error">{error}</div>}

        <ExecutionDetails execution={selectedExecution} />
      </main>
    </div>
  );
}
