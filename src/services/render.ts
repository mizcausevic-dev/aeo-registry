import { claimBoard, publisherBoard, registry, summary } from "./registryService";

function pageShell(title: string, active: string, body: string) {
  const nav = [
    ["/", "Overview", "overview"],
    ["/registry", "Registry", "registry"],
    ["/claims", "Claims", "claims"],
    ["/publishers", "Publishers", "publishers"],
    ["/verification", "Verification", "verification"],
    ["/docs", "Docs", "docs"]
  ] as const;

  const navLinks = nav
    .map(([href, label, key]) => `<a class="nav-link ${active === key ? "active" : ""}" href="${href}">${label}</a>`)
    .join("");

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${title}</title>
      <style>
        :root {
          color-scheme: dark;
          --page: #08111f;
          --line: rgba(255,255,255,0.08);
          --text: #f3f7ff;
          --muted: #9caecc;
          --accent: #7bd0ff;
          --accent-2: #6d65ff;
          --good: #4ce0a2;
          --watch: #f5c46b;
          --bad: #ff7f91;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Inter, "Segoe UI", system-ui, sans-serif;
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(123,208,255,0.12), transparent 24%),
            linear-gradient(180deg, #050b15 0%, #081221 100%);
        }
        a { color: inherit; text-decoration: none; }
        .shell { max-width: 1440px; margin: 0 auto; padding: 28px; }
        .topbar {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 18px 22px; background: rgba(8,15,27,0.78); border: 1px solid var(--line);
          border-radius: 24px; box-shadow: 0 22px 54px rgba(0,0,0,0.26); backdrop-filter: blur(18px);
        }
        .brand { display: flex; align-items: center; gap: 14px; }
        .brand-mark {
          width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: white; font-weight: 900; letter-spacing: 0.04em;
        }
        .brand-copy strong { display: block; font-size: 18px; }
        .brand-copy span { display: block; margin-top: 4px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); }
        .nav-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .nav-link {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 16px; border-radius: 999px; border: 1px solid var(--line);
          background: rgba(255,255,255,0.03); color: #b6c6de;
          font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
        }
        .nav-link.active { background: linear-gradient(135deg, #1094c8, #6d65ff); color: white; }
        .hero {
          margin-top: 20px; padding: 28px; border-radius: 28px; border: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(11,21,38,0.95), rgba(8,15,27,0.94));
          box-shadow: 0 26px 58px rgba(0,0,0,0.28);
        }
        .eyebrow { color: var(--accent); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 800; }
        h1 {
          margin: 14px 0 12px; font-size: clamp(38px, 5vw, 68px); line-height: 0.95;
          letter-spacing: -0.05em; font-family: Georgia, "Times New Roman", serif;
        }
        .hero p { margin: 0; max-width: 940px; color: var(--muted); font-size: 18px; line-height: 1.6; }
        .callout {
          margin-top: 20px; padding: 18px 20px; border-radius: 18px;
          background: rgba(255,255,255,0.04); border: 1px solid var(--line);
        }
        .callout strong {
          display: block; color: var(--watch); font-size: 10px; text-transform: uppercase;
          letter-spacing: 0.18em; margin-bottom: 8px;
        }
        .callout span { color: #e6eefb; font-size: 16px; line-height: 1.55; }
        .grid-4, .grid-2, .grid-1 { display: grid; gap: 18px; margin-top: 20px; }
        .grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .grid-2 { grid-template-columns: 1.15fr 0.95fr; }
        .grid-1 { grid-template-columns: 1fr; }
        .card, .table-shell {
          background: rgba(10,18,32,0.9); border: 1px solid var(--line);
          border-radius: 24px; box-shadow: 0 22px 54px rgba(0,0,0,0.18);
        }
        .metric-card { padding: 20px; }
        .metric-card .label {
          color: #7588a6; font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em; font-weight: 800;
        }
        .metric-card .value { margin-top: 12px; font-size: 40px; font-weight: 900; letter-spacing: -0.04em; }
        .metric-card p { margin: 12px 0 0; color: var(--muted); font-size: 14px; line-height: 1.5; }
        .section-card { padding: 22px; }
        .section-card h2 {
          margin: 12px 0 8px; font-size: 24px; letter-spacing: -0.03em; font-family: Georgia, "Times New Roman", serif;
        }
        .section-card p { margin: 0; color: var(--muted); line-height: 1.6; }
        .list-row {
          padding: 18px 0; border-top: 1px solid rgba(255,255,255,0.06);
          display: grid; gap: 12px; grid-template-columns: minmax(0, 1.2fr) auto;
        }
        .list-row:first-of-type { border-top: none; }
        .list-row h3 { margin: 0; font-size: 20px; letter-spacing: -0.02em; }
        .meta { margin-top: 8px; color: var(--muted); font-size: 13px; line-height: 1.55; }
        .pill {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 8px 12px; border-radius: 999px; font-size: 10px; font-weight: 900;
          letter-spacing: 0.14em; text-transform: uppercase; min-width: 104px;
        }
        .pill.ready { color: var(--good); background: rgba(76,224,162,0.12); border: 1px solid rgba(76,224,162,0.16); }
        .pill.review { color: var(--watch); background: rgba(245,196,107,0.12); border: 1px solid rgba(245,196,107,0.16); }
        .pill.blocked { color: var(--bad); background: rgba(255,127,145,0.12); border: 1px solid rgba(255,127,145,0.16); }
        .signal-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
        .signal {
          display: inline-flex; align-items: center; padding: 8px 10px; border-radius: 999px;
          background: rgba(123,208,255,0.08); color: var(--accent);
          font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
        }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 16px 18px; text-align: left; vertical-align: top; }
        thead th {
          color: #7387a6; font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        tbody tr + tr td { border-top: 1px solid rgba(255,255,255,0.06); }
        tbody td { color: #eaf2ff; font-size: 14px; line-height: 1.5; }
        .mono { font-family: "Cascadia Code", Consolas, monospace; }
        .footer {
          margin-top: 18px; color: #7f93b1; font-size: 12px; display: flex; justify-content: space-between; gap: 12px;
        }
        @media (max-width: 1180px) { .grid-4, .grid-2 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 840px) { .grid-4, .grid-2 { grid-template-columns: 1fr; } .topbar { display: block; } }
      </style>
    </head>
    <body>
      <main class="shell">
        <section class="topbar">
          <div class="brand">
            <div class="brand-mark">AR</div>
            <div class="brand-copy">
              <strong>AEO Registry</strong>
              <span>Manifest inventory + citation readiness index</span>
            </div>
          </div>
          <div class="nav-row">${navLinks}</div>
        </section>
        ${body}
        <div class="footer">
          <span>Tracks AEO manifests, claim surfaces, and publisher readiness across answer-engine programs.</span>
          <span>Built to keep weak manifests out of public answer surfaces until they earn citation-safe posture.</span>
        </div>
      </main>
    </body>
  </html>`;
}

export function renderOverview() {
  const stats = summary();

  return pageShell(
    "AEO Registry",
    "overview",
    `
      <section class="hero">
        <div class="eyebrow">AEO registry</div>
        <h1>Track which answer-engine manifests are ready to be cited, indexed, and trusted.</h1>
        <p>The registry view is for the teams managing AEO infrastructure at scale: publishers, manifests, claim surfaces, freshness posture, and whether any package is still too weak to expose in public answer channels.</p>
        <div class="callout">
          <strong>Lead recommendation</strong>
          <span>${stats.leadRecommendation}</span>
        </div>
      </section>
      <section class="grid-4">
        <article class="card metric-card"><div class="label">Manifests tracked</div><div class="value">${stats.manifestCount}</div><p>Registry entries currently under readiness review.</p></article>
        <article class="card metric-card"><div class="label">Ready now</div><div class="value">${stats.readyCount}</div><p>Manifests currently safe to publish across answer surfaces.</p></article>
        <article class="card metric-card"><div class="label">Blocked</div><div class="value">${stats.blockedCount}</div><p>Entries that should stay out of public answer channels.</p></article>
        <article class="card metric-card"><div class="label">Avg source coverage</div><div class="value">${stats.avgSourceCoverage}%</div><p>Mean citation and source backing across the registry.</p></article>
      </section>
      <section class="grid-2">
        <article class="card section-card">
          <div class="eyebrow">Claim pressure</div>
          <h2>The claim surfaces most likely to fail citation review first.</h2>
          <p>This queue keeps weak or stale claims visible before they quietly degrade answer-engine performance.</p>
          ${claimBoard().slice(0, 3).map((claim) => `
            <div class="list-row">
              <div>
                <h3>${claim.claimTitle}</h3>
                <div class="meta">${claim.publisher} · ${claim.entity} · ${claim.citationSurface}</div>
                <div class="signal-list"><span class="signal">${claim.sourceCount} sources</span><span class="signal">${claim.freshnessDays} days stale</span><span class="signal">${claim.nextAction}</span></div>
              </div>
              <div><span class="pill ${claim.severity}">${claim.severity}</span></div>
            </div>
          `).join("")}
        </article>
        <article class="card section-card">
          <div class="eyebrow">Publisher posture</div>
          <h2>Which publishers are carrying the most registry risk.</h2>
          <p>Blocked entries, freshness lag, and source coverage tell you where the next AEO cleanup cycle should start.</p>
          ${publisherBoard().map((publisher) => `
            <div class="list-row">
              <div>
                <h3>${publisher.publisher}</h3>
                <div class="meta">${publisher.portfolioCount} manifest${publisher.portfolioCount === 1 ? "" : "s"} · avg freshness ${publisher.avgFreshnessDays} days</div>
                <div class="signal-list"><span class="signal">${publisher.avgSourceCoverage}% source coverage</span><span class="signal">${publisher.leadRisk}</span></div>
              </div>
              <div><span class="pill ${publisher.blockedCount > 0 ? "blocked" : publisher.readyCount > 0 ? "ready" : "review"}">${publisher.blockedCount > 0 ? "blocked" : publisher.readyCount > 0 ? "ready" : "review"}</span></div>
            </div>
          `).join("")}
        </article>
      </section>
    `
  );
}

export function renderRegistry() {
  return pageShell(
    "AEO Registry",
    "registry",
    `
      <section class="hero">
        <div class="eyebrow">Registry board</div>
        <h1>Registry snapshots for manifests, readiness posture, and answer-surface coverage.</h1>
        <p>Each manifest shows its publisher, version, freshness, answer-surface footprint, and whether it has earned ready, review, or blocked status.</p>
      </section>
      <section class="grid-1">
        <article class="table-shell">
          <table>
            <thead>
              <tr>
                <th>Manifest</th>
                <th>Publisher</th>
                <th>Version</th>
                <th>Claims</th>
                <th>Source Coverage</th>
                <th>Freshness</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${registry().map((manifest) => `
                <tr>
                  <td><strong>${manifest.siteName}</strong><div class="meta mono">${manifest.manifestId}</div></td>
                  <td>${manifest.publisher}</td>
                  <td class="mono">${manifest.version}</td>
                  <td>${manifest.claimCount} claims · ${manifest.answerSurfaceCoverage}% surface</td>
                  <td>${manifest.sourceCoverage}%</td>
                  <td>${manifest.freshnessLabel}</td>
                  <td><span class="pill ${manifest.status}">${manifest.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      </section>
    `
  );
}

export function renderClaims() {
  return pageShell(
    "AEO Registry",
    "claims",
    `
      <section class="hero">
        <div class="eyebrow">Claim board</div>
        <h1>Review every claim surface that is carrying freshness or citation risk.</h1>
        <p>The claim board keeps the registry focused on the actual statements that will be extracted, cited, or downgraded by answer engines.</p>
      </section>
      <section class="grid-1">
        <article class="card section-card">
          ${claimBoard().map((claim) => `
            <div class="list-row">
              <div>
                <h3>${claim.claimTitle}</h3>
                <div class="meta">${claim.publisher} · ${claim.entity} · ${claim.citationSurface}</div>
                <div class="meta">${claim.sourceCount} source(s) · freshness ${claim.freshnessDays} days</div>
                <div class="signal-list"><span class="signal">${claim.nextAction}</span></div>
              </div>
              <div><span class="pill ${claim.severity}">${claim.severity}</span></div>
            </div>
          `).join("")}
        </article>
      </section>
    `
  );
}

export function renderPublishers() {
  return pageShell(
    "AEO Registry",
    "publishers",
    `
      <section class="hero">
        <div class="eyebrow">Publisher board</div>
        <h1>See which publisher portfolios are closest to readiness and which still need governance work.</h1>
        <p>This is the portfolio view for AEO programs managing several manifest families across product, support, regulated, or vertical content surfaces.</p>
      </section>
      <section class="grid-1">
        <article class="card section-card">
          ${publisherBoard().map((publisher) => `
            <div class="list-row">
              <div>
                <h3>${publisher.publisher}</h3>
                <div class="meta">${publisher.portfolioCount} manifest${publisher.portfolioCount === 1 ? "" : "s"} · ${publisher.readyCount} ready · ${publisher.blockedCount} blocked</div>
                <div class="signal-list"><span class="signal">${publisher.avgSourceCoverage}% source coverage</span><span class="signal">${publisher.avgFreshnessDays} days avg freshness</span><span class="signal">${publisher.leadRisk}</span></div>
              </div>
              <div><span class="pill ${publisher.blockedCount > 0 ? "blocked" : publisher.readyCount > 0 ? "ready" : "review"}">${publisher.blockedCount > 0 ? "blocked" : publisher.readyCount > 0 ? "ready" : "review"}</span></div>
            </div>
          `).join("")}
        </article>
      </section>
    `
  );
}

export function renderVerification() {
  const stats = summary();
  return pageShell(
    "AEO Registry",
    "verification",
    `
      <section class="hero">
        <div class="eyebrow">Verification</div>
        <h1>What the registry proves about readiness, freshness, and source coverage right now.</h1>
        <p>The current snapshot shows how many manifests are ready, which ones are still blocked, and whether the registry is keeping pace with source freshness expectations.</p>
      </section>
      <section class="grid-4">
        <article class="card metric-card"><div class="label">Review lane</div><div class="value">${stats.reviewCount}</div><p>Manifest entries still carrying partial but recoverable gaps.</p></article>
        <article class="card metric-card"><div class="label">Blocked lane</div><div class="value">${stats.blockedCount}</div><p>Entries still too weak to expose in public answer channels.</p></article>
        <article class="card metric-card"><div class="label">Avg freshness</div><div class="value">${stats.avgFreshnessDays}</div><p>Average age of source freshness across registry entries.</p></article>
        <article class="card metric-card"><div class="label">Ready manifests</div><div class="value">${stats.readyCount}</div><p>Entries with enough source and answer-surface integrity to publish.</p></article>
      </section>
    `
  );
}

export function renderDocs() {
  const routes = [
    ["/", "Overview dashboard and lead recommendation"],
    ["/registry", "Manifest inventory with readiness posture"],
    ["/claims", "Claim review payload"],
    ["/publishers", "Publisher portfolio posture"],
    ["/verification", "Top-line proof summary"],
    ["/api/dashboard/summary", "Overview metrics"],
    ["/api/manifests", "Manifest registry payload"],
    ["/api/claims", "Claim review payload"],
    ["/api/publishers", "Publisher posture payload"],
    ["/api/sample", "Full composite payload"]
  ] as const;

  return pageShell(
    "AEO Registry",
    "docs",
    `
      <section class="hero">
        <div class="eyebrow">Docs</div>
        <h1>Route and payload surface for the AEO registry.</h1>
        <p>The HTML routes tell the operator story. The JSON routes expose the same readiness posture for automation, review pipelines, or other AEO tooling.</p>
      </section>
      <section class="grid-1">
        <article class="table-shell">
          <table>
            <thead>
              <tr><th>Route</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              ${routes.map(([route, purpose]) => `
                <tr>
                  <td class="mono">${route}</td>
                  <td>${purpose}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      </section>
    `
  );
}
