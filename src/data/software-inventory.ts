import { C } from '../constants/colors'

/* ── Types ──────────────────────────────────────────────── */

export interface SoftwareEntry {
  name: string
  version: string
  description: string
}

export interface SoftwareCategory {
  id: string
  label: string
  icon: string
  color: string
  items: SoftwareEntry[]
}

export interface WorkstationSoftware {
  id: string
  name: string
  role: string
  color: string
  gpu: string
  ram: string
  categories: SoftwareCategory[]
}

export interface MCPServer {
  name: string
  description: string
  tools: string[]
  host: string
}

export interface Skill {
  name: string
  trigger: string
  description: string
}

/* ── Unified Software Stack (all workstations matched) ──── */

const UNIFIED_CATEGORIES: SoftwareCategory[] = [
  {
    id: 'ai', label: 'AI / ML', icon: '🧠', color: C.purple,
    items: [
      { name: 'Ollama', version: '0.18.0', description: 'Local LLM inference server — hosts models for the fleet' },
      { name: 'NVIDIA CUDA Toolkit', version: '13.2', description: 'GPU compute platform for ML workloads' },
      { name: 'NVIDIA Nsight Compute', version: '2026.1.0', description: 'GPU kernel profiling and optimization tool' },
      { name: 'NVIDIA Nsight Systems', version: '2025.6.3', description: 'System-wide performance analysis for GPU workloads' },
    ],
  },
  {
    id: 'dev', label: 'Development', icon: '⌨', color: C.accent,
    items: [
      { name: 'VS Code', version: '1.109.5', description: 'Lightweight code editor for quick edits and debugging' },
      { name: 'Cursor', version: '2.6.19', description: 'AI-powered code editor (Claude/GPT integrated)' },
      { name: 'Claude Desktop', version: 'latest', description: 'Anthropic Claude desktop client with MCP support' },
      { name: 'Visual Studio Build Tools', version: '17.14.28', description: 'C/C++ compiler toolchain for native extensions' },
      { name: '.NET SDK', version: '9.0.312', description: 'Full .NET development kit' },
      { name: 'Node.js', version: '24.14.0', description: 'JavaScript runtime for server-side apps and tooling' },
      { name: 'Python', version: '3.14.3', description: 'Primary scripting language for automation and ML' },
      { name: 'PowerShell 7', version: '7.5.5', description: 'Cross-platform shell and scripting framework' },
      { name: 'GitHub CLI', version: '2.88.1', description: 'Command-line interface for GitHub operations' },
      { name: 'Git LFS', version: '3.6.1', description: 'Large file storage extension for Git repos' },
      { name: 'Rustup', version: '1.28.2', description: 'Rust toolchain installer and version manager' },
      { name: 'uv', version: '0.10.10', description: 'Ultra-fast Python package manager (replaces pip)' },
      { name: 'FFmpeg', version: '8.0.1', description: 'Media processing toolkit for audio/video pipelines' },
      { name: 'jq', version: '1.8.1', description: 'Command-line JSON processor' },
      { name: 'NSSM', version: '2.24-101', description: 'Non-Sucking Service Manager for Windows services' },
      { name: 'Wget', version: '1.21.4', description: 'Command-line HTTP/FTP downloader' },
      { name: 'Windows SDK', version: '10.1.26100', description: 'Windows platform development headers and libraries' },
    ],
  },
  {
    id: 'cloud', label: 'Containers & Cloud', icon: '☁', color: C.cyan10g,
    items: [
      { name: 'Docker Desktop', version: '4.64.0', description: 'Container runtime for dev and deployment' },
      { name: 'cloudflared', version: '2025.8.1', description: 'Cloudflare Tunnel daemon for secure ingress' },
    ],
  },
  {
    id: 'db', label: 'Database', icon: '🗄', color: C.orange,
    items: [
      { name: 'PostgreSQL', version: '17.9-2', description: 'Primary relational database for local dev' },
    ],
  },
  {
    id: 'remote', label: 'Remote Access', icon: '🔗', color: C.teal,
    items: [
      { name: 'Tailscale', version: '1.94.2', description: 'WireGuard-based mesh VPN connecting all workstations' },
      { name: 'Parsec', version: '150-101b', description: 'Low-latency remote desktop for GPU workloads' },
      { name: 'Sunshine', version: '2025.924', description: 'Open-source game streaming server (Moonlight host)' },
      { name: 'Moonlight', version: '6.1.0', description: 'GameStream client for remote desktop access' },
      { name: 'Barrier', version: '2.4.0', description: 'Software KVM — share keyboard/mouse across machines' },
      { name: 'WireGuard', version: '0.5.3', description: 'VPN tunnel for colo and external access' },
    ],
  },
  {
    id: 'monitor', label: 'Monitoring', icon: '📊', color: C.warning,
    items: [
      { name: 'windows_exporter', version: '0.31.3', description: 'Prometheus metrics exporter for Windows host stats' },
    ],
  },
  {
    id: 'prod', label: 'Productivity', icon: '📦', color: C.textDim,
    items: [
      { name: 'Adobe Acrobat', version: '25.001', description: 'PDF creation and document management' },
      { name: 'Microsoft 365', version: '16.0.19725', description: 'Office suite — Word, Excel, Outlook, Teams' },
      { name: 'PowerToys', version: '0.97.2', description: 'Windows power-user utilities (FancyZones, etc.)' },
      { name: '7-Zip', version: '26.00', description: 'Archive compression and extraction utility' },
      { name: 'Google Chrome', version: '146.0', description: 'Primary web browser' },
    ],
  },
]

