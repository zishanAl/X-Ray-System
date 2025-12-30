import express from "express";
import cors from "cors";
import { XRay } from "../xray-sdk/Recorder";
import { runCompetitorSelectionDemo } from "../demo-pipeline/competitorPipeline";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.post("/run-demo", (_req, res) => {
  const executionId = runCompetitorSelectionDemo();

  res.json({
    message: "Demo execution started",
    executionId,
  });
});


app.get("/executions", (_req, res) => {
  const executions = XRay.getExecutions();

  res.json(executions);
});

app.get("/executions/:id", (req, res) => {
  const execution = XRay.getExecutionById(req.params.id);

  if (!execution) {
    return res.status(404).json({ error: "Execution not found" });
  }

  res.json(execution);
});

app.listen(PORT, () => {
  console.log(`X-Ray backend running on http://localhost:${PORT}`);
});
