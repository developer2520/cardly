import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ownCards, setOwncards] = useState([])

  const userId = user.googleId
  console.log(userId)

  useEffect(() => {
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:4000/cards?googleId=${userId}`, { withCredentials: true })
      .then(response => {
        setOwncards(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h1>Hello {user.name}</h1>
      <h2>{user.email} </h2>  
      <h2>{user.id} </h2>
      <img src={user.pfp} alt={`${user.name}'s profile`} />

      <h1>Your cards</h1>

      {ownCards.map((card) => (
  <div key={card._id}> {/* Assuming each card has a unique _id */}
    <h1>{card.title}</h1> {/* Display the actual title from the card */}
  </div>
))}

      <Link to='/newcard'>Create a new card</Link>

      
    </Layout>
  );
}
