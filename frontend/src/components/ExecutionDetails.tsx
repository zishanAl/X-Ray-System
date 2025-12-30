import type { XRayExecution } from "../types/xray";
import { StepCard } from "./StepCard";

interface ExecutionDetailsProps {
  execution?: XRayExecution;
}

export function ExecutionDetails({ execution }: ExecutionDetailsProps) {
  if (!execution) {
    return (
      <div className="execution-details empty">
        Select an execution to inspect
      </div>
    );
  }

  return (
    <div className="execution-details">
      <header>
        <h2>{execution.name}</h2>
        <div className="execution-meta">
          <span>ID: {execution.id}</span>
          <span>
            Steps: {execution.steps.length}
          </span>
        </div>
      </header>

      <div className="steps">
        {execution.steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}