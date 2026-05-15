const COLORS = [
  '#2D5BFF',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
]

interface Props {
  name: string
  size?: number
  online?: boolean
}

export function AvatarCircle({ name, size = 40, online = false }: Props) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  const color = COLORS[name.charCodeAt(0) % COLORS.length]
  return (
    <div className="relative inline-flex shrink-0">
      <div
        className="rounded-full flex items-center justify-center font-semibold text-white"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          fontSize: size * 0.35,
        }}
      >
        {initials}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  )
}
