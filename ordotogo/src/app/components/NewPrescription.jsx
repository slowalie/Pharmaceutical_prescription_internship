import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Plus, Trash2, ChevronRight, CheckCircle, QrCode, Send, Printer, MessageSquare, User, Pill, FileSignature, Share2, AlertCircle, Phone, Calendar } from 'lucide-react'
import styles from './NewPrescription.module.css'

const PATIENTS = [
  { id: 'P001', name: 'Kofi Mensah', age: 34, phone: '+228 92 34 56 78', dob: '12/03/1990', allergies: ['Pénicilline'], lastVisit: '01/04/2026' },
  { id: 'P002', name: 'Abla Dossou', age: 28, phone: '+228 90 12 34 56', dob: '15/07/1996', allergies: [], lastVisit: '28/03/2026' },
  { id: 'P003', name: 'Kwame Agbo', age: 67, phone: '+228 93 45 67 89', dob: '22/11/1957', allergies: ['Aspirine', 'Ibuprofène'], lastVisit: '10/04/2026' },
  { id: 'P004', name: 'Akosua Tete', age: 45, phone: '+228 91 23 45 67', dob: '05/06/1979', allergies: [], lastVisit: '05/04/2026' },
]

const MEDICATIONS_DB = [
  { name: 'Amoxicilline', dosages: ['250mg', '500mg', '1g'], form: 'Gélule' },
  { name: 'Paracétamol', dosages: ['500mg', '1g'], form: 'Comprimé' },
  { name: 'Ibuprofène', dosages: ['200mg', '400mg', '600mg'], form: 'Comprimé' },
  { name: 'Metformine', dosages: ['500mg', '850mg', '1g'], form: 'Comprimé' },
  { name: 'Amlodipine', dosages: ['5mg', '10mg'], form: 'Comprimé' },
  { name: 'Oméprazole', dosages: ['20mg', '40mg'], form: 'Gélule' },
  { name: 'Azithromycine', dosages: ['250mg', '500mg'], form: 'Comprimé' },
  { name: 'Ciprofloxacine', dosages: ['250mg', '500mg', '750mg'], form: 'Comprimé' },
]

const FREQUENCIES = ['1 fois/jour', '2 fois/jour', '3 fois/jour', 'Matin et soir', 'Selon besoins']
const DURATIONS = ['3 jours', '5 jours', '7 jours', '10 jours', '14 jours', '1 mois', '3 mois', 'Chronique']

const qrSizeClassMap = {
  120: styles.qrSize120,
  140: styles.qrSize140,
}

function MockQRCode({ size = 120 }) {
  const cells = 15
  const qrSizeClass = qrSizeClassMap[size] || styles.qrSize120
  const pattern = Array.from({ length: cells * cells }, (_, i) => {
    const row = Math.floor(i / cells)
    const col = i % cells
    if ((row < 5 && col < 5) || (row < 5 && col >= cells - 5) || (row >= cells - 5 && col < 5)) return true
    return Math.random() > 0.5
  })

  return (
    <div className={`${styles.qrFrame} ${qrSizeClass}`}>
      <div className={`${styles.qrGrid} ${styles.qrGrid15}`}>
        {pattern.map((filled, i) => (
          <div key={i} className={filled ? styles.qrFilled : styles.qrEmpty} />
        ))}
      </div>
    </div>
  )
}

