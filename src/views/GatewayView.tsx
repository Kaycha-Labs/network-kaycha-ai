import { C } from '../constants/colors'

/* ── Sub-components (matching MemoryView / RagView style) ─── */

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

const nodeColors = {
  proxy:    { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', title: '#fcd34d' },
  fleet:    { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.35)', title: '#6ee7b7' },
  inject:   { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', title: '#93c5fd' },
  pipeline: { bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.35)', title: '#f9a8d4' },
  extract:  { bg: 'rgba(167,139,250,0.12)',border: 'rgba(167,139,250,0.35)',title: '#c4b5fd' },
  monitor:  { bg: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.35)', title: '#5eead4' },
  muted:    { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', title: '#94a3b8' },
  provider: { bg: 'rgba(129,140,248,0.12)',border: 'rgba(129,140,248,0.35)',title: '#a5b4fc' },
  pin:      { bg: 'rgba(248,113,113,0.12)',border: 'rgba(248,113,113,0.35)',title: '#fca5a5' },
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

/* ── Pinned Models Data ────────────────────────────────────── */

const pinnedModels = [
  { machine: 'Ironman', ip: '192.168.1.43', models: 'qwen3.5:122b-tuned', vram: '81GB / 96GB', color: C.warning },
  { machine: 'Jericho', ip: '192.168.1.39', models: 'qwen3.5:122b-tuned', vram: '81GB / 96GB', color: C.purple },
  { machine: 'Sentinel', ip: '192.168.1.40', models: 'qwen3.5:35b-a3b', vram: '25GB / 32GB', color: C.pink },
  { machine: 'Iron-Patriot', ip: '192.168.1.42', models: 'qwen3.5:35b-a3b + jarvis-memory + snowflake-arctic-embed2', vram: '~42GB / 96GB', color: C.purple },
  { machine: 'Happy', ip: '10.1.10.243', models: 'snowflake-arctic-embed2', vram: '1.2GB', color: C.textDim },
]

/* ── Legend ────────────────────────────────────────────────── */

const legendItems = [
  { color: '#f59e0b', label: 'Proxy Core' },
  { color: '#a5b4fc', label: 'Providers' },
  { color: '#34d399', label: 'Fleet Routing' },
  { color: '#f87171', label: 'Pin Protection' },
  { color: '#60a5fa', label: 'Auto-Injection' },
  { color: '#ec4899', label: 'Ingest Pipeline' },
  { color: '#a78bfa', label: 'RAG Extraction' },
  { color: '#2dd4bf', label: 'Monitoring' },
]

/* ── Main View ─────────────────────────────────────────────── */

export function GatewayView() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title + Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: C.textBright }}>LLM Gateway Proxy</h2>
          <p className="text-[11px] mt-1" style={{ color: C.textDim }}>
            All LLM API calls across the fleet route through IRONMAN:4000 for audit logging, cost tracking, and smart fleet routing.
            NSSM service managed. Supports Anthropic, Ollama, OpenAI, DeepSeek, GLM, and Google providers.
            Repo: github.com/Jamesjhf1/llm-gateway
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
        <StatCard value="6" label="LLM Providers" color={C.accent} />
        <StatCard value="5" label="Fleet Machines" color={C.green100g} />
        <StatCard value="8" label="API Endpoints" color={C.blue} />
        <StatCard value="5s" label="Health Poll" color={C.teal} />
        <StatCard value="NSSM" label="Process Mgr" color={C.orange} />
        <StatCard value="4000" label="Port" color={C.warning} />
      </div>

      {/* ── Proxy Core ────────────────────────────────────── */}
      <Phase label="Proxy Core — IRONMAN:4000" color="#f59e0b">
        <div className="text-[10px] text-center mb-3" style={{ color: C.textDim }}>
          All LLM requests enter via a unified proxy endpoint. The gateway authenticates, logs, routes, and audits every call.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#fcd34d' }}>Endpoints</div>
            <HFlow>
              <Node icon="P" title="POST /v1/:provider/*" detail="Proxy all LLM requests" file="Anthropic, Ollama, OpenAI, DeepSeek, GLM, Google" variant="proxy" />
            </HFlow>
            <HFlow>
              <Node icon="G" title="GET /v1/ollama/*" detail="Passthrough for Ollama native GETs" file="/api/tags, /api/ps, /api/show" variant="proxy" />
              <Node icon="H" title="GET /health" detail="Health check" file="Total calls, uptime" variant="proxy" />
            </HFlow>
            <HFlow>
              <Node icon="F" title="GET /api/fleet" detail="Fleet GPU status" file="5 machines, loaded models, health" variant="fleet" />
              <Node icon="S" title="GET /api/stats/realtime" detail="Today's stats" file="Calls, cost, latency by caller/model" variant="monitor" />
            </HFlow>
            <HFlow>
              <Node icon="E" title="GET /api/extraction" detail="RAG Extractor stats" file="Classification rate, per-project counts" variant="extract" />
              <Node icon="P" title="GET /api/pipeline" detail="Pipeline status" file="Ingested/skipped/failed, DLQ, circuit breaker" variant="pipeline" />
            </HFlow>
            <HFlow>
              <Node icon="M" title="GET /metrics" detail="Prometheus metrics" file="http://192.168.1.43:4000/metrics" variant="monitor" />
            </HFlow>
          </div>
          <div className="space-y-3">
            <InfoBlock title="Runtime" color="#f59e0b" items={[
              'Node.js + tsx on IRONMAN (192.168.1.43:4000)',
              'NSSM service: nssm restart LLMGateway (elevated prompt)',
              'Logs: E:\\Projects\\llm-gateway\\logs\\service-out.log',
              'Bearer token auth per provider',
              'Request/response audit logging to SQLite',
              'Cost tracking per caller, model, provider',
            ]} />
            <InfoBlock title="Supported Providers" color="#a5b4fc" items={[
              'Anthropic (Claude API) — /v1/anthropic/*',
              'Ollama (local fleet) — /v1/ollama/*',
              'OpenAI (GPT / o3) — /v1/openai/*',
              'DeepSeek (Reasoner) — /v1/deepseek/*',
              'GLM (Zhipu AI) — /v1/glm/*',
              'Google (Gemini) — /v1/google/*',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Fleet Routing ─────────────────────────────────── */}
      <Phase label="Smart Fleet Routing — Round-Robin + Failover" color="#34d399">
        <div className="text-[10px] text-center mb-3" style={{ color: C.textDim }}>
          The gateway polls all 5 machines every 5 seconds via /api/ps. Routes requests using smart round-robin across healthy hosts
          pinned to each model. If a primary host fails, the gateway automatically tries alternates.
        </div>

        <HFlow>
          <Node icon="R" title="Request In" detail="POST /v1/ollama/api/chat" variant="proxy" />
          <HArrow />
          <Node icon="M" title="Model Lookup" detail="Which hosts have this model loaded?" variant="fleet" />
          <HArrow />
          <Node icon="H" title="Health Check" detail="Is host healthy? (5s polling)" variant="fleet" />
          <HArrow />
          <Node icon="S" title="Round-Robin" detail="Next healthy host in rotation" variant="fleet" />
        </HFlow>

        <Arrow />

        {/* Pinned Models Table */}
        <div className="text-[11px] font-semibold mb-2" style={{ color: '#6ee7b7' }}>
          Pinned Models (OLLAMA_KEEP_ALIVE=-1 on all machines)
        </div>
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <table className="w-full text-[10.5px]">
            <thead>
              <tr style={{ background: 'rgba(52,211,153,0.08)' }}>
                <th className="text-left px-3 py-2 font-semibold" style={{ color: '#6ee7b7' }}>Machine</th>
                <th className="text-left px-3 py-2 font-semibold" style={{ color: '#6ee7b7' }}>IP</th>
                <th className="text-left px-3 py-2 font-semibold" style={{ color: '#6ee7b7' }}>Model(s)</th>
                <th className="text-left px-3 py-2 font-semibold" style={{ color: '#6ee7b7' }}>VRAM</th>
              </tr>
            </thead>
            <tbody>
              {pinnedModels.map((m, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td className="px-3 py-1.5 font-semibold" style={{ color: m.color }}>{m.machine}</td>
                  <td className="px-3 py-1.5 font-mono" style={{ color: C.accent }}>{m.ip}</td>
                  <td className="px-3 py-1.5 font-mono" style={{ color: C.textBright }}>{m.models}</td>
                  <td className="px-3 py-1.5" style={{ color: C.textDim }}>{m.vram}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pin Protection */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoBlock title="Pin Protection" color="#f87171" items={[
            'CRITICAL: Never routes unpinned models to hosts with pinned models',
            'Prevents VRAM eviction of production models',
            'Example: sending codellama:34b to Ironman would evict qwen3.5:122b-tuned',
            'Gateway checks loaded models before routing and blocks unsafe assignments',
            'Failover still works within the set of hosts that have the model pinned',
          ]} />
          <InfoBlock title="Failover Logic" color="#34d399" items={[
            'Primary host unavailable → try next healthy host with model',
            'All hosts down → return 503 with diagnostic info',
            'Host recovery: automatically re-enters rotation on next poll',
            'Sticky sessions: none (stateless round-robin)',
            'Timeout: 120s per request (large model inference)',
          ]} />
        </div>
      </Phase>

      <Arrow />

      {/* ── Auto-Injections ───────────────────────────────── */}
      <Phase label="Auto-Injections — think:false + /api/generate Conversion" color="#60a5fa">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Node icon="T" title="think:false Injection" detail="Auto-injected for all Qwen3.5 and jarvis-* models" file="/api/chat requests" variant="inject" />
            <InfoBlock title="Why" color="#60a5fa" items={[
              'Qwen3.5 models are thinking models by default',
              'Thinking mode produces <think>...</think> blocks that waste tokens',
              'Most use cases (code gen, chat, extraction) do not need thinking',
              'Gateway injects think:false in the options payload automatically',
              'No special handling needed in client code',
            ]} />
          </div>
          <div className="space-y-3">
            <Node icon="C" title="/api/generate → /api/chat" detail="Auto-conversion for thinking models" file="Prevents empty responses" variant="inject" />
            <InfoBlock title="Why" color="#60a5fa" items={[
              'Ollama /api/generate does not support think:false',
              'Sending thinking models to /api/generate → empty responses',
              'Gateway detects /api/generate + thinking model combination',
              'Converts to /api/chat format + injects think:false',
              'Transparent to callers — response format preserved',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Ingest Pipeline ───────────────────────────────── */}
      <Phase label="Ingest Pipeline — Every LLM Call → Knowledge" color="#ec4899">
        <div className="text-[10px] text-center mb-3" style={{ color: C.textDim }}>
          Every successful LLM call triggers a 4-stage pipeline that turns conversations into searchable knowledge.
          Failed ingestions go to a DLQ with automatic retry. Circuit breaker protects against cascade failures.
        </div>

        <HFlow>
          <Node icon="1" title="Summarize" detail="Extract key facts from conversation" file="Qwen3.5:35b-a3b on Iron-Patriot" variant="pipeline" />
          <HArrow />
          <Node icon="2" title="RAG Ingest" detail="Chunk + embed into jarvis_knowledge" file="snowflake-arctic-embed2 1024d" variant="pipeline" />
          <HArrow />
          <Node icon="3" title="Project RAG Extract" detail="Classify into 5 structured types" file="Decisions, schemas, errors, arch, deps" variant="extract" />
          <HArrow />
          <Node icon="4" title="Memory Promote" detail="High-confidence chunks → jarvis_memory" file="Via memory_write" variant="pipeline" />
        </HFlow>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoBlock title="Project RAG Extractor (5 phases)" color="#a78bfa" items={[
            'Phase 1: Classify conversation into project + domain',
            'Phase 2: Extract structured knowledge chunks',
            'Phase 3: De-duplicate against existing chunks (semantic similarity)',
            'Phase 4: Embed + store to jarvis_knowledge collection with project metadata',
            'Phase 5: Write .rag/ markdown files to staging, git sync commits every 10 min',
            'Extraction host: Iron-Patriot qwen3.5:35b-a3b',
          ]} />
          <InfoBlock title="Pipeline Reliability" color="#ec4899" items={[
            'Dead Letter Queue (DLQ): failed ingestions queued for retry',
            'Circuit breaker: opens after 5 consecutive failures, resets after 60s',
            'GET /api/dlq — inspect failed ingestions',
            'GET /api/pipeline — ingested/skipped/failed counts',
            'Backpressure: pipeline runs async, does not block LLM response',
            'Dedup: semantic similarity > 0.92 = skip (prevents duplicates)',
          ]} />
        </div>
      </Phase>

      <Arrow />

      {/* ── Monitoring ────────────────────────────────────── */}
      <Phase label="Monitoring & Observability" color="#2dd4bf">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoBlock title="NSSM Service Manager" color="#2dd4bf" items={[
            'Service: LLMGateway (NSSM managed)',
            'nssm restart LLMGateway — restart service (elevated)',
            'Logs: service-out.log + service-err.log',
            'Runs: node --import tsx src/server.ts',
            'Auto-restart on crash via NSSM recovery',
          ]} />
          <InfoBlock title="Prometheus Metrics" color="#2dd4bf" items={[
            'Endpoint: http://192.168.1.43:4000/metrics',
            'llm_gateway_requests_total — by provider, model, status',
            'llm_gateway_request_duration_seconds — histogram',
            'llm_gateway_fleet_health — per-machine gauge',
            'llm_gateway_pipeline_* — ingest success/fail counters',
            'Scraped by Prometheus on JERICHO:9090',
          ]} />
          <InfoBlock title="Dashboard Endpoints" color="#2dd4bf" items={[
            'GET /health — uptime, total calls',
            'GET /api/fleet — 5-machine GPU status',
            'GET /api/stats/realtime — today breakdown',
            'GET /api/extraction — extractor performance',
            'GET /api/pipeline — ingest pipeline health',
            'GET /api/dlq — dead letter queue inspection',
          ]} />
        </div>
      </Phase>

      <Arrow />

      {/* ── Summary of Changes ────────────────────────────── */}
      <Phase label="Changes Deployed (2026-03-29)" color="#94a3b8">
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <table className="w-full text-[10.5px]">
            <thead>
              <tr style={{ background: 'rgba(100,116,139,0.08)' }}>
                <th className="text-left px-3 py-2 font-semibold" style={{ color: C.textBright }}>Change</th>
                <th className="text-left px-3 py-2 font-semibold" style={{ color: C.textBright }}>Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Project RAG Extractor (5 phases)', 'Auto-extracts knowledge from every LLM conversation'],
                ['Gateway GET passthrough', 'Ollama MCP health checks work through proxy'],
                ['Gateway think:false injection', 'No more empty responses from thinking models'],
                ['Router pin protection', 'Prevents model eviction on wrong hosts'],
                ['OLLAMA_KEEP_ALIVE=-1 fleet-wide', 'Models never unload after inactivity'],
              ].map(([change, impact], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td className="px-3 py-1.5" style={{ color: C.textBright }}>{change}</td>
                  <td className="px-3 py-1.5" style={{ color: C.textDim }}>{impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Phase>
    </div>
  )
}
