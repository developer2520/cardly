import React from 'react'
import Navbar2 from '../../components/navbar/navbar2'
import Home from '../../components/home/home'
import './landingPage.css'

export default function landingPage() {
  return (
    <div className='landing'>
      <Navbar2 />
      <Home />
    </div>
  )
}
