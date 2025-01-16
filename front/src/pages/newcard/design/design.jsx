import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './design.css'; // Import external CSS

const Design = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await axios.get('/templates');
        setTemplates(response.data);
        const defaultTemplate = response.data.find(
          (template) => template.id === '6'
        );
        setSelectedTemplate(defaultTemplate);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    }

    fetchTemplates();
  }, []);


  const handleTemplate = async (template) => {
    try {
      // Set the selected template locally
      setSelectedTemplate(template);

      // Make API call to update the template for the current page
      const response = await axios.put(`/pages/${pageId}/template`, {
        templateId: template.id,
      });

      if (response.status === 200) {
        console.log('Default template updated successfully:', response.data);
      }
    } catch (error) {
      console.error('Error updating default template:', error);
      alert('Failed to update template. Please try again.');
    }
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="design-container">
      <h1>Select a Template</h1>

      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-container">
            {/* Template card */}
            <div
              className={`template-card ${
                selectedTemplate?.id === template.id ? 'selected' : ''
              }`}
              onClick={() => handleSelectTemplate(template)}
              style={{
                backgroundColor: template.styles.backgroundColor,
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
                      backgroundColor:
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
    </div>
  );
};

export default Design;
