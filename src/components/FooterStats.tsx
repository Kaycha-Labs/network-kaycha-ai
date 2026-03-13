export function FooterStats() {
  const stats = [
    { label: 'Total VRAM', value: '528 GB', color: '#f59e0b' },
    { label: 'Machines', value: '10', color: '#dc2626' },
    { label: 'AI Fabric', value: '100 GbE', color: '#34d399' },
    { label: 'GPUs', value: '8 GPUs', color: '#f472b6' },
    { label: 'Total RAM', value: '832+ GB', color: '#00d4ff' },
  ]

  return (
    <footer className="border-t border-border bg-panel/90 backdrop-blur-sm">
      <div className="px-6 py-3">
        <div className="grid grid-cols-5 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded bg-bg/50 border border-border"
            >
              <span className="text-[10px] text-textDim uppercase tracking-wider">{s.label}</span>
              <span className="text-sm font-semibold" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
