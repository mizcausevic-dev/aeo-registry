# Why We Built This

**aeo-registry** came from a pattern that shows up as soon as answer-engine work matures past a handful of experiments: the number of manifests grows faster than the team’s ability to govern them. One property has an `llm.txt`. Another publishes JSON-LD packages. A support site ships FAQ schema. A product catalog adds entity metadata. Over time, those assets start behaving like packages in a software supply chain, but most teams still manage them more like isolated files or one-off launch tasks.

That becomes a real operating problem. A manifest can still exist and still be weak. A claim can still be extractable and still be under-cited. A publisher can still be shipping answer-surface metadata even while its freshness posture is drifting out of bounds. Traditional SEO tooling helps with parts of the surface. Schema validators help with syntax. Linting helps a single manifest at a time. What often remains missing is a **registry view** that answers the broader program-level questions:

- which manifests are actually ready to be trusted
- which claim surfaces are getting stale
- which publishers are carrying the most readiness risk
- which entries should be blocked before they degrade answer quality

We built **aeo-registry** to make that operating layer visible. The repo is intentionally centered on portfolio posture rather than on authoring mechanics. It assumes that manifests already exist or can be produced elsewhere. The real challenge is deciding whether those manifests are fresh enough, sourced enough, and coherent enough to stay live across answer surfaces.

Existing tools missed the mark for understandable reasons. Manifest validators are usually local and file-specific. Search tooling often focuses on performance after publication. Content systems focus on authoring, not package governance. The missing layer is the one that treats manifests as a managed inventory with statuses, queues, ownership, and release discipline.

That shaped the design philosophy:

- **operator-first**
  so the registry feels like a review queue, not a passive index
- **publisher-legible**
  so a content or AEO lead can immediately see portfolio pressure
- **claim-aware**
  so risky answer surfaces stay visible, not hidden inside aggregate scores
- **readiness-driven**
  so manifests have to earn public exposure instead of getting it by default

The current version uses sample registry data, but the underlying point is practical: answer-engine infrastructure needs indexing and governance, not just creation. Next on the roadmap are manifest diff views, exportable readiness policies, and stronger linkage into the rest of the Kinetic Gain AEO stack.
