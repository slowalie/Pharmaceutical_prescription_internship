import { useState } from 'react'
import { Pill, Calendar, CheckCircle, Clock, Phone, MessageSquare, Download, Share2, Eye, X, Shield, User, Stethoscope, AlertCircle } from 'lucide-react'
import styles from './PatientPortal.module.css'

const prescriptions = [
  {
    id: "ORD-2026-00847", doctor: "Dr. Ama Koffi", speciality: "Médecine Générale", hospital: "CHU Sylvanus Olympio",
    date: "14 avril 2026", expiry: "14 mai 2026", status: "active",
    medications: [
      { name: "Amoxicilline", dosage: "500mg", frequency: "3 fois/jour", duration: "7 jours", reminder: true },
      { name: "Paracétamol", dosage: "1g", frequency: "2 fois/jour", duration: "5 jours", reminder: false },
    ],
    notes: "Prendre pendant les repas. Revenir si fièvre persiste au-delà de 3 jours.",
  },
  {
    id: "ORD-2026-00830", doctor: "Dr. Kofi Mensah", speciality: "Cardiologie", hospital: "Clinique de l'Espoir",
    date: "28 mars 2026", expiry: "28 juin 2026", status: "chronic",
    medications: [
      { name: "Amlodipine", dosage: "5mg", frequency: "1 fois/jour", duration: "3 mois", reminder: true },
    ],
    notes: "Traitement chronique. Renouveler 7 jours avant la fin du stock.",
  },
  {
    id: "ORD-2026-00812", doctor: "Dr. Ama Koffi", speciality: "Médecine Générale", hospital: "CHU Sylvanus Olympio",
    date: "15 mars 2026", expiry: "15 avril 2026", status: "delivered",
    medications: [
      { name: "Azithromycine", dosage: "500mg", frequency: "1 fois/jour", duration: "3 jours", reminder: false },
      { name: "Ibuprofène", dosage: "400mg", frequency: "3 fois/jour", duration: "5 jours", reminder: false },
    ],
    notes: "",
  },
  {
    id: "ORD-2026-00789", doctor: "Dr. Sarah Luc", speciality: "ORL", hospital: "Clinique INAM",
    date: "02 février 2026", expiry: "02 mars 2026", status: "expired",
    medications: [
      { name: "Amoxicilline", dosage: "1g", frequency: "2 fois/jour", duration: "10 jours", reminder: false },
    ],
    notes: "",
  },
]

const statusConfig = {
  active: { label: "Active", badge: styles.statusActive, dot: styles.statusDotActive, border: styles.cardBorderActive },
  chronic: { label: "Chronique", badge: styles.statusChronic, dot: styles.statusDotChronic, border: styles.cardBorderChronic },
  delivered: { label: "Délivrée", badge: styles.statusDelivered, dot: styles.statusDotDelivered, border: styles.cardBorderDelivered },
  expired: { label: "Expirée", badge: styles.statusExpired, dot: styles.statusDotExpired, border: styles.cardBorderExpired },
}

const qrSizeClassMap = {
  72: styles.qrSize72,
  100: styles.qrSize100,
  180: styles.qrSize180,
}

function MockQRCode({ size = 100 }) {
  const cells = 13
  const qrSizeClass = qrSizeClassMap[size] || styles.qrSize100
  const pattern = Array.from({ length: cells * cells }, (_, i) => {
    const row = Math.floor(i / cells), col = i % cells
    if ((row < 5 && col < 5) || (row < 5 && col >= cells - 5) || (row >= cells - 5 && col < 5)) return true
    return Math.random() > 0.45
  })
  return (
    <div className={`${styles.qrFrame} ${qrSizeClass}`}>
      <div className={`${styles.qrGrid} ${styles.qrGrid13}`}>
        {pattern.map((filled, i) => <div key={i} className={filled ? styles.qrFilled : styles.qrEmpty} />)}
      </div>
    </div>
  )
}

