import { useNavigate } from 'react-router-dom'
import { Users, FileText, Shield, AlertTriangle, ArrowLeft, Server, Lock, Activity, MapPin, Clock, BarChart3, Globe } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import styles from './AdminDashboard.module.css'

const activityData = [
  { time: "08:00", prescriptions: 5, dispensations: 2 },
  { time: "09:00", prescriptions: 12, dispensations: 8 },
  { time: "10:00", prescriptions: 18, dispensations: 14 },
  { time: "11:00", prescriptions: 22, dispensations: 19 },
  { time: "12:00", prescriptions: 15, dispensations: 12 },
  { time: "13:00", prescriptions: 10, dispensations: 8 },
  { time: "14:00", prescriptions: 24, dispensations: 18 },
  { time: "15:00", prescriptions: 19, dispensations: 16 },
]

const regionData = [
  { name: "Lomé", value: 58, color: "#10b981", swatch: styles.regionSwatchLome },
  { name: "Sokodé", value: 15, color: "#0d9488", swatch: styles.regionSwatchSokode },
  { name: "Kpalimé", value: 12, color: "#0ea5e9", swatch: styles.regionSwatchKpalime },
  { name: "Atakpamé", value: 10, color: "#8b5cf6", swatch: styles.regionSwatchAtakpame },
  { name: "Autres", value: 5, color: "#94a3b8", swatch: styles.regionSwatchAutres },
]

const areaTooltipStyle = { borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 11 }
const pieTooltipStyle = { borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 11 }

const auditLogs = [
  { id: 1, time: "15:47:35", action: "Ordonnance délivrée", user: "Jean Mensah (Pharmacien)", type: "delivery", ip: "192.168.1.45" },
  { id: 2, time: "15:47:22", action: "QR Code scanné", user: "Jean Mensah (Pharmacien)", type: "scan", ip: "192.168.1.45" },
  { id: 3, time: "15:33:02", action: "SMS envoyé au patient", user: "Système (Auto)", type: "system", ip: "10.0.0.1" },
  { id: 4, time: "14:32:45", action: "Ordonnance signée électroniquement", user: "Dr. Ama Koffi", type: "signature", ip: "192.168.2.12" },
  { id: 5, time: "14:32:18", action: "Ordonnance créée ORD-2026-00847", user: "Dr. Ama Koffi", type: "create", ip: "192.168.2.12" },
  { id: 6, time: "14:28:05", action: "Connexion médecin", user: "Dr. Ama Koffi", type: "auth", ip: "192.168.2.12" },
  { id: 7, time: "14:10:33", action: "Tentative de réutilisation d'ordonnance", user: "Inconnu", type: "fraud", ip: "41.78.234.12" },
  { id: 8, time: "13:55:21", action: "Nouveau pharmacien vérifié", user: "Admin OrdoTogo", type: "admin", ip: "10.0.0.5" },
]

const typeConfig = {
  delivery: { badge: styles.eventDelivery, label: "Délivrance" },
  scan: { badge: styles.eventScan, label: "Scan" },
  system: { badge: styles.eventSystem, label: "Système" },
  signature: { badge: styles.eventSignature, label: "Signature" },
  create: { badge: styles.eventCreate, label: "Création" },
  auth: { badge: styles.eventAuth, label: "Auth" },
  fraud: { badge: styles.eventFraud, label: "⚠ Fraude" },
  admin: { badge: styles.eventAdmin, label: "Admin" },
}

const statStyles = {
  emerald: { iconWrap: styles.statIconEmerald, icon: styles.statIconFgEmerald },
  teal: { iconWrap: styles.statIconTeal, icon: styles.statIconFgTeal },
  blue: { iconWrap: styles.statIconBlue, icon: styles.statIconFgBlue },
  red: { iconWrap: styles.statIconRed, icon: styles.statIconFgRed },
}

