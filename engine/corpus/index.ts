/**
 * @license
 * Apache License, Version 2.0
 * Personalized Humanizer Framework (PHF v1.0) - Corpus Layer
 */

import { CorpusSample } from '../types.ts';

export function cleanText(rawText: string): string {
  return rawText
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, '  ')
    .replace(/^\s*<!--[\s\S]*?-->\s*/gm, '') // HTML comments
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function segmentDocument(text: string): { paragraphs: string[]; sentences: string[] } {
  const cleaned = cleanText(text);
  const paragraphs = cleaned
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean);

  const sentences = cleaned
    .split(/(?<=[.?!])\s+(?=[A-Z0-9"“'‘])/)
    .map(s => s.trim())
    .filter(Boolean);

  return { paragraphs, sentences };
}

export function classifySampleMetadata(sample: Partial<CorpusSample>): CorpusSample {
  const text = cleanText(sample.text || '');
  const id = sample.sample_id || `sample-${Math.random().toString(36).substring(2, 9)}`;

  // Heuristic inference for missing metadata
  let inferredGenre = sample.genre || 'explanatory';
  const lower = text.toLowerCase();
  if (lower.includes('api') || lower.includes('database') || lower.includes('memory') || lower.includes('cluster') || lower.includes('code')) {
    inferredGenre = 'technical';
  } else if (lower.includes('executive') || lower.includes('quarter') || lower.includes('roi') || lower.includes('revenue')) {
    inferredGenre = 'executive';
  }

  return {
    sample_id: id,
    text,
    date: sample.date || new Date().toISOString().split('T')[0],
    genre: inferredGenre,
    audience: sample.audience || 'general technical',
    purpose: sample.purpose || 'explanatory discourse',
    ai_assistance: sample.ai_assistance || 'none',
    editorial_influence: sample.editorial_influence || 'low',
    representative: sample.representative ?? true,
    authenticity_confidence: sample.authenticity_confidence ?? 0.95,
    notes: sample.notes || ''
  };
}
