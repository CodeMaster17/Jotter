
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardHome from './pages/DashboardHome';
import DashboardLayout from './pages/DashboardLayout';

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Extension />} /> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/home" element={<DashboardHome />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
