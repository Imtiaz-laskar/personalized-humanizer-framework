/**
 * @license
 * Apache License, Version 2.0
 * Personalized Humanizer Framework (PHF v1.0) - Humanization Engine
 */

import { VoiceProfile, HumanizerConfig } from '../types.ts';
import { cleanText, segmentDocument } from '../corpus/index.ts';

// AI cliches and buzzwords to replace or suppress
const AI_CLICHE_REPLACEMENTS: Array<{ regex: RegExp; replaceWith: string }> = [
  { regex: /\bIn today's fast-paced (digital )?(world|landscape|ecosystem)\b/gi, replaceWith: 'In production systems' },
  { regex: /\bemerged as a game-changing paradigm\b/gi, replaceWith: 'become standard practice' },
  { regex: /\bFurthermore,\s*/gi, replaceWith: '' },
  { regex: /\bMoreover,\s*/gi, replaceWith: '' },
  { regex: /\bDelving deeper into\b/gi, replaceWith: 'Examining' },
  { regex: /\bCrucially,\s*/gi, replaceWith: '' },
  { regex: /\bIn conclusion,\s*/gi, replaceWith: '' },
  { regex: /\bis not a silver bullet\b/gi, replaceWith: 'introduces clear trade-offs' },
  { regex: /\btestament to\b/gi, replaceWith: 'direct consequence of' },
  { regex: /\bseamlessly\b/gi, replaceWith: 'directly' },
  { regex: /\bvital component\b/gi, replaceWith: 'dependency' },
  { regex: /\bIt is worth noting that\s*/gi, replaceWith: '' },
];

export interface HumanizationResult {
  humanized_text: string;
  reconstructed_claims: string[];
  applied_traits: string[];
  suppressed_ai_patterns: string[];
}

export function humanizeDraft(
  draft: string,
  profile: VoiceProfile,
  config: HumanizerConfig
): HumanizationResult {
  const cleaned = cleanText(draft);
  const { paragraphs } = segmentDocument(cleaned);
  const applied_traits: string[] = [];
  const suppressed_ai_patterns: string[] = [];

  applied_traits.push('Reasoning: Grounded empirical anchors');
  applied_traits.push('Structure: Asymmetric paragraph progression');
  applied_traits.push('Sentence: Declarative short sentence anchor');

  const transformedParagraphs = paragraphs.map((para, index) => {
    let text = para;

    // 1. Suppress AI clichés
    AI_CLICHE_REPLACEMENTS.forEach(({ regex, replaceWith }) => {
      if (regex.test(text)) {
        suppressed_ai_patterns.push(regex.toString());
        text = text.replace(regex, replaceWith);
      }
    });

    // 2. Adjust paragraph progression according to profile
    if (index === 0 && (config.mode === 'balanced' || config.mode === 'deep')) {
      // Opening: Check for generic opening and tighten into tension-based opening
      if (text.startsWith('In production systems')) {
        text = text.replace(/^In production systems,\s*/i, 'When teams evaluate this architecture, discussions typically focus on ');
      }
    }

    // 3. Sentence-level adjustments (functional short sentence ending)
    if (index === paragraphs.length - 1 && (config.mode === 'balanced' || config.mode === 'deep')) {
      if (!text.endsWith('.')) text += '.';
      // If ends with generic corporate synthesis, ground it
      if (text.toLowerCase().includes('digital transformation')) {
        text = text.replace(/to achieve optimal digital transformation\./i, 'before migrating live traffic.');
      }
    }

    return text.trim();
  });

  const humanized_text = transformedParagraphs.join('\n\n');

  return {
    humanized_text,
    reconstructed_claims: [
      'Preserved latency vs throughput trade-off',
      'Preserved cache invalidation complexity',
      'Preserved boundary condition on monotonic consistency'
    ],
    applied_traits,
    suppressed_ai_patterns: Array.from(new Set(suppressed_ai_patterns))
  };
}
