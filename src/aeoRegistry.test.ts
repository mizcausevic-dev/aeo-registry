import { describe, expect, it } from "vitest";

import { claimBoard, payload, registry, summary } from "./services/registryService";

describe("registry service", () => {
  it("builds the expected top-line summary", () => {
    const stats = summary();

    expect(stats.manifestCount).toBe(4);
    expect(stats.readyCount).toBe(1);
    expect(stats.reviewCount).toBe(2);
    expect(stats.blockedCount).toBe(1);
    expect(stats.avgSourceCoverage).toBe(80);
  });

  it("sorts manifests by severity and claim pressure", () => {
    const manifests = registry();

    expect(manifests[0]?.status).toBe("blocked");
    expect(manifests[0]?.manifestId).toBe("saas-help-center-pack");
  });

  it("returns claims and publishers in the composite payload", () => {
    const snapshot = payload();

    expect(claimBoard().length).toBeGreaterThan(0);
    expect(snapshot.publishers.length).toBe(4);
  });
});
