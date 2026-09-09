/**
 * @license
 * Apache License, Version 2.0
 * Personalized Humanizer Framework (PHF v1.0)
 */

export interface CorpusSample {
  sample_id: string;
  text: string;
  date?: string | null;
  genre?: string | null;
  audience?: string | null;
  purpose?: string | null;
  ai_assistance?: 'none' | 'low' | 'medium' | 'high' | 'unknown';
  editorial_influence?: 'none' | 'low' | 'medium' | 'high' | 'unknown';
  representative?: boolean | null;
  authenticity_confidence?: number | null;
  notes?: string | null;
}

export interface TraitDefinition {
  name: string;
  value: string;
  confidence: number;
  stability: number;
  contexts: string[];
  evidence_samples?: string[];
  classification: 'authentic' | 'amplified' | 'contextual' | 'ai-risk';
  recommended_behavior?: 'always' | 'usually' | 'contextual' | 'rarely' | 'avoid';
}

export interface VoiceProfile {
  version: string;
  reasoning: Record<string, TraitDefinition>;
  rhetoric: Record<string, TraitDefinition>;
  structure: Record<string, TraitDefinition>;
  sentence: Record<string, TraitDefinition>;
  surface: Record<string, TraitDefinition>;
  genres: Record<string, Record<string, string | number>>;
  ai_overlay: Record<string, {
    trait: string;
    classification: 'authentic' | 'amplified' | 'contextual' | 'ai-risk';
    confidence: number;
    evidence: string[];
    recommended_action: 'preserve' | 'contextualize' | 'reduce' | 'suppress';
  }>;
  constitution?: {
    always: string[];
    usually: string[];
    contextual: string[];
    rarely: string[];
    avoid: string[];
  };
}

export type HumanizationMode = 'conservative' | 'balanced' | 'deep';

export interface HumanizerConfig {
  model_version: string;
  profile_version: string;
  mode: HumanizationMode;
  genre?: string;
  audience?: string;
  purpose?: string;
  technical_level?: string;
}

export interface ValidationReport {
  meaning_fidelity: number;
  reasoning_fidelity: number;
  voice_fidelity: number;
  evidence_discipline: number;
  genre_fitness: number;
  ai_template_density: number;
  rhetorical_overfitting: number;
  artificial_imperfection: number;
  composite_score: number;
  notes: string[];
  failure_taxonomies_detected: string[];
}

export interface FailureTaxonomyItem {
  code: string;
  name: string;
  risk: string;
  correction: string;
}

export const FAILURE_TAXONOMY: Record<string, FailureTaxonomyItem> = {
  F01: { code: 'F01', name: 'Generic AI', risk: 'Specificity and context are missing.', correction: 'Add concrete anchors and recover reasoning.' },
  F02: { code: 'F02', name: 'Hyper-personalization', risk: 'User traits are inserted everywhere.', correction: 'Apply contextual gating and reduce frequency.' },
  F03: { code: 'F03', name: 'Over-polishing', risk: 'Hierarchy and natural asymmetry disappear.', correction: 'Restore functional variation and conceptual priority.' },
  F04: { code: 'F04', name: 'Over-compression', risk: 'Explanation is replaced by punchlines.', correction: 'Explain before compressing.' },
  F05: { code: 'F05', name: 'Under-explanation', risk: 'Important mechanisms or context are missing.', correction: 'Add only necessary explanation.' },
  F06: { code: 'F06', name: 'Evidence inflation', risk: 'Evidence becomes stronger than source support.', correction: 'Recheck claim strength.' },
  F07: { code: 'F07', name: 'Rhetorical inflation', risk: 'Too many questions, contrasts, punchlines, labels.', correction: 'Lower rhetorical temperature.' },
  F08: { code: 'F08', name: 'Genre mismatch', risk: 'Voice is applied without regard to task.', correction: 'Reclassify genre/context.' },
  F09: { code: 'F09', name: 'Register mismatch', risk: 'Language is too formal/informal for audience.', correction: 'Recalibrate register.' },
  F10: { code: 'F10', name: 'Technical degradation', risk: 'Precision is lost through conversationalization.', correction: 'Lock technical terminology and relationships.' },
  F11: { code: 'F11', name: 'Artificial imperfection', risk: 'Errors are introduced to appear human.', correction: 'Restore competence.' },
  F12: { code: 'F12', name: 'Meaning drift', risk: 'Rewrite changes argument or factual meaning.', correction: 'Run semantic comparison.' },
  F13: { code: 'F13', name: 'False confidence', risk: 'Uncertainty becomes certainty.', correction: 'Lock epistemic strength.' },
  F14: { code: 'F14', name: 'Qualification dumping', risk: 'Caveats become clumsy piles of disclaimers.', correction: 'Integrate caveats where they answer legitimate inference.' },
  F15: { code: 'F15', name: 'False balance', risk: 'Evidence-weighted conclusions are made artificially neutral.', correction: 'Preserve evidence-weighted balance.' },
  F16: { code: 'F16', name: 'Over-contextualisation', risk: 'Irrelevant background is added.', correction: 'Remove context that does not serve the argument.' },
  F17: { code: 'F17', name: 'Implication inflation', risk: 'Narrow finding becomes broad conclusion.', correction: 'Narrow implication.' },
  F18: { code: 'F18', name: 'Voice flattening', risk: 'Distinctive decision-making disappears.', correction: 'Restore supported personal characteristics.' },
};
