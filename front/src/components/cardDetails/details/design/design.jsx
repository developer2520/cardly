import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCard } from './../../../../context/editPreviewContext';
import './design.css'; // Import external CSS

const Design = () => {
  const { data, setData } = useCard();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    async function fetchTemplates() {
      setLoading(true);
      try {
        const response = await axios.get('/templates');
        setTemplates(response.data);
        console.log('Fetched templates:', response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  const handleTemplate = (template) => {
    console.log('Selected template:', template);
    setData((prevData) => ({
      ...prevData,
      template: template.id, // Update template ID in context
    }));
  };
console.log(data.template)
  return (
    <div className="design-container">
      <h1>Select a Template</h1>

      {loading ? (
        <div className="templates-grid-loader">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="template-loader">
              <div className="template-card-skeleton" />
              <p className="template-name-skeleton"></p>
            </div>
          ))}
        </div>
      ) : (
        <div className="templates-grid">
          {templates.map((template) => (
            <div key={template.id} className="template-container">
              <div
                className={`template-card ${
                  data.template === template.id ? 'selected' : ''
                }`}
                onClick={() => handleTemplate(template)}
                style={{
                  background: template.styles?.backgroundColor || '#f0f0f0',
                  color: template.styles?.textColor || '#000',
                }}
              >
                <div className="links-container">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="template-link"
                      style={{
                        background:
                          template.styles?.linkStyles?.backgroundColor || '#ddd',
                        borderRadius:
                          template.styles?.linkStyles?.borderRadius || '4px',
                        border: template.styles?.linkStyles?.border || 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="template-name">{template.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Design;
