export interface EvaluationRecord {
  subjectId: string;
  subjectLabel?: string;
  passed: boolean;
  reasons: string[];
  metrics?: Record<string, any>;
}

export interface StepRecord {
  id: string;
  name: string;
  startedAt: number;
  endedAt?: number;
  input?: any;
  output?: any;
  reasoning?: string;
  evaluations?: EvaluationRecord[];
  metadata?: Record<string, any>;
}

export interface Execution {
  id: string;
  name: string;
  startedAt: number;
  endedAt?: number;
  metadata?: Record<string, any>;
  steps: StepRecord[];
}