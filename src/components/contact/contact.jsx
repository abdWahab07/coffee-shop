import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  // Add class to body when on contact page
  useEffect(() => {
    document.body.classList.add('contact-page-active');
    return () => {
      document.body.classList.remove('contact-page-active');
    };
  }, []);

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setSubmitStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      details: ["123 Coffee Street", "Beverage City, BC 12345", "Pakistan"],
      image: "https://lh3.googleusercontent.com/p/AF1QipOLLjkbJB0sMfhOg7_LPMSwO_2O5OFymF2jgkVC=s680-w680-h510-rw"
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: ["+92 300 1234567", "+92 21 3456789", "Mon-Sat: 8AM-10PM"],
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoCbAbk3rGUaIWyAjnJGdvZ0H5M64UtpL2Zkx7-bsdOyXipY_bZN8negnKAg6KX3cCwjjsg6SMDaFnjVq7IsiWOTZ6RRe8bIFMg4llkavQBia0iqD_psn0K41KYXYQ_sAtZ-ii1LmxdoFOw=w260-h175-n-k-no"
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: ["info@coffeeshop.pk", "support@coffeeshop.pk", "franchise@coffeeshop.pk"],
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerqzVWH79m0KrLzj7rxsnL1Z3F4EULrziYvqKFMV2vo675EHy_75BXfgGSjw78TrtHlJwlRUl7sc08CaIrkNnWEI88n6uDjt1jmuvgM_1REon7LgoGvl3Sn_nZ94stdJ01Tu_G6pQncQrc=w260-h175-n-k-no"
    },
    {
      icon: <FaClock />,
      title: "Business Hours",
      details: ["Monday-Friday: 6AM-11PM", "Saturday-Sunday: 7AM-12AM", "Holidays: 8AM-10PM"],
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq0w8E8O12goomOPjVpFD7nn6ZPO_zbetibmX0KD5dkzzcLkWgfyWhIVMjtb5O7tqeYpgkP7AxhxJPmx1EdHo9N7L-sO3UsEwVDdQkvQEzpH_I9kwoLvHswVmiXxPB63uSy-j1LO4RYVZSt=w260-h175-n-k-no"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "#", label: "Facebook" },
    { icon: <FaTwitter />, url: "#", label: "Twitter" },
    { icon: <FaInstagram />, url: "#", label: "Instagram" },
    { icon: <FaYoutube />, url: "#", label: "YouTube" }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Get In Touch</h1>
          <p className="hero-subtitle">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
        </motion.div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Contact Information</h2>
            <p className="section-subtitle">Multiple ways to reach us</p>
          </motion.div>

          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-info-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="contact-card-image">
                  {imageErrors[index] ? (
                    <div className="image-placeholder">
                      <div className="placeholder-icon">{info.icon}</div>
                      <span>{info.title}</span>
                    </div>
                  ) : (
                    <img 
                      src={info.image} 
                      alt={info.title}
                      onError={() => handleImageError(index)}
                    />
                  )}
                  <div className="contact-icon">{info.icon}</div>
                </div>
                <div className="contact-card-content">
                  <h3 className="contact-title">{info.title}</h3>
                  <div className="contact-details">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="contact-detail">{detail}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-container">
            <motion.div
              className="form-header"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-subtitle">Fill out the form below and we'll get back to you</p>
            </motion.div>

            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="franchise">Franchise Inquiry</option>
                    <option value="catering">Catering Order</option>
                    <option value="careers">Careers</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              {submitStatus && (
                <motion.div
                  className={`form-status ${submitStatus.includes("Thank you") ? "success" : "error"}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <motion.div
          className="map-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="map-container">
            <div className="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.123456789!2d74.3294!3d31.4968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI5JzQ2LjgiTiA3NMKzMTknNDkuNCJF!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coffee Shop Lahore Location Map"
              />
            </div>
            <div className="map-overlay">
              <div className="map-info">
                <FaMapMarkerAlt className="map-marker" />
                <h3>Our Location</h3>
                <p>Coffee Shop Lahore, Mall Road, Liberty Market, Pakistan</p>
                <motion.button
                  className="directions-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://maps.google.com/maps?q=Coffee+Shop+Lahore+Liberty+Market', '_blank')}
                >
                  Get Directions
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social Media Section */}
      <section className="social-section">
        <div className="container">
          <motion.div
            className="social-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="social-title">Follow Us</h2>
            <p className="social-subtitle">Stay connected for updates and special offers</p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="social-link"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
