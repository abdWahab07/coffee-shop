import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWifi, FaParking, FaCoffee, FaUtensils, FaStar, FaHeart, FaShareAlt } from "react-icons/fa";
import "./store.css";

const Store = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const stores = [
    {
      id: 1,
      name: "Coffee Shop Downtown",
      address: "123 Main Street, Downtown",
      city: "Karachi",
      phone: "+92 21 3456789",
      email: "downtown@coffeeshop.pk",
      rating: 4.8,
      reviews: 234,
      image: "https://lh3.googleusercontent.com/p/AF1QipOLLjkbJB0sMfhOg7_LPMSwO_2O5OFymF2jgkVC=s680-w680-h510-rw",
      features: ["wifi", "parking", "drive-thru", "delivery"],
      hours: {
        weekdays: "6:00 AM - 11:00 PM",
        weekends: "7:00 AM - 12:00 AM"
      },
      coordinates: { lat: 24.8607, lng: 67.0011 }
    },
    {
      id: 2,
      name: "Coffee Shop Clifton",
      address: "456 Beach Avenue, Block 5",
      city: "Karachi",
      phone: "+92 21 3456790",
      email: "clifton@coffeeshop.pk",
      rating: 4.9,
      reviews: 189,
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoCbAbk3rGUaIWyAjnJGdvZ0H5M64UtpL2Zkx7-bsdOyXipY_bZN8negnKAg6KX3cCwjjsg6SMDaFnjVq7IsiWOTZ6RRe8bIFMg4llkavQBia0iqD_psn0K41KYXYQ_sAtZ-ii1LmxdoFOw=w260-h175-n-k-no",
      features: ["wifi", "parking", "drive-thru", "outdoor-seating"],
      hours: {
        weekdays: "6:00 AM - 11:00 PM",
        weekends: "7:00 AM - 12:00 AM"
      },
      coordinates: { lat: 24.8279, lng: 67.0345 }
    },
    {
      id: 3,
      name: "Coffee Shop DHA",
      address: "789 Phase 8, DHA",
      city: "Karachi",
      phone: "+92 21 3456791",
      email: "dha@coffeeshop.pk",
      rating: 4.7,
      reviews: 156,
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerqzVWH79m0KrLzj7rxsnL1Z3F4EULrziYvqKFMV2vo675EHy_75BXfgGSjw78TrtHlJwlRUl7sc08CaIrkNnWEI88n6uDjt1jmuvgM_1REon7LgoGvl3Sn_nZ94stdJ01Tu_G6pQncQrc=w260-h175-n-k-no",
      features: ["wifi", "parking", "drive-thru", "family-friendly"],
      hours: {
        weekdays: "6:00 AM - 11:00 PM",
        weekends: "7:00 AM - 12:00 AM"
      },
      coordinates: { lat: 24.8269, lng: 67.0846 }
    },
    {
      id: 4,
      name: "Coffee Shop Gulshan",
      address: "321 Gulshan-e-Iqbal",
      city: "Karachi",
      phone: "+92 21 3456792",
      email: "gulshan@coffeeshop.pk",
      rating: 4.6,
      reviews: 201,
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq0w8E8O12goomOPjVpFD7nn6ZPO_zbetibmX0KD5dkzzcLkWgfyWhIVMjtb5O7tqeYpgkP7AxhxJPmx1EdHo9N7L-sO3UsEwVDdQkvQEzpH_I9kwoLvHswVmiXxPB63uSy-j1LO4RYVZSt=w260-h175-n-k-no",
      features: ["wifi", "parking", "24-hours", "delivery"],
      hours: {
        weekdays: "24 Hours",
        weekends: "24 Hours"
      },
      coordinates: { lat: 24.9376, lng: 67.1368 }
    },
    {
      id: 5,
      name: "Coffee Shop Lahore",
      address: "555 Mall Road, Liberty Market",
      city: "Lahore",
      phone: "+92 42 3456789",
      email: "lahore@coffeeshop.pk",
      rating: 4.8,
      reviews: 267,
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqtpoDuQYRpkJ616ECcsEiDDy3m9gG0Jj8FNdkewFkOdknIeyk3AABmYl0-ghJJe8X37g5dNc91y-juWeInUiEij1mvyoyby33G51nPj7_eEPpkgnkkOPlNCSpnONRzSPR_qBgZrmMnWniX=w260-h175-n-k-no",
      features: ["wifi", "parking", "drive-thru", "outdoor-seating"],
      hours: {
        weekdays: "6:00 AM - 11:00 PM",
        weekends: "7:00 AM - 12:00 AM"
      },
      coordinates: { lat: 31.4968, lng: 74.3294 }
    },
    {
      id: 6,
      name: "Coffee Shop Islamabad",
      address: "888 F-7 Markaz",
      city: "Islamabad",
      phone: "+92 51 3456789",
      email: "islamabad@coffeeshop.pk",
      rating: 4.9,
      reviews: 198,
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepLL4ikmY6uVG-fz-m1aJ48xPllXUD6N8wb2Kz6pZKekfxhb3aoWKM9W266S5lUxcddRYnDiwGRXYoYCTXxA-fVORcEF23x1FzsytJns7XFUDgPZzL_KXOYzHIkvMeC3lkmEPbwaW_m6B8t=s680-w680-h510-rw",
      features: ["wifi", "parking", "drive-thru", "family-friendly"],
      hours: {
        weekdays: "6:00 AM - 11:00 PM",
        weekends: "7:00 AM - 12:00 AM"
      },
      coordinates: { lat: 33.6844, lng: 73.0479 }
    }
  ];

  const features = [
    { id: "wifi", name: "Free WiFi", icon: <FaWifi /> },
    { id: "parking", name: "Parking", icon: <FaParking /> },
    { id: "drive-thru", name: "Drive-Thru", icon: <FaCoffee /> },
    { id: "delivery", name: "Delivery", icon: <FaUtensils /> },
    { id: "outdoor-seating", name: "Outdoor Seating", icon: <FaCoffee /> },
    { id: "family-friendly", name: "Family Friendly", icon: <FaHeart /> },
    { id: "24-hours", name: "24 Hours", icon: <FaClock /> }
  ];

  const filteredStores = activeFilter === "all" 
    ? stores 
    : stores.filter(store => store.features.includes(activeFilter));

  const getFeatureIcon = (featureId) => {
    const feature = features.find(f => f.id === featureId);
    return feature ? feature.icon : null;
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  const handleCloseModal = () => {
    setSelectedStore(null);
  };

  return (
    <div className="store-page">
      {/* Hero Section */}
      <section className="store-hero">
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Our Stores</h1>
          <p className="hero-subtitle">Find your nearest Coffee Shop location and enjoy your favorite coffee and treats</p>
        </motion.div>
      </section>

      {/* Features Filter */}
      <section className="features-filter">
        <div className="container">
          <motion.div
            className="filter-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="filter-title">Filter by Features</h2>
            <p className="filter-subtitle">Find stores with the amenities you need</p>
          </motion.div>
          
          <div className="filter-buttons">
            <motion.button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Stores
            </motion.button>
            {features.map((feature) => (
              <motion.button
                key={feature.id}
                className={`filter-btn ${activeFilter === feature.id ? "active" : ""}`}
                onClick={() => setActiveFilter(feature.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature.icon}
                <span>{feature.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="stores-section">
        <div className="container">
          <motion.div
            className="stores-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="stores-title">Our Locations</h2>
            <p className="stores-subtitle">{filteredStores.length} stores found</p>
          </motion.div>

          <div className="stores-grid">
            {filteredStores.map((store, index) => (
              <motion.div
                key={store.id}
                className="store-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleStoreClick(store)}
              >
                <div className="store-image">
                  {store.image ? (
                    <img 
                      src={store.image} 
                      alt={store.name}
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${store.name.toLowerCase().replace(' ', '-')}/400/300.jpg`;
                      }}
                    />
                  ) : (
                    <div className="store-image-placeholder">
                      <FaCoffee className="placeholder-icon" />
                      <span>{store.name}</span>
                    </div>
                  )}
                  <div className="store-overlay">
                    <motion.button
                      className="view-store-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
                
                <div className="store-info">
                  <h3 className="store-name">{store.name}</h3>
                  <p className="store-address">{store.address}</p>
                  <p className="store-city">{store.city}</p>
                  
                  <div className="store-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(store.rating) ? "star filled" : "star empty"}
                        />
                      ))}
                    </div>
                    <span className="rating-text">{store.rating} ({store.reviews} reviews)</span>
                  </div>
                  
                  <div className="store-features">
                    {store.features.slice(0, 3).map((featureId) => (
                      <div key={featureId} className="feature-tag">
                        {getFeatureIcon(featureId)}
                      </div>
                    ))}
                    {store.features.length > 3 && (
                      <div className="feature-tag more">+{store.features.length - 3}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Stats - Beautiful Section */}
      <section className="store-stats">
        {/* Floating Elements */}
        <div className="floating-element floating-element-1"></div>
        <div className="floating-element floating-element-2"></div>
        
        <div className="container">
          {/* Section Header */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2>Our Impact</h2>
            <p>Serving communities with excellence and passion across the nation</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {/* Cities Stat */}
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="stat-icon">
                <FaMapMarkerAlt />
              </div>
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                viewport={{ once: true }}
              >
                6+
              </motion.div>
              <div className="stat-label">Cities</div>
              <div className="stat-subtitle">Growing presence</div>
            </motion.div>

            {/* Stores Stat */}
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="stat-icon">
                <FaCoffee />
              </div>
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                viewport={{ once: true }}
              >
                50+
              </motion.div>
              <div className="stat-label">Stores</div>
              <div className="stat-subtitle">Premium locations</div>
            </motion.div>

            {/* Happy Customers Stat */}
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="stat-icon">
                <FaHeart />
              </div>
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                1M+
              </motion.div>
              <div className="stat-label">Happy Customers</div>
              <div className="stat-subtitle">Satisfied daily</div>
            </motion.div>

            {/* Service Stat */}
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="stat-icon">
                <FaClock />
              </div>
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                viewport={{ once: true }}
              >
                24/7
              </motion.div>
              <div className="stat-label">Service</div>
              <div className="stat-subtitle">Always available</div>
            </motion.div>
          </div>

          {/* Bottom Decorative Line */}
          <motion.div
            className="decorative-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          ></motion.div>
        </div>
      </section>

      {/* Store Modal */}
      {selectedStore && (
        <motion.div
          className="store-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="store-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>{selectedStore.name}</h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedStore.image} alt={selectedStore.name} />
              </div>
              
              <div className="modal-info">
                <div className="info-section">
                  <h4>Location</h4>
                  <p>{selectedStore.address}</p>
                  <p>{selectedStore.city}</p>
                </div>
                
                <div className="info-section">
                  <h4>Contact</h4>
                  <p><FaPhone /> {selectedStore.phone}</p>
                  <p><FaEnvelope /> {selectedStore.email}</p>
                </div>
                
                <div className="info-section">
                  <h4>Hours</h4>
                  <p><FaClock /> Weekdays: {selectedStore.hours.weekdays}</p>
                  <p><FaClock /> Weekends: {selectedStore.hours.weekends}</p>
                </div>
                
                <div className="info-section">
                  <h4>Features</h4>
                  <div className="modal-features">
                    {selectedStore.features.map((featureId) => (
                      <div key={featureId} className="feature-tag">
                        {getFeatureIcon(featureId)}
                        <span>{features.find(f => f.id === featureId)?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <motion.button
                    className="action-btn primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaMapMarkerAlt /> Get Directions
                  </motion.button>
                  <motion.button
                    className="action-btn secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPhone /> Call Store
                  </motion.button>
                  <motion.button
                    className="action-btn secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaShareAlt /> Share
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Store;
