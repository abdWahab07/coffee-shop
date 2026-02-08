import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import video from "../../assets/navbar/Brown and Gold Modern Border Decorative Coffee Beans Coming Soon Video.mp4";
import logo from "../../assets/navbar/logo.png";
import donutImage from "../../assets/navbar/donut.png";
import "./navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";

const linkVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2 },
  }),
};
const TypewriterText = () => {
  const text1 = "Welcome to";
  const text2 = "Coffee Shop";
  const [displayed, setDisplayed] = React.useState("");
  const [index, setIndex] = React.useState(0);

  const fullText = `${text1}\n${text2}`;

  React.useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <h1>
      <span className="white-text">{displayed.split("\n")[0]}</span>
      <br />
      <span className="orange-text">{displayed.split("\n")[1] || ""}</span>
    </h1>
  );
};

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home" || location.pathname === "/";
  const isContactPage = location.pathname === "/contact-us";
  const { cartItemCount, openCart } = useCart();

  return (
    <>
      {/* Video elements only show on home page */}
      {isHomePage && !isContactPage && (
        <div className="video-container">
          <motion.img
            src={donutImage}
            alt="Donut"
            className="donut-img"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, duration: 1.5 }}
          />
          <motion.video
            autoPlay
            muted
            loop
            className="background-video"
            initial={{ filter: "blur(20px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>

          <motion.div
            className="video-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <h1>
              <TypewriterText />
            </h1>

            <div className="video-buttons">
              <NavLink to="/our-menu" className="btn-view-menu">
                View Menu
              </NavLink>
              <NavLink to="/special-offers" className="btn-special-offers">
                Special Offers
              </NavLink>
            </div>
          </motion.div>
        </div>
      )}

      {/* Navbar always shows */}
      <motion.nav
        className={`navbar navbar-expand-lg navbar-dark px-5 text-uppercase ${
          isHomePage ? "custom-navbar" : "solid-navbar"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container-fluid">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <NavLink className="navbar-brand" to="/home">
              <img src={logo} alt="Logo" height="100" />
            </NavLink>
          </motion.div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              {[
                { label: "Home", path: "/home" },
                { label: "Our Menu", path: "/our-menu" },
                { label: "Our Store", path: "/our-store" },
                { label: "Contact Us", path: "/contact-us" },
              ].map((link, i) => (
                <motion.li
                  className="nav-item px-5 text-uppercase"
                  key={link.path}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <NavLink
                    className="nav-link"
                    to={link.path}
                    style={({ isActive }) => ({
                      color: isActive ? "#ff8500" : "white",
                    })}
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                className="nav-item text-uppercase position-relative"
                custom={5}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  className="nav-link btn btn-link"
                  onClick={openCart}
                  style={{ color: "white" }}
                >
                  <FaShoppingCart size={30} />
                  {cartItemCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
