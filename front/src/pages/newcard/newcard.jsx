import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newcard.css'
import Layout from '../../components/layout/layout';
import {useNavigate} from 'react-router-dom';

export default function NewCard() {
  const [user, setUser] = useState(null); // Set initial state to null
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setLoading(false); // Set loading to false once user data is fetched
      })
      .catch(error => {
        setError(error.message);
        setLoading(false); // Also stop loading if there's an error
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!user || !user._id) {
      alert("User is not authenticated or user ID is missing.");
      return;
    }

    axios
      .post(
        "/cards",
        { url, title, description, link, userId: user.googleId},
        { withCredentials: true }
      )
      .then((response) => {
        navigate('/home');
        alert("Card created successfully");
        // Reset form fields
        setUrl("");
        setTitle("");
        setDescription("");
        setLink("");
        

      })
      .catch((error) => {
        console.error("Error creating card:", error);
        alert("Failed to create card");
      });
  };

  // If loading, show a loading spinner or message
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // If error, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="newCardContainer">
      <h1>Create a new card</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required

        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link"
          required
        />
        <button type="submit" disabled={!user}>Submit</button> {/* Disable button until user is available */}
      </form>
      </div>
     
    </Layout>
  );
}
