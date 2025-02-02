import { useState } from "react";
import "./profileLink.css";

const ShareButton = ({ username }) => {
  const baseUrl = "https://cardly.uz/";
  const fullUrl = `${baseUrl}${username}`;
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialMediaLinks = [
    { name: "Twitter", url: `https://twitter.com/intent/tweet?url=${fullUrl}` },
    { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}` },
    { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${fullUrl}` }
  ];

  return (
    <div>
      <button className="share-button" onClick={() => setShowModal(true)}>
        Share
      </button>

      {showModal && (
        <div className="share-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            <h3>Share Your Profile</h3>
            <input type="text" value={fullUrl} readOnly className="profile-link-input" />
            <button onClick={copyToClipboard} className="copy-button">
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button className="qr-button">Get QR Code</button>
            <div className="social-links">
              {socialMediaLinks.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
