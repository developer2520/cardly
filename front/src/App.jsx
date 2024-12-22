import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landingPage/landingPage'
import Dashboard from './pages/dashboard/dashboard'
import Settings from './pages/settings/settings'
import Account from './pages/account/account'
// import Analytics from './pages/analytics/analytics'
// import Settings from './pages/settings/settings'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={LandingPage}/>
      <Route path='/dashboard' Component={Dashboard} />
      <Route path='/account' Component={Account} />
      <Route path='/settings' Component={Settings} />
      {/* <Route path='/analytics' Component={Analytics} /> */}
      
    </Routes>
    
    </BrowserRouter>
      
       
    </>
  )
}

export default App
