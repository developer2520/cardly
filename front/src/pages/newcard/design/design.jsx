import React, { useState } from "react";
import { Check } from "lucide-react";
import './design.css'

const DesignTemplatesTab = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");

  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple design with focus on content",
      preview: {
        backgroundClass: "template-minimal-bg",
        buttonClass: "template-minimal-button",
      },
    },
    {
      id: "gradient",
      name: "Gradient",
      description: "Modern look with beautiful gradient backgrounds",
      preview: {
        backgroundClass: "template-gradient-bg",
        buttonClass: "template-gradient-button",
      },
    },
    {
      id: "dark",
      name: "Dark Mode",
      description: "Sleek dark theme for a professional look",
      preview: {
        backgroundClass: "template-dark-bg",
        buttonClass: "template-dark-button",
      },
    },
  ];

  return (
    <div className="design-templates-tab">
      <h2 className="heading">Choose a template</h2>
      <div className="templates-container">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${
              selectedTemplate === template.id ? "template-selected" : ""
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className={`template-preview ${template.preview.backgroundClass}`}>
              <div className="profile-section">
                <div className="profile-picture">
                  <img
                    src="/api/placeholder/96/96"
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
                <h3 className="profile-name">John Doe</h3>
                <p className="profile-title">Digital Creator & Content Writer</p>
              </div>
              <div className="preview-buttons">
                {["Instagram", "Twitter", "Website", "YouTube"].map((label) => (
                  <div key={label} className={`button ${template.preview.buttonClass}`}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="template-info">
              <h3 className="template-name">{template.name}</h3>
              <p className="template-description">{template.description}</p>
            </div>
            {selectedTemplate === template.id && (
              <div className="selected-indicator">
                <div className="check-icon">
                  <Check size={16} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignTemplatesTab;
