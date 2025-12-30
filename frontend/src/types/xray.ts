export interface XRayExecution {
  id: string;
  name: string;
  startedAt: number;
  endedAt?: number;
  metadata?: Record<string, unknown>;
  steps: XRayStep[];
}

export interface XRayStep {
  id: string;
  name: string;
  startedAt: number;
  endedAt?: number;

  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  reasoning?: string;

  evaluations?: StepEvaluation[];
}

export interface StepEvaluation {
  subjectId: string;
  subjectLabel: string;
  passed: boolean;
  reasons: string[];
  metrics?: Record<string, number>;
}