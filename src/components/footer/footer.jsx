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

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  return (
    <motion.footer
      className="footer bg-dark text-light d-flex flex-wrap"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Video Section */}
      <div className="footer-video col-md-4">
        <video src={videoSrc} autoPlay muted loop className="w-100" />
      </div>

      {/* Info Section */}
      <div className="footer-content col-md-8 p-4">
        <div className="row">
          {/* Company Info */}
          <motion.div
            className="footer-column"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <img src={logo} alt="Logo" className="footer-logo mb-2" />
            <motion.h3 className="text-uppercase" variants={fadeUp}>
              Awesome Cafe
            </motion.h3>
            <p>
              <FaPhoneAlt className="me-2 icon" /> +92 300 1234567
            </p>
            <p>
              <FaEnvelope className="me-2 icon" /> contact@awesomecafe.com
            </p>
            <p>
              <FaMapMarkerAlt className="me-2 icon" /> 123 Main Street, Karachi
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="footer-column centered"
            variants={fadeUp}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-uppercase">Quick Links</h4>
            <ul className="list-unstyled">
              {["Home", "Menu", "About Us", "Contact Us", "Timings"].map(
                (text, index) => (
                  <motion.li
                    key={index}
                    variants={fadeUp}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <a href="#">{text}</a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="footer-column centered"
            variants={fadeUp}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-uppercase">Follow Us</h4>
            <div className="d-flex justify-content-center gap-3 mt-2">
              {[FaFacebook, FaInstagram, FaTwitter].map((Icon, idx) => (
                <motion.a
                  href="#"
                  key={idx}
                  className="social-icon"
                  variants={fadeUp}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timings + Buttons Row */}
        <motion.div
          className="footer-row mt-4"
          variants={fadeUp}
          transition={{ delay: 0.9 }}
        >
          <h4 className="text-uppercase mb-2">Timings</h4>
          <p className="timing-text mb-3">
            Open from Mon to Sun: 10 AM – 10 PM
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <motion.button
              className="btn-order"
              variants={fadeUp}
              transition={{ delay: 1 }}
            >
              Order Now
            </motion.button>
            <motion.button
              className="btn-locate"
              variants={fadeUp}
              transition={{ delay: 1.1 }}
            >
              Locate Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
