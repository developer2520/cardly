import React, { useEffect, useState } from 'react';
import './phoneView.css';
import { useCard } from './../../context/editPreviewContext';
import axios from 'axios';
import { FaTelegram } from "react-icons/fa6";
import { FaYoutube, FaGithub, FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaSpotify, FaGlobe } from 'react-icons/fa';

export default function PhoneView() {
  const { data } = useCard();
  const [templateStyles, setTemplateStyles] = useState(null);

  const platformIcons = {
    youtube: { domain: 'youtube.com', icon: <FaYoutube className="link-icon-new-card" /> },
    twitter: { domain: 'twitter.com', icon: <FaTwitter className="link-icon-new-card" /> },
    instagram: { domain: 'instagram.com', icon: <FaInstagram className="link-icon-new-card" /> },
    facebook: { domain: 'facebook.com', icon: <FaFacebook className="link-icon-new-card" /> },
    linkedin: { domain: 'linkedin.com', icon: <FaLinkedin className="link-icon-new-card" /> },
    tiktok: { domain: 'tiktok.com', icon: <FaTiktok className="link-icon-new-card" /> },
    spotify: { domain: 'spotify.com', icon: <FaSpotify className="link-icon-new-card" /> },
    github: { domain: 'github.com', icon: <FaGithub className="link-icon-new-card" /> },
    telegram: { domain: 't.me', icon: <FaTelegram className="link-icon-new-card" /> },
  };

  // Function to detect platform from URL
  // Function to detect platform from URL
const detectPlatform = (url) => {
  try {
    const domain = new URL(url).hostname.toLowerCase(); // Get the full hostname
    
    // Loop through platform icons and compare the full domain
    for (const [platform, { domain: platformDomain, icon }] of Object.entries(platformIcons)) {
      // Check if the domain exactly matches the platform domain
      if (domain === platformDomain || domain.endsWith(`.${platformDomain}`)) {
        return { platform, icon }; // Return correct platform icon
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
              const { icon } = detectPlatform(link.url); // Detect the platform for the link

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
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px', // Adjust spacing if necessary
                        pointerEvents: 'none', // Prevent hover styles on the div itself
                      }}
                      className="linkContainerWithIcon"
                    >
                      {icon}
                      <span
                        style={{
                          color: 'inherit', // Ensure text inherits color
                          fontSize: '0.8rem',
                          flexGrow: '1',
                        }}
                        className="linkTitle"
                      >
                        {link.title}
                      </span>
                    </div>
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
