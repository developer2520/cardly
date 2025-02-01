import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './card.css';
import { useParams, Link } from 'react-router-dom';
import {IconContext} from './../../context/icons'
import { FaGlobe } from 'react-icons/fa';
import Logo from './../../assets/logo-cardly.png'


// Platform icons mapping with React Icons


// Function to detect platform from URL


export default function Card() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { url } = useParams();
  const platformIcons = useContext(IconContext)

  useEffect(() => {
    axios
      .get(`/cards/${url}`, { withCredentials: true })
      .then((response) => {
        setData(response.data);
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
  }, [url]);

  useEffect(() => {
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
  const detectPlatform = (url) => {
    try {
      const domain = new URL(url).hostname.toLowerCase();
  
      // Check if the platform icon exists in the context
      for (const [platform, { domain: platformDomain, icon }] of Object.entries(platformIcons)) {
        if (domain.includes(platformDomain)) {
          return { platform, icon: React.cloneElement(icon, { className: 'link-icon' }) };
        }
      }
  
      // If not found in platformIcons, return the website's favicon
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      return { platform: 'unknown', icon: <img src={faviconUrl} alt="Favicon" className="link-icon-favicon " /> };
  
    } catch (error) {
      console.error('Invalid URL:', url);
    }
  
    // Default to FaGlobe if everything fails
    return { platform: 'unknown', icon: <FaGlobe className="link-icon" /> };
  };
  
  
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

  return (
    <div className="card-container-full">
      <div
        className="cardPage"
        style={{
          background: templateStyles.backgroundColor || 'white',
          color: templateStyles.textColor || 'black',
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

        <div className="linksContainer">
          {card.links && card.links.length > 0 ? (
            card.links.map((link) => {
              const { icon } = detectPlatform(link.url);
              return (
                <div key={link._id} className="linkItem">
                 
                  <a
  href={link.url}
  target="_blank"
  rel="noopener noreferrer"
  className="link"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: linkStyles.backgroundColor || 'transparent',
    borderRadius: linkStyles.borderRadius || '50px',
    border: linkStyles.border || '2px solid #ccc',
    color: linkStyles.textColor || templateStyles.textColor || 'black',
    transition: linkStyles.transition || 'all 0.3s ease',
    padding: '10px 15px',
  }}
  onMouseEnter={(e) => {
    const target = e.currentTarget; // Use currentTarget instead of target to ensure you refer to the <a>
    target.style.backgroundColor =
      link.onHoverBackgroundColor || linkStyles.hoverBackgroundColor || linkStyles.backgroundColor;
    target.style.color =
      link.onHoverTextColor || linkStyles.hoverTextColor || templateStyles.textColor || 'black';
    target.style.border =
      link.onHoverBorder || linkStyles.hoverBorder || linkStyles.border;
    if (link.onHoverTransform || linkStyles.hoverTransform) {
      target.style.transform = link.onHoverTransform || linkStyles.hoverTransform;
    }
  }}
  onMouseLeave={(e) => {
    const target = e.currentTarget;
    target.style.backgroundColor = linkStyles.backgroundColor || 'transparent';
    target.style.color = linkStyles.textColor || templateStyles.textColor || 'black';
    target.style.border = linkStyles.border || '2px solid #ccc';
    target.style.transform = 'none';
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px', // Optional adjustment for spacing
      pointerEvents: 'none', // Prevent hover styles on the div itself
    }}

    className='linkContainerWithIcon'
  >
    {icon}
    <span
      style={{
        
        color: 'inherit', // Ensure text inherits color
        fontSize: '1.1rem',
      marginLeft: '-3%',
        flexGrow: '1',
      }}

      className='l'
    >
      {link.title}
    </span>
  </div>
</a>

                </div>
              );
            })
          ) : (
            <p>No links available</p>
          )}
        </div>
        <Link to="/" className="footer-link">
        <div className="footer-container">
  <span className="footer-text">Powered by</span>
  
    <img className='cardly-link-logo' src={Logo} alt="Cardly Logo" />
 
</div>

</Link>

      </div>
      
    </div>
  );
}
