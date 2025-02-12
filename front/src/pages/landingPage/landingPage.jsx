import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../../components/navbar/navbar2';
import Home from '../../components/home/home';
import Footer from '../../components/footer/footer';
import { UserContext } from '../../context/userContext'; // Import UserContext
import './landingPage.css';

export default function LandingPage() {
  const { user, loading } = useContext(UserContext); // Get user and loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/home"); // Redirect to home if authenticated
    }
  }, [user, loading, navigate]);

  return (
    <div className='landing'>
      <Navbar2 />
      <Home />
      <Footer />
    </div>
  );
}
