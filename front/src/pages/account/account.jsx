import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './account.css';
import Layout from '../../components/layout/layout';
import { UserContext } from '../../context/userContext';
import { OwnCardsContext } from '../../context/ownCardsContext';

export default function Account() {
  const { user, loading: userLoading, error: userError } = useContext(UserContext);
  const { ownCards, loading: cardsLoading, error: cardsError } = useContext(OwnCardsContext);
  const navigate = useNavigate();

  // Set page title if user exists
  if (user) {
    document.title = `${user.name}`;
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get('/logout', { withCredentials: true });

      if (response.status === 200) {
        // Redirect to homepage after successful logout
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  if (userLoading || cardsLoading) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  if (userError || cardsError) {
    return (
      <Layout>
        <h1>Error: {userError || cardsError}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="account-container">
        <h2 className="account-title">Account Details</h2>
        <div className="account-info">
          <p><strong>Name:</strong> {user ? user.name : 'Guest'}</p>
          <p><strong>Email:</strong> {user && user.email ? user.email : 'Not Available'}</p>
          <p><strong>Cards: </strong> {Array.isArray(ownCards) ? ownCards.length : 0}</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </Layout>
  );
}
