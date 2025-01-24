import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import './page.css';
import { OwnCardsContext } from './../../../../context/ownCardsContext';
import { useCard } from './../../../../context/editPreviewContext';

export default function Page({ card }) {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useContext(OwnCardsContext);
  const { data, setData } = useCard();

  // Only initialize the context data when the card ID changes or component first mounts
  useEffect(() => {
    if (data.cardId !== card._id) {
      setData({
        links: card.links || [{ title: '', url: '' }],
        bio: card.bio || '',
        title: card.title || '',
        url: card.url || '',
        template: card.template, // Ensure template is initialized
        cardId: card._id,
      });
    }
  }, [card._id, setData]);
  

  const addLink = () => {
    setData(prev => ({
      ...prev,
      links: [...prev.links, { title: '', url: '' }]
    }));
  };

  const removeLink = (index) => {
    setData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const updateLink = (index, field, value) => {
    setData(prev => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const updateField = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
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
          <input
            type="text"
            placeholder="URL"
            value={data.url}
            onChange={(e) => updateField('url', e.target.value)}
            className="input"
          />
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
              <button
                className="button button-ghost"
                onClick={() => removeLink(index)}
              >
                <Trash2 className="icon" />
              </button>
            </div>
          ))}

          <div className="button-row">
            <button className="button button-outline" onClick={addLink}>
              <PlusCircle className="iconn white-plus" />
              Add Link
            </button>
            <button
              className="button button-primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              <Save className="iconn" />
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}