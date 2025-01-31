import React, { useEffect, useState, useContext } from 'react';
import './phoneView.css';
import { useCard } from './../../../context/previewContext';
import axios from 'axios';
import {  FaGlobe } from 'react-icons/fa';
import {IconContext} from './../../../context/icons'

export default function PhoneView({ togglePhoneView }) {
  const { data } = useCard();
  const [templateStyles, setTemplateStyles] = useState(null);
  const platformIcons = useContext(IconContext)

  

  // Function to detect platform from URL
  const detectPlatform = (url) => {
    try {
      const domain = new URL(url).hostname.toLowerCase();
      for (const [platform, { domain: platformDomain, icon }] of Object.entries(platformIcons)) {
        if (domain.includes(platformDomain)) {
          return { platform, icon };
        }
      }
    } catch (error) {
      console.error('Invalid URL:', url);
    }
    return { platform: 'unknown', icon: <FaGlobe className="link-icon-new-card" /> }; // Default for unsupported platforms
  };

  useEffect(() => {
    const fetchTemplateDetails = async () => {
      if (data.template) {
        try {
          const response = await axios.get(`/templates/${data.template}`);
          setTemplateStyles(response.data.styles);
        } catch (error) {
          console.error('Error fetching template styles:', error);
        }
      }
    };

    fetchTemplateDetails();
  }, [data.template]);

  const phoneStyles = templateStyles || {}; // Fallback to empty object
  const linkStyles = phoneStyles.linkStyles || {};

  // Hover state handling
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);

  return (
    <div
      className="phoneView"
      style={{
        background: phoneStyles.backgroundColor || '#ffffff', // Default to white
        color: phoneStyles.textColor || '#000000', // Default to black
      }}
    >
      <div className="content">
        <h1 className="cardTitle" style={{ color: phoneStyles.textColor }}>
          {data.title}
        </h1>
        <p>{data.bio}</p>

        <div className="linksContainer">
          {data.links && data.links.length > 0 ? (
            data.links.map((link, index) => {
              const isHovered = hoveredLinkIndex === index;
              const { icon } = detectPlatform(link.url); // Detect icon based on URL

              return (
                <div
                  key={index}
                  className="linkItem"
                  onMouseEnter={() => setHoveredLinkIndex(index)}
                  onMouseLeave={() => setHoveredLinkIndex(null)}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    style={{
                      backgroundColor: isHovered
                        ? linkStyles.hoverBackgroundColor || linkStyles.backgroundColor
                        : linkStyles.backgroundColor || '#f0f0f0',
                      borderRadius: linkStyles.borderRadius || '4px',
                      border: isHovered
                        ? linkStyles.hoverBorder || linkStyles.border
                        : linkStyles.border || '1px solid #ccc',
                      color: isHovered
                        ? linkStyles.hoverTextColor || phoneStyles.textColor || '#000000'
                        : linkStyles.textColor || phoneStyles.textColor || '#000000',
                      transform: isHovered && linkStyles.transform
                        ? linkStyles.transform
                        : 'scale(1)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px', // Adjust spacing between icon and text
                        pointerEvents: 'none',
                      }}
                      className="linkContainerWithIcon"
                    >
                      {icon}
                      <span
                        style={{
                          color: 'inherit',
                          fontSize: '0.8rem',
                          flexGrow: '1',
                          textAlign: 'center',
                          marginLeft: '-10%'
                        }}
                        className="linkText"
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
      </div>
    </div>
  );
}
