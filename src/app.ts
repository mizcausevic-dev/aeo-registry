import express from "express";

import { claimBoard, payload, publisherBoard, registry, summary } from "./services/registryService";
import {
  renderClaims,
  renderDocs,
  renderOverview,
  renderPublishers,
  renderRegistry,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5084);

app.get("/", (_req, res) => {
  res.type("html").send(renderOverview());
});

app.get("/registry", (_req, res) => {
  res.type("html").send(renderRegistry());
});

app.get("/claims", (_req, res) => {
  res.type("html").send(renderClaims());
});

app.get("/publishers", (_req, res) => {
  res.type("html").send(renderPublishers());
});

app.get("/verification", (_req, res) => {
  res.type("html").send(renderVerification());
});

app.get("/docs", (_req, res) => {
  res.type("html").send(renderDocs());
});

app.get("/api/dashboard/summary", (_req, res) => {
  res.json(summary());
});

app.get("/api/manifests", (_req, res) => {
  res.json(registry());
});

app.get("/api/claims", (_req, res) => {
  res.json(claimBoard());
});

app.get("/api/publishers", (_req, res) => {
  res.json(publisherBoard());
});

app.get("/api/sample", (_req, res) => {
  res.json(payload());
});

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`AEO Registry listening on http://127.0.0.1:${port}`);
  });
}

export default app;
