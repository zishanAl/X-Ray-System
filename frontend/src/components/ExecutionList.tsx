import type { XRayExecution } from "../types/xray";

interface ExecutionListProps {
  executions: XRayExecution[];
  selectedExecutionId?: string;
  onSelect: (executionId: string) => void;
}

export function ExecutionList({
  executions,
  selectedExecutionId,
  onSelect,
}: ExecutionListProps) {
  return (
    <div className="execution-list">
      <h2>Executions</h2>

      {executions.length === 0 && (
        <div className="empty-state">No executions yet</div>
      )}

      <ul>
        {executions.map((execution) => {
          const isSelected = execution.id === selectedExecutionId;

          return (
            <li
              key={execution.id}
              className={isSelected ? "selected" : ""}
              onClick={() => onSelect(execution.id)}
            >
              <div className="execution-name">{execution.name}</div>
              <div className="execution-id">{execution.id}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}