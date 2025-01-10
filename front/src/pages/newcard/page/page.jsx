import React, { useState, useContext } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import Layout from './../../../components/layout/layout';
import { UserContext } from './../../../context/userContext';

import './page.css';

export default function Page() {
  const [links, setLinks] = useState([{ title: '', url: '' }]);
  const [bio, setBio] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [url, setUrl] = useState('');

  const userId = user?.googleId;

  const addLink = () => {
    setLinks([...links, { title: '', url: '' }]);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index, field, value) => {
    const newLinks = links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setLinks(newLinks);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.post('/cards', {
        title,
        bio,
        links: links.filter((link) => link.title && link.url),
        url,
        userId,
      });
      setStatus({ type: 'success', message: 'Page saved successfully!' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to save' });
    } finally {
      setIsLoading(false);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input profile-input"
            />
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
            />
            <textarea
              name="bio"
              id="bio"
              placeholder="Enter your bio here (optional)"
              className="input"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            ></textarea>

            {links.map((link, index) => (
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
                {isLoading ? 'Saving...' : 'Save Page'}
              </button>
            </div>
          </div>
        </div>
      </div>
  
  );
}
