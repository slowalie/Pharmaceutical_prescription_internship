import { useNavigate } from 'react-router-dom'
import {
  Stethoscope, ShieldCheck, QrCode, Smartphone,
  ArrowRight, CheckCircle, Users, FileText,
  TrendingUp, Lock, Globe, Clock, ChevronRight,
  AlertTriangle, Pill
} from 'lucide-react'
import styles from './LandingPage.module.css'

const doctorImg = "https://images.unsplash.com/photo-1520569495996-b5e1219cb625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
const pharmacyImg = "https://images.unsplash.com/photo-1654939389527-3efa0a2dad54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
const mobileImg = "https://images.unsplash.com/photo-1697383904932-94304530a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"

const userTheme = {
  emerald: {
    overlay: styles.overlayEmerald,
    role: styles.roleEmerald,
    check: styles.checkEmerald,
    button: styles.buttonEmerald,
  },
  teal: {
    overlay: styles.overlayTeal,
    role: styles.roleTeal,
    check: styles.checkTeal,
    button: styles.buttonTeal,
  },
  blue: {
    overlay: styles.overlayBlue,
    role: styles.roleBlue,
    check: styles.checkBlue,
    button: styles.buttonBlue,
  },
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-800 font-semibold text-lg">OrdoTogo</span>
            <span className="hidden sm:inline-block ml-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">BETA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#fonctionnalites" className="hover:text-emerald-600 transition-colors">Fonctionnalités</a>
            <a href="#utilisateurs" className="hover:text-emerald-600 transition-colors">Utilisateurs</a>
            <a href="#securite" className="hover:text-emerald-600 transition-colors">Sécurité</a>
            <a href="#planning" className="hover:text-emerald-600 transition-colors">Planning</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/auth')} className="text-sm text-slate-600 hover:text-emerald-600 transition-colors hidden sm:block">
              Connexion
            </button>
            <button onClick={() => navigate('/auth')} className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5">
              Démarrer <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={`bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white pt-20 pb-28 px-4 relative overflow-hidden ${styles.heroSection}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-800/60 text-emerald-300 text-xs px-3 py-1.5 rounded-full mb-6 border border-emerald-700/50">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Plateforme de santé numérique · Togo
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                La prescription médicale
                <span className="text-emerald-400"> digitalisée</span>
                <br />au Togo
              </h1>
              <p className="text-emerald-100 text-lg leading-relaxed mb-8 max-w-xl">
                Finissez avec les ordonnances manuscrites illisibles, les faux médicaments et les fraudes.
                OrdoTogo sécurise le parcours patient de bout en bout grâce au QR Code et à la signature électronique.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <button onClick={() => navigate('/auth')} className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/50">
                  Accéder à la démo <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-emerald-600 text-emerald-200 hover:bg-emerald-800/40 px-6 py-3 rounded-xl font-medium transition-all">
                  Voir la vidéo
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-emerald-800/60">
                {[
                  { val: "3x", label: "Types d'utilisateurs" },
                  { val: "100%", label: "Traçabilité" },
                  { val: "0", label: "Fraude possible" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-emerald-400">{s.val}</div>
                    <div className="text-emerald-300 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Mock UI Preview */}
            <div className="hidden lg:block relative">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-white/10 rounded-md h-5 mx-2"></div>
                </div>
                <div className="bg-white rounded-xl p-4 mb-3 shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-slate-500 text-xs">Ordonnance #ORD-2024-00847</p>
                      <p className="text-slate-800 font-semibold text-sm">Kofi Mensah, 34 ans</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">Active</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    {["Amoxicilline 500mg · 3x/jour · 7j", "Paracétamol 1g · 2x/jour · 5j"].map(m => (
                      <div key={m} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                        <Pill className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-slate-700 text-xs">{m}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">Dr. Ama Koffi · 14/04/2026</div>
                    <div className="w-12 h-12 bg-slate-100 rounded-lg grid grid-cols-4 gap-0.5 p-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={`rounded-[1px] ${Math.random() > 0.4 ? "bg-slate-800" : "bg-transparent"}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-emerald-500 rounded-lg px-3 py-2 text-white text-xs font-medium text-center">✓ Signer & Envoyer</div>
                  <div className="bg-white/20 rounded-lg px-3 py-2 text-white text-xs text-center">Aperçu PDF</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-slate-800 text-xs font-semibold">Ordonnance vérifiée</p>
                  <p className="text-slate-400 text-xs">Signature valide · anti-fraude</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-sm px-3 py-1.5 rounded-full mb-4">
              <AlertTriangle className="w-4 h-4" /> Le problème actuel
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Le système actuel est défaillant</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">En Afrique subsaharienne, les ordonnances manuscrites engendrent des risques graves pour les patients.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📝", title: "Ordonnances illisibles", desc: "Les prescriptions manuscrites sont souvent illisibles, entraînant des erreurs de délivrance et des surdosages." },
              { icon: "💊", title: "Faux médicaments", desc: "La falsification des ordonnances papier facilite la prolifération de médicaments contrefaits dangereux." },
              { icon: "🏥", title: "Fraudes aux assurances", desc: "La réutilisation d'ordonnances périmées ou la falsification coûtent des milliards aux systèmes de santé." },
            ].map(p => (
              <div key={p.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Users Section */}
      <section id="utilisateurs" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Une solution pour chaque acteur</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Chaque professionnel de santé dispose d'une interface adaptée à son métier.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                img: doctorImg, role: "Rôle 1", title: "Le Médecin", color: "emerald", path: "/app/doctor",
                features: ["Rédaction rapide de l'ordonnance numérique", "Signature électronique certifiée", "Gestion des patients et historique", "Tableau de bord et statistiques"]
              },
              {
                img: pharmacyImg, role: "Rôle 2", title: "Le Pharmacien", color: "teal", path: "/app/pharmacist",
                features: ["Scanner de QR Code intégré", "Vérification instantanée d'authenticité", "Validation et marquage «délivrée»", "Historique des dispensations"]
              },
              {
                img: mobileImg, role: "Rôle 3", title: "Le Patient", color: "blue", path: "/app/patient",
                features: ["Réception par SMS ou WhatsApp", "Consultation de l'historique médical", "Affichage du QR Code personnel", "Accès sans compte obligatoire"]
              },
            ].map(u => (
              <div key={u.title} className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={u.img} alt={u.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${styles.userCardOverlay} ${userTheme[u.color].overlay}`}></div>
                  <div className="absolute bottom-3 left-4 text-white">
                    <p className={`text-xs font-medium ${userTheme[u.color].role}`}>{u.role}</p>
                    <p className="font-bold text-lg">{u.title}</p>
                  </div>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
                    {u.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${userTheme[u.color].check}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate(u.path)} className={`mt-5 w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${userTheme[u.color].button}`}>
                    Voir l'interface <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fonctionnalites" className="bg-emerald-950 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Fonctionnalités clés</h2>
            <p className="text-emerald-300 max-w-xl mx-auto">Un cycle complet de la prescription à la délivrance, 100% numérique et sécurisé.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Prescription digitale", desc: "Formulaire guidé avec base de données médicaments intégrée." },
              { icon: QrCode, title: "QR Code unique", desc: "Chaque ordonnance génère un code infalsifiable à usage unique." },
              { icon: ShieldCheck, title: "Signature électronique", desc: "Signature cryptographique certifiée du médecin prescripteur." },
              { icon: Smartphone, title: "Mode hors-ligne", desc: "Interface légère fonctionnant même avec une connexion limitée." },
              { icon: Users, title: "Gestion des comptes", desc: "Inscription et vérification d'identité des professionnels de santé." },
              { icon: TrendingUp, title: "Tableaux de bord", desc: "Statistiques en temps réel pour les professionnels et l'administration." },
              { icon: Lock, title: "Chiffrement end-to-end", desc: "Données médicales chiffrées et conformes aux lois africaines." },
              { icon: Globe, title: "Multi-canaux", desc: "SMS, WhatsApp, web et app mobile pour toucher tous les patients." },
            ].map(f => (
              <div key={f.title} className="bg-emerald-900/40 border border-emerald-800/50 rounded-xl p-5 hover:bg-emerald-800/40 transition-colors">
                <div className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-emerald-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="securite" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm px-3 py-1.5 rounded-full mb-4">
                <Lock className="w-4 h-4" /> Sécurité & Conformité
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Vos données sont protégées à chaque étape</h2>
              <div className="space-y-5">
                {[
                  { title: "Chiffrement AES-256", desc: "Toutes les données médicales sont chiffrées au repos et en transit.", icon: "🔐" },
                  { title: "Hébergement local", desc: "Données hébergées sur des serveurs conformes aux réglementations togolaises et CEDEAO.", icon: "🏛️" },
                  { title: "Logs d'audit complets", desc: "Chaque action est tracée : qui a prescrit, qui a délivré, à quelle heure.", icon: "📋" },
                  { title: "Authentification 2FA", desc: "Double facteur obligatoire pour les médecins et pharmaciens.", icon: "🛡️" },
                ].map(s => (
                  <div key={s.title} className="flex gap-4">
                    <div className="text-2xl">{s.icon}</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-0.5">{s.title}</h4>
                      <p className="text-slate-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" /> Journal d'audit (exemple)
              </h3>
              <div className="space-y-3">
                {[
                  { time: "14:32:18", action: "Ordonnance créée", user: "Dr. Ama Koffi", color: "emerald" },
                  { time: "14:32:45", action: "Signature électronique", user: "Dr. Ama Koffi", color: "emerald" },
                  { time: "14:33:02", action: "Envoi SMS patient", user: "Système", color: "blue" },
                  { time: "15:47:22", action: "QR Code scanné", user: "Pharm. Jean Doe", color: "teal" },
                  { time: "15:47:35", action: "Ordonnance délivrée ✓", user: "Pharm. Jean Doe", color: "violet" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm py-2 border-b border-slate-50 last:border-0">
                    <span className="text-slate-400 font-mono text-xs w-16 flex-shrink-0">{log.time}</span>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${log.color === "emerald" ? "bg-emerald-400" : log.color === "blue" ? "bg-blue-400" : log.color === "teal" ? "bg-teal-400" : "bg-violet-400"}`}></div>
                    <span className="text-slate-700 flex-1">{log.action}</span>
                    <span className="text-slate-400 text-xs">{log.user}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à explorer la démo ?</h2>
          <p className="text-emerald-100 mb-8">Testez toutes les interfaces — médecin, pharmacien et patient — avec des données de démonstration.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/app/doctor')} className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-medium hover:bg-emerald-50 transition-colors flex items-center gap-2">
              <Stethoscope className="w-4 h-4" /> Interface Médecin
            </button>
            <button onClick={() => navigate('/app/pharmacist')} className="bg-emerald-500 border border-emerald-400 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-400 transition-colors flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Interface Pharmacien
            </button>
            <button onClick={() => navigate('/app/patient')} className="bg-teal-500 border border-teal-400 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-400 transition-colors flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> Portail Patient
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
              <Stethoscope className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-medium">OrdoTogo</span>
            <span className="text-slate-600">— Wireframe / Mockup v1.0</span>
          </div>
          <p className="text-sm">Plateforme de prescription numérique · République du Togo · 2026</p>
        </div>
      </footer>
    </div>
  )
}
