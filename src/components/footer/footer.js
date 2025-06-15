import React from "react";
import { motion } from "framer-motion";
import "./footer.css";
import logo from "../../assets/footer/logo.png";
import videoSrc from "../../assets/footer/video.mp4";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="footer bg-dark text-light d-flex flex-wrap"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Video Section */}
      <div className="footer-video col-md-4">
        <video src={videoSrc} autoPlay muted loop className="w-100" />
      </div>

      {/* Info Section */}
      <div className="footer-content col-md-8 p-4">
        <div className="row">
          {/* Company Info */}
          <div className="footer-column">
            <img src={logo} alt="Logo" className="footer-logo mb-2" />
            <h3 className="text-uppercase">Awesome Cafe</h3>
            <p>
              <FaPhoneAlt className="me-2 icon" /> +92 300 1234567
            </p>
            <p>
              <FaEnvelope className="me-2 icon" /> contact@awesomecafe.com
            </p>
            <p>
              <FaMapMarkerAlt className="me-2 icon" /> 123 Main Street, Karachi
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-column centered">
            <h4 className="text-uppercase">Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Menu</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Timings</a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="footer-column centered">
            <h4 className="text-uppercase">Follow Us</h4>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Timings + Buttons Row */}
        <div className="footer-row mt-4">
          <h4 className="text-uppercase mb-2">Timings</h4>
          <p className="timing-text mb-3">
            Open from Mon to Sun: 10 AM – 10 PM
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn-order">Order Now</button>
            <button className="btn-locate">Locate Us</button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
