import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './urlChecker.css'; // Import the styles

const UrlChecker = ({ url, onUrlChange, currentUrl }) => {
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && currentUrl) {
      onUrlChange(currentUrl.trim().toLowerCase());
      setStatus('available');
      setInitialized(true);
    }
  }, [currentUrl, onUrlChange, initialized]);

  const validateUrl = (newUrl) => {
    if (newUrl.length < 3) return 'URL must be at least 3 characters';
    if (newUrl.length > 20) return 'URL cannot exceed 20 characters';
    if (!/^[a-z0-9-]+$/.test(newUrl)) return 'Only letters, numbers, and dashes are allowed';
    if (/^-|-$/.test(newUrl)) return 'Cannot start or end with a dash';
    if (/--/.test(newUrl)) return 'Cannot contain consecutive dashes';
    return null;
  };

  useEffect(() => {
    if (!url) {
      setStatus(null);
      setErrorMessage('');
      return;
    }

    const normalizedUrl = url.trim().toLowerCase();
    const normalizedCurrentUrl = currentUrl?.trim().toLowerCase();

    const validationError = validateUrl(normalizedUrl);
    if (validationError) {
      setStatus('invalid');
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage('');

    if (normalizedUrl === normalizedCurrentUrl) {
      setStatus('available');
      return;
    }

    const checkAvailability = async () => {
      setChecking(true);
      try {
        const response = await axios.get(`/cards/check-url-availability?url=${normalizedUrl}`);
        setStatus(response.data.available ? 'available' : 'taken');
      } catch (error) {
        setStatus('error');
      } finally {
        setChecking(false);
      }
    };

    checkAvailability();
  }, [url]);

  return (
    <div className="url-input-container">
      <input
        type="text"
        placeholder="Choose your URL"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        className={`input ${status}`}
      />
      <div className="icon-container">
        {checking ? (
          <Loader className="icon loading" />
        ) : status === 'available' ? (
          <CheckCircle className="icon success" />
        ) : status === 'taken' ? (
          <XCircle className="icon error" />
        ) : status === 'invalid' ? (
          <AlertCircle className="icon warning" />
        ) : null}
      </div>
      {errorMessage && <p className="error-text alert-eror error-alert">{errorMessage}</p>}
    </div>
    
  );
};

export default UrlChecker;
