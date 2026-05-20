export type ProgressBarProps = {
  /** 0–100. */
  pct: number
  color?: string
}

/** Barra de progreso consistente entre dashboards. Server-safe. */
export function ProgressBar({ pct, color = 'bg-emerald-500' }: ProgressBarProps) {
  const safe = Math.max(0, Math.min(100, pct))
  return (
    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
      <div className={`h-full ${color} transition-all`} style={{ width: `${safe}%` }} />
    </div>
  )
}
