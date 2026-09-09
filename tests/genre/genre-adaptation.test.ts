/**
 * @license
 * Apache License, Version 2.0
 * Genre Adaptation Test Suite (PHF v1.0)
 */

import { validateTransformation } from '../../engine/validation/validator.ts';
import { VoiceProfile } from '../../engine/types.ts';

export function runGenreAdaptationTest(profile: VoiceProfile) {
  const original = "Technical report discussing memory allocation patterns in PostgreSQL 16.";
  const candidate = "PostgreSQL 16 reduces memory fragmentation via optimized hash join memory layouts.";

  const report = validateTransformation(original, candidate, profile, 'technical');
  if (report.genre_fitness < 0.85) {
    throw new Error(`Genre fitness failed: ${report.genre_fitness}`);
  }
  console.log('✓ Genre adaptation test passed (score: ' + report.genre_fitness + ')');
  return true;
}
