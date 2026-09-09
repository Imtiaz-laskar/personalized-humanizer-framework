# 3. Personal Voice Model

## 3.1 Six-Layer Model

The Personal Voice Model organizes writer behavior across six hierarchical layers:

```
Personal Voice Model
├── Reasoning Profile
├── Rhetorical Profile
├── Structural Profile
├── Sentence Profile
├── Surface Profile
├── Genre Profile
└── AI / Editorial Overlay
```

## 3.2 Reasoning Profile
- **Evidence discipline:** How claims are supported and contextualized.
- **Claim strength relative to evidence:** Calibration between certainty of tone and strength of proof.
- **Observation vs. interpretation:** Clear delineation between what happened and what it means.
- **Qualification behavior:** Manner and placement of caveats and boundary conditions.
- **Conceptual separation:** Maintenance of nuanced distinctions between related concepts.
- **Mechanism explanation:** Propensity to explain how/why something works before concluding.
- **Uncertainty handling:** Explicit articulation of limits, unknowns, or probabilistic outcomes.
- **Implication behavior:** Restrained vs. expansive deduction from findings.

## 3.3 Rhetorical Profile
- **Questions:** Use of rhetorical, inquiry, or framing questions.
- **Contrast:** Structural comparisons (e.g. X vs. Y, thesis vs. antithesis).
- **Analogy:** Cross-domain illustrative mechanisms.
- **Examples:** Concrete grounding instances.
- **Repetition:** Deliberate recurrence for rhythmic emphasis.
- **Emphasis:** Typographic, syntactic, or lexical highlighting.
- **Punchlines:** Pithy summary remarks closing arguments.
- **Metaphor:** Figurative representations of mechanisms.
- **Rhetorical compression:** Tightening argumentation into concise aphorisms.

## 3.4 Structural Profile
- **Opening strategy:** Problem statement, narrative hook, background thesis, or direct conclusion.
- **Information sequencing:** Chronological, deductive, inductive, or dialectical ordering.
- **Paragraph architecture:** Single-idea focus, topic sentence placement, progression cadence.
- **Transitions:** Implicit thematic pivots vs. explicit signposting.
- **Zoom between levels:** Movement between micro-implementation and macro-architecture.
- **Counterpoint placement:** Early inoculation vs. late objection handling.
- **Conclusion behavior:** Synthesis, next steps, open inquiries, or deliberate trailing.

## 3.5 Sentence Profile
- **Length distribution as contextual evidence:** Variable clause lengths matching cognitive weight.
- **Splitting vs. combining:** Tendency to isolate dependent clauses vs. synthesize compound sentences.
- **Functional short sentences:** Impact statements following extended analytical clauses.
- **Qualification placement:** Prefaced conditions vs. parenthetical insertions vs. trailing provisos.
- **Fragments where deliberate:** Rhetorical incomplete structures.
- **Cadence:** Stress patterns and sentence rhythm.
- **Punctuation as relationship management:** Use of em-dashes, semicolons, parentheses, and colons to balance relationships between ideas.

## 3.6 Surface Profile
- **Vocabulary:** Domain-specific, colloquial, Latinate, or Germanic word choice.
- **Register:** Technical, conversational, editorial, scholarly, executive.
- **Formality:** Level of conversational distance.
- **Idioms:** Idiosyncratic turns of phrase.
- **Regional/linguistic influence:** Dialectal preferences and orthographic standards.
- **Preferred punctuation:** Typographic conventions and idiosyncratic punctuation habits.
- **Lexical repetition:** Frequency and tolerance of recurrent terminology.

## 3.7 Trait Representation

```yaml
trait:
  name: <trait_name>
  value: <qualitative or quantitative description>
  confidence: 0.0 - 1.0
  stability: 0.0 - 1.0
  contexts: [ ... ]
  evidence_samples: [ ... ]
  classification: authentic | amplified | contextual | ai-risk
```

## 3.8 Voice Constitution

- **ALWAYS:** Preserve meaning, evidence, uncertainty, conceptual distinctions, and technical accuracy.
- **USUALLY:** Follow stable reasoning tendencies and contextual structural preferences.
- **CONTEXTUAL:** Apply rhetorical and surface traits only when genre, audience, and purpose support them.
- **RARELY:** Use high-compression rhetorical devices.
- **AVOID:** Forced questions, forced contrasts, symmetry, generic AI transitions, artificial imperfection, personality injection without justification.
