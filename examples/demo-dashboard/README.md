# RelayOps demo

Intentionally generic operations dashboard used to dogfood Deliberate.

The product job is **watch live execution and intervene on failure**. This UI does the opposite: equal KPI cards dominate the first viewport, live runs sit below duplicated “Recent Activity,” and Dashboard / Insights / Activity overlap.

## Run

```bash
npm install
npm run dev
```

App: http://localhost:5173

## Review with Deliberate

From the Deliberate repo (or this folder, after install):

```text
Review the RelayOps dashboard using Deliberate.
```

The reviewer should inspect the rendered page, return `REVISE` at information-architecture depth, and forbid a restyle-only fix.
