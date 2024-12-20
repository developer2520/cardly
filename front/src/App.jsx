import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landingPage/landingPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={LandingPage}/>
    </Routes>
    
    </BrowserRouter>
      
       
    </>
  )
}

export default App
