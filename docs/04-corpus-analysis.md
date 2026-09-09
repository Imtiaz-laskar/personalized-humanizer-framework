# 4. Corpus Analysis

## 4.1 Recommended Corpus
- **<5 samples:** Preliminary profile (baseline indicators only).
- **5–10 samples:** Basic profile (functional cross-genre calibration).
- **10–20 samples:** Reliable profile (stable distinction separation).
- **20+ samples:** Advanced contextual profile (fine-grained conditional rules).
- *Principle:* Prefer diverse, representative samples over merely high volume of homogeneous text.

## 4.2 Sample Metadata Schema
```yaml
sample_id: string
text: string
date: string | null
genre: string | null
audience: string | null
purpose: string | null
ai_assistance: none | low | medium | high | unknown
editorial_influence: low | medium | high | unknown
representative: boolean | null
authenticity_confidence: number (0.0 to 1.0)
notes: string | null
```

## 4.3 Corpus Pipeline
1. Ingest files and text data.
2. Extract clean, readable text.
3. Segment into documents, paragraphs, and sentence units.
4. Remove duplicates, legal disclaimers, and obvious boilerplate.
5. Classify genre, audience, and authorial purpose.
6. Assess AI/editorial influence and representativeness.
7. Analyze patterns across reasoning, structure, and rhetoric.
8. Compare patterns across chronological periods and genres.
9. Assign confidence and stability metrics.
10. Generate the compiled `voice_profile`.

## 4.4 Stable vs. Contextual Analysis
A recurring trait is not automatically stable. The pipeline compares the trait across genres, chronological timeframes, and levels of editorial/AI influence. A trait is promoted to the core profile only when empirical evidence supports cross-context stability.

## 4.5 Analysis Dimensions
- Sentence rhythm & clause variance
- Paragraph density & idea boundaries
- Question frequency and functional intent
- Evidence density & sourcing habits
- Qualification intensity & hedging density
- Analogy and example deployment
- Structural contrast & antithesis
- Deliberate lexical repetition
- Vocabulary tier and register
- Punctuation management
- Opening and ending patterns
- Reasoning sequences
- Claim/evidence relationships

## 4.6 Evidence Principle
**Frequency is descriptive, not prescriptive.**
The engine must infer the specific conditions of use rather than treating a numerical frequency as a quota to fill in every piece of writing.
