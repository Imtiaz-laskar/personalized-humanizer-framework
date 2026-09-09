# 9. Evaluation Framework

## 9.1 Evaluation Dimensions
The validation engine measures transformation quality across 9 distinct dimensions:
1. **Meaning Fidelity:** Preservation of the source argument, factual claims, and logical dependencies.
2. **Reasoning Fidelity:** Preservation of the underlying cognitive structure and deduction steps.
3. **Voice Fidelity:** Alignment with authentic user decision tendencies defined in the Personal Voice Model.
4. **Evidence Discipline:** Precision of claim confidence relative to empirical backing.
5. **Genre Fitness:** Adherence to structural and density norms of the specified target genre.
6. **Readability:** Clarity, pacing, cadence, and syntactic flow.
7. **AI Template Density:** Absence of generic synthetic transitions, manufactured insights, and artificial symmetries.
8. **Rhetorical Overfitting:** Absence of forced, unnatural caricaturing of user quirks.
9. **Artificial Imperfection:** Absence of deliberate typos, colloquial degradations, or synthetic errors.

## 9.2 Diagnostic Score Formula
The diagnostic score combines positive fidelity scores and subtracts failure penalties:

$$\text{Diagnostic Quality Score} = (\text{Meaning} + \text{Reasoning} + \text{Voice} + \text{Evidence} + \text{Genre}) - (\text{AI Template Density} + \text{Rhetorical Overfitting} + \text{Artificial Imperfection})$$

> *Note:* The score is an engineering diagnostic tool to guide refinement, not an ontological certification of "human consciousness".

## 9.3 Benchmark Design
A rigorous benchmark dataset should follow this protocol:
1. Create held-out writing samples from the user not used in profile construction.
2. Generate AI-assisted drafts based on the topics or source material of the held-out samples.
3. Run the humanization engine under target context parameters.
4. Compare the humanized candidate against both the source AI draft and the ground-truth authentic writing.
5. Evaluate meaning, evidence, voice, and score against the Failure Taxonomy (F01–F18).
6. Repeat across multiple genres to confirm generalization.

## 9.4 Human Evaluation Questions
When reviewing candidates, evaluators evaluate these core questions:
- *Does this sound plausibly like the user in this context?*
- *Does it still sound competent and technically sound?*
- *Did the argument or facts change?*
- *Did the degree of uncertainty change?*
- *Does the rhetoric feel forced or caricatured?*
- *Would the author actually be willing to publish this under their own name?*

## 9.5 Regression Testing
Every modification to prompts, schemas, or engine algorithms must be validated against regression suites covering semantic fidelity, voice fidelity, genre fitness, and anti-overfitting. Improvements in voice fidelity must not silently compromise semantic accuracy.
