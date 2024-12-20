
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardHome from './pages/DashboardHome';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/home" element={<DashboardHome />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
