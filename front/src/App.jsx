import React from 'react';
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import Dashboard from './pages/dashboard/dashboard';
import Settings from './pages/settings/settings';
import Account from './pages/account/account';
import Analytics from './pages/analytics/analytics';
import Newcard from './pages/newcard/newcard';
import Card from './pages/card/card';
import UserProvider from './context/userContext';
import OwnCardsProvider from './context/ownCardsContext';
import { CardProvider } from './context/previewContext';
import Navbar2 from './components/navbar/navbar2';


import './App.css';

function App() {

  // axios.defaults.baseURL = 'https://cardly-1.onrender.com/';
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true
 


  return (
    <UserProvider>
      <OwnCardsProvider>
        <CardProvider >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/home/account" element={<Account />} />
          <Route path="/home/settings" element={<Settings />} />
          <Route path="/home/analytics" element={<Analytics />} />
          <Route path="/home/newcard" element={<Newcard />} />
          <Route path="/:url" element={<Card />} /> {/* Corrected dynamic route */}
          {/* <Route path="/cards" element={<CardsList />} /> */}
          <Route path='/navbar2' element={<Navbar2 />} />

        </Routes>
      </BrowserRouter>
      </CardProvider>
      </OwnCardsProvider>
    </UserProvider>
  );
}

export default App;
