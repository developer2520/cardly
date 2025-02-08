import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './urlChecker.css'; 

const UrlChecker = ({ url, onUrlChange, currentUrl, onStatusChange }) => {
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && currentUrl) {
      onUrlChange(currentUrl.trim().toLowerCase());
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
      onStatusChange?.(null);
      return;
    }

    const normalizedUrl = url.trim().toLowerCase();
    const normalizedCurrentUrl = currentUrl?.trim().toLowerCase();

    const validationError = validateUrl(normalizedUrl);
    if (validationError) {
      setStatus('invalid');
      setErrorMessage(validationError);
      onStatusChange?.('invalid');
      return;
    }

    setErrorMessage('');

    if (normalizedUrl === normalizedCurrentUrl) {
      setStatus('available');
      onStatusChange?.('available');
      return;
    }

    let isMounted = true; // To prevent state updates if component unmounts

    const checkAvailability = async () => {
      setChecking(true);
      try {
        const response = await axios.get(`/cards/check-url-availability?url=${normalizedUrl}`);
        if (isMounted) {
          const newStatus = response.data.available ? 'available' : 'taken';
          setStatus(newStatus);
          onStatusChange?.(newStatus);
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
          onStatusChange?.('error');
        }
      } finally {
        if (isMounted) setChecking(false);
      }
    };

    const delay = setTimeout(() => checkAvailability(), 500); // Debounce API calls

    return () => {
      clearTimeout(delay);
      isMounted = false; // Cleanup function to prevent state updates
    };
  }, [url, currentUrl, onStatusChange]);

  return (
    <div className="url-input-container">
      <input
        type="text"
        placeholder="Choose your URL"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        className={`input-url ${status}`}
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
      {errorMessage && <p className="error-text alert-error error-alert">{errorMessage}</p>}
    </div>
  );
};

export default UrlChecker;
