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
        background: phoneStyles.backgroundColor || '#ffffff', // Default to white
        color: phoneStyles.textColor || '#000000', // Default to black
      }}
    >
      <div className="content">
        <h1>{data.title}</h1>
        <p>{data.bio}</p>

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
                        : linkStyles.backgroundColor || '#f0f0f0',
                      borderRadius: linkStyles.borderRadius || '4px',
                      border: isHovered
                        ? linkStyles.hoverBorder || linkStyles.border
                        : linkStyles.border || '1px solid #ccc',
                      color: isHovered
                        ? linkStyles.hoverTextColor || phoneStyles.textColor
                        : phoneStyles.textColor,
                      transform: isHovered && linkStyles.transform
                        ? linkStyles.transform // Apply the transform from the template if available
                        : 'scale(1)', // Default to no transform if not specified
                      transition: 'all 0.3s ease', // Smooth transition for transform
                    }}
                  >
                    {link.title}
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
