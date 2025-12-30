import { Execution } from "./Execution";
import { Execution as ExecutionRecord } from "./types";
import { InMemoryStore } from "../store/InMemoryStore";

class XRayRecorder {
  private store: InMemoryStore;

  constructor() {
    this.store = InMemoryStore.getInstance();
  }

  startExecution(
    name: string,
    metadata?: Record<string, any>
  ): Execution {
    const execution = new Execution(name, metadata);

    const originalEnd = execution.end.bind(execution);

    execution.end = () => {
      originalEnd();
      this.store.save(execution.getRecord());
    };

    return execution;
  }

  getExecutions(): ExecutionRecord[] {
    return this.store.getAll();
  }

  getExecutionById(id: string): ExecutionRecord | undefined {
    return this.store.getById(id);
  }
}

export const XRay = new XRayRecorder();
