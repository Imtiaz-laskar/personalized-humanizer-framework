/**
 * @license
 * Apache License, Version 2.0
 * Meaning Preservation Test Suite (PHF v1.0)
 */

import { validateTransformation } from '../../engine/validation/validator.ts';
import { VoiceProfile } from '../../engine/types.ts';

export function runMeaningPreservationTest(profile: VoiceProfile) {
  const original = "Eventual consistency guarantees that all replicas converge eventually, but concurrent reads may observe stale values.";
  const candidate = "Under eventual consistency, replica nodes converge over time; however, concurrent read queries may observe stale states before convergence finishes.";

  const report = validateTransformation(original, candidate, profile, 'technical');
  if (report.meaning_fidelity < 0.90) {
    throw new Error(`Meaning fidelity dropped below threshold: ${report.meaning_fidelity}`);
  }
  console.log('✓ Meaning preservation test passed (fidelity: ' + report.meaning_fidelity + ')');
  return true;
}
