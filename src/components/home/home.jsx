import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

import donut from "../../assets/navbar/donut.png";
import crosant from "../../assets/navbar/crosant.png";
import offerOne from "../../assets/home/offer_1.jpg";
import offerTwo from "../../assets/home/offer_2.jpg";
import offerThree from "../../assets/home/offer_3.jpg";
import SmCollage from "../sm-collage/sm-collage";

import "./home.css";

const Home = () => {
  const donutControls = useAnimation();
  const croissantControls = useAnimation();
  const stopRef = useRef(null);

  useEffect(() => {
    const entryAnimation = {
      x: 0,
      opacity: 1,
      rotate: [0, -5, 5, -3, 0],
      scale: [0.5, 1.1, 0.95, 1.03, 1],
      transition: { type: "keyframes", duration: 1.5 },
    };

    donutControls.start(entryAnimation);
    croissantControls.start({ ...entryAnimation, rotate: [0, 5, -5, 3, 0] });

    const handleScroll = () => {
      const stopY =
        window.scrollY +
        (stopRef.current?.getBoundingClientRect().top || 0) -
        100;
      if (window.scrollY < stopY) {
        const offset = window.scrollY / 2;
        const rotation = window.scrollY / 10;
        donutControls.start({ y: offset, rotate: rotation });
        croissantControls.start({ y: offset, rotate: -rotation });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [donutControls, croissantControls]);

  const limitedOffers = [
    { img: offerOne, title: "Pumpkin Spice Latte" },
    { img: offerTwo, title: "Summer Berry Chill" },
    { img: offerThree, title: "Maple Glazed Donut" },
  ];

  return (
    <div>
      {/* Animated Donut and Croissant */}
      <motion.img
        src={donut}
        alt="Awaken Your Taste Buds"
        initial={{ x: 300, opacity: 0, scale: 0.5, rotate: 0 }}
        animate={donutControls}
        className="animated-img right-img"
      />
      <motion.img
        src={crosant}
        alt="Awaken Your Taste Buds"
        initial={{ x: -300, opacity: 0, scale: 0.5, rotate: 0 }}
        animate={croissantControls}
        className="animated-img left-img"
      />

      {/* Product Section */}
      <h1 className="flavor-heading text-center pt-5">
        Elevate Your Flavor Game
      </h1>
      <div className="home-container">
        <div className="home-text-section p-5">
          <h2>Our Product</h2>
          <p>
            Discover Coffee Shop's Flavorful Journey. <br />
            Coffee Shop®, known for our freshly brewed coffee and scrumptious
            and tempting food. Experience that warm fuzzy feeling with your
            favourite brews and bites to make your day!
          </p>
          <button className="menu-button">See Complete Menu</button>
        </div>
      </div>

      <div ref={stopRef} className="scroll-stop" />

      {/* Limited Time Offers */}
      <div className="limited-offers-section py-5 px-4">
        <h2 className="limited-heading text-center mb-4">Explore our</h2>
        <h1 className="limited-subheading text-center mb-5">
          Limited Time Offers
        </h1>
        <div className="limited-cards-container">
          {limitedOffers.map(({ img, title }, idx) => (
            <motion.div
              className="limited-card"
              key={idx}
              initial={{ y: 50, opacity: 0, rotate: -2 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.2,
                type: "spring",
                stiffness: 80,
              }}
              viewport={{ once: true }}
            >
              <img src={img} alt={title} />
              <h4>{title}</h4>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="menu-button menu-button-hover text-uppercase">
            View Complete Menu
          </button>
        </div>
      </div>

      {/* Email Signup */}
      {/* <div className="signup-section">
        <div className="signup-text">
          <h2>NEVER MISS A GOOD DEAL AND DISCOUNT</h2>
          <p className="text-lowercase">SIGN UP FOR OUR EMAIL LIST TODAY!</p>
        </div>
        <div className="signup-form">
          <div className="input-group d-flex justify-content-center align-item-center">
            <input type="email" placeholder="Enter your email" />
            <button className="text-uppercase">Join</button>
          </div>
        </div>
      </div> */}

      {/* instagram videos grid */}
      <SmCollage></SmCollage>
    </div>
  );
};

export default Home;
