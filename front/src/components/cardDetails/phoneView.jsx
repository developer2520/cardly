import React, { useEffect, useState } from 'react';
import './phoneView.css';
import { useCard } from './../../context/editPreviewContext';
import axios from 'axios';

export default function PhoneView() {
  const { data } = useCard();
  const [templateStyles, setTemplateStyles] = useState(null);

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
  }, [data.template]); // Fetch styles whenever the template ID changes

  const phoneStyles = templateStyles || {}; // Fallback to empty object
  const linkStyles = phoneStyles.linkStyles || {};

  // Hover state handling
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);

  return (
    <div
      className="phoneView"
      style={{
        background: phoneStyles.backgroundColor || '#ffffff', // Default to white background
        color: phoneStyles.textColor || '#000000', // Default to black text
        fontFamily: phoneStyles.fontFamily || 'Roboto, sans-serif',
        fontSize: phoneStyles.fontSize || '16px', // Default to 16px font size
      }}
    >
      <div className="content">
        <h1 className="cardTitle" style={{ color: phoneStyles.textColor }}>
          {data.title}
        </h1>
        <p style={{ color: phoneStyles.bioColor || '#000000' }}>
          {data.bio}
        </p>

        <div className="linksContainer">
          {data.links && data.links.length > 0 ? (
            data.links.map((link, index) => {
              const isHovered = hoveredLinkIndex === index;

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
                        : linkStyles.backgroundColor || '#000000', // Default black background for links
                      borderRadius: linkStyles.borderRadius || '50px', // More rounded border radius
                      border: isHovered
                        ? linkStyles.hoverBorder || linkStyles.border
                        : linkStyles.border || '2px solid #ccc', // Default border style
                      color: isHovered
                        ? linkStyles.hoverTextColor || '#ffffff'
                        : linkStyles.textColor || '#ffffff', // White text color by default
                      transform: isHovered && linkStyles.transform
                        ? linkStyles.transform
                        : 'scale(1)', // Apply scale effect on hover if specified
                      transition: 'all 0.3s ease', // Smooth transition for hover effects
                    }}
                  >
                    {link.title}
                  </a>
                </div>
              );
            })
          ) : (
            <p>No links available</p> // Display if no links are available
          )}
        </div>
      </div>
    </div>
  );
}
