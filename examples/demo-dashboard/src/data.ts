export type RunStatus = "running" | "waiting" | "failed" | "completed";

export type Run = {
  id: string;
  agent: string;
  task: string;
  status: RunStatus;
  started: string;
  lastEvent: string;
};

export const kpis = [
  { label: "Active Agents", value: "24", delta: "+3 vs last hour" },
  { label: "Success Rate", value: "98.4%", delta: "+0.2%" },
  { label: "Tokens Used", value: "12.8M", delta: "this billing period" },
  { label: "Incidents", value: "3", delta: "open" },
];

export const runs: Run[] = [
  {
    id: "run_8f21",
    agent: "docs-writer",
    task: "Regenerate API changelog from main",
    status: "failed",
    started: "2m ago",
    lastEvent: "Tool timeout on GitHub compare. Needs retry or smaller range.",
  },
  {
    id: "run_4aa0",
    agent: "qa-loop",
    task: "Playwright smoke against staging",
    status: "waiting",
    started: "6m ago",
    lastEvent: "Blocked on 2FA confirmation from @sam.",
  },
  {
    id: "run_11c3",
    agent: "triage-bot",
    task: "Classify inbound support dump",
    status: "running",
    started: "11m ago",
    lastEvent: "Step 4/9 — embedding attachments.",
  },
  {
    id: "run_90de",
    agent: "release-cut",
    task: "Cut 0.8.2 and notify Discord",
    status: "completed",
    started: "41m ago",
    lastEvent: "Published. Discord message sent.",
  },
  {
    id: "run_22b1",
    agent: "cost-watch",
    task: "Hourly token anomaly scan",
    status: "completed",
    started: "1h ago",
    lastEvent: "No anomalies.",
  },
];

export const activity = runs.map((run) => ({
  id: `evt_${run.id}`,
  title: `${run.agent} · ${run.status}`,
  detail: run.lastEvent,
  time: run.started,
}));
