import { C } from '../constants/colors'

function ProgressBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const pct = (value / max) * 100
  const warn = pct > 80
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span style={{ color: C.textDim }}>{label}</span>
        <span style={{ color: warn ? C.red : color }}>{value}W / {max}W ({pct.toFixed(0)}%)</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: C.border }}>
        <div className="h-full rounded-full transition-all" style={{
          width: `${pct}%`,
          background: warn ? `linear-gradient(90deg, ${color}, ${C.red})` : color,
        }} />
      </div>
    </div>
  )
}

type Outlet = { num: string; device: string; draw: string; color: string }

function OutletTable({ outlets }: { outlets: Outlet[] }) {
  return (
    <table className="w-full text-[10px]">
      <thead>
        <tr style={{ color: C.textDim }}>
          <th className="text-left py-1 border-b w-10" style={{ borderColor: C.border }}>Outlet</th>
          <th className="text-left py-1 border-b" style={{ borderColor: C.border }}>Device</th>
          <th className="text-right py-1 border-b" style={{ borderColor: C.border }}>Est. Draw</th>
        </tr>
      </thead>
      <tbody>
        {outlets.map(o => (
          <tr key={o.num}>
            <td className="py-1 border-b" style={{ borderColor: C.border, color: C.textDim }}>{o.num}</td>
            <td className="py-1 border-b" style={{ borderColor: C.border, color: o.color }}>{o.device}</td>
            <td className="text-right py-1 border-b" style={{ borderColor: C.border, color: o.draw === '—' ? C.textDim : C.textBright }}>{o.draw}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function PowerView() {
  return (
    <div className="space-y-6">
      {/* UPS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* UPS 1 — CyberPower PR3000LCD */}
        <div className="rounded-lg border p-4" style={{ borderColor: C.warning + '40', background: C.panel }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔋</span>
            <div>
              <div className="text-xs font-bold" style={{ color: C.warning }}>CyberPower PR3000LCD</div>
              <div className="text-[10px]" style={{ color: C.textDim }}>2700W • Heavy AI Workstations</div>
            </div>
          </div>
          <OutletTable outlets={[
            { num: '1', device: 'IRONMAN (TR + 2× PRO 6000)', draw: '~1000W', color: C.warning },
            { num: '2', device: 'SENTINEL (9950X3D + 5090)', draw: '~750W', color: C.pink },
            { num: '3', device: 'Monitor 1', draw: '~60W', color: C.accent },
            { num: '4', device: 'Monitor 2', draw: '~60W', color: C.accent },
            { num: '5–10', device: 'Spare', draw: '—', color: C.textDim },
          ]} />
          <div className="mt-3 space-y-2">
            <ProgressBar value={1870} max={2700} color={C.warning} label="Estimated Load" />
            <div className="text-[10px]" style={{ color: C.green100g }}>
              830W headroom (31% spare)
            </div>
          </div>
        </div>

        {/* UPS 2 — GOLDENMATE */}
        <div className="rounded-lg border p-4" style={{ borderColor: C.purple + '40', background: C.panel }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔋</span>
            <div>
              <div className="text-xs font-bold" style={{ color: C.purple }}>GOLDENMATE 2000VA/1600W</div>
              <div className="text-[10px]" style={{ color: C.textDim }}>1600W • Dev + Network + Peripherals</div>
            </div>
          </div>
          <OutletTable outlets={[
            { num: '1', device: 'IRON-PATRIOT (Ultra 9 + PRO 6000)', draw: '~500W', color: C.purple },
            { num: '2', device: 'JERICHO (Ultra 9 + PRO 6000)', draw: '~500W', color: C.purple },
            { num: '3', device: 'MS510TXUP (PoE switch)', draw: '~100W', color: C.cyan10g },
            { num: '4', device: 'SN2100 (AI fabric)', draw: '~80W', color: C.green100g },
            { num: '5', device: 'GS752TPv2 (main switch)', draw: '~80W', color: C.textDim },
            { num: '6', device: 'ER4', draw: '~25W', color: C.red },
            { num: '7', device: 'Phone', draw: '~15W', color: C.textDim },
            { num: '8', device: 'Speakers', draw: '~30W', color: C.textDim },
          ]} />
          <div className="mt-3 space-y-2">
            <ProgressBar value={1330} max={1600} color={C.purple} label="Estimated Load" />
            <div className="text-[10px] p-2 rounded" style={{ color: C.red, background: C.red + '10' }}>
              270W headroom (17% spare) — near capacity
            </div>
          </div>
        </div>

        {/* UPS 3 — Vertiv (HAPPY) */}
        <div className="rounded-lg border p-4" style={{ borderColor: C.blue + '40', background: C.panel }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔋</span>
            <div>
              <div className="text-xs font-bold" style={{ color: C.blue }}>Vertiv PSA5-1500MT120</div>
              <div className="text-[10px]" style={{ color: C.textDim }}>900W • HAPPY (remote)</div>
            </div>
          </div>
          <OutletTable outlets={[
            { num: '1', device: 'HAPPY (10.2.10.112)', draw: '~150W', color: C.blue },
            { num: '2–8', device: 'Spare', draw: '—', color: C.textDim },
          ]} />
          <div className="mt-3 space-y-2">
            <ProgressBar value={150} max={900} color={C.blue} label="Estimated Load" />
            <div className="text-[10px]" style={{ color: C.green100g }}>
              750W headroom (83% spare)
            </div>
          </div>
        </div>
      </div>

      {/* Power Budget Table */}
      <div className="rounded-lg border p-4" style={{ borderColor: C.border, background: C.panel }}>
        <div className="text-xs font-bold mb-3" style={{ color: C.textBright }}>POWER BUDGET BREAKDOWN</div>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ color: C.textDim }}>
              <th className="text-left py-1.5 border-b" style={{ borderColor: C.border }}>Device</th>
              <th className="text-right py-1.5 border-b" style={{ borderColor: C.border }}>Est. Draw</th>
              <th className="text-right py-1.5 border-b" style={{ borderColor: C.border }}>UPS</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'IRONMAN', draw: '~1000W', ups: 'CyberPower', color: C.warning },
              { name: 'SENTINEL', draw: '~750W', ups: 'CyberPower', color: C.pink },
              { name: 'Monitors (×2)', draw: '~120W', ups: 'CyberPower', color: C.accent },
              { name: 'IRON-PATRIOT', draw: '~500W', ups: 'GOLDENMATE', color: C.purple },
              { name: 'JERICHO', draw: '~500W', ups: 'GOLDENMATE', color: C.purple },
              { name: 'MS510TXUP', draw: '~100W', ups: 'GOLDENMATE', color: C.cyan10g },
              { name: 'SN2100', draw: '~80W', ups: 'GOLDENMATE', color: C.green100g },
              { name: 'GS752TPv2', draw: '~80W', ups: 'GOLDENMATE', color: C.textDim },
              { name: 'ER4 + Phone + Speakers', draw: '~70W', ups: 'GOLDENMATE', color: C.textDim },
              { name: 'HAPPY', draw: '~150W', ups: 'Vertiv', color: C.blue },
            ].map(r => (
              <tr key={r.name}>
                <td className="py-1.5 border-b" style={{ borderColor: C.border, color: r.color }}>{r.name}</td>
                <td className="text-right py-1.5 border-b" style={{ borderColor: C.border, color: C.textBright }}>{r.draw}</td>
                <td className="text-right py-1.5 border-b" style={{ borderColor: C.border, color: C.green100g }}>{r.ups}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="py-2" style={{ color: C.textBright }}>TOTAL (all UPS)</td>
              <td className="text-right py-2" style={{ color: C.warning }}>~3,350W</td>
              <td className="text-right py-2" style={{ color: C.green100g }}>All Protected</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Circuit Requirements */}
      <div className="rounded-lg border p-4" style={{ borderColor: C.red + '40', background: C.panel }}>
        <div className="text-xs font-bold mb-2" style={{ color: C.red }}>CIRCUIT REQUIREMENTS</div>
        <div className="space-y-2 text-[11px]" style={{ color: C.textDim }}>
          <div className="flex items-start gap-2">
            <span style={{ color: C.red }}>&#9656;</span>
            <span>Lab total draw: <span style={{ color: C.textBright }}>~3,200W / 120V = ~26.7A</span> (excl. HAPPY remote)</span>
          </div>
          <div className="flex items-start gap-2">
            <span style={{ color: C.red }}>&#9656;</span>
            <span><span style={{ color: C.red }}>Exceeds single 20A circuit.</span> 20A/120V = 2,400W max (80% rule = 1,920W continuous)</span>
          </div>
          <div className="flex items-start gap-2">
            <span style={{ color: C.green100g }}>&#9656;</span>
            <span style={{ color: C.green100g }}>Recommended: 2x dedicated 20A/120V circuits OR 1x 30A/240V circuit</span>
          </div>
          <div className="flex items-start gap-2">
            <span style={{ color: C.warning }}>&#9656;</span>
            <span>GOLDENMATE at 83% capacity — monitor closely if adding devices</span>
          </div>
        </div>
      </div>
    </div>
  )
}
