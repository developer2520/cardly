import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode-generator';
import { Copy, Download, X, Twitter, Linkedin, Facebook, Send, MessageCircle } from 'lucide-react';
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import './shareComponent.css';

export default function ShareComponent({ onClose, url = "https://cardly.uz/" }) {
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const qr = QRCode(0, 'L');
    qr.addData(`https://cardly.uz/${url}`);
    qr.make();
    setQrCode(qr.createDataURL(8, 0));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };
  const shareMessage = "Take a look at this cardly page!";
  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(`https://cardly.uz/${url}`);
  
  const shareOnTwitter = () => {
    window.open(`https://x.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`, '_blank');
  };
  
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };
  
  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
  };
  
  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`, '_blank');
  };
  
  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`, '_blank');
  };
  
  return (
    <div className='overlay' onClick={onClose}>
      <div className='shareModal' onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>
          <X size={24} />
        </button>

        <h2>Share Cardly</h2>

        {/* QR Code Container */}
        <div className="qrWrapper" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
          <div className={`qrCard ${isFlipped ? "flipped" : ""}`}>
            <div className="qrFront">
              {qrCode && <img className="qrCode" src={qrCode} alt="QR Code" />}
            </div>
            <div className="qrBack">
              <button className="downloadButton" onClick={handleDownload}>
                <Download size={18} /> Download QR
              </button>
            </div>
          </div>
        </div>

        <a href={`https://cardly.uz/${url}`} target="_blank" rel="noopener noreferrer" className="url">
          https://cardly.uz/{url}
        </a>

        {/* Circular Social Media Buttons */}
        <div className="socialMedia">
        <button className="socialBtn telegram" onClick={shareOnTelegram}>
            <RiTelegram2Fill size={20} />
          </button>
          <button className="socialBtn twitter" onClick={shareOnTwitter}>
            <FaXTwitter size={20} />
          </button>
          <button className="socialBtn linkedin" onClick={shareOnLinkedIn}>
            <FaLinkedinIn size={20} />
          </button>
          <button className="socialBtn facebook" onClick={shareOnFacebook}>
            <FaFacebookF size={20} />
          </button>
          
          <button className="socialBtn whatsapp" onClick={shareOnWhatsApp}>
            <FaWhatsapp size={20} />
          </button>
        </div>

        <div className="buttonGroup">
          <button className="copyButton " onClick={handleCopy}>
            <Copy size={18} /> {copied ? "Copied!" : "Copy Link"}
          </button>

          <button className="downloadButton copyButton" onClick={handleDownload}>
            <Download size={18} /> Download QR
          </button>
        </div>
      </div>
    </div>
  );
}
