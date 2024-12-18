import './App.css'
import DashboardHome from './pages/DashboardHome';
import DashboardLayout from './pages/DashboardLayout';
import Extension from './pages/Extension'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Extension />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/home" element={<DashboardHome />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
