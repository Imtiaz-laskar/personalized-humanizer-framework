/**
 * @license
 * Apache License, Version 2.0
 * Personalized Humanizer Framework (PHF v1.0) - Analysis Layer
 */

import { CorpusSample } from '../types.ts';
import { segmentDocument } from '../corpus/index.ts';

export interface AnalysisObservations {
  sample_id: string;
  sentence_stats: {
    avg_length: number;
    variance: number;
    short_sentence_ratio: number;
    punctuation_counts: {
      em_dash: number;
      semicolon: number;
      colon: number;
      parentheses: number;
      question_marks: number;
    };
  };
  reasoning_indicators: {
    hedging_terms: string[];
    empirical_anchors: string[];
    distinction_phrases: string[];
  };
  rhetorical_patterns: {
    question_count: number;
    contrast_markers: string[];
    analogy_markers: string[];
  };
  structural_profile: {
    paragraph_count: number;
    avg_paragraph_sentences: number;
    opening_style: string;
    closing_style: string;
  };
}

export function analyzeSample(sample: CorpusSample): AnalysisObservations {
  const { paragraphs, sentences } = segmentDocument(sample.text);
  const sentenceLengths = sentences.map(s => s.split(/\s+/).filter(Boolean).length);
  const totalWords = sentenceLengths.reduce((a, b) => a + b, 0);
  const avg_length = sentenceLengths.length > 0 ? totalWords / sentenceLengths.length : 0;
  
  const variance = sentenceLengths.length > 0
    ? sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avg_length, 2), 0) / sentenceLengths.length
    : 0;

  const short_sentence_ratio = sentenceLengths.length > 0
    ? sentenceLengths.filter(l => l <= 8).length / sentenceLengths.length
    : 0;

  const text = sample.text;
  const em_dash = (text.match(/—|--/g) || []).length;
  const semicolon = (text.match(/;/g) || []).length;
  const colon = (text.match(/:/g) || []).length;
  const parentheses = (text.match(/\(/g) || []).length;
  const question_marks = (text.match(/\?/g) || []).length;

  // Hedging / epistemic markers
  const hedgingCandidates = ['suggests', 'tends to', 'may indicate', 'typically', 'in practice', 'roughly', 'approximate'];
  const hedging_terms = hedgingCandidates.filter(term => text.toLowerCase().includes(term));

  // Empirical anchors (numbers, percentages, milliseconds, dates)
  const numbers = text.match(/\b\d+(\.\d+)?(%|ms|s|gb|mb|k)?\b/gi) || [];
  const empirical_anchors = Array.from(new Set(numbers)).slice(0, 10);

  // Conceptual distinction phrases
  const distinctionPhrases = ['by contrast', 'the distinction', 'conflate', 'versus', 'rather than', 'not merely'];
  const distinction_phrases = distinctionPhrases.filter(term => text.toLowerCase().includes(term));

  // Contrast markers
  const contrastMarkers = ['however', 'yet', 'by contrast', 'in practice', 'conversely'];
  const contrast_markers = contrastMarkers.filter(term => text.toLowerCase().includes(term));

  // Analogy markers
  const analogyMarkers = ['analogous to', 'like a', 'similar to', 'mirrors'];
  const analogy_markers = analogyMarkers.filter(term => text.toLowerCase().includes(term));

  const opening_style = sentences.length > 0
    ? (sentences[0].includes('?') ? 'question_hook' : sentences[0].toLowerCase().includes('when') ? 'contextual_premise' : 'declarative_statement')
    : 'unknown';

  const lastSentence = sentences[sentences.length - 1] || '';
  const closing_style = lastSentence.split(/\s+/).length <= 10 ? 'actionable_short_anchor' : 'analytical_synthesis';

  return {
    sample_id: sample.sample_id,
    sentence_stats: {
      avg_length: Math.round(avg_length * 10) / 10,
      variance: Math.round(variance * 10) / 10,
      short_sentence_ratio: Math.round(short_sentence_ratio * 100) / 100,
      punctuation_counts: { em_dash, semicolon, colon, parentheses, question_marks }
    },
    reasoning_indicators: {
      hedging_terms,
      empirical_anchors,
      distinction_phrases
    },
    rhetorical_patterns: {
      question_count: question_marks,
      contrast_markers,
      analogy_markers
    },
    structural_profile: {
      paragraph_count: paragraphs.length,
      avg_paragraph_sentences: paragraphs.length > 0 ? Math.round((sentences.length / paragraphs.length) * 10) / 10 : 0,
      opening_style,
      closing_style
    }
  };
}