/* ── Workstation Software Inventory ─────────────────────── */

export const WORKSTATIONS_SOFTWARE: WorkstationSoftware[] = [
  {
    id: 'sentinel',
    name: 'SENTINEL',
    role: 'Primary Inference · Ollama · OWU',
    color: C.green100g,
    gpu: 'RTX 5090 32GB',
    ram: '64 GB',
    categories: UNIFIED_CATEGORIES,
  },
  {
    id: 'iron-patriot',
    name: 'IRON-PATRIOT',
    role: 'Docker · Monitoring · JARVIS-RAG Host',
    color: C.purple,
    gpu: 'RTX PRO 6000 96GB',
    ram: '128 GB',
    categories: UNIFIED_CATEGORIES,
  },
  {
    id: 'jericho',
    name: 'JERICHO',
    role: 'Primary Dev Workstation',
    color: C.accent,
    gpu: 'RTX PRO 6000 96GB',
    ram: '128 GB',
    categories: UNIFIED_CATEGORIES,
  },
  {
    id: 'ironman',
    name: 'IRONMAN',
    role: 'Primary Inference · TR PRO 9995WX',
    color: C.warning,
    gpu: 'RTX PRO 6000 96GB',
    ram: '256 GB',
    categories: UNIFIED_CATEGORIES,
  },
  {
    id: 'happy',
    name: 'HAPPY',
    role: 'Test Runner · NSSM Services',
    color: C.pink,
    gpu: '—',
    ram: '32 GB',
    categories: UNIFIED_CATEGORIES,
  },
]

/* ── MCP Servers ────────────────────────────────────────── */

