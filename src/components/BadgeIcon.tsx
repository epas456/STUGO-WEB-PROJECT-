import {
  Star, Clock, Award, Sparkles, UtensilsCrossed, CalendarCheck,
  Layers, ShieldCheck, Languages, Flag, Zap, Package, Megaphone,
  BadgeCheck, GlassWater, Crown, Trophy, Smartphone, Sunrise,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Star, Clock, Award, Sparkles, UtensilsCrossed, CalendarCheck,
  Layers, ShieldCheck, Languages, Flag, Zap, Package, Megaphone,
  BadgeCheck, GlassWater, Crown, Trophy, Smartphone, Sunrise,
}

export function BadgeIcon({
  name,
  size = 22,
  color,
  className,
}: {
  name?: string
  size?: number
  color?: string
  className?: string
}) {
  const Icon = ICONS[name ?? ''] ?? Award
  return <Icon size={size} strokeWidth={2} color={color} className={className} aria-hidden="true" />
}
