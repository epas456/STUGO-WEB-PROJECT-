import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from '@/store/useStore'
import { ToastProvider } from '@/components/ui/Toast'
import { CookieBanner } from '@/components/CookieBanner'
import { Chatbot } from '@/components/Chatbot'

// Layouts
import PublicLayout from '@/layouts/PublicLayout'
import EmpresaLayout from '@/layouts/EmpresaLayout'
import EstudianteLayout from '@/layouts/EstudianteLayout'

// Error pages (not lazy - needed immediately)
import NotFound from '@/pages/errors/NotFound'
import ServerError from '@/pages/errors/ServerError'

// ──────────────── PUBLIC PAGES ────────────────
const Home = lazy(() => import('@/pages/public/Home'))
const Turnos = lazy(() => import('@/pages/public/Turnos'))
const TurnoDetalle = lazy(() => import('@/pages/public/TurnoDetalle'))
const Estudiantes = lazy(() => import('@/pages/public/Estudiantes'))
const EstudiantePublico = lazy(() => import('@/pages/public/EstudiantePublico'))
const Empresas = lazy(() => import('@/pages/public/Empresas'))
const EmpresaPublica = lazy(() => import('@/pages/public/EmpresaPublica'))
const Precios = lazy(() => import('@/pages/public/Precios'))
const ComoFunciona = lazy(() => import('@/pages/public/ComoFunciona'))
const Calculadora = lazy(() => import('@/pages/public/Calculadora'))
const Blog = lazy(() => import('@/pages/public/Blog'))
const BlogArticulo = lazy(() => import('@/pages/public/BlogArticulo'))
const Ayuda = lazy(() => import('@/pages/public/Ayuda'))
const AyudaArticulo = lazy(() => import('@/pages/public/AyudaArticulo'))
const Contacto = lazy(() => import('@/pages/public/Contacto'))
const Nosotros = lazy(() => import('@/pages/public/Nosotros'))
const Privacidad = lazy(() => import('@/pages/public/Privacidad'))
const Terminos = lazy(() => import('@/pages/public/Terminos'))
const Cookies = lazy(() => import('@/pages/public/Cookies'))
const AvisoLegal = lazy(() => import('@/pages/public/AvisoLegal'))
const Login = lazy(() => import('@/pages/public/Login'))
const Registro = lazy(() => import('@/pages/public/Registro'))
const RecuperarPassword = lazy(() => import('@/pages/public/RecuperarPassword'))

// ──────────────── EMPRESA PAGES ────────────────
const EmpresaDashboard = lazy(() => import('@/pages/empresa/Dashboard'))
const EmpresaTurnos = lazy(() => import('@/pages/empresa/Turnos'))
const EmpresaNuevoTurno = lazy(() => import('@/pages/empresa/NuevoTurno'))
const EmpresaTurnoDetalle = lazy(() => import('@/pages/empresa/TurnoDetalle'))
const EmpresaCandidatos = lazy(() => import('@/pages/empresa/Candidatos'))
const EmpresaCandidatoDetalle = lazy(() => import('@/pages/empresa/CandidatoDetalle'))
const EmpresaMensajes = lazy(() => import('@/pages/empresa/Mensajes'))
const EmpresaAnaliticas = lazy(() => import('@/pages/empresa/Analiticas'))
const EmpresaFacturacion = lazy(() => import('@/pages/empresa/Facturacion'))
const EmpresaDocumentos = lazy(() => import('@/pages/empresa/Documentos'))
const EmpresaConfiguracion = lazy(() => import('@/pages/empresa/Configuracion'))
const EmpresaRegistro = lazy(() => import('@/pages/empresa/Registro'))

// ──────────────── ESTUDIANTE PAGES ────────────────
const EstudianteDashboard = lazy(() => import('@/pages/estudiante/Dashboard'))
const EstudianteTurnos = lazy(() => import('@/pages/estudiante/Turnos'))
const EstudianteTurnoDetalle = lazy(() => import('@/pages/estudiante/TurnoDetalle'))
const EstudianteMisTurnos = lazy(() => import('@/pages/estudiante/MisTurnos'))
const EstudianteMensajes = lazy(() => import('@/pages/estudiante/Mensajes'))
const EstudiantePerfil = lazy(() => import('@/pages/estudiante/Perfil'))
const EstudianteValoraciones = lazy(() => import('@/pages/estudiante/Valoraciones'))
const EstudianteCartera = lazy(() => import('@/pages/estudiante/Cartera'))
const EstudianteBasicos = lazy(() => import('@/pages/estudiante/Basicos'))
const EstudianteConfiguracion = lazy(() => import('@/pages/estudiante/Configuracion'))
const EstudianteNotificaciones = lazy(() => import('@/pages/estudiante/Notificaciones'))

