export type RegistryStatus = "ready" | "review" | "blocked";

export interface ManifestRecord {
  manifestId: string;
  publisher: string;
  siteName: string;
  canonicalUrl: string;
  version: string;
  status: RegistryStatus;
  vertical: string;
  freshnessDays: number;
  entityCount: number;
  claimCount: number;
  sourceCoverage: number;
  answerSurfaceCoverage: number;
  lastValidationDays: number;
  schemaTypeCount: number;
  channels: string[];
  leadEntity: string;
}

export interface ClaimRecord {
  manifestId: string;
  publisher: string;
  claimTitle: string;
  entity: string;
  severity: RegistryStatus;
  sourceCount: number;
  freshnessDays: number;
  citationSurface: string;
  nextAction: string;
}

export interface PublisherRecord {
  publisher: string;
  portfolioCount: number;
  readyCount: number;
  blockedCount: number;
  avgSourceCoverage: number;
  avgFreshnessDays: number;
  leadRisk: string;
}
