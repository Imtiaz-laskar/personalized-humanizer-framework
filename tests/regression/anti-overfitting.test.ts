/**
 * @license
 * Apache License, Version 2.0
 * Anti-Overfitting Test Suite (PHF v1.0)
 */

import { validateTransformation } from '../../engine/validation/validator.ts';
import { VoiceProfile } from '../../engine/types.ts';

export function runAntiOverfittingTest(profile: VoiceProfile) {
  // Candidate should not cram user questions or idiosyncratic punctuation on every sentence
  const original = "The database cluster experienced an outage after primary disk exhaustion.";
  const candidate = "The primary database cluster halted operations after write-ahead logs saturated the local NVMe volume.";

  const report = validateTransformation(original, candidate, profile, 'technical');
  if (report.rhetorical_overfitting > 0.15) {
    throw new Error(`Rhetorical overfitting score too high: ${report.rhetorical_overfitting}`);
  }
  console.log('✓ Anti-overfitting test passed (overfitting score: ' + report.rhetorical_overfitting + ')');
  return true;
}
