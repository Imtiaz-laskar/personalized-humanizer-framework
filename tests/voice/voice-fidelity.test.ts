/**
 * @license
 * Apache License, Version 2.0
 * Voice Fidelity Test Suite (PHF v1.0)
 */

import { validateTransformation } from '../../engine/validation/validator.ts';
import { VoiceProfile } from '../../engine/types.ts';

export function runVoiceFidelityTest(profile: VoiceProfile) {
  const original = "In conclusion, caching is very nice.";
  const candidate = "Start by auditing invalidation SLAs before moving dynamic state to the edge.";

  const report = validateTransformation(original, candidate, profile, 'technical');
  if (report.voice_fidelity < 0.85) {
    throw new Error(`Voice fidelity failed: ${report.voice_fidelity}`);
  }
  console.log('✓ Voice fidelity test passed (score: ' + report.voice_fidelity + ')');
  return true;
}
