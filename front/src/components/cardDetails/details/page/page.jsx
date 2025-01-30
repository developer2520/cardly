import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Save, CheckCircle, XCircle, Loader } from 'lucide-react';
import './page.css';
import { OwnCardsContext } from './../../../../context/ownCardsContext';
import { useCard } from './../../../../context/editPreviewContext';
import { toast } from 'sonner';

export default function Page({ card }) {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useContext(OwnCardsContext);
  const { data, setData } = useCard();
  const [urlStatus, setUrlStatus] = useState('');
  const [checkingUrl, setCheckingUrl] = useState(false);

  // URL validation rules
  const URL_RULES = {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9][a-zA-Z0-9._]*[a-zA-Z0-9]$/,
    noConsecutiveSpecials: /[._]{2,}/
  };

  // Initialize component with current URL validation
  useEffect(() => {
    if (data.cardId !== card._id) {
      setData({
        links: card.links || [{ title: '', url: '' }],
        bio: card.bio || '',
        title: card.title || '',
        url: card.url || '',
        template: card.template,
        cardId: card._id,
      });
      // Reset URL status when switching tabs to prevent the error state
      setUrlStatus(card.url ? 'valid' : '');
    } else {
      setUrlStatus(card.url ? 'valid' : '');
    }
  }, [card._id, setData, card]);

  // Reset URL status when component unmounts or card changes
  useEffect(() => {
    return () => {
      setUrlStatus('');
      setCheckingUrl(false);
    };
  }, [card._id]);

  const validateUrl = (url) => {
    if (!url) {
      return { isValid: false, message: 'URL cannot be empty' };
    }

    if (url.length < URL_RULES.minLength) {
      return { isValid: false, message: `URL must be at least ${URL_RULES.minLength} characters` };
    }

    if (url.length > URL_RULES.maxLength) {
      return { isValid: false, message: `URL cannot exceed ${URL_RULES.maxLength} characters` };
    }

    if (!URL_RULES.pattern.test(url)) {
      return { 
        isValid: false, 
        message: 'URL can only contain letters, numbers, dots, and underscores. Must start and end with a letter or number' 
      };
    }

    if (URL_RULES.noConsecutiveSpecials.test(url)) {
      return { 
        isValid: false, 
        message: 'URL cannot contain consecutive dots or underscores' 
      };
    }

    return { isValid: true, message: '' };
  };

  const checkUrlAvailability = async (url) => {
    setCheckingUrl(true);
    try {
      // If the URL is unchanged from the card's current URL, it's valid
      if (url === card.url) {
        setUrlStatus('valid');
        setCheckingUrl(false);
        return;
      }

      const response = await axios.get(`/check-url-availability?url=${url}`);
      setUrlStatus(response.data.available ? 'available' : 'taken');
    } catch (error) {
      setUrlStatus('error');
      console.error('Error checking URL availability:', error);
    } finally {
      setCheckingUrl(false);
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setData((prev) => ({ ...prev, url: value }));

    // If the value is the same as the current card URL, it's valid
    if (value === card.url) {
      setUrlStatus('valid');
      return;
    }

    if (!value) {
      setUrlStatus('empty');
      return;
    }

    const validation = validateUrl(value);
    if (!validation.isValid) {
      setUrlStatus('invalid');
      return;
    }

    const timeoutId = setTimeout(() => {
      checkUrlAvailability(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const addLink = () => {
    setData((prev) => ({
      ...prev,
      links: [...prev.links, { title: '', url: '' }],
    }));
  };

  const removeLink = (index) => {
    setData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateLinkField = (index, field, value) => {
    setData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const getUrlStatusDisplay = () => {
    if (checkingUrl) {
      return (
        <span className="loading-text">
          <Loader className="icon spinning" /> Checking...
        </span>
      );
    }

    switch (urlStatus) {
      case 'valid':
        return (
          <span className="success-text">
            <CheckCircle className="icon success" /> Current URL
          </span>
        );
      case 'available':
        return (
          <span className="success-text">
            <CheckCircle className="icon success" /> Available
          </span>
        );
      case 'taken':
        return (
          <span className="error-text">
            <XCircle className="icon error" /> Already taken
          </span>
        );
      case 'invalid':
        return (
          <span className="error-text">
            <XCircle className="icon error" /> Invalid format
          </span>
        );
      case 'empty':
        return (
          <span className="error-text">
            <XCircle className="icon error" /> URL required
          </span>
        );
      default:
        return null;
    }
  };

  const isUrlValid = () => {
    return urlStatus === 'available' || urlStatus === 'valid';
  };

  const handleSave = async () => {
    if (checkingUrl) return;
    
    setIsLoading(true);
    try {
      await axios.put(`/cards/${card._id}`, {
        title: data.title,
        bio: data.bio,
        links: data.links.filter((link) => link.title && link.url),
        url: data.url,
        template: data.template,
      });
      
      setStatus({ type: 'success', message: 'Card updated successfully!' });
      toast.success('Card updated successfully! 🎉');
      refetch();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update card';
      setStatus({ type: 'error', message: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ type: '', message: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="container">
      <div className="cardd">
        <div className="card-header">
          <h2>Edit your card</h2>
        </div>
        <div className="card-content">
          <input
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="input profile-input"
          />

          <div className="url-input-container">
            <input
              type="text"
              placeholder="Choose your URL"
              value={data.url}
              onChange={handleUrlChange}
              className={`input ${!isUrlValid() && data.url ? 'input-error' : ''}`}
            />
            <div className="url-status">
              {getUrlStatusDisplay()}
            </div>
          </div>

          <textarea
            name="bio"
            id="bio"
            placeholder="Enter your bio here (optional)"
            className="input"
            onChange={(e) => updateField('bio', e.target.value)}
            value={data.bio}
          ></textarea>

          {data.links.map((link, index) => (
            <div key={index} className="link-row">
              <input
                type="text"
                placeholder="Link Title"
                value={link.title}
                onChange={(e) => updateLinkField(index, 'title', e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateLinkField(index, 'url', e.target.value)}
                className="input"
              />
              <button 
                className="button button-ghost" 
                onClick={() => removeLink(index)}
                aria-label="Remove link"
              >
                <Trash2 className="icon1" />
              </button>
            </div>
          ))}

          <div className="button-row">
            <button 
              className="button button-outline" 
              onClick={addLink}
              aria-label="Add new link"
            >
              <PlusCircle className="icon white-plus" />
              Add Link
            </button>
            <button
              className="button button-primary"
              onClick={handleSave}
              disabled={isLoading || !isUrlValid() || checkingUrl}
            >
              <Save className="icon" />
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
