import { claimBoard, publisherBoard, registry, summary } from "../src/services/registryService";

const snapshot = {
  dashboard: summary(),
  blockedManifests: registry().filter((manifest) => manifest.status === "blocked").map((manifest) => manifest.manifestId),
  reviewClaims: claimBoard().filter((claim) => claim.severity !== "ready").map((claim) => ({
    manifestId: claim.manifestId,
    severity: claim.severity,
    freshnessDays: claim.freshnessDays
  })),
  publishers: publisherBoard().map((publisher) => ({
    publisher: publisher.publisher,
    blockedCount: publisher.blockedCount,
    avgSourceCoverage: publisher.avgSourceCoverage
  }))
};

console.log(JSON.stringify(snapshot, null, 2));
