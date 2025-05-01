import React, { useState } from 'react';
import './landing.css';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="landing">
      <header className="landing__header">
        <div className="landing__logo">
          <Link to="/"><img src='logon.png' width={120} height={60} /></Link>
        </div>
        <nav className={`landing__nav ${menuOpen ? 'landing__nav--open' : ''}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#product" onClick={closeMenu}>Product</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="landing__auth">
          <button className="landing__login" onClick={() => navigate('/login')}>Log in</button>
          <button className="landing__signup" onClick={() => navigate('/register')}>Sign up</button>
        </div>

        <div className="landing__hamburger" onClick={toggleMenu}>
          <span className="landing__bar"></span>
          <span className="landing__bar"></span>
          <span className="landing__bar"></span>
        </div>
      </header>

      <section className="landing__hero" id="home">
        <h1 className="landing__hero-title">Welcome To NNadidan's Admin Dashboard</h1>
        <p className="landing__hero-subtitle">A simple Dashboard built with React.js at the frontend, MongoDb, Express js and Node.js at the backend.</p>
        <button className="landing__hero-button" onClick={() => navigate('/register')}>Get Started</button>
      </section>

      {/* Pricing Section */}
      <section className="landing__pricing" id="pricing">
        <h2 className="landing__title">Simple, transparent pricing</h2>
        <p className="landing__subtitle">No hidden fees. Cancel anytime.</p>
        <div className="landing__cards">
          <div className="landing__card">
            <h3 className="landing__plan">Basic</h3>
            <p className="landing__price">$9/mo</p>
            <ul className="landing__features">
              <li>10 bookings</li>
              <li>Basic support</li>
            </ul>
            <button className="landing__button">Get Started</button>
          </div>
          <div className="landing__card">
            <h3 className="landing__plan">Pro</h3>
            <p className="landing__price">$29/mo</p>
            <ul className="landing__features">
              <li>Unlimited bookings</li>
              <li>Priority support</li>
            </ul>
            <button className="landing__button">Get Started</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="landing__faq" id="faq">
        <h2 className="landing__title">Frequently Asked Questions</h2>
        <div className="landing__questions">
          <div className="landing__question">
            <h4>Can I cancel anytime?</h4>
            <p>Yes, you can cancel anytime without penalty.</p>
          </div>
          <div className="landing__question">
            <h4>Is there a free trial?</h4>
            <p>Yes, we offer a 14-day free trial with no credit card required.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <p>© 2025 Nnadidan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './landing.css';

// const LandingPage = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <div className="landingPage">
//       <header className="landingPage__header">
//         <div className="landingPage__logo" onClick={() => navigate('/landing')}>Scheduler</div>

//         <nav className={`landingPage__nav ${menuOpen ? 'landingPage__nav--open' : ''}`}>
//           <a href="#home" onClick={closeMenu}>Home</a>
//           <a href="#features" onClick={closeMenu}>Features</a>
//           <a href="#product" onClick={closeMenu}>Product</a>
//           <a href="#pricing" onClick={closeMenu}>Pricing</a>
//           <a href="#contact" onClick={closeMenu}>Contact</a>
//         </nav>

//         <div className="landingPage__auth">
//           <button className="landingPage__login" onClick={() => navigate('/login')}>Log in</button>
//           <button className="landingPage__signup" onClick={() => navigate('/register')}>Sign up</button>
//         </div>

//         <div className="landingPage__hamburger" onClick={toggleMenu}>
//           <span className="landingPage__bar"></span>
//           <span className="landingPage__bar"></span>
//           <span className="landingPage__bar"></span>
//         </div>
//       </header>

//       <section className="landingPage__hero" id="home">
//         <h1 className="landingPage__hero-title">Simplify Your Scheduling</h1>
//         <p className="landingPage__hero-subtitle">Manage bookings, meetings, and appointments easily with Scheduler.</p>
//         <button className="landingPage__hero-button" onClick={() => navigate('/register')}>Get Started</button>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;
