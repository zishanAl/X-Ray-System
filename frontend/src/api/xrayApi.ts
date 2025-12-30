import type { XRayExecution } from "../types/xray";

const BASE_URL = "http://localhost:3000";

export async function fetchExecutions(): Promise<XRayExecution[]> {
  const response = await fetch(`${BASE_URL}/executions`);

  if (!response.ok) {
    throw new Error("Failed to fetch executions");
  }

  return response.json();
}

export async function runDemo(): Promise<{ executionId: string }> {
  const response = await fetch(`${BASE_URL}/run-demo`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to start demo execution");
  }

  return response.json();
}
