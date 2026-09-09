/**
 * @license
 * Apache License, Version 2.0
 * AI Pattern Reduction Test Suite (PHF v1.0)
 */

import { validateTransformation } from '../../engine/validation/validator.ts';
import { VoiceProfile } from '../../engine/types.ts';

export function runAIPatternReductionTest(profile: VoiceProfile) {
  const original = "Furthermore, in today's fast-paced digital world, it is not a silver bullet.";
  const candidate = "Deploying read replicas genuinely cuts latency, but cache invalidation introduces operational hazards.";

  const report = validateTransformation(original, candidate, profile, 'explanatory');
  if (report.ai_template_density > 0.10) {
    throw new Error(`AI template density too high: ${report.ai_template_density}`);
  }
  console.log('✓ AI pattern reduction test passed (template density: ' + report.ai_template_density + ')');
  return true;
}
