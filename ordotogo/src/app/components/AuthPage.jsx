import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react'
import styles from './AuthPage.module.css'

const roleConfig = {
  doctor: { label: "Médecin", icon: "🩺", path: "/app/doctor", desc: "Prescrivez et gérez vos patients" },
  pharmacist: { label: "Pharmacien", icon: "💊", path: "/app/pharmacist", desc: "Vérifiez et délivrez les ordonnances" },
  patient: { label: "Patient", icon: "👤", path: "/app/patient", desc: "Consultez vos ordonnances" },
}

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState("login")
  const [role, setRole] = useState("doctor")
  const [showPwd, setShowPwd] = useState(false)
  const [step, setStep] = useState(1)

  const cfg = roleConfig[role]

  function handleSubmit(e) {
    e.preventDefault()
    navigate(cfg.path)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          <ArrowLeft className={styles.iconSm} /> Retour à l'accueil
        </button>

        <div className={styles.card}>
          <div className={styles.banner}>
            <div className={styles.bannerTop}>
              <div className={styles.brandMark}>
                <Stethoscope className={styles.iconSm} />
              </div>
              <span className={styles.brandName}>OrdoTogo</span>
            </div>
            <h1 className={styles.title}>{mode === "login" ? "Connexion" : "Créer un compte"}</h1>
            <p className={styles.subtitle}>
              {mode === "login" ? "Accédez à votre espace sécurisé" : "Rejoignez la plateforme OrdoTogo"}
            </p>
          </div>

          <div className={styles.body}>
            {/* Mode toggle */}
            <div className={styles.modeToggle}>
              {["login", "register"].map(m => (
                <button key={m} onClick={() => { setMode(m); setStep(1) }} className={`${styles.modeButton} ${mode === m ? styles.modeButtonActive : ''}`}>
                  {m === "login" ? "Se connecter" : "S'inscrire"}
                </button>
              ))}
            </div>

            {/* Role selection */}
            <div className={styles.roleSection}>
              <label className={styles.roleLabel}>Je suis un(e)...</label>
              <div className={styles.roleGrid}>
                {Object.entries(roleConfig).map(([r, c]) => (
                  <button key={r} onClick={() => setRole(r)} className={`${styles.roleButton} ${role === r ? styles.roleButtonActive : ''}`}>
                    <span className={styles.roleEmoji}>{c.icon}</span>
                    <span className={`${styles.roleText} ${role === r ? styles.roleTextActive : ''}`}>{c.label}</span>
                  </button>
                ))}
              </div>
              <p className={styles.roleHint}>{cfg.desc}</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {mode === "register" && step === 1 && (
                <>
                  <div className={styles.nameGrid}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Prénom</label>
                      <input type="text" placeholder="Ama" className={styles.input} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Nom</label>
                      <input type="text" placeholder="Koffi" className={styles.input} />
                    </div>
                  </div>
                  {role === "doctor" && (
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Numéro d'ordre médical</label>
                      <input type="text" placeholder="TG-MED-2024-XXXXX" className={styles.input} />
                    </div>
                  )}
                  <button type="button" onClick={() => setStep(2)} className={styles.primaryButton}>
                    Continuer →
                  </button>
                </>
              )}

              {(mode === "login" || step === 2) && (
                <>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Email</label>
                    <input type="email" placeholder="votre@email.com" defaultValue={role === "doctor" ? "dr.koffi@demo.tg" : role === "pharmacist" ? "pharm.doe@demo.tg" : "patient@demo.tg"} className={styles.input} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Mot de passe</label>
                    <div className={styles.passwordWrap}>
                      <input type={showPwd ? "text" : "password"} placeholder="••••••••" defaultValue="demo1234" className={styles.input} />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className={styles.passwordToggle}>
                        {showPwd ? <EyeOff className={styles.iconSm} /> : <Eye className={styles.iconSm} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className={styles.primaryButton}>
                    <ShieldCheck className={styles.iconSm} />
                    {mode === "login" ? "Se connecter" : "Créer mon compte"}
                  </button>
                </>
              )}
            </form>

            <div className={styles.demoNote}>
              <p className={styles.demoNoteText}>
                <span className={styles.demoNoteLabel}>Demo :</span> cliquez directement sur "Se connecter" pour accéder à l'interface {cfg.label}.
              </p>
            </div>

            <div className={styles.quickAccess}>
              <p className={styles.quickAccessLabel}>Accès rapide démo</p>
              <div className={styles.quickButtons}>
                {Object.entries(roleConfig).map(([r, c]) => (
                  <button key={r} onClick={() => navigate(c.path)} className={styles.quickButton}>
                    <span>{c.icon}</span> {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
