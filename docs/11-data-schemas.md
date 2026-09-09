# 11. Data Schemas

The Personalized Humanizer Framework enforces strict JSON schemas for every artifact produced or ingested across the pipeline. Formal JSON Schema files are stored in the `/schemas/` directory:

## 11.1 Corpus Schema (`schemas/corpus.schema.json`)
Defines the container structure for multiple writing samples used in profile discovery.
- **Type:** `object`
- **Required:** `samples` (array of `sample.schema.json` objects).

## 11.2 Sample Schema (`schemas/sample.schema.json`)
Defines an individual writing sample along with provenance and authenticity metadata.
- **Required:** `sample_id`, `text`.
- **Properties:**
  - `sample_id`: Unique identifier string.
  - `text`: Cleaned text body.
  - `date`: ISO timestamp or null.
  - `genre`: Genre classification string (e.g. `technical`, `explanatory`).
  - `audience`: Intended readership string.
  - `purpose`: Communicative intent.
  - `ai_assistance`: `none` | `low` | `medium` | `high` | `unknown`.
  - `editorial_influence`: `low` | `medium` | `high` | `unknown`.
  - `representative`: Boolean flag indicating if this piece reflects normal style.
  - `authenticity_confidence`: Float between 0.0 and 1.0.

## 11.3 Voice Profile Schema (`schemas/voice-profile.schema.json`)
Represents the complete compiled Personal Voice Model.
- **Required:** `version`, `reasoning`, `rhetoric`, `structure`, `sentence`, `surface`, `genres`, `ai_overlay`.
- Each layer contains trait representations with `confidence`, `stability`, `contexts`, `evidence_samples`, and `classification`.

## 11.4 Genre Profile Schema (`schemas/genre-profile.schema.json`)
Specifies rhetorical and cognitive density parameters for a target genre:
- `sentence_rhythm`, `paragraph_density`, `evidence_density`, `qualification_intensity`, `rhetorical_compression`, `question_frequency`, `analogy_use`, `contrast_use`, `conclusion_behavior`.

## 11.5 AI Overlay Schema (`schemas/ai-overlay.schema.json`)
Captures suspected machine-generated or editorially amplified artifacts:
- `trait`: Observed pattern identifier.
- `classification`: `authentic` | `amplified` | `contextual` | `ai-risk`.
- `confidence`: 0.0 to 1.0.
- `evidence`: Sample references.
- `recommended_action`: `preserve` | `contextualize` | `reduce` | `suppress`.

## 11.6 Humanizer Config Schema (`schemas/humanizer-config.schema.json`)
Runtime execution parameters:
- **Required:** `model_version`, `profile_version`, `mode`.
- `mode`: `conservative` | `balanced` | `deep`.
- `genre`, `audience`, `purpose`, `technical_level`.

## 11.7 Validation Schema (`schemas/validation.schema.json`)
Structured output of diagnostic checks:
- Numeric fidelity metrics (0.0 - 1.0): `meaning_fidelity`, `reasoning_fidelity`, `voice_fidelity`, `evidence_discipline`, `genre_fitness`.
- Penalty metrics (0.0 - 1.0): `ai_template_density`, `rhetorical_overfitting`, `artificial_imperfection`.
- `notes`: String array detailing specific findings and failure code flags.
