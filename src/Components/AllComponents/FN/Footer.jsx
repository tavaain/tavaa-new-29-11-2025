/* eslint-disable no-unused-vars */
import React from "react";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { IoLogoFacebook, IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";
import './Nv.css'

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-grid">
        {/* Logo + About */}
        <div className="footer-col">
          <h3 className="footer-logo">TAVAA</h3>
          <p>
            Modern streetwear redefined with elegance, comfort, and conscious
            design. Each piece is crafted for individuality and timeless style.
          </p>
          <p className="footer-tagline">Wear what is truly yours.</p>

          {/* Social Links */}
          <div className="social-links">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/tavaa.in/?igsh=OGd0OXZoZzNoMzEy#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61579896796255"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.64l.36-4H14V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/NewArrival">New Arrivals</Link>
            </li>
            <li>
              <Link to="/ShopPage">Shop All</Link>
            </li>
            <li>
              <Link to="/About">About Us</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Updates + Policies */}
        <div className="footer-col">
          <h4>Stay Updated</h4>
          <ul className="footer-links">
            <li>
              <Link to="/PrivacyPolicy"> PrivacyPolicy</Link>
            </li>
            <li>
              <Link to="/">Policies</Link>
            </li>
           
            
          </ul>
        </div>

       
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 TAVAA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;