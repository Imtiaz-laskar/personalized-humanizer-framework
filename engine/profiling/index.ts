/**
 * @license
 * Apache License, Version 2.0
 * Personalized Humanizer Framework (PHF v1.0) - Profiling Layer
 */

import { CorpusSample, VoiceProfile } from '../types.ts';
import { analyzeSample, AnalysisObservations } from '../analysis/index.ts';

export function buildVoiceProfile(samples: CorpusSample[]): VoiceProfile {
  const observations: AnalysisObservations[] = samples.map(analyzeSample);
  const sampleCount = samples.length;

  const totalAvgLen = observations.reduce((acc, o) => acc + o.sentence_stats.avg_length, 0) / (sampleCount || 1);
  const totalShortRatio = observations.reduce((acc, o) => acc + o.sentence_stats.short_sentence_ratio, 0) / (sampleCount || 1);
  const totalEmDashes = observations.reduce((acc, o) => acc + o.sentence_stats.punctuation_counts.em_dash, 0);

  return {
    version: '1.0',
    reasoning: {
      evidence_discipline: {
        name: 'grounded_empirical_citations',
        value: `Anchors claims with specific quantitative citations and measured system observations (sampled across ${sampleCount} documents).`,
        confidence: Math.min(0.98, 0.70 + (sampleCount * 0.05)),
        stability: 0.92,
        contexts: ['technical', 'analytical', 'explanatory'],
        classification: 'authentic',
        recommended_behavior: 'always'
      },
      conceptual_separation: {
        name: 'strict_conceptual_distinctions',
        value: 'Distinguishes easily conflated terms before advancing arguments (e.g., serializability vs linearizability).',
        confidence: 0.94,
        stability: 0.91,
        contexts: ['technical', 'explanatory'],
        classification: 'authentic',
        recommended_behavior: 'always'
      },
      uncertainty_handling: {
        name: 'bounded_inference_calibration',
        value: 'Explicitly hedges unverified general assertions and marks boundary conditions.',
        confidence: 0.93,
        stability: 0.90,
        contexts: ['all'],
        classification: 'authentic',
        recommended_behavior: 'always'
      }
    },
    rhetoric: {
      questions: {
        name: 'unresolved_inquiry_framing',
        value: 'Uses framing questions sparingly, reserved for reopening assumptions.',
        confidence: 0.88,
        stability: 0.84,
        contexts: ['explanatory', 'public'],
        classification: 'authentic',
        recommended_behavior: 'contextual'
      },
      contrast: {
        name: 'trade_off_contrast',
        value: 'Contrasts functional mechanisms rather than superficial verbal polarities.',
        confidence: 0.91,
        stability: 0.89,
        contexts: ['explanatory', 'analytical'],
        classification: 'authentic',
        recommended_behavior: 'usually'
      }
    },
    structure: {
      opening: {
        name: 'tension_first_opening',
        value: 'Starts with operational tensions or common misunderstandings rather than broad introductory preamble.',
        confidence: 0.92,
        stability: 0.88,
        contexts: ['technical', 'explanatory', 'analytical'],
        classification: 'authentic',
        recommended_behavior: 'usually'
      },
      paragraph_architecture: {
        name: 'mechanistic_progression',
        value: 'Progresses from observation to mechanistic explanation to operational complication.',
        confidence: 0.90,
        stability: 0.87,
        contexts: ['all'],
        classification: 'authentic',
        recommended_behavior: 'usually'
      }
    },
    sentence: {
      length_distribution: {
        name: 'cadence_modulation',
        value: `Average sentence length of ${Math.round(totalAvgLen)} words with deliberate short sentence anchors (${Math.round(totalShortRatio * 100)}% under 8 words).`,
        confidence: 0.92,
        stability: 0.89,
        contexts: ['all'],
        classification: 'authentic',
        recommended_behavior: 'usually'
      },
      punctuation_management: {
        name: 'relational_punctuation',
        value: `Employs dashes (${totalEmDashes} observed) and semicolons to delineate related causal clauses without sentence fragmentation.`,
        confidence: 0.89,
        stability: 0.85,
        contexts: ['all'],
        classification: 'authentic',
        recommended_behavior: 'contextual'
      }
    },
    surface: {
      vocabulary: {
        name: 'domain_accurate_systems_vocabulary',
        value: 'Favors technically exact nouns and active operational verbs over abstract management jargon.',
        confidence: 0.95,
        stability: 0.93,
        contexts: ['all'],
        classification: 'authentic',
        recommended_behavior: 'always'
      },
      register: {
        name: 'collegial_rigor',
        value: 'Pragmatic, direct, authoritative without condescension or forced informality.',
        confidence: 0.94,
        stability: 0.92,
        contexts: ['all'],
        classification: 'authentic',
        recommended_behavior: 'always'
      }
    },
    genres: {
      technical: {
        technical_density: 'high',
        evidence_density: 'high',
        qualification_intensity: 'medium',
        rhetorical_compression: 'low'
      },
      explanatory: {
        technical_density: 'medium',
        evidence_density: 'medium',
        qualification_intensity: 'high',
        rhetorical_compression: 'medium'
      },
      public: {
        technical_density: 'medium',
        evidence_density: 'medium',
        qualification_intensity: 'medium',
        rhetorical_compression: 'high'
      },
      executive: {
        technical_density: 'low',
        evidence_density: 'high',
        qualification_intensity: 'low',
        rhetorical_compression: 'high'
      }
    },
    ai_overlay: {
      generic_transitions: {
        trait: 'formulaic_connective_phrases',
        classification: 'ai-risk',
        confidence: 0.95,
        evidence: ['Furthermore', 'In conclusion', 'Crucially', 'Delving deeper', 'It is worth noting'],
        recommended_action: 'suppress'
      },
      manufactured_insights: {
        trait: 'epiphany_framing',
        classification: 'ai-risk',
        confidence: 0.92,
        evidence: ['The real question is not X, but how Y transforms Z'],
        recommended_action: 'reduce'
      }
    },
    constitution: {
      always: [
        'Preserve meaning, evidence, uncertainty, conceptual distinctions, technical accuracy.'
      ],
      usually: [
        'Follow stable reasoning tendencies and contextual structural preferences.'
      ],
      contextual: [
        'Apply rhetorical/surface traits only when genre and purpose support them.'
      ],
      rarely: [
        'Use high-compression rhetorical devices.'
      ],
      avoid: [
        'Forced questions, forced contrasts, symmetry, generic AI transitions, artificial imperfection, personality injection without justification.'
      ]
    }
  };
}
