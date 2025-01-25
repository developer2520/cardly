import React from 'react';
import './home.css';

export default function Home() {
  const Login = () => {
    window.location.href = 'http://localhost:4000/auth/google';

  }
  return (
    <main className="homeContainer">
      {/* Hero Section */}
      <section className="heroSection">
        <div className="textContent">
          <h1 className="heroTitle">Managa all of your links</h1>
          <p className="heroDescription">
            Cardly helps you centralize your links in a single, shareable page. 
            It's simple, stylish, and impactful—just like you.
          </p>
          <button className="ctaButton" onClick={Login}>Get Started for Free</button>
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
