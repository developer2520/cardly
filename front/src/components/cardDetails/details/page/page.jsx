import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import './page.css';
import { OwnCardsContext } from './../../../../context/ownCardsContext';
import { useCard } from './../../../../context/editPreviewContext';
import { toast } from 'sonner';
import supabase from '/supabaseClient';
import UrlChecker from './../../../urlChecker/urlChecker';

export default function Page({ card }) {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useContext(OwnCardsContext);
  const { data, setData } = useCard();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (data.cardId !== card._id) {
      setData({
        links: card.links || [{ title: '', url: '' }],
        bio: card.bio || '',
        title: card.title || '',
        url: card.url || '',
        template: card.template,
        cardId: card._id,
        imageUrl: card.imageUrl,
        previewUrl: card.imageUrl || '',
      });
    }
  }, [card._id, setData, card]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setData((prev) => ({
        ...prev,
        previewUrl: URL.createObjectURL(file),
      }));
    }
  };

  const uploadImageToSupabase = async () => {
    if (!selectedImage) return data.imageUrl;
    const fileName = `${data.cardId}_${Date.now()}`;
    if (data.imageUrl) {
      const oldFileName = data.imageUrl.split('/').pop();
      await supabase.storage.from('cardly-pfp-images').remove([oldFileName]);
    }
    const { data: uploadData, error } = await supabase.storage
      .from('cardly-pfp-images')
      .upload(fileName, selectedImage, { cacheControl: '3600', upsert: true });
    if (error) throw error;
    return uploadData ? supabase.storage.from('cardly-pfp-images').getPublicUrl(uploadData.path).data.publicUrl : data.imageUrl;
  };

  const handleSave = async () => {
    setIsLoading(true);
    let imageUrl = data.imageUrl;
    try {
      imageUrl = await uploadImageToSupabase();
      await axios.put(`/cards/cards/${card._id}`, {
        title: data.title,
        bio: data.bio,
        links: data.links.filter((link) => link.title && link.url),
        url: data.url,
        template: data.template,
        imageUrl,
      });
      toast.success('Card updated successfully! 🎉');
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update card');
    } finally {
      setIsLoading(false);
    }
  };

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
          <img src={data.previewUrl} className="profile-image" alt="Preview" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input"
          />
     <UrlChecker url={data.url} onUrlChange={(newUrl) => updateField('url', newUrl)} currentUrl={card.url} />




          <textarea
            name="bio"
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
      placeholder="Link URL"
      value={link.url}
      onChange={(e) => updateLinkField(index, 'url', e.target.value)}
      className="input"
    />
    <button className="button button-ghost" onClick={() => removeLink(index)}>
      <Trash2 className="icon1" />
    </button>
  </div>
))}

          <div className="button-row">
            <button className="button button-outline" onClick={addLink}>
              <PlusCircle className="icon white-plus" /> Add Link
            </button>
            <button className="button button-primary" onClick={handleSave} disabled={isLoading}>
              <Save className="icon" /> {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
