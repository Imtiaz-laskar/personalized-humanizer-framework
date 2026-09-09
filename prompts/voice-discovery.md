# Voice Discovery Prompt

Convert corpus observations into a Personal Voice Model.

Separate:
1. Stable traits (cross-genre, high confidence)
2. Contextual traits (genre- or audience-specific)
3. Uncertain traits (insufficient samples or mixed evidence)

For each trait provide:
- `name`: trait identifier
- `value`: qualitative or quantitative description
- `confidence`: 0.0 - 1.0
- `stability`: 0.0 - 1.0
- `contexts`: array of applicable scenarios
- `evidence_samples`: references to sample IDs
- `recommended_behavior`: ALWAYS | USUALLY | CONTEXTUAL | RARELY | AVOID

Do not turn frequency into a mandatory rule.
Ensure that eccentricities are not promoted to rigid caricatures.
