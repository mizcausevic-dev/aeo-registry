# Changelog

All notable changes to this project are documented here.

## [1.0.0] - 2026-05-15

### Released
- Published **aeo-registry** as a public TypeScript and Express registry for manifest readiness, claim-surface review, and publisher portfolio posture.
- Packaged the implementation, browser-rendered proof assets, validation flow, and docs into a repo that treats AEO inventory as an operating system concern instead of a folder of disconnected specs.
- Clarified the core problem the project is addressing: once AEO programs scale, weak manifests stay live because nobody owns freshness, source coverage, or answer-surface readiness centrally.

### Why this mattered
- Existing SEO and schema tooling helps teams publish assets, but it does not always give them a durable registry of what is actually safe to expose.
- AEO teams need something closer to package governance: an index of manifests, claims, and publishers that can be reviewed before weak entries degrade trust.
- This release turns that gap into a visible control-plane problem.

## [0.1.0] - 2026-02-27

### Shipped
- Cut the first coherent internal version of the registry with manifest records, claim queues, and publisher summaries.
- Anchored the system around freshness, source coverage, and answer-surface readiness instead of around simple file existence.
- Established the route and payload shape used by the public version.

## [Prototype] - 2025-08-12

### Built
- Built the first runnable prototype for indexing AEO manifests and scoring them by readiness.
- Tested the concept against the kinds of failures that appear in scaling answer-engine programs: stale `llm.txt`, shallow citations, and uneven publisher hygiene.
- Confirmed that a registry lens was more useful than another single-manifest validator.

## [Design Phase] - 2024-04-23

### Designed
- Framed the system around operator visibility and publisher accountability rather than around individual authoring workflows.
- Chose examples that made sense for infrastructure, SaaS, fintech, and vertical answer-surface programs.
- Defined the output as something a content or AEO lead could review quickly.

## [Idea Origin] - 2023-06-28

### Observed
- The original idea surfaced while looking at how answer-surface programs accumulate manifest sprawl without accumulating equal governance.
- The recurring pattern was that manifest production was easy to start and difficult to keep coherent at scale.

## [Background Signals] - 2022-10-18

### Context
- Earlier work around search, knowledge packaging, and evidence-backed publishing made one pattern obvious: if answer assets are not indexed and scored somewhere central, weak ones tend to remain live by default.
- That pattern shaped the thinking behind this repo well before the public version existed.
