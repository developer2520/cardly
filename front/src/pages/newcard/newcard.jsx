import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/layout';

export default function NewCard() {
    const [user, setUser] = useState("")
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

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


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    axios
      .post(
        "http://localhost:4000/cards",
        { url, title, description, link, userId: user },
        { withCredentials: true }
      )
      .then((response) => {
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

  return (
    <Layout>
      <h1>Create a new card</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link"
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
