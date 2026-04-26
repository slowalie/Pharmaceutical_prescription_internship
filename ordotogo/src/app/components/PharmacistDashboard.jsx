import { useState } from 'react'
import { QrCode, CheckCircle, XCircle, AlertTriangle, Clock, Search, History, Shield, User, Pill, Calendar, TrendingUp, Package, Camera } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './PharmacistDashboard.module.css'

const weekData = [
  { day: "Lun", dispensed: 22 }, { day: "Mar", dispensed: 18 }, { day: "Mer", dispensed: 31 },
  { day: "Jeu", dispensed: 25 }, { day: "Ven", dispensed: 28 }, { day: "Sam", dispensed: 14 }, { day: "Dim", dispensed: 8 },
]

const recentDispensations = [
  { id: "ORD-2026-00845", patient: "Kwame Agbo", doctor: "Dr. Ama Koffi", meds: ["Amlodipine 5mg"], time: "15:47", status: "delivered" },
  { id: "ORD-2026-00841", patient: "Ablavi Sassou", doctor: "Dr. Kofi Mensah", meds: ["Metformine 850mg", "Lisinopril"], time: "14:22", status: "delivered" },
  { id: "ORD-2026-00838", patient: "Yao Agbenoxevi", doctor: "Dr. Sarah Luc", meds: ["Amoxicilline 500mg"], time: "13:05", status: "delivered" },
  { id: "ORD-2026-00835", patient: "Kafui Ganyo", doctor: "Dr. Ama Koffi", meds: ["Paracétamol 1g", "Ibuprofène 400mg"], time: "11:48", status: "rejected" },
]

const MOCK_PRESCRIPTION = {
  id: "ORD-2026-00847",
  patient: { name: "Kofi Mensah", age: 34, phone: "+228 92 34 56 78", allergies: ["Pénicilline"] },
  doctor: { name: "Dr. Ama Koffi", speciality: "Médecine Générale", license: "TG-MED-2024-00123", hospital: "CHU Sylvanus Olympio" },
  issuedAt: "14 avril 2026, 14:32",
  expiresAt: "14 mai 2026",
  medications: [
    { name: "Amoxicilline", dosage: "500mg", frequency: "3 fois/jour", duration: "7 jours", qty: 21 },
    { name: "Paracétamol", dosage: "1g", frequency: "2 fois/jour", duration: "5 jours", qty: 10 },
  ],
  notes: "À prendre pendant les repas. Consulter si fièvre persiste.",
  status: "active",
}

const chartTooltipStyle = { borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }

const qrSizeClassMap = {
  50: styles.qrSize50,
  70: styles.qrSize70,
}

function MockQR({ size = 70 }) {
  const cells = 11
  const qrSizeClass = qrSizeClassMap[size] || styles.qrSize70
  const pattern = Array.from({ length: cells * cells }, (_, i) => {
    const row = Math.floor(i / cells), col = i % cells
    if ((row < 4 && col < 4) || (row < 4 && col >= cells - 4) || (row >= cells - 4 && col < 4)) return true
    return Math.random() > 0.5
  })
  return (
    <div className={`${styles.qrFrame} ${qrSizeClass}`}>
      <div className={`${styles.qrGrid} ${styles.qrGrid11}`}>
        {pattern.map((filled, i) => <div key={i} className={filled ? styles.qrFilled : styles.qrEmpty} />)}
      </div>
    </div>
  )
}

