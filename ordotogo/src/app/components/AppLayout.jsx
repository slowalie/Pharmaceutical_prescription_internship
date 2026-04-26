import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Stethoscope, LayoutDashboard, FilePlus, Users, Bell,
  QrCode, History, BarChart3, LogOut, Menu, X,
  Smartphone, Shield, ChevronDown, Home
} from 'lucide-react'
import styles from './AppLayout.module.css'

const roleMenus = {
  doctor: [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/app/doctor" },
    { icon: FilePlus, label: "Nouvelle ordonnance", path: "/app/doctor/new-prescription" },
    { icon: Users, label: "Mes patients", path: "/app/doctor" },
    { icon: History, label: "Historique", path: "/app/doctor" },
    { icon: BarChart3, label: "Statistiques", path: "/app/doctor" },
  ],
  pharmacist: [
    { icon: QrCode, label: "Scanner QR Code", path: "/app/pharmacist" },
    { icon: History, label: "Dispensations", path: "/app/pharmacist" },
    { icon: BarChart3, label: "Rapports", path: "/app/pharmacist" },
  ],
  patient: [
    { icon: LayoutDashboard, label: "Mes ordonnances", path: "/app/patient" },
    { icon: History, label: "Historique médical", path: "/app/patient" },
    { icon: Smartphone, label: "Partager", path: "/app/patient" },
  ],
}

const roleLabels = {
  doctor: { label: "Médecin", name: "Dr. Ama Koffi", color: "emerald", icon: "🩺" },
  pharmacist: { label: "Pharmacien", name: "Jean Mensah", color: "teal", icon: "💊" },
  patient: { label: "Patient", name: "Kofi Adzoa", color: "blue", icon: "👤" },
}

function getRoleFromPath(path) {
  if (path.includes("pharmacist")) return "pharmacist"
  if (path.includes("patient")) return "patient"
  return "doctor"
}

const colorMap = { emerald: "bg-emerald-600", teal: "bg-teal-600", blue: "bg-blue-600" }
const lightMap = { emerald: "bg-emerald-50 text-emerald-700 border-emerald-200", teal: "bg-teal-50 text-teal-700 border-teal-200", blue: "bg-blue-50 text-blue-700 border-blue-200" }
const activeMap = { emerald: "bg-emerald-50 text-emerald-700 font-medium", teal: "bg-teal-50 text-teal-700 font-medium", blue: "bg-blue-50 text-blue-700 font-medium" }
const themeMap = {
  emerald: {
    brand: styles.brandEmerald,
    roleButton: styles.roleButtonEmerald,
    roleButtonActive: styles.roleButtonActiveEmerald,
    navButtonActive: styles.navButtonActiveEmerald,
    badge: styles.avatarEmerald,
  },
  teal: {
    brand: styles.brandTeal,
    roleButton: styles.roleButtonTeal,
    roleButtonActive: styles.roleButtonActiveTeal,
    navButtonActive: styles.navButtonActiveTeal,
    badge: styles.avatarTeal,
  },
  blue: {
    brand: styles.brandBlue,
    roleButton: styles.roleButtonBlue,
    roleButtonActive: styles.roleButtonActiveBlue,
    navButtonActive: styles.navButtonActiveBlue,
    badge: styles.avatarBlue,
  },
}

export default function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [roleDropOpen, setRoleDropOpen] = useState(false)

  const currentRole = getRoleFromPath(location.pathname)
  const roleInfo = roleLabels[currentRole]
  const menu = roleMenus[currentRole]
  const theme = themeMap[roleInfo.color]

  return (
    <div className={styles.shell}>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarTop}>
          <div className={styles.brandRow}>
            <div className={`${styles.brandMark} ${theme.brand}`}>
              <Stethoscope className={styles.iconSm} />
            </div>
            <span className={styles.brandName}>OrdoTogo</span>
            <button onClick={() => setSidebarOpen(false)} className={styles.closeButton}>
              <X className={styles.iconSm} />
            </button>
          </div>
          {/* Role switcher */}
          <div className={styles.roleSwitcherWrap}>
            <button onClick={() => setRoleDropOpen(!roleDropOpen)} className={`${styles.roleButton} ${theme.roleButton}`}>
              <span className={styles.roleEmoji}>{roleInfo.icon}</span>
              <div className={styles.roleCopy}>
                <p className={styles.roleLabel}>{roleInfo.label}</p>
                <p className={styles.roleName}>{roleInfo.name}</p>
              </div>
              <ChevronDown className={styles.chevronIcon} />
            </button>
            {roleDropOpen && (
              <div className={styles.roleMenu}>
                {Object.entries(roleLabels).map(([r, c]) => (
                  <button key={r} onClick={() => { navigate({ doctor: "/app/doctor", pharmacist: "/app/pharmacist", patient: "/app/patient" }[r]); setRoleDropOpen(false) }} className={`${styles.roleMenuItem} ${currentRole === r ? theme.roleButtonActive : ''}`}>
                    <span className={styles.roleMenuEmoji}>{c.icon}</span>
                    <div className={styles.roleMenuCopy}>
                      <p className={styles.roleMenuLabel}>{c.label}</p>
                      <p className={styles.roleMenuName}>{c.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <nav className={styles.nav}>
          <p className={styles.sectionLabel}>Navigation</p>
          {menu.map(item => {
            const isActive = location.pathname === item.path
            return (
              <button key={item.label} onClick={() => { navigate(item.path); setSidebarOpen(false) }} className={`${styles.navButton} ${isActive ? theme.navButtonActive : ''}`}>
                <item.icon className={styles.iconSm} />
                {item.label}
              </button>
            )
          })}
          <div className={styles.quickSection}>
            <p className={styles.sectionLabel}>Accès rapide</p>
            <button onClick={() => navigate("/")} className={styles.quickButton}>
              <Home className={styles.iconSm} /> Accueil
            </button>
            <button onClick={() => navigate("/app/admin")} className={styles.quickButton}>
              <Shield className={styles.iconSm} /> Admin
            </button>
            <button onClick={() => navigate("/auth")} className={styles.logoutButton}>
              <LogOut className={styles.iconSm} /> Déconnexion
            </button>
          </div>
        </nav>

        <div className={styles.footer}>
          <div className={styles.footerCard}>
            <p className={styles.footerText}>OrdoTogo v1.0 Beta</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.mainShell}>
        <header className={styles.header}>
          <button onClick={() => setSidebarOpen(true)} className={styles.menuButton}>
            <Menu className={styles.iconMd} />
          </button>
          <div className={styles.headerSpacer} />
          <button className={styles.bellButton}>
            <Bell className={styles.iconMd} />
            <span className={styles.bellDot}></span>
          </button>
          <div className={styles.userBlock}>
            <div className={`${styles.avatar} ${theme.badge}`}>
              {roleInfo.name.charAt(0)}
            </div>
            <div className={styles.userCopy}>
              <p className={styles.userName}>{roleInfo.name}</p>
              <p className={styles.userRole}>{roleInfo.label}</p>
            </div>
          </div>
        </header>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
