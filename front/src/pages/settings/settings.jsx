import React from 'react';
import './settings.css'
import Layout from '../../components/layout/layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Settings() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate('/');
    try {
      const response = await axios.get('/logout', {
        withCredentials: true, // Ensure cookies are included in the request
      });
  
      if (response.status === 200) {
      
         // Redirect to the homepage or login page
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
document.title = "Settings"
  return (
    <Layout>
      <div className="settings">
        <div className="settingsContent">
        <h1>Settings</h1>
        <button className='logout' onClick={handleLogout}>Logout</button>

        </div>
     

      </div>
      
    </Layout>
  );
}