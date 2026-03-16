import { C } from '../constants/colors'

/* ── Reusable sub-components (matching PipelineView style) ─── */

function Phase({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl border p-5 pt-6" style={{ borderColor: color + '30' }}>
      <div
        className="absolute -top-2.5 left-5 px-2.5 text-[11px] font-semibold uppercase tracking-widest"
        style={{ color, background: C.bg }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

function Node({ icon, title, detail, file, variant }: {
  icon: string; title: string; detail: string; file?: string
  variant: keyof typeof nodeColors
}) {
  const nc = nodeColors[variant]
  return (
    <div
      className="flex flex-col items-center p-3.5 rounded-lg text-center min-w-[150px] max-w-[220px] transition-transform hover:-translate-y-0.5"
      style={{ background: nc.bg, border: `1px solid ${nc.border}` }}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-[13px] font-semibold leading-tight" style={{ color: nc.title }}>{title}</span>
      <span className="text-[10.5px] mt-1 leading-snug" style={{ color: 'rgba(255,255,255,0.55)' }}>{detail}</span>
      {file && <span className="text-[9.5px] font-mono mt-1.5 break-all" style={{ color: 'rgba(255,255,255,0.35)' }}>{file}</span>}
    </div>
  )
}

function WideNode({ icon, title, detail, file, variant }: {
  icon: string; title: string; detail: string; file?: string
  variant: keyof typeof nodeColors
}) {
  return <div className="min-w-[240px] max-w-[320px]"><Node icon={icon} title={title} detail={detail} file={file} variant={variant} /></div>
}

const nodeColors = {
  client:   { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.4)',  title: '#c4b5fd' },
  mcp:      { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', title: '#93c5fd' },
  qubo:     { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.35)', title: '#6ee7b7' },
  domain:   { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', title: '#fcd34d' },
  store:    { bg: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.35)', title: '#5eead4' },
  entity:   { bg: 'rgba(248,113,113,0.12)',border: 'rgba(248,113,113,0.35)',title: '#fca5a5' },
  feedback: { bg: 'rgba(253,186,116,0.12)',border: 'rgba(253,186,116,0.35)',title: '#fdba74' },
  session:  { bg: 'rgba(244,114,182,0.12)',border: 'rgba(244,114,182,0.35)',title: '#f9a8d4' },
  cache:    { bg: 'rgba(167,139,250,0.12)',border: 'rgba(167,139,250,0.35)',title: '#c4b5fd' },
  embed:    { bg: 'rgba(129,140,248,0.12)',border: 'rgba(129,140,248,0.35)',title: '#a5b4fc' },
  muted:    { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', title: '#94a3b8' },
}

function Arrow() {
  return (
    <div className="flex justify-center py-1.5">
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-6" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div className="w-0 h-0" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid rgba(255,255,255,0.3)' }} />
      </div>
    </div>
  )
}

function HArrow() {
  return <span className="text-xl" style={{ color: 'rgba(255,255,255,0.25)' }}>&rarr;</span>
}

function HFlow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center gap-2 flex-wrap">{children}</div>
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
      style={{ background: color + '20', border: `1px solid ${color}40`, color }}
    >
      {children}
    </span>
  )
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-lg border text-center px-5 py-3.5 min-w-[130px]" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-[11px]" style={{ color: C.textDim }}>{label}</div>
    </div>
  )
}

function InfoBlock({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className="rounded-lg border p-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="text-[12px] font-semibold mb-2" style={{ color }}>{title}</div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[11px] leading-relaxed" style={{ color: C.textDim }}>
            <span style={{ color: color + 'aa' }}>-</span> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Legend ───────────────────────────────────────────────── */

const legendItems = [
  { color: '#8b5cf6', label: 'Clients' },
  { color: '#60a5fa', label: 'MCP Layer' },
  { color: '#fbbf24', label: 'Domain Intelligence' },
  { color: '#34d399', label: 'QUBO Solver' },
  { color: '#2dd4bf', label: 'Storage' },
  { color: '#f87171', label: 'Entity Graph' },
  { color: '#fdba74', label: 'Feedback Loop' },
  { color: '#f472b6', label: 'Session Continuity' },
]

/* ── Main View ───────────────────────────────────────────── */

export function MemoryView() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title + Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: C.textBright }}>JARVIS Memory System</h2>
          <p className="text-[11px] mt-1" style={{ color: C.textDim }}>
            QUBO-optimized persistent memory for Claude Code, Claude Desktop, and Cursor across all workstations.
            6-phase evolution: write pipeline, domain intelligence, feedback loop, entity graph, session continuity, structured contradiction detection.
          </p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {legendItems.map((l) => (
            <Badge key={l.label} color={l.color}>{l.label}</Badge>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-3 flex-wrap justify-center">
        <StatCard value="10" label="MCP Tools" color={C.blue} />
        <StatCard value="9" label="API Endpoints" color={C.green100g} />
        <StatCard value="7" label="BQM Terms" color={C.teal} />
        <StatCard value="3" label="Domains" color={C.orange} />
        <StatCard value="768d" label="Embedding Dim" color={C.purple} />
        <StatCard value="<200ms" label="Write Latency" color={C.pink} />
      </div>

      {/* ── Phase 0: Client Layer ─────────────────────────── */}
      <Phase label="Phase 0 - Client Layer" color="#8b5cf6">
        <HFlow>
          <Node icon="&lt;/&gt;" title="Claude Code" detail="CLI / stdio via mcp-remote" variant="client" />
          <Node icon="D" title="Claude Desktop" detail="GUI / SSE via mcp-remote" variant="client" />
          <Node icon="C" title="Cursor" detail="IDE / SSE via mcp-remote" variant="client" />
        </HFlow>
        <div className="text-[10px] text-center mt-3" style={{ color: C.textDim }}>
          All clients connect via mcp-remote to IRON-PATRIOT:8104 (SSE). Each connection gets its own MCP server instance.
        </div>
      </Phase>

      <Arrow />

      {/* ── Phase 1: MCP + Write Pipeline ─────────────────── */}
      <Phase label="Phase 1 - MCP Layer + Write Pipeline" color="#60a5fa">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#93c5fd' }}>Read Tools (Retrieval)</div>
            <HFlow>
              <Node icon="Q" title="memory_optimize" detail="Full QUBO pipeline - both sources" variant="mcp" />
              <Node icon="R" title="rag_context" detail="Pre-formatted context string" variant="mcp" />
            </HFlow>
            <HFlow>
              <Node icon="O" title="rag_optimize" detail="RAG-only shortcut" variant="mcp" />
              <Node icon="C" title="optimize_chunks" detail="Optimize pre-fetched chunks" variant="mcp" />
            </HFlow>
          </div>
          <div className="space-y-3">
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#93c5fd' }}>Write Tools (Persistence)</div>
            <HFlow>
              <Node icon="+" title="memory_remember" detail="Mid-conversation write (<100ms)" file="Phase 1" variant="store" />
              <Node icon="W" title="memory_write" detail="Session-end decision extraction" variant="mcp" />
            </HFlow>
            <HFlow>
              <Node icon="F" title="memory_feedback" detail="Log chunk utilization" file="Phase 3" variant="feedback" />
              <Node icon="H" title="memory_health" detail="Service health + all subsystem stats" variant="muted" />
            </HFlow>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Node icon="E" title="entity_get" detail="Entity + N-hop graph expansion" file="Phase 4" variant="entity" />
          <Node icon="R" title="entity_relate" detail="Create typed relationships" file="Phase 4" variant="entity" />
          <Node icon="S" title="entity_search" detail="Fuzzy FTS5 entity search" file="Phase 4" variant="entity" />
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Node icon="1" title="session_start" detail="Begin tracked session" file="Phase 5" variant="session" />
          <Node icon="A" title="session_attempt" detail="Log attempt + outcome" file="Phase 5" variant="session" />
          <Node icon="H" title="session_handoff" detail="Generate handoff context" file="Phase 5" variant="session" />
        </div>
      </Phase>

      <Arrow />

      {/* ── Phase 2: Domain Classification ─────────────────── */}
      <Phase label="Phase 2 - Domain Classification" color="#fbbf24">
        <div className="text-[10px] text-center mb-3" style={{ color: C.textDim }}>
          Every query is classified into a domain before retrieval. Keyword matching (&lt;1ms) with 100% accuracy on 16 test queries.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Node icon="L" title="Kaycha Labs" detail="Compliance, regulations, financial, multi-state ops" variant="domain" />
            <InfoBlock title="Weight Boosts" color="#fbbf24" items={[
              'Regulations: 1.5x',
              'Financial: 1.3x',
              'Legal: 1.2x',
              'Code: 0.7x (dampened)',
              'Contradiction eta: 15.0 (boosted)',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="V" title="Vibe Coding" detail="11+ projects, code patterns, bugs, architecture" variant="domain" />
            <InfoBlock title="Weight Boosts" color="#fbbf24" items={[
              'Code: 1.5x',
              'Schemas: 1.2x',
              'Regulations: 0.5x (dampened)',
              'Financial: 0.3x (dampened)',
              'Freshness delta: 2.0x (code changes fast)',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="N" title="NodePlus" detail="LIMS schema, test methods, compliance rules, COA" variant="domain" />
            <InfoBlock title="Weight Boosts" color="#fbbf24" items={[
              'Schemas: 1.6x',
              'Regulations: 1.3x',
              'Knowledge: 1.2x',
              'Dep coupling zeta: 1.5x (schema deps)',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Retrieval + Scoring + QUBO ─────────────────────── */}
      <Phase label="QUBO Pipeline - Retrieval, Scoring, Solving" color="#34d399">
        <div className="space-y-3">
          {/* Retrieval */}
          <div className="text-[11px] font-semibold" style={{ color: '#6ee7b7' }}>1. Retrieval (parallel, circuit-breaker protected)</div>
          <HFlow>
            <Node icon="M" title="jarvis_memory" detail="CF Worker FTS - decisions, patterns" variant="store" />
            <HArrow />
            <Node icon="R" title="jarvis_rag" detail="ChromaDB - 7 collections, 768d embeddings" variant="store" />
            <HArrow />
            <Node icon="G" title="Entity Graph" detail="SQLite + NetworkX - N-hop expansion" variant="entity" />
          </HFlow>

          {/* Scoring */}
          <div className="text-[11px] font-semibold mt-3" style={{ color: '#6ee7b7' }}>2. Scoring (vectorized, domain-weighted)</div>
          <HFlow>
            <Node icon="E" title="Embeddings" detail="nomic-embed-text 768d via Ollama, batch=50" variant="embed" />
            <HArrow />
            <Node icon="P" title="Pairwise Similarity" detail="Vectorized matmul (normalized @ normalized.T)" variant="embed" />
            <HArrow />
            <Node icon="F" title="Freshness" detail="Temporal decay (evergreen/periodic/event/session)" variant="embed" />
          </HFlow>

          {/* BQM */}
          <div className="text-[11px] font-semibold mt-3" style={{ color: '#6ee7b7' }}>3. BQM Construction (7-term energy function)</div>
          <div className="rounded-lg border p-4 font-mono text-[11px] leading-relaxed" style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'rgba(52,211,153,0.15)', color: '#6ee7b7' }}>
            <div>H = <span style={{ color: '#fca5a5' }}>-alpha</span> SUM(rel_i * s_i)</div>
            <div className="ml-4">+ <span style={{ color: '#fcd34d' }}>beta</span> SUM(sim_ij * s_i * s_j)</div>
            <div className="ml-4">+ <span style={{ color: '#93c5fd' }}>gamma</span> (SUM(tok_i * s_i) - B)^2</div>
            <div className="ml-4">- <span style={{ color: '#5eead4' }}>delta</span> SUM(fresh_i * s_i)</div>
            <div className="ml-4">+ <span style={{ color: '#c4b5fd' }}>epsilon</span> per-source cap</div>
            <div className="ml-4">- <span style={{ color: '#fdba74' }}>zeta</span> SUM(dep_pairs s_i * s_j)</div>
            <div className="ml-4">+ <span style={{ color: '#f9a8d4' }}>eta</span> SUM(contradiction_ij * s_i * s_j)</div>
          </div>
          <div className="text-[10px] text-center" style={{ color: C.textDim }}>
            Terms: relevance reward, redundancy penalty, token budget constraint, freshness bonus, source diversity, dependency coupling, contradiction penalty
          </div>

          {/* Solver */}
          <div className="text-[11px] font-semibold mt-3" style={{ color: '#6ee7b7' }}>4. Hybrid Solve (SA + Tabu in parallel)</div>
          <HFlow>
            <Node icon="SA" title="Simulated Annealing" detail="D-Wave Ocean SDK, variable reads" variant="qubo" />
            <Node icon="T" title="Tabu Search" detail="Tenure-clamped, parallel with SA" variant="qubo" />
            <Node icon="CP" title="CP-SAT (fast tier)" detail="OR-Tools classical solver" variant="qubo" />
          </HFlow>
          <div className="text-[10px] text-center" style={{ color: C.textDim }}>
            Best energy wins. Warm-start from prior solutions via SHA-256 cache key. Solution cached for reuse.
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Contradiction Detection ────────────────────────── */}
      <Phase label="Phase 6 - Contradiction Detection" color="#f87171">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Node icon="T" title="Text Similarity" detail="Negation, supersession, antonym detection" variant="entity" />
            <InfoBlock title="Strategies" color="#f87171" items={[
              'Negation prefix: cosine > 0.85 + negation words',
              'Temporal supersession: cosine > 0.90 + age gap > 30d',
              'Antonym pairs: 50+ dev-domain antonyms',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="$" title="Structured Facts" detail="Numerical/financial contradiction detection" file="Phase 6" variant="entity" />
            <InfoBlock title="Fact Extraction" color="#f87171" items={[
              'AR aging: $amounts + periods',
              'Revenue/sales: $amounts + periods',
              'TAT: duration + timeframes',
              'Invoice counts + periods',
              'Same metric + same period + >10% divergence = contradiction',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Caching + Feedback ─────────────────────────────── */}
      <Phase label="Caching + Feedback Loop" color="#a78bfa">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Node icon="L1" title="L1 Cache" detail="In-memory LRU, 50 entries, 15min TTL" variant="cache" />
            <Node icon="L2" title="L2 Cache" detail="Disk-backed JSON, 5000 entries, 2hr TTL" variant="cache" />
            <div className="text-[10px]" style={{ color: C.textDim }}>
              Semantic similarity matching (cosine &gt; 0.92 = cache hit). L2 promotes to L1 on hit.
            </div>
          </div>
          <div className="space-y-2">
            <Node icon="FB" title="Feedback Tracker" detail="SQLite-backed chunk utilization logging" file="Phase 3" variant="feedback" />
            <Node icon="WT" title="Weight Tuner" detail="Offline suggestions, bounded +/-20% per cycle" file="Phase 3" variant="feedback" />
            <div className="text-[10px]" style={{ color: C.textDim }}>
              Tracks which retrieved chunks were actually useful. Feeds into collection weight tuning per domain. Human review required.
            </div>
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Entity Graph + Sessions ────────────────────────── */}
      <Phase label="Knowledge Graph + Session Continuity" color="#f472b6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Node icon="G" title="Entity Graph" detail="SQLite + NetworkX DiGraph" file="Phase 4" variant="entity" />
            <InfoBlock title="Entity Types" color="#f87171" items={[
              'person, project, codebase, api, decision, bug',
              'pattern, regulation, state, test_method, table',
              'Auto-extracted via regex from memory_remember',
              'Co-occurrence relations between entities in same memory',
              'FTS5 fuzzy search + N-hop traversal',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="S" title="Session Manager" detail="SQLite session chains + attempt tracking" file="Phase 5" variant="session" />
            <InfoBlock title="Session Tracking" color="#f472b6" items={[
              'Start session with client + domain',
              'Log attempts: success / failure / partial / abandoned',
              'Auto-generate handoff markdown on session end',
              'Writes to ai-context/handoffs/ for next session pickup',
              'Query prior attempts to avoid repeating failures',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Infrastructure ─────────────────────────────────── */}
      <Phase label="Infrastructure" color="#94a3b8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBlock title="IRON-PATRIOT (Primary)" color={C.teal} items={[
            ':8104 - MCP SSE Server (Node.js, NSSM)',
            ':7472 - Memory Optimizer (Python/FastAPI, NSSM)',
            'SQLite: entity_graph.db, feedback.db, sessions.db',
            'RTX PRO 6000 96GB, 128GB RAM',
          ]} />
          <InfoBlock title="SENTINEL (Hot Backup)" color={C.blue} items={[
            ':7472 - Memory Optimizer (same code, synced data)',
            'Ollama host for embeddings (nomic-embed-text)',
            'RTX 5090 32GB, 64GB RAM',
            'Data sync via SCP of SQLite files',
          ]} />
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoBlock title="ChromaDB Collections (7)" color={C.green100g} items={[
            'jarvis_documents',
            'jarvis_code',
            'jarvis_schemas',
            'jarvis_knowledge',
            'jarvis_regulations',
            'jarvis_financial',
            'jarvis_legal',
          ]} />
          <InfoBlock title="Monitoring" color={C.orange} items={[
            'Prometheus metrics: /metrics endpoint',
            'Health: /memory/health + /memory/health/deep',
            'Circuit breakers per retrieval source',
            'Rate limiting: 30 req/min token bucket',
            'Request tracing via X-Request-ID',
          ]} />
          <InfoBlock title="Security" color={C.red} items={[
            'Bearer token auth (mandatory)',
            'JSON serialization (no pickle RCE)',
            'Firewall rules per port per machine',
            'Tailscale mesh networking',
            'NSSM auto-restart on crash',
          ]} />
        </div>
      </Phase>

      {/* ── Benefits Summary ──────────────────────────────── */}
      <div className="rounded-xl border p-5" style={{ borderColor: C.accent + '30', background: C.accent + '05' }}>
        <div className="text-[12px] font-semibold mb-3" style={{ color: C.accent }}>WHY JARVIS MEMORY</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoBlock title="For the CEO (James)" color={C.accent} items={[
            'True cross-session recall across all workstations',
            'Domain-aware: compliance vs coding vs NodePlus',
            'Structured financial contradiction detection',
            'Session handoffs preserve decisions and context',
            'Board-ready: auditable feedback loop + weight tuning',
          ]} />
          <InfoBlock title="For the Codebase" color={C.green100g} items={[
            'QUBO-optimized chunk selection (not naive top-k)',
            '7-term energy function balances relevance, freshness, budget',
            'Entity graph captures code dependencies and patterns',
            'Vectorized similarity (100x faster than Python loops)',
            'Hybrid SA+Tabu solver with warm-start caching',
          ]} />
          <InfoBlock title="vs Generic RAG" color={C.orange} items={[
            'Domain-specific retrieval weights (not one-size-fits-all)',
            'Feedback loop learns which chunks are useful',
            'Entity graph enables structured queries',
            'Contradiction detection prevents conflicting context',
            'Session continuity tracks what was tried and failed',
          ]} />
        </div>
      </div>
    </div>
  )
}
