import { useState } from "react";
import { activity, kpis, runs, type RunStatus } from "./data";

type View = "dashboard" | "insights" | "activity";

const nav: { id: View; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "insights", label: "Insights" },
  { id: "activity", label: "Activity" },
];

function statusLabel(status: RunStatus) {
  if (status === "running") return "Running";
  if (status === "waiting") return "Needs input";
  if (status === "failed") return "Failed";
  return "Completed";
}

export default function App() {
  const [view, setView] = useState<View>("dashboard");

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="orb" aria-hidden="true" />
          <div>
            <strong>RelayOps</strong>
            <span>Agent control plane</span>
          </div>
        </div>
        <nav>
          {nav.map((item) => (
            <button
              key={item.id}
              className={view === item.id ? "active" : undefined}
              onClick={() => setView(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
          <button type="button" className="muted">
            Settings
          </button>
        </nav>
      </aside>

      <main>
        <header className="hero">
          <div>
            <p className="eyebrow">Overview</p>
            <h1>Welcome back</h1>
            <p className="lede">Here&apos;s what&apos;s happening today across your intelligent agent fleet.</p>
          </div>
          <button className="cta" type="button">
            New automation
          </button>
        </header>

        <section className="kpi-grid" aria-label="Overview metrics">
          {kpis.map((kpi) => (
            <article className="card kpi" key={kpi.label}>
              <p>{kpi.label}</p>
              <strong>{kpi.value}</strong>
              <span>{kpi.delta}</span>
            </article>
          ))}
        </section>

        <section className="card chart">
          <h2>{view === "insights" ? "Insights" : "Usage over time"}</h2>
          <p>Powerful visibility into tokens, success, and automation volume.</p>
          <div className="bars" aria-hidden="true">
            {["42%", "55%", "38%", "70%", "64%", "81%", "58%"].map((height, index) => (
              <div key={index} style={{ height }} />
            ))}
          </div>
        </section>

        <section className="card">
          <h2>{view === "activity" ? "Activity" : "Recent Activity"}</h2>
          <ul className="activity">
            {activity.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card runs">
          <h2>Active runs</h2>
          <p className="hint">View details for each workflow execution.</p>
          <table>
            <thead>
              <tr>
                <th>Run</th>
                <th>Agent</th>
                <th>Status</th>
                <th>Started</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id}>
                  <td>
                    <strong>{run.task}</strong>
                    <div className="mono">{run.id}</div>
                  </td>
                  <td>{run.agent}</td>
                  <td>
                    <span className={`pill ${run.status}`}>{statusLabel(run.status)}</span>
                  </td>
                  <td>{run.started}</td>
                  <td>
                    <button type="button">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
