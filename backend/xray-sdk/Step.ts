import { v4 as uuidv4 } from "uuid";
import { StepRecord, EvaluationRecord } from "./types";

export class Step {
  private record: StepRecord;

  constructor(stepName: string) {
    this.record = {
      id: uuidv4(),
      name: stepName,
      startedAt: Date.now(),
    };
  }

  recordInput(input: any): void {
    this.record.input = input;
  }

  recordOutput(output: any): void {
    this.record.output = output;
  }

  recordReasoning(reasoning: string): void {
    this.record.reasoning = reasoning;
  }

  recordEvaluations(evaluations: EvaluationRecord[]): void {
    this.record.evaluations = evaluations;
  }

  recordMetadata(metadata: Record<string, any>): void {
    this.record.metadata = metadata;
  }

  end(): void {
    this.record.endedAt = Date.now();
  }

  getRecord(): StepRecord {
    return this.record;
  }
}