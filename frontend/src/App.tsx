
import { Toaster } from "@/components/ui/toaster";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/Home';
import HomeDashboard from './pages/HomeDashboard';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/SignUp';
import { AuthProvider } from "./context/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const PrivateRoute = ({ element }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />
  // }



  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <DashboardLayout />
              }
            >
              <Route
                path="/dashboard/home"
                element={

                  <HomeDashboard />

                }
              />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
