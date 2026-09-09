# 5. Humanizer Engine

## 5.1 Runtime Inputs
- `draft`: The AI-generated or raw source text to transform.
- `user_profile`: The compiled Personal Voice Model (`voice_profile.json`).
- `target_genre`: Target context classification (e.g. `public`, `explanatory`, `technical`).
- `target_audience`: The target readership (e.g. `general`, `engineers`, `leadership`).
- `target_purpose`: The rhetorical objective (e.g. `clarify trade-offs`, `persuade`, `document`).
- `technical_level`: Expected depth of technical terminology.
- `humanization_mode`: `conservative` | `balanced` | `deep`.

## 5.2 Processing Pipeline
1. **Understand Meaning:** Parse the core thesis and argumentative dependencies.
2. **Extract Argument and Claims:** Identify individual claims and inferential links.
3. **Identify Evidence and Uncertainty:** Map which points are proven vs. speculative.
4. **Identify Conceptual Distinctions:** Lock nuanced distinctions against synonym collapse.
5. **Determine Target Context:** Combine target genre, audience, and purpose into active constraints.
6. **Recover Reasoning Structure:** Reorder points to match the user's natural argumentative flow.
7. **Reconstruct Information Hierarchy:** Balance prominence across sections.
8. **Adjust Paragraph Structure:** Shape paragraphs according to the user's progression habits.
9. **Make Sentence-Level Decisions:** Split, combine, or modulate cadence.
10. **Apply Personal Voice Selectively:** Inject characteristic rhetorical habits only when context justifies.
11. **Reduce AI-Shaped Patterns:** Prune symmetry, buzzwords, formulaic conclusions, and false paradoxes.
12. **Run Validation:** Evaluate candidate text against the source draft and profile.

## 5.3 Modes
- **Conservative:** Minimal transformation. Preserves original phrasing and structure unless obvious AI-templates or clarity issues are detected.
- **Balanced (Default):** Preserves meaning and reasoning while reconstructing the author's characteristic flow, sentence rhythm, and contextual structural patterns.
- **Deep:** Substantially reconstructs reasoning sequences, paragraph architecture, rhetorical density, and sentence cadence while strictly guarding substantive accuracy.

## 5.4 Rewrite Constraints
- Do not strengthen claims beyond the evidence.
- Do not remove meaningful caveats or qualifiers.
- Do not invent new evidence, citations, or data.
- Do not simplify technical language when conceptual precision would be lost.
- Do not force questions, contrasts, analogies, fragments, or punchlines.
- Do not deliberately introduce grammatical mistakes or spelling errors.
- Do not make every paragraph follow identical rhetorical patterns.

## 5.5 Anti-Overfitting
Before applying any trait from the Personal Voice Model, the engine must verify whether that trait is functionally appropriate to the local reasoning context. A trait should be applied because it serves the explanation in that specific moment, not merely because it exists in the user's profile.
