
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/Home';
import HomeDashboard from './pages/HomeDashboard';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/SignUp';
import { Toaster } from "@/components/ui/toaster";
function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const PrivateRoute = ({ element }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />
  // }

  return (
    <Router>
      {/* <RefreshHandler setIsAuthenticated={setIsAuthenticated} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path='/dashboard' element={<Navigate to="/login" />} /> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/home" element={<HomeDashboard />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
