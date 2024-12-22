import React from 'react';
import Layout from '../../components/layout/layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Settings() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/logout', {
        withCredentials: true, // Ensure cookies are included in the request
      });
  
      if (response.status === 200) {
        console.log('Logged out successfully');
        navigate('/'); // Redirect to the homepage or login page
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Layout>
      <h1>Settings</h1>
      <button onClick={handleLogout}>Logout</button>
    </Layout>
  );
}
