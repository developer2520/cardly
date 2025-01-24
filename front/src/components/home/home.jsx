import React from 'react'
import { FaLink, FaShareAlt, FaUsers } from 'react-icons/fa';
import './home.css';

export default function Home() {
  return (
    <div className="homeContainer">
      <div className="heroSection">
        {/* Main Content */}
        <div className="textContent">
          <h1 className="heroTitle">Your Links, One Card</h1>
          <p className="heroDescription">
            Cardly makes it easy to connect your audience to everything you do—beautifully, effortlessly, and in one place. Share your content with style, grow your brand, and make every link count.
          </p>
          <button className="ctaButton">Get Started for Free</button>
        </div>

        {/* Hero Image */}
        <div className="imageContent">
          <img
            src="https://via.placeholder.com/450x600?text=Preview+of+Your+Link+Card"
            alt="Cardly Preview"
            className="heroImage"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="featuresSection">
        <h2>Why Choose Cardly?</h2>
        <div className="featuresGrid">
          <div className="featureCard">
            <FaLink className="featureIcon" />
            <h3>Unlimited Links</h3>
            <p>Connect all your important links in one easy-to-share place.</p>
          </div>
          <div className="featureCard">
            <FaShareAlt className="featureIcon" />
            <h3>Easy Sharing</h3>
            <p>Share your Cardly page across all your platforms seamlessly.</p>
          </div>
          <div className="featureCard">
            <FaUsers className="featureIcon" />
            <h3>Audience Insights</h3>
            <p>Get analytics to understand your audience and improve engagement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}