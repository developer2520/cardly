import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCard } from "./../../../context/previewContext";
import './design.css'; // Import external CSS

const Design = () => {
  const { data, setData } = useCard(); // Access context state
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTemplates() {
      setLoading(true);
      try {
        const response = await axios.get('/templates'); // Fetch templates from server
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  const handleTemplate = (template) => {
    // Update only the context with the selected template ID
    setData((prevData) => ({
      ...prevData,
      template: template.id,
    }));
  };

  return (
    <div className="design-container">
      <h1>Select a Template</h1>

      {loading ? (
        <div className="templates-grid-loader">
          {/* Loader cards */}
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
              {/* Template card */}
              <div
                className={`template-card ${
                  data.template === template.id ? 'selected' : ''
                }`}
                onClick={() => handleTemplate(template)} // Update template in context on click
                style={{
                  background: template.styles.backgroundColor,
                  color: template.styles.textColor,
                }}
              >
                <div className="links-container">
                  {/* Placeholder links */}
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="template-link"
                      style={{
                        background:
                          template.styles.linkStyles.backgroundColor,
                        borderRadius: template.styles.linkStyles.borderRadius,
                        border: template.styles.linkStyles.border,
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Template name below the card */}
              <p className="template-name">{template.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Design;