export const MCP_SERVERS: MCPServer[] = [
  { name: 'jarvis-memory', description: 'QUBO-optimized context retrieval from all JARVIS knowledge sources with hybrid SA+Tabu solver', tools: ['memory_optimize', 'rag_optimize', 'rag_context', 'optimize_chunks', 'memory_write', 'memory_remember', 'memory_feedback', 'entity_get', 'entity_relate', 'entity_search', 'session_start', 'session_attempt', 'session_handoff', 'memory_health'], host: 'IRON-PATRIOT' },
  { name: 'jarvis-rag', description: 'Vector similarity search across 7 ChromaDB knowledge base collections (schemas, code, docs, regulations, financial, legal, knowledge)', tools: ['rag_search', 'rag_context', 'rag_collections'], host: 'IRON-PATRIOT' },
  { name: 'openai-consultant', description: 'Architecture Critic (o3) — schema/RLS review, edge cases, design critique', tools: ['consult_architecture'], host: 'Local' },
  { name: 'deepseek-consultant', description: 'Debugger (DeepSeek Reasoner) — step-by-step debugging, root cause analysis', tools: ['consult_debug'], host: 'Local' },
  { name: 'gemini-consultant', description: 'Strategy Advisor (Gemini 2.5 Pro) — business decisions, competitive analysis', tools: ['consult_strategy'], host: 'Local' },
  { name: 'glm-consultant', description: 'Code Consultant (GLM-5) — code review, alternative approaches, second opinions', tools: ['consult_code'], host: 'Local' },
  { name: 'owu-mcp-server', description: 'Open WebUI dispatch — route prompts to any Ollama/cloud model via OWU API', tools: ['list_models', 'dispatch_task', 'dispatch_with_context', 'dispatch_conversation', 'read_file', 'write_file', 'list_directory'], host: 'SENTINEL' },
  { name: 'kaychaexec-mcp', description: 'KaychaExec Supabase data — monthly sales, AR aging, lab metrics, sales trends', tools: ['get_monthly_sales', 'get_ar_aging', 'get_lab_metrics', 'get_companies', 'get_sales_trend', 'exec_query'], host: 'Supabase' },
  { name: 'yourcoa-mcp', description: 'YourCOA LIMS databases — sample requests, billing, throughput, failure rates across state labs', tools: ['yourcoa_query', 'yourcoa_sales_summary', 'yourcoa_revenue_by_client', 'yourcoa_lab_throughput', 'yourcoa_sample_requests', 'yourcoa_failure_rates', 'yourcoa_turnaround_times', 'yourcoa_billing_summary', 'yourcoa_ar_aging'], host: 'MySQL' },
  { name: 'kaychadevhub', description: 'Developer hub — posts, prompts, ADRs, code snippets, standups, module health', tools: ['devhub_list_channels', 'devhub_create_post', 'devhub_search', 'devhub_list_adrs', 'devhub_create_adr', 'devhub_list_snippets', 'devhub_submit_standup', 'devhub_get_module_health'], host: 'Supabase' },
  { name: 'desktop-commander', description: 'File system operations, process management, streaming search across local machines', tools: ['read_file', 'write_file', 'edit_block', 'start_process', 'list_directory', 'start_search', 'get_file_info'], host: 'Local' },
  { name: 'github', description: 'GitHub API — repos, issues, PRs, code search, branch management', tools: ['create_or_update_file', 'search_repositories', 'create_pull_request', 'list_issues', 'search_code', 'push_files'], host: 'GitHub' },
  { name: 'supabase', description: 'Supabase project management — SQL, migrations, edge functions, branches, types', tools: ['execute_sql', 'apply_migration', 'deploy_edge_function', 'list_tables', 'generate_typescript_types', 'get_logs'], host: 'Supabase' },
  { name: 'cloudflare', description: 'Cloudflare infrastructure — Workers, D1, KV, R2, Hyperdrive, documentation search', tools: ['workers_list', 'd1_database_query', 'kv_namespaces_list', 'r2_buckets_list', 'search_cloudflare_documentation'], host: 'Cloudflare' },
  { name: 'netlify', description: 'Netlify project management — deploy, env vars, forms, teams, build config', tools: ['get-project', 'deploy-site', 'manage-env-vars', 'get-extensions'], host: 'Netlify' },
  { name: 'puppeteer', description: 'Headless browser automation — navigate, screenshot, click, evaluate JS', tools: ['puppeteer_navigate', 'puppeteer_screenshot', 'puppeteer_click', 'puppeteer_evaluate'], host: 'Local' },
  { name: 'playwright', description: 'Browser automation via Playwright — snapshot, click, fill, navigate, tabs, network', tools: ['browser_snapshot', 'browser_click', 'browser_navigate', 'browser_take_screenshot', 'browser_fill_form', 'browser_evaluate'], host: 'Local' },
  { name: 'claude-in-chrome', description: 'Chrome browser control — read page, find elements, execute JS, manage tabs, GIF recording', tools: ['read_page', 'find', 'javascript_tool', 'computer', 'navigate', 'tabs_context_mcp', 'gif_creator'], host: 'Chrome' },
  { name: 'claude-preview', description: 'Dev server management — start/stop servers, screenshots, snapshots, inspect, click, network', tools: ['preview_start', 'preview_screenshot', 'preview_snapshot', 'preview_inspect', 'preview_click', 'preview_eval', 'preview_network'], host: 'Local' },
  { name: 'scheduled-tasks', description: 'Persistent scheduled task runner — cron-based recurring jobs and one-shot reminders', tools: ['list_scheduled_tasks', 'create_scheduled_task', 'update_scheduled_task'], host: 'Local' },
  { name: 'tavily', description: 'Web search and content extraction — search, extract, crawl, map, deep research', tools: ['tavily_search', 'tavily_extract', 'tavily_crawl', 'tavily_map', 'tavily_research'], host: 'Cloud' },
  { name: 'gmail', description: 'Gmail integration — search, read, draft, send emails', tools: ['gmail_search_messages', 'gmail_read_message', 'gmail_create_draft', 'gmail_list_labels'], host: 'Google' },
  { name: 'gcal', description: 'Google Calendar — create/update/delete events, find free time, meeting scheduling', tools: ['gcal_create_event', 'gcal_list_events', 'gcal_find_meeting_times', 'gcal_find_my_free_time', 'gcal_update_event'], host: 'Google' },
  { name: 'ollama', description: 'Local Ollama code tools — generate, explain, review, refactor, fix, test code', tools: ['ollama_generate_code', 'ollama_explain_code', 'ollama_review_code', 'ollama_refactor_code', 'ollama_fix_code', 'ollama_write_tests'], host: 'Local' },
  { name: 'filesystem', description: 'Sandboxed filesystem — read, write, edit, search files within allowed directories', tools: ['read_text_file', 'write_file', 'edit_file', 'search_files', 'list_directory', 'directory_tree'], host: 'Local' },
]

