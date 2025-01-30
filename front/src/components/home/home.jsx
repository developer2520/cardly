import React, { useState } from 'react';
import './home.css';

export default function Home() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const Login = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <main className="homeContainer">
      {/* Hero Section */}
      <section className="heroSection">
        <div className="textContent">
        <h1 className="heroTitle">
  {"Launch Your Site In Seconds".split("").map((char, index) => (
    <span key={index}>{char}</span>
  ))}
</h1>

          
          
          {/* Custom Input Field */}
          <div className="customInputContainer">
            <div className="inputContainerInput">
            <span className="baseUrl">cardly.uz/</span>
  <input
    type="text"
    className="usernameInput"
    placeholder="yourname"
    value={username}
    onChange={handleInputChange}
    autoComplete="off"
  />

            </div>

            <button className="ctaButton" onClick={Login}>Secure Your Link</button>
  
</div>

          
          {/* Call to Action Button */}
          
          <p className='rec'>It’s free, and takes less than a minute</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="featuresSection">
        <h2 className="featuresTitle">What Makes Cardly Different?</h2>
        <ul className="featuresList">
          <li className="featureItem">
            <span className="featureIcon">🔗</span>
            <h3>All-in-One Links</h3>
            <p>Bring your most important links together in one place.</p>
          </li>
          <li className="featureItem">
            <span className="featureIcon">📈</span>
            <h3>Analytics That Matter</h3>
            <p>Track clicks and insights to grow your audience.</p>
          </li>
          <li className="featureItem">
            <span className="featureIcon">⚡</span>
            <h3>Lightning Fast</h3>
            <p>Quick to set up, easy to share—effortless for you and your audience.</p>
          </li>
        </ul>
      </section>
    </main>
  );
}
