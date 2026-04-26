import { useNavigate } from 'react-router-dom'
import { FilePlus, Users, FileText, CheckCircle, Clock, TrendingUp, AlertCircle, ChevronRight, Pill, Calendar, Search, Filter, MoreHorizontal } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import styles from './DoctorDashboard.module.css'

const weekData = [
  { day: "Lun", prescriptions: 8 }, { day: "Mar", prescriptions: 12 },
  { day: "Mer", prescriptions: 7 }, { day: "Jeu", prescriptions: 15 },
  { day: "Ven", prescriptions: 11 }, { day: "Sam", prescriptions: 6 }, { day: "Dim", prescriptions: 3 },
]

const monthData = [
  { month: "Jan", prescriptions: 98 }, { month: "Fév", prescriptions: 112 },
  { month: "Mar", prescriptions: 130 }, { month: "Avr", prescriptions: 125 },
]

const recentPrescriptions = [
  { id: "ORD-2026-00847", patient: "Kofi Mensah", age: 34, date: "Aujourd'hui 14:32", meds: ["Amoxicilline 500mg", "Paracétamol 1g"], status: "active", urgency: false },
  { id: "ORD-2026-00846", patient: "Abla Dossou", age: 28, date: "Aujourd'hui 11:15", meds: ["Metformine 850mg", "Lisinopril 10mg"], status: "delivered", urgency: false },
  { id: "ORD-2026-00845", patient: "Kwame Agbo", age: 67, date: "Aujourd'hui 09:45", meds: ["Amlodipine 5mg"], status: "active", urgency: true },
  { id: "ORD-2026-00844", patient: "Akosua Tete", age: 45, date: "Hier 16:20", meds: ["Ibuprofène 400mg", "Oméprazole 20mg"], status: "delivered", urgency: false },
  { id: "ORD-2026-00843", patient: "Edem Fiagbe", age: 52, date: "Hier 10:30", meds: ["Atorvastatine 20mg", "Aspirine 100mg"], status: "expired", urgency: false },
]

const topMeds = [
  { name: "Amoxicilline", count: 45, pct: 85 }, { name: "Paracétamol", count: 38, pct: 72 },
  { name: "Metformine", count: 29, pct: 55 }, { name: "Amlodipine", count: 22, pct: 42 },
  { name: "Oméprazole", count: 18, pct: 34 },
]

const statusConfig = {
  active: { label: "Active", badge: styles.statusActive, dot: styles.statusDotActive },
  delivered: { label: "Délivrée", badge: styles.statusDelivered, dot: styles.statusDotDelivered },
  expired: { label: "Expirée", badge: styles.statusExpired, dot: styles.statusDotExpired },
}

const statStyles = {
  emerald: { iconWrap: styles.statIconEmerald, icon: styles.statIconFgEmerald },
  blue: { iconWrap: styles.statIconBlue, icon: styles.statIconFgBlue },
  teal: { iconWrap: styles.statIconTeal, icon: styles.statIconFgTeal },
  amber: { iconWrap: styles.statIconAmber, icon: styles.statIconFgAmber },
}

const tooltipStyle = { borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }

const progressClassByPct = {
  85: styles.progress85,
  72: styles.progress72,
  55: styles.progress55,
  42: styles.progress42,
  34: styles.progress34,
}

