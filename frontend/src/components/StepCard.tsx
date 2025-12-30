import type { XRayStep } from "../types/xray";
import { EvaluationsTable } from "./EvaluationsTable";

interface StepCardProps {
  step: XRayStep;
}

export function StepCard({ step }: StepCardProps) {
  return (
    <div className="step-card">
      <header className="step-header">
        <h3>{step.name}</h3>
      </header>

      <div className="step-section">
        <strong>Input</strong>
        <pre>{JSON.stringify(step.input, null, 2)}</pre>
      </div>

      {step.reasoning && (
        <div className="step-section">
          <strong>Reasoning</strong>
          <p>{step.reasoning}</p>
        </div>
      )}

      <div className="step-section">
        <strong>Output</strong>
        <pre>{JSON.stringify(step.output, null, 2)}</pre>
      </div>

      {step.evaluations && step.evaluations.length > 0 && (
        <div className="step-section">
          <strong>Evaluations</strong>
          <EvaluationsTable evaluations={step.evaluations} />
        </div>
      )}
    </div>
  );
}