export default function PatientPortal() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedRx, setSelectedRx] = useState(null)

  const filtered = prescriptions.filter(rx => {
    if (activeFilter === "all") return true
    if (activeFilter === "active") return rx.status === "active" || rx.status === "chronic"
    return rx.status === activeFilter
  })

  return (
    <div className={styles.page}>
      {/* Header card */}
      <div className={styles.heroCard}>
        <div className={styles.heroTop}>
          <div>
            <p className={styles.heroKicker}>Portail Patient</p>
            <h1 className={styles.heroName}>Kofi Adzoa</h1>
            <div className={styles.heroMeta}>
              <span className={styles.metaItem}><User className={styles.iconSm} /> 28 ans</span>
              <span className={styles.metaItem}><Phone className={styles.iconSm} /> +228 90 12 34 56</span>
            </div>
          </div>
          <div className={styles.patientId}>P-TG-001234</div>
        </div>
        <div className={styles.heroStats}>
          {[
            { label: "Ordonnances actives", value: "2" },
            { label: "Traitements chroniques", value: "1" },
            { label: "Total cette année", value: "4" },
          ].map(s => (
            <div key={s.label} className={styles.heroStat}>
              <p className={styles.heroStatValue}>{s.value}</p>
              <p className={styles.heroStatLabel}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alert */}
      <div className={styles.alertBanner}>
        <AlertCircle className={styles.iconMd} />
        <div>
          <p className={styles.alertTitle}>Rappel de traitement</p>
          <p className={styles.alertText}>Amoxicilline 500mg — à prendre ce soir avant 21h. Il vous reste 3 jours de traitement.</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterRow}>
        {[
          { key: "all", label: "Toutes" },
          { key: "active", label: "Actives" },
          { key: "delivered", label: "Délivrées" },
          { key: "expired", label: "Expirées" },
        ].map(f => (
          <button key={f.key} onClick={() => setActiveFilter(f.key)} className={`${styles.filterChip} ${activeFilter === f.key ? styles.filterChipActive : ''}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Prescriptions list */}
      <div className={styles.list}>
        {filtered.map(rx => {
          const sc = statusConfig[rx.status]
          return (
            <div key={rx.id} className={`${styles.rxCard} ${sc.border}`}>
              <div className={styles.rxBody}>
                <div className={styles.rxHeader}>
                  <div className={styles.rxHeaderText}>
                    <div className={styles.badgeRow}>
                      <span className={`${styles.statusBadge} ${sc.badge}`}>
                        <span className={sc.dot}></span>
                        {sc.label}
                      </span>
                      <span className={styles.rxId}>{rx.id}</span>
                    </div>
                    <div className={styles.doctorLine}>
                      <div className={styles.doctorAvatar}>
                        <Stethoscope className={styles.iconSm} />
                      </div>
                      <div>
                        <p className={styles.doctorName}>{rx.doctor}</p>
                        <p className={styles.doctorMeta}>{rx.speciality} · {rx.hospital}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.qrThumbWrap}><MockQRCode size={72} /></div>
                </div>

                <div className={styles.medList}>
                  {rx.medications.map(med => (
                    <div key={med.name} className={styles.medRow}>
                      <Pill className={styles.iconSm} />
                      <div className={styles.medCopy}>
                        <p className={styles.medName}>{med.name} {med.dosage}</p>
                        <p className={styles.medMeta}>{med.frequency} · {med.duration}</p>
                      </div>
                      {med.reminder && (
                        <span className={styles.reminderChip}>🔔 Rappel</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.dateRow}>
                  <span className={styles.dateItem}><Calendar className={styles.iconSm} /> {rx.date}</span>
                  <span className={styles.dateItem}>
                    <Clock className={styles.iconSm} />
                    {rx.status === "expired" ? `Expirée le ${rx.expiry}` : `Expire le ${rx.expiry}`}
                  </span>
                </div>

                {rx.notes && (
                  <div className={styles.notesBox}>
                    <p className={styles.notesText}>📋 {rx.notes}</p>
                  </div>
                )}

                <div className={styles.actionsRow}>
                  <button onClick={() => setSelectedRx(rx)} className={styles.actionButtonPrimary}>
                    <Eye className={styles.iconSm} /> Voir le QR Code
                  </button>
                  <button className={styles.actionButtonSuccess}>
                    <MessageSquare className={styles.iconSm} /> WhatsApp
                  </button>
                  <button className={styles.actionButtonNeutral}>
                    <Download className={styles.iconSm} /> PDF
                  </button>
                  <button className={styles.shareButton}>
                    <Share2 className={styles.iconSm} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* QR Modal */}
      {selectedRx && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>QR Code de l'ordonnance</h3>
              <button onClick={() => setSelectedRx(null)} className={styles.closeButton}>
                <X className={styles.iconMd} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalQrWrap}>
                <MockQRCode size={180} />
              </div>
              <div className={styles.modalCopy}>
                <p className={styles.modalId}>{selectedRx.id}</p>
                <p className={styles.modalDoctor}>{selectedRx.doctor}</p>
              </div>
              <div className={styles.modalShield}>
                <Shield className={styles.iconSm} /> Ordonnance authentique et sécurisée
              </div>
              <p className={styles.modalHint}>Présentez ce code à votre pharmacien pour récupérer vos médicaments.</p>
              <div className={styles.modalActions}>
                <button className={styles.modalPrimaryButton}>
                  <MessageSquare className={styles.iconSm} /> WhatsApp
                </button>
                <button className={styles.modalSecondaryButton}>
                  <Download className={styles.iconSm} /> Télécharger
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