export default function DoctorDashboard() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Tableau de bord</h1>
          <p className={styles.subtitle}>Lundi 14 avril 2026 · CHU Sylvanus Olympio, Lomé</p>
        </div>
        <button onClick={() => navigate('/app/doctor/new-prescription')} className={styles.primaryButton}>
          <FilePlus className={styles.iconSm} /> Nouvelle ordonnance
        </button>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {[
          { label: "Ordonnances aujourd'hui", value: "12", icon: FileText, theme: "emerald", delta: "+3 vs hier" },
          { label: "Patients actifs", value: "284", icon: Users, theme: "blue", delta: "+12 ce mois" },
          { label: "Délivrées (30j)", value: "118", icon: CheckCircle, theme: "teal", delta: "91% du total" },
          { label: "En attente", value: "8", icon: Clock, theme: "amber", delta: "2 urgentes" },
        ].map(stat => (
          <div key={stat.label} className={styles.statCard}>
            <div className={`${styles.statIcon} ${statStyles[stat.theme].iconWrap}`}>
              <stat.icon className={`${styles.iconSm} ${statStyles[stat.theme].icon}`} />
            </div>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statDelta}>{stat.delta}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className={styles.chartGrid}>
        <div className={styles.panelWide}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Prescriptions cette semaine</h3>
            <div className={styles.trendMeta}>
              <TrendingUp className={styles.iconSm} />
              <span className={styles.trendText}>+18% vs sem. passée</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="prescriptions" stroke="#10b981" strokeWidth={2.5} fill="url(#colorP)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Top médicaments prescrits</h3>
          <div className={styles.topMedList}>
            {topMeds.map(med => (
              <div key={med.name} className={styles.topMedItem}>
                <div className={styles.topMedHeader}>
                  <div className={styles.topMedName}>
                    <Pill className={styles.iconTiny} />
                    <span>{med.name}</span>
                  </div>
                  <span className={styles.topMedCount}>{med.count}</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={`${styles.progressFill} ${progressClassByPct[med.pct] || ''}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent prescriptions */}
      <div className={styles.tableCard}>
        <div className={styles.tableToolbar}>
          <h3 className={styles.panelTitle}>Ordonnances récentes</h3>
          <div className={styles.toolbarActions}>
            <div className={styles.searchWrap}>
              <Search className={styles.searchIcon} />
              <input type="text" placeholder="Rechercher..." className={styles.searchInput} />
            </div>
            <button className={styles.filterButton}>
              <Filter className={styles.iconTiny} /> Filtrer
            </button>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.thFirst}>Ordonnance</th>
                <th className={styles.th}>Patient</th>
                <th className={`${styles.th} ${styles.hideSm}`}>Médicaments</th>
                <th className={`${styles.th} ${styles.hideMd}`}>Date</th>
                <th className={styles.th}>Statut</th>
                <th className={styles.thSpacer}></th>
              </tr>
            </thead>
            <tbody>
              {recentPrescriptions.map(rx => {
                const s = statusConfig[rx.status]
                return (
                  <tr key={rx.id} className={styles.row}>
                    <td className={styles.tdFirst}>
                      <div className={styles.rxIdWrap}>
                        {rx.urgency && <AlertCircle className={styles.alertIcon} />}
                        <span className={styles.rxId}>{rx.id}</span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.patientCell}>
                        <div className={styles.patientAvatar}>
                          {rx.patient.charAt(0)}
                        </div>
                        <div>
                          <p className={styles.patientName}>{rx.patient}</p>
                          <p className={styles.patientAge}>{rx.age} ans</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.td} ${styles.hideSm}`}>
                      <div className={styles.chipRow}>
                        {rx.meds.slice(0, 2).map(m => (
                          <span key={m} className={styles.chip}>{m}</span>
                        ))}
                      </div>
                    </td>
                    <td className={`${styles.td} ${styles.hideMd}`}>
                      <div className={styles.dateCell}>
                        <Calendar className={styles.iconTiny} /> {rx.date}
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={`${styles.statusBadge} ${s.badge}`}>
                        <div className={s.dot}></div>
                        {s.label}
                      </div>
                    </td>
                    <td className={styles.tdActions}>
                      <button className={styles.moreButton}>
                        <MoreHorizontal className={styles.iconSm} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.tableFooter}>
          <p className={styles.footerText}>5 sur 128 ordonnances</p>
          <button className={styles.viewAllButton}>
            Voir tout <ChevronRight className={styles.iconTiny} />
          </button>
        </div>
      </div>

      {/* Monthly trend */}
      <div className={styles.panel}>
        <h3 className={styles.panelTitle}>Évolution mensuelle (2026)</h3>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={monthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="prescriptions" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
