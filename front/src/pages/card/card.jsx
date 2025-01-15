import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css';
import { useParams } from 'react-router-dom';

export default function Card() {
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState(null);
  const [template, setTemplate] = useState(null); // State to hold the template styles
  const [error, setError] = useState(null);
  const { url } = useParams(); // Destructure the URL parameter

  useEffect(() => {
    // Fetch card data
    axios
      .get(`/cards/${url}`, { withCredentials: true })
      .then((response) => {
        setCard(response.data); // Set card data
        // Fetch the template styles using the template ID from the card
        return axios.get(`/templates/${response.data.template}`);
      })
      .then((templateResponse) => {
        setTemplate(templateResponse.data); // Set template data (styles)
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 404) {
          setError('No card found');
        } else {
          setError('Something went wrong');
        }
      });
  }, [url]); // Dependency: Run when URL changes

  useEffect(() => {
    // Update document title when `card` changes
    if (card) {
      document.title = `${card.title}`;
    }
  }, [card]); // Dependency: Run when `card` is updated

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  // Define inline styles from the template if available
  const inlineStyles = template ? {
    backgroundColor: template.styles.backgroundColor || 'white',
    color: template.styles.textColor || 'black',
  } : {};

  return (
    <div className="cardPage" style={inlineStyles}>
      <h1 className="cardTitle">{card.title}</h1>
      <p>{card.bio}</p>

      {/* Render the links */}
      <div className="linksContainer">
        {card.links && card.links.length > 0 ? (
          card.links.map((link, index) => (
            <div key={index} className="linkItem">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                style={{
                  backgroundColor: template.styles.linkStyles?.backgroundColor || 'transparent',
                  color: template.styles.linkStyles?.color || 'blue',
                }}
              >
                {link.title}
              </a>
            </div>
          ))
        ) : (
          <p>No links available</p>
        )}
      </div>
    </div>
  );
}
