import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Save, CheckCircle, XCircle, Loader } from 'lucide-react';
import './page.css';
import { OwnCardsContext } from './../../../../context/ownCardsContext';
import { useCard } from './../../../../context/editPreviewContext';

export default function Page({ card }) {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useContext(OwnCardsContext);
  const { data, setData } = useCard();
  const [urlError, setUrlError] = useState(false);
  const [urlAvailability, setUrlAvailability] = useState(null);
  const [checkingUrl, setCheckingUrl] = useState(false);
  const [urlStatus, setUrlStatus] = useState('');

  const invalidCharacters = /[^a-zA-Z0-9._]/;

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
    }
  }, [card._id, setData]);

  const handleUrlValidation = (url) => invalidCharacters.test(url);

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({ ...prev, url: value }));
  
    if (!value.trim()) {
      setUrlStatus('empty');
      return;
    }
  
    if (handleUrlValidation(value)) {
      setUrlStatus('invalid');
      return;
    }
  
    checkUrlAvailability(value);
  };

  const checkUrlAvailability = async (url) => {
    if (!url) {
      setUrlAvailability(null);
      return;
    }

    setCheckingUrl(true);
    try {
      const response = await axios.get(`/check-url-availability?url=${url}`);
      setUrlAvailability(response.data.available);
    } catch (error) {
      setUrlAvailability(false);
    }
    setCheckingUrl(false);
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
      refetch();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to update card',
      });
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
          <h2>Edit Your Card</h2>
        </div>
        <div className="card-content">
          {status.message && (
            <div className={`alert ${status.type === 'error' ? 'alert-error' : 'alert-success'}`}>
              {status.message}
            </div>
          )}

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
              placeholder="URL"
              value={data.url}
              onChange={handleUrlChange}
              className={`input ${urlError ? 'input-error' : ''}`}
            />
            <div className="url-status">
              {checkingUrl && (
                <span className="loading-text">
                  <Loader className="icon spinning" /> Checking...
                </span>
              )}
              {!checkingUrl && urlAvailability === true && (
                <span className="success-text">
                  <CheckCircle className="icon success" /> Available
                </span>
              )}
              {!checkingUrl && urlAvailability === false && (
                <span className="error-text">
                  <XCircle className="icon error" /> Not Available
                </span>
              )}
            </div>
          </div>

          {urlError && <p className="alert-error">URL contains invalid characters.</p>}
          {urlStatus === 'empty' && <p className="error-text">URL can't be empty.</p>}
{urlStatus === 'invalid' && <p className="error-text">URL contains invalid characters.</p>}
{urlStatus === 'available' && <p className="success-text">✅ URL is available!</p>}
{urlStatus === 'taken' && <p className="error-text">❌ URL is already taken.</p>}
{urlStatus === 'checking' && <p className="loading-text">⏳ Checking availability...</p>}


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
                onChange={(e) => updateField('title', e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateField('url', e.target.value)}
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
              disabled={isLoading || urlError || urlAvailability === false || checkingUrl}
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