// Page loader
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-[var(--brand-primary)] border-t-transparent"
        style={{ animation: 'spin 0.75s linear infinite' }}
        role="status"
        aria-label="Cargando..."
      />
    </div>
  )
}

// Route guard for authenticated routes
function RequireAuth({
  children,
  role,
}: {
  children: React.ReactNode
  role: 'empresa' | 'estudiante'
}) {
  const { auth } = useStore()

  if (auth.role === 'public') {
    return <Navigate to="/login" replace />
  }

  if (auth.role !== role) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default function App() {
  const { theme, setTheme } = useStore()

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Sync system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('stugo-store')
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [setTheme])

  return (
    <BrowserRouter>
      <ToastProvider />
      <CookieBanner />
      <Chatbot />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── PUBLIC ROUTES ── */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="turnos" element={<Turnos />} />
            <Route path="turnos/:id" element={<TurnoDetalle />} />
            <Route path="estudiantes" element={<Estudiantes />} />
            <Route path="estudiantes/:id" element={<EstudiantePublico />} />
            <Route path="empresas" element={<Empresas />} />
            <Route path="empresas/:id" element={<EmpresaPublica />} />
            <Route path="precios" element={<Precios />} />
            <Route path="como-funciona" element={<ComoFunciona />} />
            <Route path="calculadora" element={<Calculadora />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogArticulo />} />
            <Route path="faq" element={<Navigate to="/ayuda" replace />} />
            <Route path="ayuda" element={<Ayuda />} />
            <Route path="ayuda/:slug" element={<AyudaArticulo />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="privacidad" element={<Privacidad />} />
            <Route path="terminos" element={<Terminos />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="aviso-legal" element={<AvisoLegal />} />

            {/* Auth pages (still use public layout) */}
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Registro />} />
            <Route path="empresa/registro" element={<EmpresaRegistro />} />
            <Route path="recuperar-password" element={<RecuperarPassword />} />
          </Route>

          {/* ── EMPRESA ROUTES ── */}
          <Route
            path="empresa"
            element={
              <RequireAuth role="empresa">
                <EmpresaLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EmpresaDashboard />} />
            <Route path="turnos" element={<EmpresaTurnos />} />
            <Route path="turnos/nuevo" element={<EmpresaNuevoTurno />} />
            <Route path="turnos/:id" element={<EmpresaTurnoDetalle />} />
            <Route path="candidatos" element={<EmpresaCandidatos />} />
            <Route path="candidatos/:id" element={<EmpresaCandidatoDetalle />} />
            <Route path="mensajes" element={<EmpresaMensajes />} />
            <Route path="mensajes/:id" element={<EmpresaMensajes />} />
            <Route path="analiticas" element={<EmpresaAnaliticas />} />
            <Route path="facturacion" element={<EmpresaFacturacion />} />
            <Route path="documentos" element={<EmpresaDocumentos />} />
            <Route path="configuracion" element={<EmpresaConfiguracion />} />
          </Route>

          {/* ── ESTUDIANTE ROUTES ── */}
          <Route
            path="estudiante"
            element={
              <RequireAuth role="estudiante">
                <EstudianteLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EstudianteDashboard />} />
            <Route path="turnos" element={<EstudianteTurnos />} />
            <Route path="turnos/:id" element={<EstudianteTurnoDetalle />} />
            <Route path="mis-turnos" element={<EstudianteMisTurnos />} />
            <Route path="mis-turnos/:id" element={<EstudianteTurnoDetalle />} />
            <Route path="mensajes" element={<EstudianteMensajes />} />
            <Route path="mensajes/:id" element={<EstudianteMensajes />} />
            <Route path="perfil" element={<EstudiantePerfil />} />
            <Route path="valoraciones" element={<EstudianteValoraciones />} />
            <Route path="valoraciones/pendientes" element={<EstudianteValoraciones />} />
            <Route path="cartera" element={<EstudianteCartera />} />
            <Route path="basicos" element={<EstudianteBasicos />} />
            <Route path="basicos/:sector" element={<EstudianteBasicos />} />
            <Route path="configuracion" element={<EstudianteConfiguracion />} />
            <Route path="notificaciones" element={<EstudianteNotificaciones />} />
          </Route>

          {/* ── ERROR ROUTES ── */}
          <Route path="500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