export default function NewPrescription() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patientSearch, setPatientSearch] = useState('')
  const [medications, setMedications] = useState([])
  const [medSearch, setMedSearch] = useState('')
  const [showMedDrop, setShowMedDrop] = useState(false)
  const [notes, setNotes] = useState('')
  const [signed, setSigned] = useState(false)
  const [generated, setGenerated] = useState(false)

  const filteredPatients = PATIENTS.filter((patient) => patient.name.toLowerCase().includes(patientSearch.toLowerCase()))
  const filteredMeds = MEDICATIONS_DB.filter((medication) => medication.name.toLowerCase().includes(medSearch.toLowerCase()) && medSearch.length > 1)

  function addMedication(medication) {
    setMedications((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: medication.name,
        dosage: medication.dosages[0],
        frequency: '2 fois/jour',
        duration: '7 jours',
        instructions: '',
      },
    ])
    setMedSearch('')
    setShowMedDrop(false)
  }

  function updateMed(id, field, value) {
    setMedications((prev) => prev.map((medication) => (medication.id === id ? { ...medication, [field]: value } : medication)))
  }

  function removeMed(id) {
    setMedications((prev) => prev.filter((medication) => medication.id !== id))
  }

  const steps = [
    { n: 1, label: 'Patient' },
    { n: 2, label: 'Médicaments' },
    { n: 3, label: 'Signature & QR' },
  ]

  const stepStateClass = (stepNumber) => {
    if (step > stepNumber) return styles.stepCompleted
    if (step === stepNumber) return styles.stepActive
    return styles.stepPending
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button
          onClick={() => (step > 1 ? setStep((current) => current - 1) : navigate('/app/doctor'))}
          className={styles.backButton}
        >
          <ArrowLeft className={styles.iconMd} />
        </button>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Nouvelle ordonnance</h1>
          <p className={styles.subtitle}>14 avril 2026 · Dr. Ama Koffi</p>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.stepsBar}>
          {steps.map((s, index) => (
            <div key={s.n} className={styles.stepItem}>
              <div className={styles.stepColumn}>
                <div className={`${styles.stepBubble} ${stepStateClass(s.n)}`}>
                  {step > s.n ? <CheckCircle className={styles.iconSm} /> : s.n}
                </div>
                <span className={`${styles.stepLabel} ${step >= s.n ? styles.stepLabelActive : styles.stepLabelPending}`}>{s.label}</span>
              </div>
              {index < steps.length - 1 && <div className={`${styles.stepConnector} ${step > s.n ? styles.stepConnectorDone : styles.stepConnectorPending}`} />}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className={styles.panel}>
          <h2 className={styles.sectionTitle}>
            <User className={styles.iconSm} /> Sélectionner le patient
          </h2>
          <div className={styles.searchWrap}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par nom ou ID..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.patientList}>
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`${styles.patientCard} ${selectedPatient?.id === patient.id ? styles.patientCardSelected : styles.patientCardIdle}`}
              >
                <div className={styles.patientCardRow}>
                  <div className={styles.avatar}>{patient.name.charAt(0)}</div>
                  <div className={styles.patientCardBody}>
                    <div className={styles.patientTopLine}>
                      <p className={styles.patientName}>{patient.name}</p>
                      <span className={styles.patientId}>{patient.id}</span>
                    </div>
                    <div className={styles.patientMetaRow}>
                      <span className={styles.patientMeta}>
                        <Calendar className={styles.iconTiny} /> {patient.dob} ({patient.age} ans)
                      </span>
                      <span className={styles.patientMeta}>
                        <Phone className={styles.iconTiny} /> {patient.phone}
                      </span>
                    </div>
                    {patient.allergies.length > 0 && (
                      <div className={styles.allergyLine}>
                        <AlertCircle className={styles.iconTiny} /> Allergie : {patient.allergies.join(', ')}
                      </div>
                    )}
                  </div>
                  {selectedPatient?.id === patient.id && <CheckCircle className={styles.iconMd} />}
                </div>
              </button>
            ))}
          </div>

          <div className={styles.actionsRow}>
            <button className={styles.linkButton}>
              <Plus className={styles.iconSm} /> Nouveau patient
            </button>
            <button onClick={() => selectedPatient && setStep(2)} disabled={!selectedPatient} className={styles.primaryButton}>
              Continuer <ChevronRight className={styles.iconSm} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.stack}>
          {selectedPatient && (
            <div className={styles.selectedPatientBanner}>
              <div className={styles.bannerAvatar}>{selectedPatient.name.charAt(0)}</div>
              <div className={styles.bannerCopy}>
                <p className={styles.bannerName}>{selectedPatient.name}</p>
                <p className={styles.bannerMeta}>{selectedPatient.age} ans · {selectedPatient.phone}</p>
              </div>
              {selectedPatient.allergies.length > 0 && (
                <div className={styles.bannerAllergy}>
                  <AlertCircle className={styles.iconTiny} /> Allergie : {selectedPatient.allergies.join(', ')}
                </div>
              )}
            </div>
          )}

          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>
              <Pill className={styles.iconSm} /> Médicaments prescrits
            </h2>
            <div className={styles.searchWrap}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Rechercher un médicament..."
                value={medSearch}
                onChange={(e) => {
                  setMedSearch(e.target.value)
                  setShowMedDrop(true)
                }}
                onFocus={() => setShowMedDrop(true)}
                className={styles.searchInput}
              />
              {showMedDrop && filteredMeds.length > 0 && (
                <div className={styles.dropdown}>
                  {filteredMeds.map((medication) => (
                    <button key={medication.name} onClick={() => addMedication(medication)} className={styles.dropdownItem}>
                      <div className={styles.dropdownLabel}>
                        <Pill className={styles.iconTiny} />
                        <span className={styles.dropdownName}>{medication.name}</span>
                        <span className={styles.dropdownForm}>{medication.form}</span>
                      </div>
                      <span className={styles.dropdownDosage}>{medication.dosages.join(', ')}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {medications.length === 0 ? (
              <div className={styles.emptyMedications}>
                <Pill className={styles.emptyIcon} />
                <p className={styles.emptyText}>Recherchez et ajoutez des médicaments</p>
              </div>
            ) : (
              <div className={styles.medicationList}>
                {medications.map((medication, index) => (
                  <div key={medication.id} className={styles.medicationCard}>
                    <div className={styles.medicationHeader}>
                      <div className={styles.medicationTitleRow}>
                        <span className={styles.medicationIndex}>{index + 1}</span>
                        <span className={styles.medicationName}>{medication.name}</span>
                      </div>
                      <button onClick={() => removeMed(medication.id)} className={styles.removeButton}>
                        <Trash2 className={styles.iconSm} />
                      </button>
                    </div>

                    <div className={styles.formGrid}>
                      {['dosage', 'frequency', 'duration'].map((field) => (
                        <div key={field}>
                          <label className={styles.fieldLabel}>{field === 'dosage' ? 'Dosage' : field === 'frequency' ? 'Fréquence' : 'Durée'}</label>
                          <select value={medication[field]} onChange={(e) => updateMed(medication.id, field, e.target.value)} className={styles.selectField}>
                            {field === 'dosage' && MEDICATIONS_DB.find((item) => item.name === medication.name)?.dosages.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                            {field === 'frequency' && FREQUENCIES.map((option) => <option key={option}>{option}</option>)}
                            {field === 'duration' && DURATIONS.map((option) => <option key={option}>{option}</option>)}
                          </select>
                        </div>
                      ))}
                      <div>
                        <label className={styles.fieldLabel}>Instructions</label>
                        <input
                          type="text"
                          placeholder="À jeun..."
                          value={medication.instructions}
                          onChange={(e) => updateMed(medication.id, 'instructions', e.target.value)}
                          className={styles.textField}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.notesBlock}>
              <label className={styles.notesLabel}>Notes cliniques</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Diagnostic, instructions particulières..."
                rows={3}
                className={styles.textArea}
              />
            </div>

            <div className={styles.actionsRow}>
              <button onClick={() => setStep(1)} className={styles.backLink}>
                <ArrowLeft className={styles.iconSm} /> Retour
              </button>
              <button onClick={() => medications.length > 0 && setStep(3)} disabled={medications.length === 0} className={styles.primaryButton}>
                Passer à la signature <ChevronRight className={styles.iconSm} />
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.stack}>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>
              <FileSignature className={styles.iconSm} /> Récapitulatif & Signature
            </h2>
            <div className={styles.summaryCard}>
              <div className={styles.summaryTop}>
                <div>
                  <p className={styles.summaryLabel}>Numéro d'ordonnance</p>
                  <p className={styles.summaryValueMono}>ORD-2026-00848</p>
                </div>
                <div className={styles.summaryRight}>
                  <p className={styles.summaryLabel}>Date</p>
                  <p className={styles.summaryValue}>14 avril 2026</p>
                </div>
              </div>
              <div className={styles.summarySection}>
                <p className={styles.summaryLabel}>Patient</p>
                <p className={styles.summaryPatient}>{selectedPatient?.name} · {selectedPatient?.age} ans</p>
              </div>
              <div className={styles.summarySection}>
                <p className={styles.summaryLabel}>Médicaments ({medications.length})</p>
                <div className={styles.summaryMedList}>
                  {medications.map((medication) => (
                    <div key={medication.id} className={styles.summaryMedRow}>
                      <Pill className={styles.iconTiny} />
                      <span className={styles.summaryMedName}>{medication.name} {medication.dosage}</span>
                      <span className={styles.summaryMedMeta}>· {medication.frequency} · {medication.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!signed ? (
              <div className={styles.signaturePrompt}>
                <FileSignature className={styles.signatureIcon} />
                <p className={styles.signatureTitle}>Signature électronique requise</p>
                <p className={styles.signatureText}>En signant, vous certifiez l'exactitude de la prescription.</p>
                <button onClick={() => setSigned(true)} className={styles.primaryButton}>
                  Signer électroniquement
                </button>
              </div>
            ) : (
              <div className={styles.signatureSuccess}>
                <CheckCircle className={styles.signatureSuccessIcon} />
                <div>
                  <p className={styles.signatureSuccessTitle}>Signature valide</p>
                  <p className={styles.signatureSuccessText}>Dr. Ama Koffi · Certificat TG-MED-2024-00123 · 14/04/2026</p>
                </div>
              </div>
            )}
          </div>

          {signed && (
            <div className={styles.panel}>
              <h3 className={styles.sectionTitle}>
                <QrCode className={styles.iconSm} /> Génération du QR Code
              </h3>
              {!generated ? (
                <div className={styles.centeredBlock}>
                  <button onClick={() => setGenerated(true)} className={styles.primaryButtonWide}>
                    <QrCode className={styles.iconMd} /> Générer le QR Code unique
                  </button>
                </div>
              ) : (
                <div className={styles.qrLayout}>
                  <div className={styles.qrPreview}>
                    <MockQRCode size={140} />
                    <p className={styles.qrCaption}>ORD-2026-00848</p>
                  </div>
                  <div className={styles.qrActionsColumn}>
                    <div className={styles.qrSuccessBox}>
                      <p className={styles.qrSuccessTitle}>QR Code généré avec succès</p>
                      <p className={styles.qrSuccessText}>Ce code est unique, infalsifiable et à usage unique. Il expirera dans 30 jours.</p>
                    </div>
                    <p className={styles.sendTitle}>Envoyer au patient :</p>
                    <div className={styles.shareButtons}>
                      <button className={styles.whatsappButton}>
                        <MessageSquare className={styles.iconSm} /> WhatsApp
                      </button>
                      <button className={styles.smsButton}>
                        <Send className={styles.iconSm} /> SMS
                      </button>
                      <button className={styles.printButton}>
                        <Printer className={styles.iconSm} /> Imprimer
                      </button>
                      <button className={styles.shareButton}>
                        <Share2 className={styles.iconSm} /> Partager
                      </button>
                    </div>
                    <button onClick={() => navigate('/app/doctor')} className={styles.primaryButtonWide}>
                      <CheckCircle className={styles.iconSm} /> Finaliser & Retour au tableau de bord
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