/* ── Skills ─────────────────────────────────────────────── */

export const SKILLS: Skill[] = [
  { name: 'vibe-coding-partner', trigger: 'Any code/debug/feature request', description: 'Full-stack coding assistant — components, APIs, migrations, debugging' },
  { name: 'financial-analyst', trigger: 'Revenue, costs, margins, board decks', description: 'CFO assistant — P&L, budgets, Sage X3, AR aging, shareholder comms' },
  { name: 'ai-orchestration', trigger: 'Model routing, RAG, OWU config', description: 'AI model management, JARVIS-KB, embedding pipelines, context optimization' },
  { name: 'schedule', trigger: 'Recurring tasks, cron jobs', description: 'Create and manage scheduled tasks with cron expressions' },
  { name: 'mcp-builder', trigger: 'Build MCP server', description: 'Guide for creating MCP servers in Python (FastMCP) or TypeScript' },
  { name: 'skill-creator', trigger: 'Create/edit/test skills', description: 'Build new skills, run evals, benchmark performance' },
  { name: 'internal-comms', trigger: 'Status reports, memos, newsletters', description: 'Write internal communications in company-standard formats' },
  { name: 'canvas-design', trigger: 'Create poster, art, design', description: 'Visual design in PNG/PDF using design philosophy principles' },
  { name: 'web-artifacts-builder', trigger: 'Complex React artifacts', description: 'Multi-component HTML artifacts with React, Tailwind, shadcn/ui' },
  { name: 'theme-factory', trigger: 'Style/theme artifacts', description: '10 preset themes for slides, docs, reports, landing pages' },
  { name: 'pdf', trigger: '.pdf file operations', description: 'Read, merge, split, watermark, encrypt, OCR PDF files' },
  { name: 'docx', trigger: '.docx file operations', description: 'Create, edit, format Word documents with TOC, headers, images' },
  { name: 'xlsx', trigger: 'Spreadsheet operations', description: 'Read, edit, create Excel files — formulas, charts, data cleaning' },
  { name: 'pptx', trigger: '.pptx file operations', description: 'Create, edit, parse PowerPoint presentations and slide decks' },
  { name: 'claude-api', trigger: 'Anthropic SDK / Claude API', description: 'Build apps with Claude API, Anthropic SDKs, and Agent SDK' },
  { name: 'simplify', trigger: '/simplify', description: 'Review changed code for reuse, quality, and efficiency' },
  { name: 'loop', trigger: '/loop interval /command', description: 'Run a prompt or slash command on a recurring interval' },
  { name: 'keybindings-help', trigger: 'Customize keyboard shortcuts', description: 'Rebind keys, add chord shortcuts, modify keybindings.json' },
]

/* ── Stats ──────────────────────────────────────────────── */

export const SOFTWARE_STATS = {
  totalMCPServers: MCP_SERVERS.length,
  totalMCPTools: MCP_SERVERS.reduce((sum, s) => sum + s.tools.length, 0),
  totalSkills: SKILLS.length,
  totalWorkstations: WORKSTATIONS_SOFTWARE.length,
  auditDate: '2026-03-17',
}
