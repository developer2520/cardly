import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import Dashboard from './pages/dashboard/dashboard';
import Settings from './pages/settings/settings';
import Account from './pages/account/account';
import Analytics from './pages/analytics/analytics';
import Newcard from './pages/newcard/newcard';
import Card from './pages/card/card';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/newcard" element={<Newcard />} />
        <Route path="/:url" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