const securityStyles = {
  violet: { iconWrap: styles.securityIconViolet, icon: styles.securityIconFgViolet },
  emerald: { iconWrap: styles.securityIconEmerald, icon: styles.securityIconFgEmerald },
  blue: { iconWrap: styles.securityIconBlue, icon: styles.securityIconFgBlue },
}

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button onClick={() => navigate('/app/doctor')} className={styles.backButton}>
            <ArrowLeft className={styles.iconSm} />
          </button>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              <Shield className={styles.iconMd} /> Administration & Supervision
            </h1>
            <p className={styles.subtitle}>OrdoTogo · Dashboard Admin · Temps réel</p>
          </div>
        </div>
        <div className={styles.liveBadge}>
          <div className={styles.liveDot}></div>
          Systèmes opérationnels
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {[
          { label: "Médecins actifs", value: "147", icon: Users, theme: "emerald", sub: "+12 ce mois" },
          { label: "Pharmacies connectées", value: "38", icon: MapPin, theme: "teal", sub: "Lomé + régions" },
          { label: "Ordonnances (30j)", value: "2 847", icon: FileText, theme: "blue", sub: "↑ 23% vs mois passé" },
          { label: "Tentatives de fraude", value: "3", icon: AlertTriangle, theme: "red", sub: "Toutes bloquées ✓" },
        ].map(stat => (
          <div key={stat.label} className={styles.statCard}>
            <div className={`${styles.statIcon} ${statStyles[stat.theme].iconWrap}`}>
              <stat.icon className={`${styles.iconSm} ${statStyles[stat.theme].icon}`} />
            </div>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statSub}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Infrastructure */}
      <div className={styles.panel}>
        <h3 className={styles.panelTitle}>
          <Server className={styles.iconSm} /> Infrastructure technique
        </h3>
        <div className={styles.infraGrid}>
          {[
            { label: "API Server", status: "100%", detail: "Paris/Lomé · 24ms" },
            { label: "Base de données", status: "99.9%", detail: "PostgreSQL · AES-256" },
            { label: "Service SMS", status: "100%", detail: "Yas mobile · Togo" },
            { label: "Certificats SSL", status: "Valide", detail: "Expire dans 287 jours" },
          ].map(s => (
            <div key={s.label} className={styles.infraCard}>
              <div className={styles.infraTop}>
                <p className={styles.infraLabel}>{s.label}</p>
                <span className={styles.infraStatus}>{s.status}</span>
              </div>
              <div className={styles.infraTrack}>
                <div className={styles.infraFill}></div>
              </div>
              <p className={styles.infraDetail}>{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className={styles.chartGrid}>
        <div className={styles.chartPanelWide}>
          <h3 className={styles.panelTitle}>
            <Activity className={styles.iconSm} /> Activité en temps réel (aujourd'hui)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorPA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={areaTooltipStyle} />
              <Area type="monotone" dataKey="prescriptions" stroke="#10b981" strokeWidth={2} fill="url(#colorPA)" name="Prescriptions" />
              <Area type="monotone" dataKey="dispensations" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorDA)" name="Dispensations" />
            </AreaChart>
          </ResponsiveContainer>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}><span className={styles.legendSwatchEmerald}></span> Prescriptions</div>
            <div className={styles.legendItem}><span className={styles.legendSwatchViolet}></span> Dispensations</div>
          </div>
        </div>

        <div className={styles.chartPanel}>
          <h3 className={styles.panelTitle}>
            <Globe className={styles.iconSm} /> Répartition géographique
          </h3>
          <div className={styles.flexCenter}>
            <PieChart width={160} height={160}>
              <Pie data={regionData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={2}>
                {regionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={pieTooltipStyle} formatter={v => `${v}%`} />
            </PieChart>
          </div>
          <div className={styles.regionList}>
            {regionData.map(r => (
              <div key={r.name} className={styles.regionRow}>
                <div className={styles.regionNameWrap}>
                  <div className={`${styles.regionSwatch} ${r.swatch}`}></div>
                  <span>{r.name}</span>
                </div>
                <span className={styles.regionValue}>{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security */}
      <div className={styles.securityGrid}>
        {[
          { icon: Lock, title: "Chiffrement", detail: "AES-256 au repos · TLS 1.3 en transit · Clés rotatives tous les 90j", theme: "violet" },
          { icon: Shield, title: "Conformité", detail: "RGPD · Loi N°2019-014 Togo · Recommandations OMS Afrique", theme: "emerald" },
          { icon: BarChart3, title: "Traçabilité", detail: "Audit logs immuables · Rétention 10 ans · Export CSV/JSON", theme: "blue" },
        ].map(s => (
          <div key={s.title} className={styles.securityCard}>
            <div className={`${styles.securityIcon} ${securityStyles[s.theme].iconWrap}`}>
              <s.icon className={`${styles.iconSm} ${securityStyles[s.theme].icon}`} />
            </div>
            <p className={styles.securityTitle}>{s.title}</p>
            <p className={styles.securityDetail}>{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Audit logs */}
      <div className={styles.auditCard}>
        <div className={styles.auditHeader}>
          <h3 className={styles.panelTitle}>
            <Clock className={styles.iconSm} /> Journal d'audit (temps réel)
          </h3>
          <div className={styles.liveStatus}>
            <div className={styles.liveDot}></div>
            Live
          </div>
        </div>
        <div className={styles.auditList}>
          {auditLogs.map(log => {
            const tc = typeConfig[log.type]
            return (
              <div key={log.id} className={`${styles.auditRow} ${log.type === "fraud" ? styles.auditRowFraud : ''}`}>
                <span className={styles.auditTime}>{log.time}</span>
                <span className={`${styles.auditBadge} ${tc.badge}`}>{tc.label}</span>
                <div className={styles.auditCopy}>
                  <p className={`${styles.auditAction} ${log.type === "fraud" ? styles.auditActionFraud : ''}`}>{log.action}</p>
                  <p className={styles.auditMeta}>{log.user} · {log.ip}</p>
                </div>
                {log.type === "fraud" && <AlertTriangle className={styles.iconSm} />}
              </div>
            )
          })}
        </div>
        <div className={styles.auditFooter}>
          <button className={styles.exportButton}>Exporter les logs complets →</button>
        </div>
      </div>
    </div>
  )
}
