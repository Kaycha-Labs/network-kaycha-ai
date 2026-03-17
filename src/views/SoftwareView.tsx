import { useState } from 'react'
import { C } from '../constants/colors'
import {
  WORKSTATIONS_SOFTWARE,
  MCP_SERVERS,
  SKILLS,
  SOFTWARE_STATS,
} from '../data/software-inventory'
import type {
  WorkstationSoftware,
  SoftwareCategory,
  SoftwareEntry,
  MCPServer,
  Skill,
} from '../data/software-inventory'

/* ── Section type ───────────────────────────────────────── */

type Section = 'workstations' | 'mcp' | 'skills'

/* ── Sub-components ─────────────────────────────────────── */

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-lg border text-center px-5 py-3.5 min-w-[120px]" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-[11px]" style={{ color: C.textDim }}>{label}</div>
    </div>
  )
}

function SectionTab({ active, label, icon, count, onClick }: { active: boolean; label: string; icon: string; count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2"
      style={active
        ? { background: C.accent + '18', border: `1px solid ${C.accent}40`, color: C.accent }
        : { background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: C.textDim }
      }
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: active ? C.accent + '25' : 'rgba(255,255,255,0.06)', color: active ? C.accent : C.textDim }}>{count}</span>
    </button>
  )
}

/* ── Software item row ──────────────────────────────────── */

function SoftwareRow({ item, color }: { item: SoftwareEntry; color: string }) {
  return (
    <div className="flex items-start gap-3 py-2 px-3 rounded-md hover:bg-white/[0.02] transition-colors group">
      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] font-semibold" style={{ color: C.textBright }}>{item.name}</span>
          <span className="text-[10px] font-mono" style={{ color: color + 'cc' }}>{item.version}</span>
        </div>
        <div className="text-[10px] mt-0.5" style={{ color: C.textDim }}>{item.description}</div>
      </div>
    </div>
  )
}

/* ── Category accordion ─────────────────────────────────── */

