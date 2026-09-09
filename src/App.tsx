/**
 * @license
 * Apache License, Version 2.0
 * Personalized Humanizer Framework (PHF v1.0)
 * Interactive Framework Workbench & GitHub Repository Hub
 */

import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  FileCode2,
  FolderGit2,
  Sparkles,
  ShieldCheck,
  Download,
  Terminal,
  BookOpen,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Search,
  ExternalLink,
  Cpu,
  Feather
} from 'lucide-react';
import { VoiceProfile, CorpusSample, HumanizationMode, FAILURE_TAXONOMY } from '../engine/types.ts';
import { analyzeSample } from '../engine/analysis/index.ts';
import { buildVoiceProfile } from '../engine/profiling/index.ts';
import { humanizeDraft } from '../engine/humanization/pipeline.ts';
import { validateTransformation } from '../engine/validation/validator.ts';
import { REPO_FILES, RepoFile } from './repoData.ts';

// Initial synthetic corpus from examples
const INITIAL_SAMPLES: CorpusSample[] = [
  {
    sample_id: 'sample-01',
    genre: 'technical',
    audience: 'distributed systems engineers',
    purpose: 'clarify concurrency definitions and document failover findings',
    ai_assistance: 'none',
    editorial_influence: 'low',
    representative: true,
    authenticity_confidence: 0.98,
    text: `When evaluating database isolation levels, team discussions frequently conflate serializability with linearizability. Serializability is a property of concurrent transactions executing across multi-row sets, guaranteeing that execution yields the exact same outcome as some purely serial schedule. Linearizability, by contrast, is a single-operation, real-time recency guarantee on individual registers or keys. You can build a strictly serializable system that is not linearizable if it reads from stale snapshots that maintain internal logical consistency. In our production cluster, we encountered this exact confusion during the Q3 replication failover test: queries were functionally serializable, yet application replicas observed stale writes for roughly 420 milliseconds before converging.`
  },
  {
    sample_id: 'sample-02',
    genre: 'explanatory',
    audience: 'engineering leads and software architects',
    purpose: 'challenge simplistic architectural assumptions',
    ai_assistance: 'none',
    editorial_influence: 'none',
    representative: true,
    authenticity_confidence: 0.96,
    text: `The common narrative suggests that migrating to microservices automatically reduces operational friction. In practice, it displaces in-process function calls with fallible network boundaries. The real trade-off is not monolithic complexity versus microservice agility; it is organizational coordination overhead versus runtime fault isolation. If your team cannot cleanly define bounded domains within a single deployable artifact, carving that artifact into fourteen distributed network boundaries guarantees distributed state corruption and cascading timeouts. Start by enforcing clean module boundaries first.`
  },
  {
    sample_id: 'sample-03',
    genre: 'analytical',
    audience: 'infrastructure platform team',
    purpose: 'prevent unwarranted extrapolation from telemetry benchmarks',
    ai_assistance: 'none',
    editorial_influence: 'low',
    representative: true,
    authenticity_confidence: 0.99,
    text: `During the April migration from PostgreSQL 14 to 16 on our telemetry ingest pipeline, CPU utilization dropped by 18% under sustained synthetic load of 45,000 writes per second. We initially suspected vacuum worker improvements, but further inspection revealed the primary gain stemmed from SIMD-accelerated JSONB extraction and optimized hash join memory layouts. This distinction matters because teams deploying plain relational workloads without JSON payloads should not expect identical double-digit efficiency gains. Validate with your specific schema before rewriting infrastructure timelines.`
  }
];

