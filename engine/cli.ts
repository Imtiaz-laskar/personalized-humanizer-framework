/**
 * @license
 * Apache License, Version 2.0
 * Personalized Humanizer Framework (PHF v1.0) - CLI Runner
 */

import fs from 'fs';
import path from 'path';
import { classifySampleMetadata } from './corpus/index.ts';
import { analyzeSample } from './analysis/index.ts';
import { buildVoiceProfile } from './profiling/index.ts';
import { humanizeDraft } from './humanization/pipeline.ts';
import { validateTransformation } from './validation/validator.ts';
import { CorpusSample, VoiceProfile } from './types.ts';

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
Personalized Humanizer Framework (PHF v1.0) - CLI Tool

Usage:
  phf ingest <directory>                Ingest and segment writing samples
  phf analyze <directory>               Extract reasoning, rhetorical & structural traits
  phf build-profile --output <file>     Compile voice profile from corpus
  phf inspect-profile <file>            Display 6-layer model summary & constitution
  phf humanize <draft> --profile <file> Transform AI draft into personal voice
  phf validate <orig> <human> --profile Run 9-dimension diagnostic validation
  phf benchmark <dir> --profile <file>  Execute test suites across genres
`);
}

async function run() {
  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  try {
    switch (command) {
      case 'ingest': {
        const dir = args[1] || './examples/example-corpus';
        console.log(`[PHF] Ingesting samples from ${dir}...`);
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
        const samples: CorpusSample[] = files.map(f => {
          const raw = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
          return classifySampleMetadata(raw);
        });
        console.log(`[PHF] Ingested ${samples.length} writing sample(s).`);
        samples.forEach(s => console.log(`  - [${s.genre}] ${s.sample_id}: ${s.purpose}`));
        break;
      }

      case 'analyze': {
        const dir = args[1] || './examples/example-corpus';
        console.log(`[PHF] Analyzing writing samples in ${dir}...`);
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
        files.forEach(f => {
          const sample = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
          const obs = analyzeSample(sample);
          console.log(`\nAnalysis for ${sample.sample_id}:`);
          console.log(`  Avg Sentence Length: ${obs.sentence_stats.avg_length} words (variance: ${obs.sentence_stats.variance})`);
          console.log(`  Short sentence ratio: ${Math.round(obs.sentence_stats.short_sentence_ratio * 100)}%`);
          console.log(`  Punctuation: ${JSON.stringify(obs.sentence_stats.punctuation_counts)}`);
          console.log(`  Hedging terms: ${obs.reasoning_indicators.hedging_terms.join(', ') || 'none'}`);
        });
        break;
      }

      case 'build-profile': {
        const dir = './examples/example-corpus';
        const outIdx = args.indexOf('--output');
        const outputFile = outIdx !== -1 && args[outIdx + 1] ? args[outIdx + 1] : 'my-voice-profile.json';

        const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
        const samples: CorpusSample[] = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
        const profile = buildVoiceProfile(samples);

        fs.writeFileSync(outputFile, JSON.stringify(profile, null, 2));
        console.log(`[PHF] Successfully compiled Personal Voice Model to ${outputFile}`);
        break;
      }

      case 'inspect-profile': {
        const file = args[1] || './examples/example-profile/default-profile.json';
        const profile: VoiceProfile = JSON.parse(fs.readFileSync(file, 'utf-8'));
        console.log(`\nPersonal Voice Model (v${profile.version}):`);
        console.log(`- Reasoning Traits: ${Object.keys(profile.reasoning).length}`);
        console.log(`- Rhetorical Traits: ${Object.keys(profile.rhetoric).length}`);
        console.log(`- Structural Traits: ${Object.keys(profile.structure).length}`);
        console.log(`- Calibrated Genres: ${Object.keys(profile.genres).join(', ')}`);
        console.log(`\nConstitution ALWAYS:\n  ${profile.constitution?.always.join('\n  ')}`);
        break;
      }

      case 'humanize': {
        const draftFile = args[1] || './examples/example-humanization/source-draft.md';
        const profIdx = args.indexOf('--profile');
        const profileFile = profIdx !== -1 ? args[profIdx + 1] : './examples/example-profile/default-profile.json';
        const genreIdx = args.indexOf('--genre');
        const genre = genreIdx !== -1 ? args[genreIdx + 1] : 'explanatory';

        const draft = fs.readFileSync(draftFile, 'utf-8');
        const profile: VoiceProfile = JSON.parse(fs.readFileSync(profileFile, 'utf-8'));

        const res = humanizeDraft(draft, profile, {
          model_version: '1.0',
          profile_version: profile.version,
          mode: 'balanced',
          genre
        });

        console.log(`\n[Humanized Output (${genre})]:\n`);
        console.log(res.humanized_text);
        console.log(`\n[Applied Traits]:\n  - ${res.applied_traits.join('\n  - ')}`);
        break;
      }

      case 'validate': {
        const origFile = args[1] || './examples/example-humanization/source-draft.md';
        const humFile = args[2] || './examples/example-humanization/humanized-result.md';
        const profIdx = args.indexOf('--profile');
        const profileFile = profIdx !== -1 ? args[profIdx + 1] : './examples/example-profile/default-profile.json';

        const orig = fs.readFileSync(origFile, 'utf-8');
        const hum = fs.readFileSync(humFile, 'utf-8');
        const profile: VoiceProfile = JSON.parse(fs.readFileSync(profileFile, 'utf-8'));

        const report = validateTransformation(orig, hum, profile);
        console.log(`\n[Validation Diagnostic Report]:`);
        console.log(`  Composite Quality Score: ${(report.composite_score * 100).toFixed(1)}%`);
        console.log(`  Meaning Fidelity:       ${report.meaning_fidelity}`);
        console.log(`  Reasoning Fidelity:     ${report.reasoning_fidelity}`);
        console.log(`  Voice Fidelity:         ${report.voice_fidelity}`);
        console.log(`  AI Template Density:    ${report.ai_template_density}`);
        console.log(`  Rhetorical Overfitting: ${report.rhetorical_overfitting}`);
        console.log(`  Artificial Imperfection:${report.artificial_imperfection}`);
        console.log(`\nNotes:\n  - ${report.notes.join('\n  - ')}`);
        break;
      }

      default:
        console.log(`Unknown command: ${command}`);
        printHelp();
    }
  } catch (err) {
    console.error(`[PHF Error]:`, err);
  }
}

run();
