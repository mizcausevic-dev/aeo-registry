import type { ClaimRecord, ManifestRecord, PublisherRecord } from "../types/registry";

export const manifests: ManifestRecord[] = [
  {
    manifestId: "kg-protocol-suite",
    publisher: "Kinetic Gain",
    siteName: "Protocol Suite",
    canonicalUrl: "https://kineticgain.com/protocol-suite",
    version: "1.4.2",
    status: "ready",
    vertical: "AEO Infrastructure",
    freshnessDays: 3,
    entityCount: 14,
    claimCount: 28,
    sourceCoverage: 96,
    answerSurfaceCoverage: 92,
    lastValidationDays: 1,
    schemaTypeCount: 7,
    channels: ["llm.txt", "JSON-LD", "FAQ", "docs"],
    leadEntity: "Kinetic Gain Protocol Suite"
  },
  {
    manifestId: "fintech-reg-graph",
    publisher: "Harbor Ledger Labs",
    siteName: "Regulatory Knowledge Graph",
    canonicalUrl: "https://harborledger.example/registry",
    version: "0.9.7",
    status: "review",
    vertical: "Fintech",
    freshnessDays: 19,
    entityCount: 31,
    claimCount: 62,
    sourceCoverage: 81,
    answerSurfaceCoverage: 74,
    lastValidationDays: 11,
    schemaTypeCount: 9,
    channels: ["llm.txt", "JSON-LD", "knowledge graph"],
    leadEntity: "FinancialProduct"
  },
  {
    manifestId: "saas-help-center-pack",
    publisher: "Northstar SaaS",
    siteName: "Help Center GEO Pack",
    canonicalUrl: "https://northstar.example/help/aeo",
    version: "0.8.3",
    status: "blocked",
    vertical: "Enterprise SaaS",
    freshnessDays: 41,
    entityCount: 9,
    claimCount: 16,
    sourceCoverage: 58,
    answerSurfaceCoverage: 49,
    lastValidationDays: 26,
    schemaTypeCount: 4,
    channels: ["FAQ", "support article schema"],
    leadEntity: "FAQPage"
  },
  {
    manifestId: "property-answer-pack",
    publisher: "Atlas Realty Group",
    siteName: "Listing Answer Surface",
    canonicalUrl: "https://atlasrealty.example/aeo",
    version: "1.1.0",
    status: "review",
    vertical: "Real Estate",
    freshnessDays: 8,
    entityCount: 22,
    claimCount: 37,
    sourceCoverage: 84,
    answerSurfaceCoverage: 77,
    lastValidationDays: 6,
    schemaTypeCount: 6,
    channels: ["llm.txt", "JSON-LD", "listing FAQ"],
    leadEntity: "RealEstateListing"
  }
];

export const claims: ClaimRecord[] = [
  {
    manifestId: "kg-protocol-suite",
    publisher: "Kinetic Gain",
    claimTitle: "Protocol manifests map each tool and artifact to source-backed evidence",
    entity: "Kinetic Gain Protocol Suite",
    severity: "ready",
    sourceCount: 4,
    freshnessDays: 3,
    citationSurface: "docs / llm.txt",
    nextAction: "Maintain nightly validation and publish version badges."
  },
  {
    manifestId: "fintech-reg-graph",
    publisher: "Harbor Ledger Labs",
    claimTitle: "Regulatory filing relationships are current for FCA and FINRA entity edges",
    entity: "FinancialProduct",
    severity: "review",
    sourceCount: 2,
    freshnessDays: 18,
    citationSurface: "knowledge graph export",
    nextAction: "Refresh filings and rebuild entity edge summaries before the next export."
  },
  {
    manifestId: "saas-help-center-pack",
    publisher: "Northstar SaaS",
    claimTitle: "Help-center manifest is safe for AI answer extraction",
    entity: "FAQPage",
    severity: "blocked",
    sourceCount: 1,
    freshnessDays: 41,
    citationSurface: "support article schema",
    nextAction: "Backfill citations, strengthen entity IDs, and rerun claim validation."
  },
  {
    manifestId: "property-answer-pack",
    publisher: "Atlas Realty Group",
    claimTitle: "Listing answer manifests carry enough source coverage for buyer-facing FAQ citation",
    entity: "RealEstateListing",
    severity: "review",
    sourceCount: 2,
    freshnessDays: 9,
    citationSurface: "listing faq",
    nextAction: "Add missing neighborhood and price-history sources to reach publish-safe posture."
  }
];

export const publishers: PublisherRecord[] = [
  {
    publisher: "Kinetic Gain",
    portfolioCount: 1,
    readyCount: 1,
    blockedCount: 0,
    avgSourceCoverage: 96,
    avgFreshnessDays: 3,
    leadRisk: "No immediate registry risk."
  },
  {
    publisher: "Harbor Ledger Labs",
    portfolioCount: 1,
    readyCount: 0,
    blockedCount: 0,
    avgSourceCoverage: 81,
    avgFreshnessDays: 19,
    leadRisk: "Source freshness is slipping on regulated claims."
  },
  {
    publisher: "Northstar SaaS",
    portfolioCount: 1,
    readyCount: 0,
    blockedCount: 1,
    avgSourceCoverage: 58,
    avgFreshnessDays: 41,
    leadRisk: "Claim surfaces are under-cited and should not publish."
  },
  {
    publisher: "Atlas Realty Group",
    portfolioCount: 1,
    readyCount: 0,
    blockedCount: 0,
    avgSourceCoverage: 84,
    avgFreshnessDays: 8,
    leadRisk: "Answer-surface coverage is close but not consistently complete."
  }
];