const SAMPLE_DRAFTS: { title: string; genre: string; text: string }[] = [
  {
    title: 'Edge Caching Trade-offs (AI-generated draft)',
    genre: 'technical',
    text: `In today's fast-paced digital ecosystem, edge caching has emerged as a game-changing paradigm for distributed architectures. Furthermore, by distributing content closer to users worldwide, latency is virtually eliminated while throughput experiences dramatic improvements. Crucially, it is not merely about speed; it is about revolutionizing the modern web experience.

However, organizations must remember that edge caching is not a silver bullet. Delving deeper into stale cache invalidation, cache purging can become complex. In conclusion, engineering leaders must balance performance and consistency to achieve optimal digital transformation.`
  },
  {
    title: 'Database Sharding Decisions (Generic AI draft)',
    genre: 'explanatory',
    text: `In the modern era of cloud computing, database sharding is undeniably crucial for high-growth enterprises. Moreover, horizontal partitioning seamlessly empowers systems to scale infinitely across distributed server clusters. Crucially, it allows massive datasets to be distributed across disparate geographical nodes.

Nevertheless, it is worth noting that sharding is not a panacea. Cross-shard joins become notoriously cumbersome. In conclusion, architects must carefully weigh their scalability strategies to unlock unprecedented organizational efficiency.`
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'humanizer' | 'profile' | 'corpus' | 'repo' | 'failures'>('humanizer');

  // Humanizer state
  const [currentDraft, setCurrentDraft] = useState<string>(SAMPLE_DRAFTS[0].text);
  const [selectedGenre, setSelectedGenre] = useState<string>('technical');
  const [selectedMode, setSelectedMode] = useState<HumanizationMode>('balanced');
  const [targetAudience, setTargetAudience] = useState<string>('software engineers');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [humanizedOutput, setHumanizedOutput] = useState<string>('');
  const [appliedTraits, setAppliedTraits] = useState<string[]>([]);
  const [suppressedPatterns, setSuppressedPatterns] = useState<string[]>([]);
  const [validationReport, setValidationReport] = useState<ReturnType<typeof validateTransformation> | null>(null);

  // Corpus & Profile state
  const [corpusSamples] = useState<CorpusSample[]>(INITIAL_SAMPLES);
  const [activeProfile, setActiveProfile] = useState<VoiceProfile>(() => buildVoiceProfile(INITIAL_SAMPLES));

  // Repo Browser state
  const [selectedRepoFile, setSelectedRepoFile] = useState<RepoFile>(REPO_FILES[0]);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);

  // Initial trigger for humanization
  React.useEffect(() => {
    runHumanize();
  }, [selectedGenre, selectedMode]);

  const runHumanize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const result = humanizeDraft(currentDraft, activeProfile, {
        model_version: '1.0',
        profile_version: activeProfile.version,
        mode: selectedMode,
        genre: selectedGenre,
        audience: targetAudience
      });

      setHumanizedOutput(result.humanized_text);
      setAppliedTraits(result.applied_traits);
      setSuppressedPatterns(result.suppressed_ai_patterns);

      const report = validateTransformation(currentDraft, result.humanized_text, activeProfile, selectedGenre);
      setValidationReport(report);
      setIsProcessing(false);
    }, 200);
  };

  const handleCopy = (text: string, path: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handleDownloadZip = async () => {
    setIsDownloadingZip(true);
    try {
      const zip = new JSZip();

      // Add root repository files
      zip.file('README.md', REPO_FILES.find(f => f.path === 'README.md')?.content || '');
      zip.file('LICENSE', REPO_FILES.find(f => f.path === 'LICENSE')?.content || '');
      zip.file('CONTRIBUTING.md', REPO_FILES.find(f => f.path === 'CONTRIBUTING.md')?.content || '');
      zip.file('SECURITY.md', REPO_FILES.find(f => f.path === 'SECURITY.md')?.content || '');

      // Add docs
      REPO_FILES.filter(f => f.path.startsWith('docs/')).forEach(f => {
        zip.file(f.path, f.content);
      });

      // Add schemas
      REPO_FILES.filter(f => f.path.startsWith('schemas/')).forEach(f => {
        zip.file(f.path, f.content);
      });

      // Add prompts
      REPO_FILES.filter(f => f.path.startsWith('prompts/')).forEach(f => {
        zip.file(f.path, f.content);
      });

      // Add configs
      zip.file('configs/default.yaml', REPO_FILES.find(f => f.path === 'configs/default.yaml')?.content || '');

      // Add example profile and corpus
      zip.file('examples/example-profile/default-profile.json', JSON.stringify(activeProfile, null, 2));
      corpusSamples.forEach((s, idx) => {
        zip.file(`examples/example-corpus/sample-${idx + 1}.json`, JSON.stringify(s, null, 2));
      });

      // Generate zip
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'personalized-humanizer-framework-v1.0.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const filteredRepoFiles = REPO_FILES.filter(
    f => f.path.toLowerCase().includes(searchFilter.toLowerCase()) || f.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div id="phf-app-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-900">
      {/* Top Header */}
      <header id="phf-header" className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">Personalized Humanizer Framework</h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  PHF v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Reconstruct how the writer thinks before reproducing how the writer sounds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-download-repo-zip"
              onClick={handleDownloadZip}
              disabled={isDownloadingZip}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-600/20 active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              {isDownloadingZip ? 'Generating ZIP...' : 'Download Ready GitHub Repo (.ZIP)'}
            </button>
            <button
              id="btn-tab-repo-quick"
              onClick={() => setActiveTab('repo')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
              Repo Blueprint
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav id="phf-nav-tabs" className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto border-t border-slate-800/60 pt-1">
          <button
            id="tab-humanizer"
            onClick={() => setActiveTab('humanizer')}
            className={`px-3.5 py-2 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'humanizer'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Humanizer Workbench
          </button>
          <button
            id="tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            6-Layer Personal Voice Model
          </button>
          <button
            id="tab-corpus"
            onClick={() => setActiveTab('corpus')}
            className={`px-3.5 py-2 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'corpus'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Corpus & Voice Discovery ({corpusSamples.length})
          </button>
          <button
            id="tab-repo"
            onClick={() => setActiveTab('repo')}
            className={`px-3.5 py-2 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'repo'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            Repository Files ({REPO_FILES.length})
          </button>
          <button
            id="tab-failures"
            onClick={() => setActiveTab('failures')}
            className={`px-3.5 py-2 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'failures'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Failure Taxonomy (F01–F18)
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main id="phf-main-content" className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* TAB 1: HUMANIZER WORKBENCH */}
        {activeTab === 'humanizer' && (
          <div id="view-humanizer-workbench" className="space-y-6">
            {/* Top Config Ribbon */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Target Genre
                  </label>
                  <select
                    id="select-target-genre"
                    value={selectedGenre}
                    onChange={e => setSelectedGenre(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="technical">Technical (Architecture & Engineering)</option>
                    <option value="explanatory">Explanatory (Guides & Concepts)</option>
                    <option value="public">Public (Essays & Commentary)</option>
                    <option value="executive">Executive (Strategic Briefings)</option>
                    <option value="analytical">Analytical (Research & Metrics)</option>
                    <option value="academic">Academic (Formal Rigor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Humanization Mode
                  </label>
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-lg p-0.5">
                    {(['conservative', 'balanced', 'deep'] as HumanizationMode[]).map(mode => (
                      <button
                        key={mode}
                        id={`btn-mode-${mode}`}
                        onClick={() => setSelectedMode(mode)}
                        className={`px-2.5 py-1 text-xs rounded-md capitalize font-medium transition-all ${
                          selectedMode === mode ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={e => setTargetAudience(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white w-44 focus:outline-none focus:border-cyan-500"
                    placeholder="e.g. distributed systems team"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-run-humanize"
                  onClick={runHumanize}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/20 active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                  Transform Draft
                </button>
              </div>
            </div>

            {/* Side-by-Side Editor Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Source Draft */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Source AI Draft (Raw Input)
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">Preset:</span>
                    <button
                      onClick={() => setCurrentDraft(SAMPLE_DRAFTS[0].text)}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      Edge Caching
                    </button>
                    <span className="text-slate-600">|</span>
                    <button
                      onClick={() => setCurrentDraft(SAMPLE_DRAFTS[1].text)}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      Sharding
                    </button>
                  </div>
                </div>
                <textarea
                  id="textarea-source-draft"
                  value={currentDraft}
                  onChange={e => setCurrentDraft(e.target.value)}
                  className="flex-1 w-full bg-transparent p-4 text-xs font-mono text-slate-300 focus:outline-none resize-none min-h-[300px] leading-relaxed"
                  placeholder="Paste AI-assisted or raw draft here..."
                />
                <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-500 flex justify-between">
                  <span>Words: {currentDraft.split(/\s+/).filter(Boolean).length}</span>
                  <span>Priority: Preserve epistemic caveats & meaning</span>
                </div>
              </div>

              {/* Right: Humanized Candidate */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      PHF Humanized Reconstruction
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCopy(humanizedOutput, 'candidate')}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    {copiedPath === 'candidate' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedPath === 'candidate' ? 'Copied' : 'Copy Output'}
                  </button>
                </div>
                <div
                  id="container-humanized-output"
                  className="flex-1 w-full p-4 text-xs font-mono text-slate-200 overflow-y-auto min-h-[300px] leading-relaxed whitespace-pre-wrap bg-slate-950/20"
                >
                  {humanizedOutput || 'Awaiting transformation...'}
                </div>
                <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-500 flex justify-between">
                  <span>Words: {humanizedOutput.split(/\s+/).filter(Boolean).length}</span>
                  <span className="text-emerald-400">Voice matched: Personal Voice Profile v1.0</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Evaluation Card */}
            {validationReport && (
              <div id="card-validation-diagnostics" className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">Diagnostic Evaluation & Failure Scan</h3>
                      <p className="text-xs text-slate-400">
                        Formal verification according to PHF Specification Section 9.2 & Section 8 Failure Taxonomy.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Composite Quality Score</span>
                      <span className="text-xl font-extrabold text-cyan-400">
                        {(validationReport.composite_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5 Positive Fidelity Metrics + 3 Penalties */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">Meaning Fidelity</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-emerald-400">
                        {(validationReport.meaning_fidelity * 100).toFixed(0)}%
                      </span>
                      <span className="text-[10px] text-slate-500">Target &gt;90%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${validationReport.meaning_fidelity * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">Reasoning Fidelity</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-emerald-400">
                        {(validationReport.reasoning_fidelity * 100).toFixed(0)}%
                      </span>
                      <span className="text-[10px] text-slate-500">Cognitive flow</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${validationReport.reasoning_fidelity * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">Voice Fidelity</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-cyan-400">
                        {(validationReport.voice_fidelity * 100).toFixed(0)}%
                      </span>
                      <span className="text-[10px] text-slate-500">6-Layer profile</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-cyan-500 h-full" style={{ width: `${validationReport.voice_fidelity * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">AI Template Penalty</span>
                    <div className="flex items-baseline justify-between">
                      <span className={`text-sm font-bold ${validationReport.ai_template_density > 0.1 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {(validationReport.ai_template_density * 100).toFixed(0)}%
                      </span>
                      <span className="text-[10px] text-slate-500">Goal &lt;5%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-rose-500 h-full" style={{ width: `${validationReport.ai_template_density * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Validation Notes & Applied Pipeline Operations */}
                <div className="bg-slate-950/40 rounded-lg p-3 border border-slate-800 text-xs space-y-2">
                  <span className="font-semibold text-slate-300 block text-[11px] uppercase tracking-wider">
                    Pipeline Decision Log & Diagnostics
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-400">
                    <div>
                      <span className="text-slate-300 font-medium block mb-1">Applied Voice Decisions:</span>
                      <ul className="space-y-1 list-disc list-inside text-[11px]">
                        {appliedTraits.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-slate-300 font-medium block mb-1">Suppressed Synthetic Tropes:</span>
                      <ul className="space-y-1 list-disc list-inside text-[11px]">
                        {suppressedPatterns.length > 0 ? (
                          suppressedPatterns.map((p, idx) => (
                            <li key={idx} className="text-amber-300 font-mono text-[10px]">{p}</li>
                          ))
                        ) : (
                          <li>No synthetic tropes detected in current draft.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 6-LAYER PERSONAL VOICE MODEL */}
        {activeTab === 'profile' && (
          <div id="view-voice-profile" className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Personal Voice Model Structure (PHM v1.0)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Hierarchical model distinguishing reasoning, rhetorical, structural, sentence, and surface characteristics.
                </p>
              </div>
              <button
                onClick={() => handleCopy(JSON.stringify(activeProfile, null, 2), 'profile-json')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 self-start sm:self-auto"
              >
                {copiedPath === 'profile-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedPath === 'profile-json' ? 'Copied Profile JSON' : 'Export Profile JSON'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Layer 1: Reasoning */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">1. Reasoning Profile</h3>
                </div>
                {(Object.entries(activeProfile.reasoning) as [string, any][]).map(([key, trait]) => (
                  <div key={key} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-cyan-300 text-[11px]">{trait.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                        {(trait.confidence * 100).toFixed(0)}% conf
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{trait.value}</p>
                  </div>
                ))}
              </div>

              {/* Layer 2: Rhetoric */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">2. Rhetorical Profile</h3>
                </div>
                {(Object.entries(activeProfile.rhetoric) as [string, any][]).map(([key, trait]) => (
                  <div key={key} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-blue-300 text-[11px]">{trait.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/50">
                        {trait.classification}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{trait.value}</p>
                  </div>
                ))}
              </div>

              {/* Layer 3: Structure */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">3. Structural Profile</h3>
                </div>
                {(Object.entries(activeProfile.structure) as [string, any][]).map(([key, trait]) => (
                  <div key={key} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-indigo-300 text-[11px]">{trait.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/50">
                        {(trait.confidence * 100).toFixed(0)}% conf
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{trait.value}</p>
                  </div>
                ))}
              </div>

              {/* Layer 4: Sentence */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">4. Sentence Profile</h3>
                </div>
                {(Object.entries(activeProfile.sentence) as [string, any][]).map(([key, trait]) => (
                  <div key={key} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-purple-300 text-[11px]">{trait.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800/50">
                        {(trait.stability * 100).toFixed(0)}% stab
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{trait.value}</p>
                  </div>
                ))}
              </div>

              {/* Layer 5: Surface */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">5. Surface Profile</h3>
                </div>
                {(Object.entries(activeProfile.surface) as [string, any][]).map(([key, trait]) => (
                  <div key={key} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-emerald-300 text-[11px]">{trait.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                        authentic
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{trait.value}</p>
                  </div>
                ))}
              </div>

              {/* Layer 6: AI / Editorial Contamination Overlay */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">6. AI Contamination Overlay</h3>
                </div>
                {(Object.entries(activeProfile.ai_overlay) as [string, any][]).map(([key, item]) => (
                  <div key={key} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-rose-300 text-[11px]">{item.trait}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50 uppercase">
                        {item.recommended_action}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Examples: {item.evidence?.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Constitution Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Voice Constitution (Execution Precedence Hierarchy)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-emerald-900/40">
                  <span className="font-bold text-emerald-400 block mb-1 text-[11px]">ALWAYS</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Preserve meaning, evidence, uncertainty, conceptual distinctions, technical accuracy.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-cyan-900/40">
                  <span className="font-bold text-cyan-400 block mb-1 text-[11px]">USUALLY</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Follow stable reasoning tendencies and contextual structural preferences.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-blue-900/40">
                  <span className="font-bold text-blue-400 block mb-1 text-[11px]">CONTEXTUAL</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Apply rhetorical/surface traits only when genre and purpose support them.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-amber-900/40">
                  <span className="font-bold text-amber-400 block mb-1 text-[11px]">RARELY</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Use high-compression rhetorical devices.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-rose-900/40">
                  <span className="font-bold text-rose-400 block mb-1 text-[11px]">AVOID</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Forced questions, symmetry, generic AI transitions, artificial imperfection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CORPUS & VOICE DISCOVERY */}
        {activeTab === 'corpus' && (
          <div id="view-corpus-discovery" className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Writing Corpus & Analysis Pipeline
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Ingested unassisted samples used as empirical ground truth for voice model derivation.
                </p>
              </div>
              <div className="text-xs text-slate-400">
                Recommended corpus size: <span className="font-semibold text-cyan-400">5–20+ samples</span> for high stability.
              </div>
            </div>

            <div className="space-y-4">
              {corpusSamples.map((sample, idx) => {
                const obs = analyzeSample(sample);
                return (
                  <div key={sample.sample_id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-400">#{idx + 1}</span>
                        <span className="text-xs font-semibold text-white">{sample.sample_id}</span>
                        <span className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                          {sample.genre}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-3">
                        <span>Audience: {sample.audience}</span>
                        <span>Confidence: {(Number(sample.authenticity_confidence) * 100).toFixed(0)}%</span>
                      </div>
                    </div>

                    <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                      {sample.text}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div className="bg-slate-950/40 px-2.5 py-1.5 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Avg Sentence Length</span>
                        <span className="font-semibold text-slate-200">{obs.sentence_stats.avg_length} words</span>
                      </div>
                      <div className="bg-slate-950/40 px-2.5 py-1.5 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Short Sentences (&le;8 words)</span>
                        <span className="font-semibold text-slate-200">{(obs.sentence_stats.short_sentence_ratio * 100).toFixed(0)}%</span>
                      </div>
                      <div className="bg-slate-950/40 px-2.5 py-1.5 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Empirical Anchors</span>
                        <span className="font-semibold text-cyan-400">{obs.reasoning_indicators.empirical_anchors.length} detected</span>
                      </div>
                      <div className="bg-slate-950/40 px-2.5 py-1.5 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Opening Style</span>
                        <span className="font-semibold text-slate-200 capitalize">{obs.structural_profile.opening_style.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: REPOSITORY BLUEPRINT & FILE BROWSER */}
        {activeTab === 'repo' && (
          <div id="view-repo-blueprint" className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-cyan-400" />
                  GitHub Repository Blueprint & Specification Files
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fully compiled open-source framework files matching Blueprint Section 0 and documentation Section 1–19.
                </p>
              </div>
              <button
                onClick={handleDownloadZip}
                disabled={isDownloadingZip}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow transition-all active:scale-95 disabled:opacity-50 self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                {isDownloadingZip ? 'Archiving...' : 'Download Full Repo (.ZIP)'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: File Tree */}
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-3 border-b border-slate-800 bg-slate-900/60 flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={e => setSearchFilter(e.target.value)}
                    placeholder="Search repo files..."
                    className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-500"
                  />
                </div>
                <div className="max-h-[550px] overflow-y-auto p-2 space-y-1 text-xs font-mono">
                  {filteredRepoFiles.map(file => (
                    <button
                      key={file.path}
                      onClick={() => setSelectedRepoFile(file)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        selectedRepoFile.path === file.path
                          ? 'bg-cyan-950 text-cyan-300 font-semibold border border-cyan-800/60'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="truncate">{file.path}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 uppercase font-sans">
                        {file.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: File Preview */}
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white">{selectedRepoFile.path}</h3>
                    <p className="text-[11px] text-slate-400">{selectedRepoFile.description}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedRepoFile.content, selectedRepoFile.path)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    {copiedPath === selectedRepoFile.path ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedPath === selectedRepoFile.path ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-[500px] leading-relaxed bg-slate-950/40">
                  {selectedRepoFile.content}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FAILURE TAXONOMY (F01–F18) */}
        {activeTab === 'failures' && (
          <div id="view-failure-taxonomy" className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Personalized Humanizer Failure Taxonomy (F01–F18)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Formal catalog of 18 specific failure modes, potential risks, and required corrective protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(FAILURE_TAXONOMY).map(item => (
                <div key={item.code} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-amber-400 text-xs">{item.code}</span>
                    <span className="font-semibold text-white text-xs">{item.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 block mb-0.5">Risk Description</span>
                    <p className="text-[11px] text-slate-400">{item.risk}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">Required Correction</span>
                    <p className="text-[11px] text-slate-300">{item.correction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="phf-footer" className="border-t border-slate-800 bg-slate-900/60 py-4 px-4 sm:px-6 mt-12 text-center text-xs text-slate-500">
        <p>Personalized Humanizer Framework (PHF v1.0) &bull; Apache 2.0 License &bull; Model separation &amp; Local-first privacy</p>
      </footer>
    </div>
  );
}
