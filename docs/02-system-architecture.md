# 2. System Architecture

## 2.1 End-to-End Architecture

```
WRITING CORPUS
      │
      ▼
Corpus Preparation
      │
      ▼
Corpus Classification
      │
      ▼
Voice Discovery
      │
      ▼
Reasoning / Rhetorical / Structural / Sentence / Surface Analysis
      │
      ▼
Genre Analysis
      │
      ▼
AI / Editorial Overlay Analysis
      │
      ▼
Voice Constitution
      │
      ▼
Personal Voice Model
      │
      ▼
AI Draft + Target Context
      │
      ▼
Humanization Engine
      │
      ▼
Validation Engine
      │
      ▼
Final Output + Diagnostic
```

## 2.2 Component Responsibilities

- **Corpus Layer:** Ingest, clean, segment, deduplicate, label, and weight writing samples.
- **Analysis Layer:** Extract reasoning, rhetorical, structural, sentence, lexical, and contextual observations.
- **Profiling Layer:** Convert observations into stable/contextual traits with confidence scores and evidentiary citations.
- **Contamination Layer:** Estimate whether observed traits are authentic, amplified, contextual, or AI-risk.
- **Constitution Layer:** Turn the profile into prioritized decision rules: `ALWAYS`, `USUALLY`, `CONTEXTUAL`, `RARELY`, `AVOID`.
- **Humanization Layer:** Transform a draft while preserving substantive meaning, evidence, and epistemic strength.
- **Validation Layer:** Check meaning, evidence, voice, genre fitness, overfitting, and artificial imperfection.

## 2.3 Processing Contracts

```
Input: corpus[] → Output: corpus_analysis
Input: corpus_analysis → Output: voice_profile
Input: voice_profile + genre → Output: humanizer_config
Input: humanizer_config + draft → Output: candidate_text
Input: candidate_text + source_draft + profile → Output: validation_report
```

## 2.4 Design Constraint

**Surface-level rewriting must not precede argument understanding.**
The engine should first identify what the draft means, what supports it, what remains uncertain, and what conceptual distinctions matter before any stylistic transformation is considered.
