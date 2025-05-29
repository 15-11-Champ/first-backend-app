import React from 'react';
import './PricingPage.css';
import { useNavigate } from 'react-router-dom'; // if using React Router

const PricingPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="pricing-container">

      <h1>Choose Your Plan</h1>
      <p>Simple and transparent pricing for your clinic.</p>

      <div className="pricing-cards">
        <div className="card">
          <h2>Starter</h2>
          <p className="desc">For businesses looking to test the power of ClinicSync, good for learning the softwares importance in your clinic</p>
          <p className="price">₹995/mo</p>
          <div className='ul-and-cta-btn'>
          <ul>
            <li>1 Clinic</li>
            <li>Up to 100 Patients</li>
            <li>Limited Support</li>
          </ul>
          <button onClick={handleSignup}>Start Free Trial</button>
          </div>
        </div>

        <div className="card popular">
          <h2>Professional</h2>
          <p className="desc">For small businesses with potential looking to grow their clinic to the next level</p>
          <p className="price">₹4999/mo</p>
          <div className='ul-and-cta-btn'>
          <ul>
            <li>Up to 3 Clinics</li>
            <li>Unlimited Patients</li>
            <li>WhatsApp & SMS Reminders</li>
            <li>Email Support</li>
          </ul>
          <button onClick={handleSignup}>Start Free Trial</button>
          </div>
        </div>

        <div className="card">
          <h2>Enterprise</h2>
          <p className="desc">Enterprise level software with dedicated support, databases and complete security</p>
          <p className="price"></p>
          <div className='ul-and-cta-btn'>
          <ul>
            <li>Unlimited Clinics</li>
            <li>Custom Branding</li>
            <li>Dedicated Support</li>
            <li>Advanced Analytics</li>
          </ul>
          <button onClick={handleSignup}>Contact Us</button>
          </div>
        </div>
      </div>
      <p className='cta-text'>Please purchase a plan to continue using the software.</p>
      
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

export default PricingPage;
