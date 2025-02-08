import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Save, CheckCircle, XCircle, Loader } from 'lucide-react';
import Layout from './../../../components/layout/layout';
import supabase from '/supabaseClient'
import { UserContext } from './../../../context/userContext';
import { useCard } from "./../../../context/previewContext";
import { OwnCardsContext } from './../../../context/ownCardsContext';
import { toast } from 'sonner';
import UrlChecker from './../../../components/urlChecker/urlChecker';
import './page.css';

export default function Page({ setSelectedCard, setIsCreatingNewCard }) {
  const { user } = useContext(UserContext);
  const { refetch } = useContext(OwnCardsContext);
  const userId = user?.googleId;
  const { data, setData } = useCard();
  
  // State management
  const [isLoading, setIsLoading] = useState(false);
 
  const [imageUrl, setImageUrl] = useState(null);
const fileInputRef = useRef(null);

const handleImageSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file); // Generate preview URL

  setData(prev => ({
    ...prev,
    previewUrl, // Store preview for UI
    imageFile: file // Store file for later upload
  }));
};



  // Ref for holding the URL state
 

  // URL validation rules

  // Effect to handle URL validation when switching tabs
  
  // Cleanup effect

  // Validate URL
 


  // Check URL availability
  


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
  setIsLoading(true);
  try {
    const file = data.imageFile;
    let imageUrl = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `card-profile-pictures/${fileName}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('cardly-pfp-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('cardly-pfp-images').getPublicUrl(filePath);
      imageUrl = publicUrlData?.publicUrl;

      if (!imageUrl) {
        throw new Error("Failed to retrieve public URL");
      }
    }

    // Send data to backend
    await axios.post('/cards/cards', {
      title: data.title,
      bio: data.bio,
      links: (data.links || []).filter(link => link.title && link.url),
      url: data.url,
      userId,
      template: data.template,
      imageUrl, // Image URL will be null if no image is selected
    });

    toast.success('New card created successfully! 🎉');

    // Reset data
    setData({
      title: '',
      bio: '',
      url: '',
      template: '1',
      links: [{ title: '', url: '' }],
      previewUrl: "",
      imageFile: null, 
    });

    refetch();
  } catch (error) {
    console.error(error);
    toast.error(error.message || 'Unknown error occurred');
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

<UrlChecker url={data.url} onUrlChange={(newUrl) => setData(prev => ({ ...prev, url: newUrl }))} />

          <div className="image-upload">
          {data.previewUrl && <img src={data.previewUrl} alt="" className="profile-image" />}

            <input
  type="file"
  accept="image/*"
  onChange={handleImageSelect} // Fix this
  ref={fileInputRef}
  style={{ display: 'none' }}
/>

            <button className="button button-outline" onClick={() => fileInputRef.current.click()}>
              <Save className="icon" /> Upload Image
            </button>
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
                placeholder="https://link.com/username"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                className="input"
              />
              <button className="button button-ghost" onClick={() => removeLink(index)}>
                <Trash2 className="icon1" />
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
              disabled={isLoading }
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