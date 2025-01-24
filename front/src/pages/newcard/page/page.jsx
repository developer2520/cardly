import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import Layout from './../../../components/layout/layout';
import { UserContext } from './../../../context/userContext';
import { useCard } from "./../../../context/previewContext";
import { OwnCardsContext } from './../../../context/ownCardsContext';

import './page.css';

export default function Page({ setSelectedCard }) {
  const { user } = useContext(UserContext);
  const { refetch } = useContext(OwnCardsContext);
  const userId = user?.googleId;
  const { data, setData } = useCard();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  

  // Clear data when the component mounts
 

  const addLink = () => {
    const newLinks = [...(data.links || []), { title: '', url: '' }];
    setData((prev) => ({ ...prev, links: newLinks }));
  };

  const removeLink = (index) => {
    const newLinks = data.links.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, links: newLinks }));
  };

  const updateLink = (index, field, value) => {
    const newLinks = data.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setData((prev) => ({ ...prev, links: newLinks }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.post('/cards', {
        title: data.title,
        bio: data.bio,
        links: (data.links || []).filter((link) => link.title && link.url),
        url: data.url,
        userId,
        template: data.template
      });
      setStatus({ type: 'success', message: 'Page saved successfully!' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to save' });
    } finally {
      setIsLoading(false);
      refetch();
      setData({
        title: '',
        bio: '',
        links: [{ title: '', url: '' }],
        url: '',
        template: "1",
      });
    }
  };

  return (
    <div className="container">
      <div className="cardd">
        <div className="card-header">
          <h2>Create Your Cardly Page</h2>
        </div>
        <div className="card-content">
          {status.message && (
            <div
              className={`alert ${
                status.type === 'error' ? 'alert-error' : 'alert-success'
              }`}
            >
              {status.message}
            </div>
          )}
          <input
            type="text"
            placeholder="Title"
            required
            value={data.title || ''}
            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
            className="input profile-input"
          />
          <input
            type="text"
            placeholder="URL"
            value={data.url || ''}
            onChange={(e) => setData((prev) => ({ ...prev, url: e.target.value }))}
            className="input"
          />
          <textarea
            name="bio"
            id="bio"
            placeholder="Enter your bio here (optional)"
            className="input"
            value={data.bio || ''}
            onChange={(e) => setData((prev) => ({ ...prev, bio: e.target.value }))}
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
