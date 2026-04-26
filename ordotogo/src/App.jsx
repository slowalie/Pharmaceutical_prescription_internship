import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './app/components/LandingPage'
import AuthPage from './app/components/AuthPage'
import AppLayout from './app/components/AppLayout'
import DoctorDashboard from './app/components/DoctorDashboard'
import NewPrescription from './app/components/NewPrescription'
import PharmacistDashboard from './app/components/PharmacistDashboard'
import PatientPortal from './app/components/PatientPortal'
import AdminDashboard from './app/components/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="doctor" element={<DoctorDashboard />} />
          <Route path="doctor/new-prescription" element={<NewPrescription />} />
          <Route path="pharmacist" element={<PharmacistDashboard />} />
          <Route path="patient" element={<PatientPortal />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
