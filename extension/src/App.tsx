import './App.css';
import { AuthContainer } from './components/core/AuthContainer';
import Extension from './components/core/Extension';
import { LoadingSpinner } from './components/ui/loadingSpinner';
import { useAuth } from './hooks/useAuth';


function App() {

  const { token, user, handleLogin, handleLogout } = useAuth();

  console.log("Token: ", token);

  return (
    <>
      <div className="w-full min-h-screen bg-background p-4">
        {!token ? (
          <AuthContainer onLogin={handleLogin} />
        ) : user ? (
          <div className="max-w-sm mx-auto">
            <Extension userData={user} onLogout={handleLogout} />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  )
}

export default App
