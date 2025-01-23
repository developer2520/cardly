import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css';
import { useParams, Link } from 'react-router-dom';

export default function Card() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { url } = useParams(); // Destructure the URL parameter

  useEffect(() => {
    // Fetch both card and template data in a single request
    axios
      .get(`/cards/${url}`, { withCredentials: true })
      .then((response) => {
        setData(response.data); // Set card and template data
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
    // Update document title when `data.card` is available
    if (data && data.card) {
      document.title = data.card.title || 'Card';
    }
  }, [data]);

  if (loading) {
    return (
      <div className="loaderContainerr">
        <div className="loaderr"></div>
      </div>
    );
  }

  if (error || !data || !data.card || !data.template) {
    document.title = '404';
    return (
      <div className="notFoundPage">
        <div className="errorContainer">
          <h1 className="errorTitle">404</h1>
          <p className="errorMessage">{error || 'Sorry, this card doesn\'t exist.'}</p>
          <Link to="/" className="errorLink">Go Home</Link>
        </div>
      </div>
    );
  }

  const card = data.card;
  const template = data.template;
  const templateStyles = template.styles || {};
  const linkStyles = templateStyles.linkStyles || {};
console.log(template)
  return (
    <div
      className="cardPage"
      style={{
        background: templateStyles.backgroundColor || 'white', // Default background if none
        color: templateStyles.textColor || 'black', // Default text color
        fontFamily: templateStyles.fontFamily || 'Roboto, sans-serif',
        fontSize: templateStyles.fontSize || '16px',
      }}
    >
      <h1 className="cardTitle" style={{ color: templateStyles.textColor }}>
        {card.title}
      </h1>
      <p style={{ color: templateStyles.bioColor || 'black' }}>
        {card.bio}
      </p>

      {/* Render the links */}
      <div className="linksContainer">
        {card.links && card.links.length > 0 ? (
          card.links.map((link) => (
            <div key={link._id} className="linkItem">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                style={{
                  backgroundColor: linkStyles.backgroundColor || 'transparent',
                  borderRadius: linkStyles.borderRadius || '50px', // Rounded corners
                  border: linkStyles.border || '2px solid #ccc',
                  color: templateStyles.textColor || 'white', // Default white text on links
                  transition: linkStyles.transition || 'all 0.3s ease', // Smooth hover transition
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = linkStyles.hoverBackgroundColor || linkStyles.backgroundColor;
                  e.target.style.color = linkStyles.hoverTextColor || templateStyles.textColor;
                  e.target.style.border = linkStyles.hoverBorder || linkStyles.border;
                  if (linkStyles.transform) {
                    e.target.style.transform = linkStyles.transform;
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = linkStyles.backgroundColor || 'transparent';
                  e.target.style.color = templateStyles.textColor || 'black';
                  e.target.style.border = linkStyles.border || '2px solid #ccc';
                  e.target.style.transform = 'none'; // Remove transform on hover out
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