function CategoryBlock({ category }: { category: SoftwareCategory }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-left cursor-pointer hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-xs">{category.icon}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: category.color }}>{category.label}</span>
        <span className="ml-auto text-[10px] font-mono" style={{ color: C.textDim }}>{category.items.length}</span>
        <span className="text-[10px] transition-transform" style={{ color: C.textDim, transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
      </button>
      {open && (
        <div className="ml-1">
          {category.items.map(item => (
            <SoftwareRow key={item.name} item={item} color={category.color} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Workstation card ───────────────────────────────────── */

function WorkstationCard({ ws }: { ws: WorkstationSoftware }) {
  const totalItems = ws.categories.reduce((sum, c) => sum + c.items.length, 0)
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: C.panel, borderColor: ws.color + '30' }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-4" style={{ borderBottom: `1px solid ${ws.color}20` }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: ws.color + '20', color: ws.color, border: `1px solid ${ws.color}40` }}>
          {ws.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: ws.color }}>{ws.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: ws.color + '15', color: ws.color, border: `1px solid ${ws.color}30` }}>
              {totalItems} packages
            </span>
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: C.textDim }}>{ws.role}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono" style={{ color: C.textDim }}>
            <span style={{ color: C.purple }}>{ws.gpu}</span> · <span style={{ color: C.accent }}>{ws.ram}</span>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="px-4 py-3 max-h-[500px] overflow-y-auto">
        {ws.categories.map(cat => (
          <CategoryBlock key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  )
}

/* ── MCP Server card ────────────────────────────────────── */

function MCPServerCard({ server }: { server: MCPServer }) {
  const [expanded, setExpanded] = useState(false)
  const hostColors: Record<string, string> = {
    'IRON-PATRIOT': C.purple,
    'SENTINEL': C.green100g,
    'Local': C.accent,
    'Supabase': C.orange,
    'MySQL': C.warning,
    'Cloudflare': C.cyan10g,
    'Netlify': C.teal,
    'GitHub': C.textBright,
    'Google': C.red,
    'Cloud': C.blue,
    'Chrome': C.warning,
  }
  const hColor = hostColors[server.host] ?? C.textDim

  return (
    <div
      className="rounded-lg border p-4 cursor-pointer hover:bg-white/[0.02] transition-all"
      style={{ background: C.panel, borderColor: expanded ? hColor + '40' : 'rgba(255,255,255,0.06)' }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5" style={{ background: hColor + '15', color: hColor, border: `1px solid ${hColor}30` }}>
          MCP
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-bold" style={{ color: C.textBright }}>{server.name}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: hColor + '15', color: hColor }}>{server.host}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono" style={{ background: 'rgba(255,255,255,0.04)', color: C.textDim }}>{server.tools.length} tools</span>
          </div>
          <div className="text-[10px] mt-1" style={{ color: C.textDim }}>{server.description}</div>
          {expanded && (
            <div className="mt-3 flex flex-wrap gap-1">
              {server.tools.map(tool => (
                <span key={tool} className="text-[9px] px-2 py-1 rounded font-mono" style={{ background: hColor + '10', color: hColor + 'cc', border: `1px solid ${hColor}20` }}>
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Skill card ─────────────────────────────────────────── */

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="rounded-lg border p-4" style={{ background: C.panel, borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded flex items-center justify-center text-[11px] shrink-0" style={{ background: C.pink + '15', color: C.pink, border: `1px solid ${C.pink}30` }}>
          /
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold" style={{ color: C.textBright }}>{skill.name}</span>
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: C.pink + 'cc' }}>{skill.trigger}</div>
          <div className="text-[10px] mt-1" style={{ color: C.textDim }}>{skill.description}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Matrix table ───────────────────────────────────────── */

function FleetMatrix() {
  const coreTools = [
    'Docker', 'Tailscale', 'Parsec', 'Sunshine', 'Moonlight',
    'Node.js', 'Python', 'GitHub CLI', 'Chrome', 'windows_exporter',
    'CUDA Toolkit', 'Ollama', 'PostgreSQL', 'cloudflared', 'PowerShell 7',
    'VS Build Tools', 'Barrier', 'WireGuard', 'Cursor', 'Claude Desktop',
  ]

  const machines = WORKSTATIONS_SOFTWARE

  function hasItem(ws: WorkstationSoftware, toolName: string): boolean {
    return ws.categories.some(cat =>
      cat.items.some(item => item.name.toLowerCase().includes(toolName.toLowerCase()))
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <table className="w-full text-[10px]">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
            <th className="text-left px-3 py-2 font-semibold" style={{ color: C.textDim }}>Tool</th>
            {machines.map(ws => (
              <th key={ws.id} className="px-3 py-2 font-bold text-center" style={{ color: ws.color }}>{ws.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coreTools.map((tool, i) => (
            <tr key={tool} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
              <td className="px-3 py-1.5 font-medium" style={{ color: C.textBright }}>{tool}</td>
              {machines.map(ws => {
                const has = hasItem(ws, tool)
                return (
                  <td key={ws.id} className="px-3 py-1.5 text-center">
                    <span style={{ color: has ? C.green100g : C.red + '60' }}>{has ? '●' : '○'}</span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Main view ──────────────────────────────────────────── */

export function SoftwareView() {
  const [section, setSection] = useState<Section>('workstations')
  const [search, setSearch] = useState('')

  const filteredMCP = MCP_SERVERS.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  )
  const filteredSkills = SKILLS.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="flex flex-wrap items-center gap-4">
        <StatCard value={String(SOFTWARE_STATS.totalWorkstations)} label="Workstations" color={C.accent} />
        <StatCard value={String(SOFTWARE_STATS.totalMCPServers)} label="MCP Servers" color={C.purple} />
        <StatCard value={String(SOFTWARE_STATS.totalMCPTools)} label="MCP Tools" color={C.green100g} />
        <StatCard value={String(SOFTWARE_STATS.totalSkills)} label="Skills" color={C.pink} />
        <div className="ml-auto text-[10px] font-mono" style={{ color: C.textDim }}>
          Audit: {SOFTWARE_STATS.auditDate}
        </div>
      </div>

      {/* Section tabs + search */}
      <div className="flex items-center gap-3 flex-wrap">
        <SectionTab active={section === 'workstations'} label="Workstations" icon="⬡" count={SOFTWARE_STATS.totalWorkstations} onClick={() => setSection('workstations')} />
        <SectionTab active={section === 'mcp'} label="MCP Servers" icon="◈" count={SOFTWARE_STATS.totalMCPServers} onClick={() => setSection('mcp')} />
        <SectionTab active={section === 'skills'} label="Skills" icon="⚡" count={SOFTWARE_STATS.totalSkills} onClick={() => setSection('skills')} />
        <div className="ml-auto">
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-[11px] px-3 py-2 rounded-lg border bg-transparent outline-none focus:border-accent/50 transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.08)', color: C.textBright, width: 200 }}
          />
        </div>
      </div>

      {/* Workstations section */}
      {section === 'workstations' && (
        <div className="space-y-6">
          {/* Fleet matrix */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: C.textDim }}>Fleet Compatibility Matrix</h3>
            <FleetMatrix />
          </div>

          {/* Workstation cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {WORKSTATIONS_SOFTWARE.map(ws => (
              <WorkstationCard key={ws.id} ws={ws} />
            ))}
          </div>
        </div>
      )}

      {/* MCP Servers section */}
      {section === 'mcp' && (
        <div className="space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.textDim }}>
            {filteredMCP.length} MCP Server{filteredMCP.length !== 1 ? 's' : ''} · {filteredMCP.reduce((s, m) => s + m.tools.length, 0)} tools total — click to expand
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredMCP.map(server => (
              <MCPServerCard key={server.name} server={server} />
            ))}
          </div>
        </div>
      )}

      {/* Skills section */}
      {section === 'skills' && (
        <div className="space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.textDim }}>
            {filteredSkills.length} Skill{filteredSkills.length !== 1 ? 's' : ''} — invoke with /skill-name or auto-triggered
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map(skill => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
