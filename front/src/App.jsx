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
import CardsList from './components/cardsList/cardsList';
import './App.css';

function App() {

  axios.defaults.baseURL = 'http://localhost:4000';
  return (
    <UserProvider>
      <OwnCardsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/newcard" element={<Newcard />} />
          <Route path="/cards/:url" element={<Card />} /> {/* Corrected dynamic route */}
          <Route path="/cards" element={<CardsList />} />

        </Routes>
      </BrowserRouter>
      </OwnCardsProvider>
    </UserProvider>
  );
}

export default App;
