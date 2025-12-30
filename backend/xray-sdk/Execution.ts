import { v4 as uuidv4 } from "uuid";
import { Execution as ExecutionRecord, StepRecord } from "./types";
import { Step } from "./Step";

export class Execution {
  private execution: ExecutionRecord;
  private activeStep: Step | null = null;

  constructor(name: string, metadata?: Record<string, any>) {
    this.execution = {
      id: uuidv4(),
      name,
      startedAt: Date.now(),
      metadata,
      steps: [],
    };
  }

  startStep(stepName: string): Step {
    if (this.activeStep) {
      this.activeStep.end();
      this.execution.steps.push(this.activeStep.getRecord());
    }

    const step = new Step(stepName);
    this.activeStep = step;

    return step;
  }

  end(): void {
    if (this.activeStep) {
      this.activeStep.end();
      this.execution.steps.push(this.activeStep.getRecord());
      this.activeStep = null;
    }

    this.execution.endedAt = Date.now();
  }

  getRecord(): ExecutionRecord {
    return this.execution;
  }

  getId(): string {
    return this.execution.id;
  }
}