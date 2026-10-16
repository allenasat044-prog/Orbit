import * as React from "react"
import * as Recharts from "recharts"
import { cn } from "@/lib/utils"

export type ChartConfig = Record<string, { label?: React.ReactNode; color?: string }>
const Ctx = React.createContext<{ config: ChartConfig } | null>(null)

export function ChartContainer({ config, className, children, ...props }: React.ComponentProps<"div"> & { config: ChartConfig; children: React.ReactElement }) {
  const style = Object.fromEntries(Object.entries(config).filter(([, c]) => c.color).map(([k, c]) => [`--color-${k}`, c.color])) as React.CSSProperties
  return (
    <Ctx.Provider value={{ config }}>
      <div style={style} className={cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50", className)} {...props}>
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </Ctx.Provider>
  )
}
export const ChartTooltip = Recharts.Tooltip
export function ChartTooltipContent({ active, payload, label, nameKey }: any) {
  const ctx = React.useContext(Ctx)
  if (!active || !payload?.length) return null
  return (
    <div className="grid min-w-[8rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      {label ? <div className="font-medium">{label}</div> : null}
      {payload.map((p: any) => {
        const key = nameKey ? p.payload?.[nameKey] : p.dataKey
        return (
          <div key={String(p.dataKey)} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: p.payload?.fill || p.color }} />
            <span className="text-muted-foreground">{ctx?.config[key]?.label ?? p.name}</span>
            <span className="ml-auto font-mono font-medium">{Number(p.value).toLocaleString()}</span>
          </div>
        )
      })}
    </div>
  )
}
