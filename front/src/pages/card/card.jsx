import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css'
import { useParams } from 'react-router-dom';

export default function Card() {
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null)
  const { url } = useParams(); // Destructure the url parameter

  useEffect(() => {
    axios.get(`http://localhost:4000/cards/${url}`, {
      withCredentials: true
  
    })
      .then(response => {
        setCard(response.data);
        setLoading(false)
      })  
      .catch(error => {
        setLoading(false)
        if (error.status && error.response.status === 404) {
          setError("No card found")

        } else {
          setError("Something went wrong")
        }
      });
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className='cardPage'>
      <h1 className='cardTitle'>{card.title}</h1>
      <p>{card.description}</p>
      <p>{card.userId}</p>
      <a href={card.link}>{card.link}</a>
    </div>
  );
}
