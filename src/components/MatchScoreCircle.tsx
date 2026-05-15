interface Props {
  score: number
  size?: number
}

export function MatchScoreCircle({ score, size = 56 }: Props) {
  const color =
    score >= 85
      ? 'var(--success)'
      : score >= 70
        ? 'var(--warning)'
        : 'var(--text-tertiary)'
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (score / 100) * circumference
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-muted)"
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span
        className="absolute text-xs font-bold"
        style={{ color, fontSize: size * 0.22 }}
      >
        {score}%
      </span>
    </div>
  )
}
