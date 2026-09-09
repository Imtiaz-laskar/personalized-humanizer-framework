# 6. Genre Model

## 6.1 Initial Genres
The framework ships with 8 built-in genres, alongside support for arbitrary custom genres:
1. **Public:** Essays, blog posts, opinion pieces, community updates.
2. **Explanatory:** Educational guides, deep-dives, concept walkthroughs.
3. **Professional:** Business correspondence, proposals, industry commentary.
4. **Executive:** Briefings, strategic summaries, high-level memos.
5. **Analytical:** Research syntheses, evaluation reports, post-mortems.
6. **Technical:** Architecture documentation, API references, engineering guides.
7. **Academic:** Formal papers, literature reviews, rigorous theses.
8. **Personal:** Reflections, journals, personal letters.
9. **Custom:** User-defined genres inheriting and overriding specific dimensions.

## 6.2 Genre Dimensions
Every genre is defined across 11 key structural and rhetorical parameters:
- `sentence_rhythm`: Clause length variation and pacing.
- `paragraph_density`: Information compactness per block.
- `evidence_density`: Frequency of empirical citation and proof.
- `qualification_intensity`: Depth of hedging and epistemic provisos.
- `question_frequency`: Allowance for rhetorical or framing questions.
- `analogy_use`: Acceptance of cross-domain metaphors.
- `contrast_use`: Tolerance for antithetical structures.
- `vocabulary_register`: Formality and specialized vocabulary index.
- `rhetorical_compression`: Tendency towards pithy summaries vs. full exposition.
- `conclusion_behavior`: Action-oriented, theoretical open-ended, or summary.
- `technical_density`: Domain-specific jargon and implementation precision.

## 6.3 Two-Axis Model
The framework treats **cognitive density** and **rhetorical compression** as orthogonal, independent dimensions:
- *Technical writing* may be highly cognitively dense without being rhetorically compressed.
- *Public writing* may be cognitively simpler while being selectively compressed for rhetorical impact.

```
                    High Cognitive Density
                             │
            Technical Docs   │   Analytical Research
            Architecture     │   Academic Papers
                             │
Low Rhetorical ──────────────┼────────────── High Rhetorical
Compression                  │               Compression
                             │
            Bug Reports      │   Public Essays
            Internal Memos   │   Executive Briefs
                             │
                    Low Cognitive Density
```

## 6.4 Runtime Rule
$$\text{Personal Voice} \times \text{Genre} \times \text{Audience} \times \text{Purpose} \longrightarrow \text{Contextual Expression}$$

## 6.5 Custom Genre
Users can declare custom genres in configuration files without modifying their core personal profile. Custom genre definitions specify overrides for the 11 genre dimensions.
