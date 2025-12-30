import type { StepEvaluation } from "../types/xray";

interface EvaluationsTableProps {
  evaluations: StepEvaluation[];
}

export function EvaluationsTable({ evaluations }: EvaluationsTableProps) {
  return (
    <table className="evaluations-table">
      <thead>
        <tr>
          <th>Candidate</th>
          <th>Status</th>
          <th>Reasons</th>
        </tr>
      </thead>
      <tbody>
        {evaluations.map((evaluation) => (
          <tr
            key={evaluation.subjectId}
            className={evaluation.passed ? "passed" : "failed"}
          >
            <td>{evaluation.subjectLabel}</td>
            <td>{evaluation.passed ? "PASS" : "FAIL"}</td>
            <td>
              {evaluation.reasons.length === 0
                ? "—"
                : evaluation.reasons.join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}