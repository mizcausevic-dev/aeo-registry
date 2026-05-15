import { claims, manifests, publishers } from "../data/sampleRegistry";

export function summary() {
  const readyCount = manifests.filter((manifest) => manifest.status === "ready").length;
  const reviewCount = manifests.filter((manifest) => manifest.status === "review").length;
  const blockedCount = manifests.filter((manifest) => manifest.status === "blocked").length;
  const avgSourceCoverage = Math.round(manifests.reduce((sum, manifest) => sum + manifest.sourceCoverage, 0) / manifests.length);
  const avgFreshnessDays = Math.round(manifests.reduce((sum, manifest) => sum + manifest.freshnessDays, 0) / manifests.length);

  return {
    manifestCount: manifests.length,
    readyCount,
    reviewCount,
    blockedCount,
    avgSourceCoverage,
    avgFreshnessDays,
    leadRecommendation:
      "Keep blocked manifests out of public answer surfaces until citations, freshness, and entity-link completeness all clear the registry review lane."
  };
}

export function registry() {
  const severityRank = { ready: 0, review: 1, blocked: 2 } as const;

  return manifests
    .map((manifest) => ({
      ...manifest,
      freshnessLabel: `${manifest.freshnessDays} days`,
      validationLabel: `${manifest.lastValidationDays} days`,
      channelCount: manifest.channels.length
    }))
    .sort((left, right) => severityRank[right.status] - severityRank[left.status] || right.claimCount - left.claimCount);
}

export function claimBoard() {
  const severityRank = { ready: 0, review: 1, blocked: 2 } as const;

  return [...claims].sort(
    (left, right) =>
      severityRank[right.severity] - severityRank[left.severity] ||
      right.freshnessDays - left.freshnessDays
  );
}

export function publisherBoard() {
  return [...publishers].sort((left, right) => right.blockedCount - left.blockedCount || right.avgFreshnessDays - left.avgFreshnessDays);
}

export function payload() {
  return {
    dashboard: summary(),
    registry: registry(),
    claims: claimBoard(),
    publishers: publisherBoard()
  };
}
