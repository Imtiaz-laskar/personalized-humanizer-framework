# 1. Project Specification

## 1.1 Overview
The **Personalized Humanizer Framework (PHF)** is an open framework for constructing a writing humanizer personalized to an individual writer. It does not attempt to make text generically "human". It analyzes a user's corpus and builds a **Personal Voice Model** describing how that writer tends to make writing decisions across contexts.

> **Core principle:** Reconstruct how the writer thinks before reproducing how the writer sounds.

## 1.2 Goals
- Build a personalized model from the user's own corpus.
- Model reasoning, evidence discipline, conceptual distinctions, rhetorical behavior, structure, sentence decisions, and surface style.
- Adapt output to genre, audience, purpose, and technical complexity.
- Separate authentic characteristics from possible AI/editorial amplification.
- Preserve meaning, evidence strength, uncertainty, and technical accuracy.
- Provide portable, inspectable, versioned profiles.

## 1.3 Non-goals
- Certifying whether a text was written by AI.
- Introducing deliberate errors, typos, or incompetence.
- Impersonating another person without their corpus and consent.
- Optimizing for a specific AI detector or bypassing safety measures.
- Flattening all genres into one monotonous voice.
- Maximizing stylistic similarity at the expense of substantive quality.

## 1.4 Core Principles
- **Reasoning before surface style:** Epistemic structure takes priority over decorative wording.
- **Meaning before stylistic similarity:** A sentence that sounds like the user but alters the truth is a failure.
- **Evidence before certainty:** Claims must not outstrip the evidence provided in the source.
- **Preserve uncertainty:** Maintain appropriate epistemic hedging (e.g. "suggests", "may indicate").
- **Separate observation from interpretation:** Distinctly report factual data before analytical conclusions.
- **Preserve conceptual distinctions:** Never blur subtle differences between related concepts.
- **Explain before compressing:** Do not prematurely reduce explanations to pithy soundbites.
- **Sentence length follows cognitive function:** Sentence structure should mirror the idea's complexity.
- **Genre precedes surface calibration:** Contextual expectations dictate the baseline rhetorical tone.
- **Context determines rhetorical behavior:** What works in a casual post fails in technical documentation.
- **Authenticity must not be simulated through degradation:** Humanity is not simulated via errors.
- **Corpus patterns are evidence, not commands:** Observed tendencies guide contextual rules, not mandates.
- **AI-like does not automatically mean inauthentic:** A clean, organized structure may be genuinely characteristic.
- **Personalization must not become caricature:** Avoid exaggerating eccentric traits.
- **Reconstruct decisions rather than imitate statistics:** Emulate decision logic, not pure n-gram counts.

## 1.5 Model Separation
The universal **Personalized Humanizer Model (PHM)** contains methodology, schemas, rules, pipeline logic, and validation. A separate **user profile** contains personal characteristics. The public framework must contain no assumptions about a particular person's identity or behavior:

$$\text{PHM} + \text{User Voice Profile} + \text{Target Context} = \text{Personalized Humanizer}$$

## 1.6 Privacy
- Corpus and profiles should be usable locally where practical.
- Users should be able to inspect, export, version, and delete their profile.
- Do not require publishing personal writing samples.
- Use synthetic or appropriately licensed examples in the public repository.

## 1.7 Versioning
- **Framework:** `PHF v1.0`
- **Model:** `PHM v1.0`
- **User Profile:** `Profile v1.0`
- **Genre Profile:** `Genre v1.0`
