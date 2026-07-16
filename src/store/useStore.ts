import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'empresa' | 'estudiante'
  avatar?: string
  plan?: 'free' | 'pro' | 'enterprise'
}

export interface Notification {
  id: string
  type: 'turno' | 'mensaje' | 'valoracion' | 'pago' | 'oportunidad'
  title: string
  message: string
  read: boolean
  createdAt: string
  link?: string
}

interface AppStore {
  auth: { role: 'public' | 'empresa' | 'estudiante'; user: AuthUser | null }
  theme: 'light' | 'dark'
  notifications: Notification[]
  cookieConsent: 'pending' | 'accepted' | 'rejected' | 'custom'
  sidebarCollapsed: boolean
  // Turnos que el estudiante ha aceptado en esta demo (persistidos en localStorage)
  turnosAceptados: string[]
  aceptarTurno: (id: string) => void
  cancelarTurno: (id: string) => void
  login: (role: 'empresa' | 'estudiante', user: AuthUser) => void
  logout: () => void
  setTheme: (theme: 'light' | 'dark') => void
  setCookieConsent: (v: 'accepted' | 'rejected' | 'custom') => void
  markAllNotificationsRead: () => void
  markNotificationRead: (id: string) => void
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      auth: { role: 'public', user: null },
      theme: getInitialTheme(),
      notifications: [],
      cookieConsent: 'pending',
      sidebarCollapsed: false,
      turnosAceptados: [],

      aceptarTurno: (id) =>
        set((s) => ({
          turnosAceptados: s.turnosAceptados.includes(id)
            ? s.turnosAceptados
            : [...s.turnosAceptados, id],
        })),

      cancelarTurno: (id) =>
        set((s) => ({ turnosAceptados: s.turnosAceptados.filter((t) => t !== id) })),

      login: (role, user) => set({ auth: { role, user } }),
      logout: () => set({ auth: { role: 'public', user: null } }),

      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme)
        set({ theme })
      },

      setCookieConsent: (v) => set({ cookieConsent: v }),

      markAllNotificationsRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),

      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),

      addNotification: (n) =>
        set((s) => ({
          notifications: [
            {
              ...n,
              id: Math.random().toString(36).slice(2),
              createdAt: new Date().toISOString(),
              read: false,
            },
            ...s.notifications,
          ],
        })),

      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
    }),
    {
      name: 'stugo-store',
      partialize: (s) => ({
        theme: s.theme,
        auth: s.auth,
        cookieConsent: s.cookieConsent,
        sidebarCollapsed: s.sidebarCollapsed,
        turnosAceptados: s.turnosAceptados,
      }),
    }
  )
)
