import { Route, Routes } from 'react-router'
import './App.css'
import Signup from './components/Pages/SignupPage'
import Welcome from './components/Pages/Welcome'

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={ <Signup />} />
        <Route path="/Welcome" element={ <Welcome />} />
      </Routes>
    </>
  )
}

export default App
