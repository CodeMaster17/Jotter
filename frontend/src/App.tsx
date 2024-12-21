
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardHome from './pages/DashboardHome';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/Home';
import HomeDashboard from './pages/HomeDashboard';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/SignUp';
import { Toaster } from "@/components/ui/toaster";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/home" element={<HomeDashboard />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App;
