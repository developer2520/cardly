import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ownCards, setOwnCards] = useState([]);

  useEffect(() => {
    // Fetch the user data
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => {
        setUser(response.data); // Update user state
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch user's cards only when the user data (googleId) is available
    if (user.googleId) {
    
      axios.get(`http://localhost:4000/cards?googleId=${user.googleId}`, { withCredentials: true })
        .then(response => {
          setOwnCards(response.data); // Update ownCards state
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [user.googleId]); // Run this effect only when user.googleId is updated
  // Run this effect only when user.googleId is updated

  if (loading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>Error: {error}</Layout>;
  }

  return (
    <Layout>
      <h1>Hello {user.name}</h1>
      

      <h1>Your cards</h1>

      {ownCards.map((card) => (
        <div key={card._id}>
          <h1>{card.title}</h1>
        </div>
      ))}

      {/* {ownCards.length < 3 ? (
  <Link to='/newcard'>Create a new card</Link>
) : (
  <p>Unavailable</p>
)} */}

<Link to='/newcard'>Create a new card</Link>

    </Layout>
  );
}
