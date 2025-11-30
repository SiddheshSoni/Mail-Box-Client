import { Route, Routes, useLocation } from 'react-router'
import './App.css'
import Signup from './components/Pages/SignupPage'
import Welcome from './components/Pages/Welcome'
import Mail from './components/Pages/Mail'
import Navigation from './components/UI/Navigation'
import ViewMail from './components/Pages/ViewMail'

function App() {
  const location = useLocation();
  const idToken = localStorage.getItem('idToken');

 const showNav = idToken && (location.pathname === '/Welcome' || location.pathname === '/mail');

 
  return (
    <>
      {showNav && <Navigation />}
      <Routes>
        <Route path="/" element={ <Signup />} />
        <Route path="/Welcome" element={ <Welcome />} />
        <Route path="/mails/:mailId" element={ <ViewMail />} />
        <Route path="/mail" element={ <Mail />} />
      </Routes>
    </>
  )
}

export default App
