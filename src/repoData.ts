/**
 * @license
 * Apache License, Version 2.0
 * Personalized Humanizer Framework (PHF v1.0) - Repository Manifest & Contents
 */

export interface RepoFile {
  path: string;
  category: 'root' | 'docs' | 'schemas' | 'prompts' | 'configs' | 'examples' | 'engine' | 'tests';
  description: string;
  content: string;
}

export const REPO_FILES: RepoFile[] = [
  {
    path: 'README.md',
    category: 'root',
    description: 'Master documentation & quickstart',
    content: `# Personalized Humanizer Framework (PHF v1.0)

Public, user-independent framework for building personalized writing humanizers from an individual's own corpus.

> **Core Principle:** Reconstruct how the writer thinks before reproducing how the writer sounds.`
  },
  {
    path: 'LICENSE',
    category: 'root',
    description: 'Apache 2.0 Open Source License',
    content: `Apache License\nVersion 2.0, January 2004\nhttp://www.apache.org/licenses/`
  },
  {
    path: 'CONTRIBUTING.md',
    category: 'root',
    description: 'Contributor guidelines & principles',
    content: `# Contributing to Personalized Humanizer Framework (PHF)\n\nPrinciples: Reasoning before surface style, model separation, no artificial imperfection.`
  },
  {
    path: 'SECURITY.md',
    category: 'root',
    description: 'Security policy & privacy disclosures',
    content: `# Security Policy\n\nLocal-first architecture and corpus privacy protections.`
  },
  {
    path: 'docs/01-project-specification.md',
    category: 'docs',
    description: 'Overview, goals, non-goals, and core principles',
    content: `# 1. Project Specification\n\nReconstruct how the writer thinks before reproducing how the writer sounds.\nPreserve meaning, evidence, uncertainty, and conceptual distinctions.`
  },
  {
    path: 'docs/02-system-architecture.md',
    category: 'docs',
    description: 'End-to-end pipeline and component contracts',
    content: `# 2. System Architecture\n\nCorpus -> Analysis -> Voice Discovery -> Personal Voice Model -> Humanization Engine -> Validation Engine.`
  },
  {
    path: 'docs/03-personal-voice-model.md',
    category: 'docs',
    description: 'Six-layer personal voice model & constitution',
    content: `# 3. Personal Voice Model\n\nReasoning, Rhetorical, Structural, Sentence, Surface, and Genre Profiles.`
  },
  {
    path: 'docs/04-corpus-analysis.md',
    category: 'docs',
    description: 'Corpus preparation, metadata, and stability',
    content: `# 4. Corpus Analysis\n\nSample metadata, analysis dimensions, and stable vs contextual trait analysis.`
  },
  {
    path: 'docs/05-humanizer-engine.md',
    category: 'docs',
    description: 'Transformation pipeline, modes, and constraints',
    content: `# 5. Humanizer Engine\n\n12-step processing pipeline, conservative/balanced/deep modes, and anti-overfitting.`
  },
  {
    path: 'docs/06-genre-model.md',
    category: 'docs',
    description: '8 initial genres & 2-axis density model',
    content: `# 6. Genre Model\n\nIndependent cognitive density and rhetorical compression axes across 8 base genres.`
  },
  {
    path: 'docs/07-ai-contamination.md',
    category: 'docs',
    description: 'Authentic vs amplified vs contextual vs ai-risk',
    content: `# 7. AI / Editorial Contamination and Authenticity\n\nIdentify 10 synthetic AI tropes without penalizing authentic authorial polish.`
  },
  {
    path: 'docs/08-failure-taxonomy.md',
    category: 'docs',
    description: 'Catalog of 18 specific failure modes (F01-F18)',
    content: `# 8. Failure Taxonomy\n\nF01 through F18 risks and corrective protocols.`
  },
  {
    path: 'docs/09-evaluation.md',
    category: 'docs',
    description: '9 evaluation dimensions and diagnostic formula',
    content: `# 9. Evaluation Framework\n\nDiagnostic score = (Meaning + Reasoning + Voice + Evidence + Genre) - (AI Template + Overfitting + Imperfection).`
  },
  {
    path: 'docs/10-prompt-specification.md',
    category: 'docs',
    description: 'Master prompt and profile injection protocol',
    content: `# 10. Prompt Specification\n\nMaster prompt, priority hierarchy, and structured diagnostic block.`
  },
  {
    path: 'docs/11-data-schemas.md',
    category: 'docs',
    description: 'Schema references and validation rules',
    content: `# 11. Data Schemas\n\nCorpus, sample, voice-profile, genre-profile, ai-overlay, config, and validation schemas.`
  },
  {
    path: 'docs/12-implementation-guide.md',
    category: 'docs',
    description: 'Engine module layout, CLI, and local-first design',
    content: `# 12. Implementation Guide\n\nModule layout, phased rollout, and CLI reference.`
  },
  {
    path: 'schemas/corpus.schema.json',
    category: 'schemas',
    description: 'Corpus container JSON schema',
    content: `{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object",\n  "required": ["samples"]\n}`
  },
  {
    path: 'schemas/sample.schema.json',
    category: 'schemas',
    description: 'Individual writing sample JSON schema',
    content: `{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object",\n  "required": ["sample_id", "text"]\n}`
  },
  {
    path: 'schemas/voice-profile.schema.json',
    category: 'schemas',
    description: '6-layer voice profile JSON schema',
    content: `{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object",\n  "required": ["version", "reasoning", "rhetoric", "structure", "sentence", "surface", "genres", "ai_overlay"]\n}`
  },
  {
    path: 'schemas/genre-profile.schema.json',
    category: 'schemas',
    description: 'Genre profile dimension JSON schema',
    content: `{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object"\n}`
  },
  {
    path: 'schemas/ai-overlay.schema.json',
    category: 'schemas',
    description: 'AI contamination classification JSON schema',
    content: `{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object"\n}`
  },
  {
    path: 'schemas/humanizer-config.schema.json',
    category: 'schemas',
    description: 'Runtime humanizer configuration JSON schema',
    content: `{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object",\n  "required": ["model_version", "profile_version", "mode"]\n}`
  },
  {
    path: 'schemas/validation.schema.json',
    category: 'schemas',
    description: 'Diagnostic validation report JSON schema',
    content: `{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object"\n}`
  },
  {
    path: 'prompts/corpus-analysis.md',
    category: 'prompts',
    description: 'Corpus analysis prompt template',
    content: `# Corpus Analysis Prompt\n\nAnalyze the supplied writing corpus as evidence about a writer.`
  },
  {
    path: 'prompts/voice-discovery.md',
    category: 'prompts',
    description: 'Voice discovery prompt template',
    content: `# Voice Discovery Prompt\n\nConvert corpus observations into a Personal Voice Model.`
  },
  {
    path: 'prompts/genre-analysis.md',
    category: 'prompts',
    description: 'Genre analysis prompt template',
    content: `# Genre Analysis Prompt\n\nAnalyze how the writer's voice changes by genre, audience, and purpose.`
  },
  {
    path: 'prompts/ai-contamination.md',
    category: 'prompts',
    description: 'AI contamination audit prompt template',
    content: `# AI Contamination Analysis Prompt\n\nIdentify observed patterns that may have been amplified by AI or editorial assistance.`
  },
  {
    path: 'prompts/humanizer.md',
    category: 'prompts',
    description: 'Master humanizer rewrite prompt template',
    content: `# Humanizer Engine Prompt\n\nHumanize the draft using the supplied Personal Voice Model and target context.`
  },
  {
    path: 'prompts/validation.md',
    category: 'prompts',
    description: 'Validation and failure taxonomy prompt template',
    content: `# Validation Engine Prompt\n\nCompare source draft and humanized output.`
  },
  {
    path: 'configs/default.yaml',
    category: 'configs',
    description: 'Default model configuration',
    content: `model:\n  name: Personalized Humanizer Model\n  version: "1.0"`
  }
];
