# Contributing to Personalized Humanizer Framework (PHF)

Thank you for your interest in contributing to the **Personalized Humanizer Framework (PHF)**!

PHF is an open, user-independent framework designed to reconstruct an individual's authentic writing decisions rather than statistically mimicking superficial text patterns or evading detection through degradation.

---

## Core Guiding Principles for Contributors

When submitting changes, documentation, schemas, or engine modules, please adhere to:

1. **Reasoning Before Surface Style:** Never prioritize superficial flourishes over substantive logic and epistemic balance.
2. **Model Separation:** The universal model (`PHM`) must remain strictly user-independent. Never hardcode personal characteristics, idioms, or persona assumptions into core algorithms or schemas.
3. **No Artificial Imperfection:** Do not contribute mechanisms that intentionally degrade grammar, insert deliberate typos, or break syntax to artificially score as "human".
4. **Anti-Overfitting:** Any profile trait inference must verify context appropriateness rather than blindly promoting frequency to a mandatory rule.
5. **Privacy First:** Ensure all examples in the repository use synthetic or appropriately licensed text samples. Never include private user writing.

---

## Development Workflow

1. **Fork and clone** the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run test suites and verify schemas:
   ```bash
   npm run lint
   npm test
   ```
4. Follow code structure:
   - Documentation belongs in `docs/` matching the master specification.
   - Formal data structures belong in `schemas/` with matching JSON schemas.
   - Core processing functions belong in `engine/`.
   - Test suites belong in `tests/`.

---

## Pull Request Guidelines

- Ensure PR descriptions clearly reference relevant sections of the PHF specification (e.g. Failure Taxonomy F01–F18, 6-Layer Personal Voice Model).
- Run regression tests to verify that enhancements to voice fidelity do not degrade meaning preservation or evidence strength.
