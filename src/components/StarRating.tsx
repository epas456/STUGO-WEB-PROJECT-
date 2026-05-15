import { Star } from 'lucide-react'

interface Props {
  value: number
  onChange?: (v: number) => void
  size?: number
}

export function StarRating({ value, onChange, size = 20 }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
          style={{ color: i <= value ? 'var(--brand-accent)' : 'var(--border)' }}
        >
          <Star size={size} fill={i <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  )
}
