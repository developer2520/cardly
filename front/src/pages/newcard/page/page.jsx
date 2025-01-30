import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Save, CheckCircle, XCircle, Loader } from 'lucide-react';
import Layout from './../../../components/layout/layout';
import { UserContext } from './../../../context/userContext';
import { useCard } from "./../../../context/previewContext";
import { OwnCardsContext } from './../../../context/ownCardsContext';
import { toast } from 'sonner';
import './page.css';

export default function Page({ setSelectedCard, setIsCreatingNewCard }) {
  const { user } = useContext(UserContext);
  const { refetch } = useContext(OwnCardsContext);
  const userId = user?.googleId;
  const { data, setData } = useCard();
  
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [urlState, setUrlState] = useState({
    value: '',
    status: '',
    isChecking: false,
    errorMessage: '',
    validationTimeout: null
  });
  
  // Ref for holding the URL state
  const urlRef = useRef(urlState.value);

  // URL validation rules
  const URL_RULES = {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9][a-zA-Z0-9._]*[a-zA-Z0-9]$/,
    noConsecutiveSpecials: /[._]{2,}/
  };

  // Effect to handle URL validation when switching tabs
  useEffect(() => {
    if (data.url && urlState.value !== data.url) {
      const validation = validateUrl(data.url);
      
      setUrlState(prev => ({
        ...prev,
        value: data.url,
        status: validation.isValid ? 'checking' : 'invalid',
        errorMessage: validation.message
      }));

      // If URL is valid, check its availability
      if (validation.isValid) {
        checkUrlAvailability(data.url);
      }
    }
  }, [data.url]); // Run when data.url changes

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (urlState.validationTimeout) {
        clearTimeout(urlState.validationTimeout);
      }
    };
  }, []);

  // Validate URL
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

  // Check URL availability
  const checkUrlAvailability = async (url) => {
    setUrlState(prev => ({ ...prev, isChecking: true }));
    try {
      const response = await axios.get(`/check-url-availability?url=${url}`);
      setUrlState(prev => ({
        ...prev,
        status: response.data.available ? 'available' : 'taken',
        errorMessage: response.data.available ? '' : 'This URL is already taken'
      }));
    } catch (error) {
      setUrlState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: 'Error checking URL availability'
      }));
    } finally {
      setUrlState(prev => ({ ...prev, isChecking: false }));
    }
  };

  // Handle URL input changes
  const handleUrlChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    
    // Clear previous timeout if exists
    if (urlState.validationTimeout) {
      clearTimeout(urlState.validationTimeout);
    }

    // Update URL state immediately
    setUrlState(prev => ({
      ...prev,
      value,
      status: value ? 'checking' : 'empty'
    }));

    // Update parent state
    setData(prev => ({ ...prev, url: value }));

    if (!value) {
      setUrlState(prev => ({
        ...prev,
        status: 'empty',
        errorMessage: 'URL cannot be empty'
      }));
      return;
    }

    // Validate URL format
    const validation = validateUrl(value);
    if (!validation.isValid) {
      setUrlState(prev => ({
        ...prev,
        status: 'invalid',
        errorMessage: validation.message
      }));
      return;
    }

    // Set timeout for availability check
    const timeoutId = setTimeout(() => {
      checkUrlAvailability(value);
    }, 500);

    setUrlState(prev => ({ ...prev, validationTimeout: timeoutId }));
  };

  // Get URL status display component
  const getUrlStatusDisplay = () => {
    if (urlState.isChecking) {
      return (
        <span className="loading-text">
          <Loader className="icon spinning" /> Checking...
        </span>
      );
    }

    switch (urlState.status) {
      case 'available':
        return (
          <span className="success-text">
            <CheckCircle className="icon success" /> Available
          </span>
        );
      case 'taken':
        return (
          <span className="error-text">
            <XCircle className="icon error" /> {urlState.errorMessage || 'This URL is already taken'}
          </span>
        );
      case 'invalid':
        return (
          <span className="error-text">
            <XCircle className="icon error" /> {urlState.errorMessage}
          </span>
        );
      case 'empty':
        return (
          <span className="error-text">
            <XCircle className="icon error" /> {urlState.errorMessage || 'URL cannot be empty'}
          </span>
        );
      default:
        return null;
    }
  };

  // Check if URL is valid for form submission
  const isUrlValid = () => urlState.status === 'available';

  // Link management functions
  const addLink = () => {
    const newLinks = [...(data.links || []), { title: '', url: '' }];
    setData(prev => ({ ...prev, links: newLinks }));
  };

  const removeLink = (index) => {
    const newLinks = data.links.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, links: newLinks }));
  };

  const updateLink = (index, field, value) => {
    const newLinks = data.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setData(prev => ({ ...prev, links: newLinks }));
  };

  // Handle form submission
  const handleSave = async () => {
    if (urlState.isChecking || !isUrlValid()) return;

    setIsLoading(true);
    try {
      await axios.post('/cards', {
        title: data.title,
        bio: data.bio,
        links: (data.links || []).filter((link) => link.title && link.url),
        url: data.url,
        userId,
        template: data.template,
      });

      toast.success('New card created successfully! 🎉');
      setData({
        title: '',
        bio: '',
        url: '',
        template: '1',
        links: [{ title: '', url: '' }],
      });
      
      // Reset URL state
      setUrlState({
        value: '',
        status: '',
        isChecking: false,
        errorMessage: '',
        validationTimeout: null
      });
      
      refetch();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setSelectedCard(null);
      setIsCreatingNewCard(false);
    }
  };

  return (
    <div className="container">
      <div className="cardd">
        <div className="card-header">
          <h2>Create Your Cardly Page</h2>
        </div>
        <div className="card-content">
          <input
            type="text"
            placeholder="Title"
            required
            value={data.title || ''}
            onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
            className="input profile-input"
          />

          <div className="url-input-container">
          
<input
  type="text"
  placeholder="Choose your URL"
  value={urlState.value}
  onChange={handleUrlChange}
  className={`input ${urlState.status !== 'available' && urlState.status !== 'checking' && urlState.value ? 'input-error' : ''}`}
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
            value={data.bio || ''}
            onChange={(e) => setData(prev => ({ ...prev, bio: e.target.value }))}
          ></textarea>

          {(data.links || []).map((link, index) => (
            <div key={index} className="link-row">
              <input
                type="text"
                placeholder="Link Title"
                value={link.title}
                onChange={(e) => updateLink(index, 'title', e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                className="input"
              />
              <button className="button button-ghost" onClick={() => removeLink(index)}>
                <Trash2 className="icon" />
              </button>
            </div>
          ))}

          <div className="button-row">
            <button className="button button-outline" onClick={addLink}>
              <PlusCircle className="icon white-plus" />
              Add Link
            </button>
            <button
              className="button button-primary"
              onClick={handleSave}
              disabled={isLoading || !isUrlValid() || urlState.isChecking}
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