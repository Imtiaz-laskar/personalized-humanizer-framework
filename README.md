# Personalized Humanizer Framework (PHF v1.0)

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Framework Version](https://img.shields.io/badge/PHF-v1.0-emerald.svg)](docs/01-project-specification.md)
[![Model Version](https://img.shields.io/badge/PHM-v1.0-purple.svg)](docs/03-personal-voice-model.md)

**Public, user-independent framework for building personalized writing humanizers from an individual's own corpus.**

> **Core Principle:** *Reconstruct how the writer thinks before reproducing how the writer sounds.*

---

## What is PHF?

The **Personalized Humanizer Framework (PHF)** reconstructs an individual's writing decisions from their own corpus and uses that model to transform AI-assisted drafts.

It does **not** attempt to make text generically "sound human", nor does it attempt to fool AI detectors through artificial typos, random punctuation, or syntactic degradation. Instead, it analyzes a user's authentic writing to build a 6-layer **Personal Voice Model** describing how that writer makes decisions across genres, contexts, and cognitive densities.

```
WRITING CORPUS
      │
      ▼
Corpus Ingestion & Classification
      │
      ▼
Voice Discovery & Multi-layer Analysis
      │
      ▼
AI / Editorial Contamination Overlay Analysis
      │
      ▼
Personal Voice Model & Voice Constitution
      │
      ▼
AI Draft + Target Context (Genre, Audience, Purpose)
      │
      ▼
Humanization Engine (Reasoning → Structure → Surface)
      │
      ▼
Validation Engine (Meaning, Evidence, Voice, F01-F18 Check)
      │
      ▼
Final Output + Diagnostic Score
```

---

## Table of Contents

- [Repository Blueprint](#repository-blueprint)
- [What the Model Learns](#what-the-model-learns)
- [What PHF Does NOT Do](#what-phf-does-not-do)
- [Quick Start](#quick-start)
- [CLI Reference](#cli-reference)
- [Documentation Index](#documentation-index)
- [The 6-Layer Personal Voice Model](#the-6-layer-personal-voice-model)
- [Failure Taxonomy (F01–F18)](#failure-taxonomy-f01f18)
- [Evaluation & Diagnostic Scoring](#evaluation--diagnostic-scoring)
- [Privacy & Model Separation](#privacy--model-separation)
- [Contributing](#contributing)
- [License](#license)

---

## Repository Blueprint

```text
personalized-humanizer/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── SECURITY.md
├── docs/
│   ├── 01-project-specification.md
│   ├── 02-system-architecture.md
│   ├── 03-personal-voice-model.md
│   ├── 04-corpus-analysis.md
│   ├── 05-humanizer-engine.md
│   ├── 06-genre-model.md
│   ├── 07-ai-contamination.md
│   ├── 08-failure-taxonomy.md
│   ├── 09-evaluation.md
│   ├── 10-prompt-specification.md
│   ├── 11-data-schemas.md
│   └── 12-implementation-guide.md
├── schemas/
│   ├── corpus.schema.json
│   ├── sample.schema.json
│   ├── voice-profile.schema.json
│   ├── genre-profile.schema.json
│   ├── ai-overlay.schema.json
│   ├── humanizer-config.schema.json
│   └── validation.schema.json
├── prompts/
│   ├── corpus-analysis.md
│   ├── voice-discovery.md
│   ├── genre-analysis.md
│   ├── ai-contamination.md
│   ├── humanizer.md
│   └── validation.md
├── engine/
│   ├── corpus/
│   ├── analysis/
│   ├── profiling/
│   ├── humanization/
│   └── validation/
├── examples/
│   ├── example-corpus/
│   ├── example-profile/
│   └── example-humanization/
├── tests/
│   ├── meaning/
│   ├── voice/
│   ├── genre/
│   ├── ai-patterns/
│   └── regression/
└── configs/
    └── default.yaml
```

---

## What the Model Learns

The Personal Voice Model isolates authentic writing traits along 6 discrete layers:

1. **Reasoning Profile:** Evidence discipline, claim strength relative to evidence, observation vs. interpretation, qualification behavior, conceptual separation, mechanism explanation, uncertainty handling.
2. **Rhetorical Profile:** Contextual question deployment, contrast handling, analogy use, concrete examples, deliberate repetition, emphasis, punchlines, metaphor, rhetorical compression.
3. **Structural Profile:** Opening strategies, information sequencing, paragraph architecture, transitions, zoom between levels, counterpoint placement, conclusion behavior.
4. **Sentence Profile:** Length distributions as contextual evidence, splitting vs. combining, functional short sentences, qualification placement, deliberate fragments, cadence, punctuation as relationship management.
5. **Surface Profile:** Vocabulary, register, formality, idioms, regional/linguistic influences, preferred punctuation, lexical repetition.
6. **Genre Profile:** Contextual calibration across 8 base genres (Public, Explanatory, Professional, Executive, Analytical, Technical, Academic, Personal) + Custom genres.

---

## What PHF Does NOT Do

- **Does NOT inject artificial errors or typos** to simulate human carelessness.
- **Does NOT force slang or informality** when context demands precision.
- **Does NOT guarantee AI-detector outcomes** or act as an evasion tool.
- **Does NOT impersonate other individuals** without their personal corpus.
- **Does NOT flatten all genres into a single monotonous style**.
- **Does NOT sacrifice meaning or epistemic rigor** for surface similarity.

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Prepare Your Corpus

Place representative writing samples in JSON format conforming to `schemas/sample.schema.json`:

```json
{
  "sample_id": "sample-01",
  "text": "Your authentic writing sample here...",
  "date": "2024-05-12",
  "genre": "explanatory",
  "audience": "practitioners",
  "purpose": "clarify architecture trade-offs",
  "ai_assistance": "none",
  "editorial_influence": "low",
  "representative": true,
  "authenticity_confidence": 0.95
}
```

### 3. Run Pipeline via CLI

```bash
# Ingest and clean writing samples
npx tsx engine/cli.ts ingest ./examples/example-corpus

# Analyze corpus patterns and contamination overlay
npx tsx engine/cli.ts analyze ./examples/example-corpus

# Build personal voice profile
npx tsx engine/cli.ts build-profile --output my-profile.json

# Humanize an AI draft for public genre
npx tsx engine/cli.ts humanize draft.md --profile my-profile.json --genre public

# Validate humanized output against source draft
npx tsx engine/cli.ts validate draft.md humanized.md --profile my-profile.json
```

---

## Documentation Index

| Document | Description |
|---|---|
| [01. Project Specification](docs/01-project-specification.md) | Vision, goals, non-goals, core principles, privacy, versioning |
| [02. System Architecture](docs/02-system-architecture.md) | End-to-end pipeline, component responsibilities, contracts |
| [03. Personal Voice Model](docs/03-personal-voice-model.md) | Six-layer model, trait representation, and Voice Constitution |
| [04. Corpus Analysis](docs/04-corpus-analysis.md) | Corpus sizing, pipeline, stable vs. contextual analysis dimensions |
| [05. Humanizer Engine](docs/05-humanizer-engine.md) | Runtime inputs, pipeline steps, modes (conservative/balanced/deep) |
| [06. Genre Model](docs/06-genre-model.md) | 8 core genres, 11 dimensions, independent 2-axis density model |
| [07. AI Contamination](docs/07-ai-contamination.md) | Authentic vs. Amplified vs. Contextual vs. AI-Risk classifications |
| [08. Failure Taxonomy](docs/08-failure-taxonomy.md) | Catalog of 18 specific failure modes (F01 through F18) and fixes |
| [09. Evaluation](docs/09-evaluation.md) | 9 evaluation dimensions, diagnostic formula, benchmark design |
| [10. Prompt Specification](docs/10-prompt-specification.md) | Master prompt, profile injection protocol, diagnostic schema |
| [11. Data Schemas](docs/11-data-schemas.md) | Comprehensive documentation for all JSON schemas |
| [12. Implementation Guide](docs/12-implementation-guide.md) | Phased rollout, engine layout, CLI design, portability, local-first |

---

## Constitution & Priority Order

When humanizing text, the framework enforces the following strict precedence:

1. **ALWAYS:** Preserve meaning, factual accuracy, evidentiary strength, uncertainty, conceptual distinctions, and technical accuracy.
2. **USUALLY:** Follow stable reasoning tendencies and contextual structural preferences.
3. **CONTEXTUAL:** Apply rhetorical and surface traits only when genre, audience, and purpose support them.
4. **RARELY:** Use high-compression rhetorical devices.
5. **AVOID:** Forced questions, forced contrasts, symmetry, generic AI transitions, artificial imperfections, personality injection without justification.

---

## Privacy Notice

Your writing corpus belongs strictly to you. The Personalized Humanizer Framework is built local-first: profiles can be generated, inspected, versioned, and exported locally without exposing your original writing samples to external third parties.

---

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
