import React from 'react'
import Layout from '../../components/layout/layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function settings() {
    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('http://localhost:4000/auth/logout', {
            withCredentials: true,
        })
        .then(() => {
            navigate('/');
        })
        .catch((error) => {
            console.error("Logout Error:", error);
        });
    };
    
  return (
    <Layout>
        <h1>Settings</h1>
        <button onClick={handleLogout}>logout</button>
    </Layout>
  )
}
