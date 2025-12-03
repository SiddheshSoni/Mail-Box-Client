import { Route, Routes, useLocation} from 'react-router'
import './App.css'
import Signup from './components/Pages/SignupPage'
import Welcome from './components/Pages/Welcome'
import Mail from './components/Pages/Mail'
import Navigation from './components/UI/Navigation'

import { useSelector } from 'react-redux'
import ViewMail from './components/MailBox/ViewMail'

function App() {
  const location = useLocation();
  const idToken = localStorage.getItem('idToken');
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn );

  const showNav = idToken && (location.pathname === '/Welcome' || location.pathname === '/mail');

 
  return (
    <>
      {showNav && <Navigation />}
      <Routes>
        { isLoggedIn && <Route path="*" element={ <Welcome />}></Route> }

        { isLoggedIn && <Route path="/Welcome" element={ <Welcome />} />}
        { isLoggedIn && <Route path="/mails/:mailId" element={ <ViewMail/>} />}
        { isLoggedIn && <Route path="/mail" element={ <Mail />} />}
        { !isLoggedIn && <Route path="*" element={ <Signup />} /> }
        <Route path="/" element={ <Signup />} />
        
      </Routes>
    </>
  )
}

export default App
