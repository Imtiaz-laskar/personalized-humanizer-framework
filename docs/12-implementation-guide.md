# 12. Implementation Guide

## 12.1 Recommended Implementation Phases
1. **Corpus Ingestion & Metadata:** Build text parsers and metadata extractors.
2. **Segmentation & Cleaning:** Strip headers, footers, duplicate boilerplate, and split into paragraphs and sentences.
3. **Analysis Functions:** Implement reasoning, rhetorical, and structural pattern extractors.
4. **Structured Observations:** Collect traits into intermediate observation records.
5. **Aggregation & Stability:** Compare traits across genres and dates to calculate stability and confidence metrics.
6. **AI-Overlay Generation:** Classify traits into authentic, amplified, contextual, or ai-risk.
7. **Profile Compilation:** Assemble the 6-layer Personal Voice Model and Voice Constitution.
8. **Runtime Genre Selection:** Dynamically apply contextual constraints based on user target.
9. **Humanization Pipeline:** Execute the 12-step transformation pipeline.
10. **Validation & Regression:** Compute diagnostic scores and scan for Failure Taxonomy violations (F01–F18).
11. **CLI & Web Workbench:** Provide intuitive user interfaces only after the core algorithms are verified.

## 12.2 Engine Module Layout
```
engine/
├── corpus/
│   ├── ingest.ts       # File ingestion & format normalization
│   ├── clean.ts        # Boilerplate removal & deduplication
│   ├── segment.ts      # Document, paragraph, & sentence parsing
│   └── classify.ts     # Metadata & genre classification
├── analysis/
│   ├── reasoning.ts    # Epistemic & evidence extraction
│   ├── rhetoric.ts     # Questions, contrasts, & analogies
│   ├── structure.ts    # Information hierarchy & sequencing
│   ├── sentence.ts     # Cadence, length variance, & punctuation
│   └── surface.ts      # Vocabulary tier & register analysis
├── profiling/
│   ├── aggregation.ts  # Multi-sample trait aggregation
│   ├── stability.ts    # Cross-genre & chronological stability
│   ├── confidence.ts   # Statistical confidence calculation
│   ├── genre.ts        # Genre-specific baseline calibration
│   └── contamination.ts# AI & editorial overlay classification
├── humanization/
│   ├── meaning.ts      # Argument preservation & distinction locking
│   ├── reasoning.ts    # Cognitive flow reconstruction
│   ├── structure.ts    # Paragraph & transition shaping
│   ├── sentence.ts     # Cadence tuning & clause splitting/combining
│   ├── surface.ts      # Vocabulary & idiom calibration
│   ├── anti_overfit.ts # Contextual gating of profile traits
│   └── pipeline.ts     # Master humanization orchestrator
└── validation/
    ├── semantic.ts     # Meaning & claim drift detector
    ├── evidence.ts     # Claim strength & hedging validator
    ├── voice.ts        # Trait alignment evaluator
    ├── genre.ts        # Genre expectation verifier
    ├── regression.ts   # Benchmark runner
    └── validator.ts    # Master validation & F01-F18 scanner
```

## 12.3 Suggested CLI Commands
```bash
# Ingest raw text files into formatted corpus
phf ingest ./corpus

# Analyze corpus patterns and contamination
phf analyze ./corpus

# Build machine-readable personal profile
phf build-profile --output profile.json

# Inspect and audit an existing profile
phf inspect-profile profile.json

# Transform an AI draft using a personal profile
phf humanize draft.md --profile profile.json --genre public

# Validate candidate output against original draft
phf validate original.md humanized.md --profile profile.json

# Run evaluation benchmark suite
phf benchmark ./tests --profile profile.json
```

## 12.4 Profile Portability
Profiles are serializable as human-readable JSON or YAML documents. A user can export their personal profile to use across different systems without ever revealing their private corpus samples.

## 12.5 Local-First Architecture
All parsing, analysis, profiling, and validation algorithms are designed to operate locally. Users maintain complete custody of their intellectual property.

## 12.6 Model-Provider Neutrality
The framework defines explicit prompt templates and schema contracts that can be backed by local LLMs (e.g. Ollama, llama.cpp) or cloud providers (e.g. Gemini, OpenAI, Anthropic) without altering the profile or engine architecture.
