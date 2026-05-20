export type SparklineProps = {
  /** Serie de valores en orden cronológico (viejo → nuevo). */
  data: number[]
  width?: number
  height?: number
  /** Color de la línea (cualquier color CSS). Default: currentColor. */
  stroke?: string
  /** Color de relleno bajo la curva (opcional). */
  fill?: string
  strokeWidth?: number
  /** Punto marcado en el último valor (estilo Tufte). */
  showDot?: boolean
  className?: string
}

/**
 * Sparkline minimalista (Tufte): tendencia sin ejes ni ruido.
 * Server-safe, sin estado. 0 puntos → no renderiza. 1 punto → solo el dot.
 */
export function Sparkline({
  data,
  width = 80,
  height = 24,
  stroke = 'currentColor',
  fill,
  strokeWidth = 1.5,
  showDot = true,
  className,
}: SparklineProps) {
  const pts = (data ?? []).filter((n) => typeof n === 'number' && !Number.isNaN(n))
  if (pts.length === 0) return null

  const pad = strokeWidth + 1
  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const span = max - min || 1
  const n = pts.length

  const x = (i: number) => (n === 1 ? width / 2 : pad + (i * (width - pad * 2)) / (n - 1))
  const y = (v: number) => height - pad - ((v - min) / span) * (height - pad * 2)

  const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const lastX = x(n - 1)
  const lastY = y(pts[n - 1])
  const area = fill
    ? `${line} L ${lastX.toFixed(1)} ${(height - pad).toFixed(1)} L ${x(0).toFixed(1)} ${(height - pad).toFixed(1)} Z`
    : ''

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
      aria-hidden="true"
    >
      {fill && <path d={area} fill={fill} stroke="none" />}
      <path d={line} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {showDot && <circle cx={lastX} cy={lastY} r={strokeWidth + 0.5} fill={stroke} />}
    </svg>
  )
}
