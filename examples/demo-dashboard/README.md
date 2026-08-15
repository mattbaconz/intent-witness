# RelayOps demo

Intentionally generic operations dashboard used to dogfood Intent Witness.

The product job is **watch live execution and intervene on failure**. This UI does the opposite: equal KPI cards dominate the first viewport, live runs sit below duplicated “Recent Activity,” and Dashboard / Insights / Activity overlap.

## Run

```bash
npm install
npm run dev
```

App: http://localhost:5173

## Review with Intent Witness

From the Intent Witness repo (or this folder, after install):

```text
Review the RelayOps dashboard using Intent Witness.
```

The reviewer should inspect the rendered page, return `REVISE` at information-architecture depth, and forbid a restyle-only fix.
