import { Execution } from "../xray-sdk/types";

export class InMemoryStore {
  private static instance: InMemoryStore;

  private executions: Map<string, Execution> = new Map();

  private constructor() {}

  static getInstance(): InMemoryStore {
    if (!InMemoryStore.instance) {
      InMemoryStore.instance = new InMemoryStore();
    }
    return InMemoryStore.instance;
  }

  save(execution: Execution): void {
    this.executions.set(execution.id, execution);
  }

  getAll(): Execution[] {
    return Array.from(this.executions.values());
  }

  getById(id: string): Execution | undefined {
    return this.executions.get(id);
  }
}
