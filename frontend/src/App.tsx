
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardHome from './pages/DashboardHome';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/Home';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/SignUp';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/home" element={<DashboardHome />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