export default function PharmacistDashboard() {
  const [scanState, setScanState] = useState("idle")
  const [manualId, setManualId] = useState("")
  const [activeTab, setActiveTab] = useState("scanner")

  function startScan() {
    setScanState("scanning")
    setTimeout(() => setScanState("found"), 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Interface Pharmacien</h1>
          <p className={styles.subtitle}>Pharmacie du Bénin · Jean Mensah · 14 avril 2026</p>
        </div>
        <div className={styles.securityBadge}>
          <Shield className={styles.iconSm} /> Système sécurisé
        </div>
      </div>

      <div className={styles.statsGrid}>
        {[
          { label: "Délivrances aujourd'hui", value: "28", icon: CheckCircle, theme: "emerald" },
          { label: "En attente validation", value: "3", icon: Clock, theme: "amber" },
          { label: "Rejets ce mois", value: "2", icon: XCircle, theme: "red" },
          { label: "Stock critique", value: "5", icon: Package, theme: "orange" },
        ].map(stat => (
          <div key={stat.label} className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles[`statIcon${stat.theme[0].toUpperCase()}${stat.theme.slice(1)}`]}`}>
              <stat.icon className={`${styles.iconSm} ${styles[`statIconFg${stat.theme[0].toUpperCase()}${stat.theme.slice(1)}`]}`} />
            </div>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.tabBar}>
        {[{ key: "scanner", label: "Scanner QR Code", icon: QrCode }, { key: "history", label: "Historique", icon: History }].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabButtonActive : ''}`}>
            <tab.icon className={styles.iconSm} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "scanner" && (
        <div className={styles.scannerGrid}>
          <div className={styles.scannerPanel}>
            <h2 className={styles.panelTitle}><QrCode className={styles.iconSm} /> Vérification d'ordonnance</h2>

            {scanState === "idle" && (
              <div className={styles.scanIdle}>
                <div onClick={startScan} className={styles.scanCard}>
                  <div className={styles.cameraBadge}>
                    <Camera className={styles.iconLg} />
                  </div>
                  <p className={styles.scanTitle}>Scanner le QR Code</p>
                  <p className={styles.scanHint}>Cliquez pour simuler le scan</p>
                </div>
                <div className={styles.dividerRow}>
                  <div className={styles.dividerLine}></div>
                  <span className={styles.dividerText}>ou entrer manuellement</span>
                  <div className={styles.dividerLine}></div>
                </div>
                <div className={styles.manualRow}>
                  <input type="text" placeholder="ORD-2026-XXXXX" value={manualId} onChange={e => setManualId(e.target.value)} className={styles.manualInput} />
                  <button onClick={() => manualId && setScanState("found")} className={styles.searchButton}>
                    <Search className={styles.iconSm} />
                  </button>
                </div>
              </div>
            )}

            {scanState === "scanning" && (
              <div className={styles.scanLoading}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingTitle}>Lecture du QR Code en cours...</p>
                <p className={styles.loadingHint}>Vérification de l'authenticité</p>
              </div>
            )}

            {scanState === "confirmed" && (
              <div className={styles.confirmedState}>
                <div className={styles.stateBadgeSuccess}>
                  <CheckCircle className={styles.iconLg} />
                </div>
                <p className={styles.confirmedTitle}>Ordonnance délivrée !</p>
                <p className={styles.confirmedText}>L'ordonnance a été marquée comme délivrée.</p>
                <div className={styles.confirmedNote}>
                  <p className={styles.confirmedNoteTitle}>Référence : ORD-2026-00847</p>
                  <p>Délivrée le 14/04/2026 à 15:47:22</p>
                </div>
                <button onClick={() => { setScanState("idle"); setManualId("") }} className={styles.secondaryButton}>
                  Scanner une autre ordonnance
                </button>
              </div>
            )}

            {scanState === "rejected" && (
              <div className={styles.rejectedState}>
                <div className={styles.stateBadgeDanger}>
                  <XCircle className={styles.iconLg} />
                </div>
                <p className={styles.rejectedTitle}>Ordonnance rejetée</p>
                <button onClick={() => { setScanState("idle"); setManualId("") }} className={styles.rejectedButton}>Retour au scanner</button>
              </div>
            )}
          </div>

          <div className={styles.lgColSpan3}>
            {scanState === "found" && (
              <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                  <div className={styles.resultHeaderBadge}>
                    <CheckCircle className={styles.iconSm} />
                  </div>
                  <div>
                    <p className={styles.resultTitle}>Ordonnance authentique ✓</p>
                    <p className={styles.resultHint}>Signature électronique vérifiée · Non encore délivrée</p>
                  </div>
                  <MockQR size={50} />
                </div>
                <div className={styles.resultBody}>
                  <div className={styles.referenceRow}>
                    <span className={styles.referenceLabel}>Référence</span>
                    <span className={styles.referenceValue}>{MOCK_PRESCRIPTION.id}</span>
                  </div>
                  <div className={styles.patientCard}>
                    <div className={styles.patientHeader}><User className={styles.iconSm} /><span>Patient</span></div>
                    <div className={styles.patientGrid}>
                      <div><p className={styles.metaLabel}>Nom</p><p className={styles.metaValue}>{MOCK_PRESCRIPTION.patient.name}</p></div>
                      <div><p className={styles.metaLabel}>Âge</p><p className={styles.metaValue}>{MOCK_PRESCRIPTION.patient.age} ans</p></div>
                      <div><p className={styles.metaLabel}>Téléphone</p><p className={styles.metaValue}>{MOCK_PRESCRIPTION.patient.phone}</p></div>
                      <div><p className={styles.metaLabel}>Allergies</p>
                        {MOCK_PRESCRIPTION.patient.allergies.length > 0 ? (
                          <p className={styles.allergyText}><AlertTriangle className={styles.iconTiny} /> {MOCK_PRESCRIPTION.patient.allergies.join(", ")}</p>
                        ) : <p className={styles.emptyValue}>Aucune</p>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.sectionHeader}><Pill className={styles.iconSm} /><span>Médicaments prescrits</span></div>
                    <div className={styles.medicationList}>
                      {MOCK_PRESCRIPTION.medications.map(med => (
                        <div key={med.name} className={styles.medicationRow}>
                          <div>
                            <p className={styles.medicationName}>{med.name} {med.dosage}</p>
                            <p className={styles.medicationMeta}>{med.frequency} · {med.duration}</p>
                          </div>
                          <div className={styles.quantityBox}>
                            <p className={styles.quantityValue}>{med.qty}</p>
                            <p className={styles.quantityLabel}>unités</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.resultActions}>
                    <button onClick={() => setScanState("confirmed")} className={styles.confirmButton}>
                      <CheckCircle className={styles.iconSm} /> Confirmer la délivrance
                    </button>
                    <button onClick={() => setScanState("rejected")} className={styles.rejectButton}>
                      <XCircle className={styles.iconSm} /> Rejeter
                    </button>
                  </div>
                </div>
              </div>
            )}
            {(scanState === "idle" || scanState === "scanning") && (
              <div className={styles.chartCard}>
                <h3 className={styles.panelTitle}><TrendingUp className={styles.iconSm} /> Délivrances cette semaine</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weekData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Bar dataKey="dispensed" fill="#0d9488" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className={styles.historyCard}>
          <div className={styles.historyToolbar}>
            <h3 className={styles.panelTitle}>Historique des dispensations</h3>
            <div className={styles.searchWrap}>
              <Search className={styles.searchIcon} />
              <input type="text" placeholder="Rechercher..." className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.historyList}>
            {recentDispensations.map(d => (
              <div key={d.id} className={styles.historyRow}>
                <div className={`${styles.historyIcon} ${d.status === "delivered" ? styles.historyIconDelivered : styles.historyIconRejected}`}>
                  {d.status === "delivered" ? <CheckCircle className={styles.iconSm} /> : <XCircle className={styles.iconSm} />}
                </div>
                <div className={styles.historyCopy}>
                  <div className={styles.historyTopLine}>
                    <span className={styles.historyId}>{d.id}</span>
                    <span className={styles.historyTime}><Clock className={styles.iconTiny} /> {d.time}</span>
                  </div>
                  <p className={styles.historyPatient}>{d.patient}</p>
                  <p className={styles.historyDoctor}>{d.doctor}</p>
                  <div className={styles.historyChips}>
                    {d.meds.map(m => <span key={m} className={styles.historyChip}>{m}</span>)}
                  </div>
                </div>
                <div className={`${styles.historyStatus} ${d.status === "delivered" ? styles.historyStatusDelivered : styles.historyStatusRejected}`}>
                  {d.status === "delivered" ? "Délivrée" : "Rejetée"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
