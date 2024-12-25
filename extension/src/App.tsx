import { useEffect, useState } from 'react'
import './App.css'
import Extension from './components/core/Extension'

function App() {

  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    function getTokenfromLocalStorage() {
      const token = localStorage.getItem('token')
      if (token) {
        setShowLogin(false)
      }else{
        setShowLogin(true)
      }
    }
  }, [])
  return (
    <>
    
      <Extension />
    </>
  )
}

export default App
