import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landingPage/landingPage'
import Dashboard from './pages/dashboard/dashboard'
import Settings from './pages/settings/settings'
import Account from './pages/account/account'
import Analytics from './pages/analytics/analytics'
import './App.css'
import Newcard from './pages/newcard/newcard'
  
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={LandingPage}/>
      <Route path='/dashboard' Component={Dashboard} />
      <Route path='/account' Component={Account} />
      <Route path='/settings' Component={Settings} />
      <Route path='/analytics' Component={Analytics} />
      <Route path='/newcard' Component={Newcard} />
      {/* <Route path=`${/u Component={Newcard} /> */}
      
      
    </Routes>
    
    </BrowserRouter>
      
       
    </>
  )
}

export default App
