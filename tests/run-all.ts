/**
 * @license
 * Apache License, Version 2.0
 * Master Test Runner (PHF v1.0)
 */

import fs from 'fs';
import { runMeaningPreservationTest } from './meaning/meaning-preservation.test.ts';
import { runVoiceFidelityTest } from './voice/voice-fidelity.test.ts';
import { runGenreAdaptationTest } from './genre/genre-adaptation.test.ts';
import { runAIPatternReductionTest } from './ai-patterns/ai-pattern-reduction.test.ts';
import { runAntiOverfittingTest } from './regression/anti-overfitting.test.ts';
import { VoiceProfile } from '../engine/types.ts';

const profile: VoiceProfile = JSON.parse(
  fs.readFileSync('./examples/example-profile/default-profile.json', 'utf-8')
);

console.log('=== Running Personalized Humanizer Framework (PHF v1.0) Test Suites ===\n');

try {
  runMeaningPreservationTest(profile);
  runVoiceFidelityTest(profile);
  runGenreAdaptationTest(profile);
  runAIPatternReductionTest(profile);
  runAntiOverfittingTest(profile);
  console.log('\nAll PHF v1.0 verification test suites passed successfully!');
} catch (err) {
  console.error('\nTest suite failure:', err);
  process.exit(1);
}
