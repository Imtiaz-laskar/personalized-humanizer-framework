# Corpus Analysis Prompt

Analyze the supplied writing corpus as evidence about a writer.

Do not assume recurring patterns are preferences.
For each observation, consider:
- frequency
- cross-genre stability
- cross-time stability
- context
- AI/editorial influence
- representativeness

Extract reasoning, rhetoric, structure, sentence behavior, surface features,
and genre-specific variation. Return structured observations with confidence.

## Input Specification
- `corpus`: Array of writing samples with metadata (`sample_id`, `text`, `genre`, `audience`, `purpose`, `ai_assistance`).

## Output Requirements
Return observations grouped by the 6 dimensions:
1. Reasoning: evidence discipline, claim strength, qualification habits.
2. Rhetoric: question use, contrast structures, analogies.
3. Structure: openings, transitions, paragraph progression.
4. Sentence: length variance, short functional sentences, cadence.
5. Surface: register, vocabulary tier, punctuation habits.
6. Genre variation: differences across documented genres.
