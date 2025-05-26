// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import additional Font Awesome icons
import { faPills, faDatabase, faMagic, faCode, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


// Add icons to the library
library.add(fab, faPills, faDatabase, faMagic, faCode, faMobileAlt);

const Pricing = () => {
  // State for carousel
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNav, setActiveNav] = useState('pricing');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get('gclid') || '';
    console.log('GCLID:', gclid); // Log the GCLID value
    localStorage.setItem('gclid', gclid);
  }, []);
  


  const slides = [
    {
      icon: ['fab', 'react'],
      title: 'React',
      description: 'Build interactive UIs with ease using React’s component-based architecture.',
    },
    {
      icon: ['fab', 'google'],
      title: 'Google Cloud',
      description: 'Leverage scalable cloud infrastructure and services to deploy your applications.',
    },
    {
      icon: 'database', // Placeholder for Firebase
      title: 'Firebase',
      description: 'Utilize real-time databases and authentication services to manage your backend effortlessly.',
    },
    {
      icon: ['fab', 'github'],
      title: 'GitHub',
      description: 'Collaborate and manage your codebase efficiently with GitHub’s version control system.',
    },
    {
      icon: ['fab', 'python'],
      title: 'Python',
      description: 'Implement robust backend logic and data processing with Python’s versatile capabilities.',
    },
  ];

  const messages = [
    "Collect Customer Data and make Data Driven Decisions.",
    'Streamline your Clinic Operations with AI.',
    'Make your Clinic more efficient and profitable.',
  ];

  const episodes = [
    {
      title: 'Introduction to Collecting Customer Data',
      description: 'Accelerate your business by understanding Customer demands and preferences.',
      videoId: '8HslUzw35mc?si=k8Cv9HNmZFeUJnUj', // Replace with actual YouTube video ID
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(slideInterval);
    };
  }, [slides.length]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveNav(id);
    }
  };

  const handleNavClick = (id) => {
    scrollToSection(id);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="unauth-homepage">
      {/* Navigation Bar */}
      <nav className="unauth-navbar">
        <div className="unauth-logo" onClick={() => handleNavClick('home')}>
          <FontAwesomeIcon icon="pills" className="unauth-header-icon" /> ClinicSync
        </div>
        <ul className="unauth-nav-links">
          <li
            className={activeNav === 'features' ? 'active' : ''}
            onClick={() => handleNavClick('features')}
          >
            Features
          </li>
          <li
            className={activeNav === 'tech-stack' ? 'active' : ''}
            onClick={() => handleNavClick('tech-stack')}
          >
            Tech Stack
          </li>
          <li
            className={activeNav === 'pricing' ? 'active' : ''}
            onClick={() => handleNavClick('pricing')}
          >
            Pricing
          </li>
          <li
            className={activeNav === 'testimonials' ? 'active' : ''}
            onClick={() => handleNavClick('testimonials')}
          >
            Testimonials
          </li>
          <li
            className={activeNav === 'cta' ? 'active' : ''}
            onClick={() => goToLogin('logins')}
          >
            Get Started
          </li>
          <li
            className={activeNav === 'logins' ? 'active' : ''}
            onClick={() => goToLogin('logins')}
          >
            Login
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="unauth-hero-section" id="home">
        <div className="unauth-hero-content">
          <h1>
            <FontAwesomeIcon icon="pills" className="unauth-header-icon" /> Transform your Clinic and make Data Driven Decisions.
          </h1>
          <p>Leverage the power of AI to streamline your backend development process.</p>
          <Link to="/signup" className="unauth-cta-button">
            Get started ☕
          </Link>
        </div>
      </header>
      {/* Scrolling Text Banner */}
      <section className="unauth-scrolling-banner">
        <div className="scrolling-text">
          {messages.map((message, index) => (
            <span key={index}>{message}</span>
          ))}
        </div>
      </section>

      {/* Prices Section */}
            <section className="unauth-features" id="features">
              <h2>Features</h2>
              <div className="unauth-features-grid">
                <div className="unauth-feature-item">
                  <FontAwesomeIcon icon="magic" size="3x" className="unauth-feature-icon" />
                  <h3>AT Automation</h3>
                  <p>Automate repetitive tasks and focus on what matters most.</p>
                </div>
                <div className="unauth-feature-item">
                  <FontAwesomeIcon icon="code" size="3x" className="unauth-feature-icon" />
                  <h3>Data Analytics</h3>
                  <p>Analyze customer data to make informed decisions.</p>
                </div>
                <div className="unauth-feature-item">
                  <FontAwesomeIcon icon="mobile-alt" size="3x" className="unauth-feature-icon" />
                  <h3>Responsive Design</h3>
                  <p>Ease of use and accessibility.</p>
                </div>
              </div>
            </section>

      {/* Parallax Section */}
      <section className="unauth-parallax">
        <div className="unauth-parallax-content">
          <h2>Seamless Integration</h2>
          <p>Integrate with your favorite tools and platforms effortlessly.</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="unauth-cta" id="cta">
        <h2>Ready to Transform Your Clinic?</h2>
        <Link to="/signup" className="unauth-cta-button">
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="unauth-footer">
        <div className="unauth-footer-content">
          <p>&copy; {new Date().getFullYear()} ClinicSync. All rights reserved.</p>
          <ul className="unauth-footer-links">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;