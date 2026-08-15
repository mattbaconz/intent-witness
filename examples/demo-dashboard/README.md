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

The parent/builder first captures the rendered desktop, mobile, and relevant interaction states under `.intent-witness/evidence/<review-id>/`. It then sends those paths and directly observed facts as the supplied evidence packet to the independent read-only reviewer.

The read-only reviewer does not open the app or capture more evidence. It judges only the supplied evidence and should return `REVISE` at information-architecture depth, forbidding a restyle-only fix. If evidence is missing, the parent fulfills the precise request and supplies an expanded packet for rereview.
