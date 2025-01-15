// src/components/TemplateSelector.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Design = () => {
  const [templates, setTemplates] = useState([]);  // State to store templates
  const [selectedTemplate, setSelectedTemplate] = useState(null);  // State to store selected template

  // Fetch templates when the component mounts
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await axios.get('/templates');
        setTemplates(response.data);  // Set templates in state
        // Set the default selected template as "Minimal"
        const defaultTemplate = response.data.find(template => template.name === 'White');
        setSelectedTemplate(defaultTemplate);  // Set default selected template
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    }

    fetchTemplates();
  }, []);

  // Handle template selection
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);  // Set selected template
  };

  return (
    <div>
      <h1>Select a Template</h1>
      
      {/* Display list of templates as cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            style={{
              width: '200px',
              margin: '10px',
              padding: '20px',
              borderRadius: '10px',
              cursor: 'pointer',
              backgroundColor: template.styles.backgroundColor,
              color: template.styles.textColor,
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3>{template.name}</h3>

            {/* Template button with its own styles */}
            <button
              style={{
                backgroundColor: template.styles.linkStyles.backgroundColor,
                borderRadius: template.styles.linkStyles.borderRadius,
                border: template.styles.linkStyles.border,
                padding: '10px 20px',
                marginTop: '10px',
                color: template.styles.textColor,
              }}
            >
              Sample Button
            </button>
          </div>
        ))}
      </div>

      {/* Display selected template preview */}
      {selectedTemplate && (
        <div
          style={{
            backgroundColor: selectedTemplate.styles.backgroundColor,
            color: selectedTemplate.styles.textColor,
            padding: '20px',
            marginTop: '20px',
            borderRadius: '10px',
          }}
        >
          <h2>Selected Template: {selectedTemplate.name}</h2>
          <button
            style={{
              backgroundColor: selectedTemplate.styles.linkStyles.backgroundColor,
              borderRadius: selectedTemplate.styles.linkStyles.borderRadius,
              border: selectedTemplate.styles.linkStyles.border,
              padding: '10px 20px',
              marginTop: '10px',
              color: selectedTemplate.styles.textColor,
            }}
          >
            Sample Button
          </button>
        </div>
      )}
    </div>
  );
};

export default Design;
