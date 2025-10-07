
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSeedling, FaCalendarAlt, FaInfoCircle, FaSignInAlt } from 'react-icons/fa';
import './Home.css';
import { motion } from 'framer-motion';
import farm1Img from '/assets/farm1.jpg';
import farm2Img from '/assets/farm2.jpg';
import farm3Img from '/assets/farm3.jpg';
import farm4Img from '/assets/farm4.jpg';
import farm5Img from '/assets/farm5.jpg';
import farm6Img from '/assets/farm6.jpg';

const images = [farm1Img, farm2Img, farm3Img, farm4Img, farm5Img, farm6Img];

function Home(){
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div
        className="background-slider"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>

      

      <motion.section
        className="hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="overlay"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to Smart Crop Recommendation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Optimize your farming with smarter recomendation!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/recommendation')}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.section>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@smartcrops.com</p>
            <p>Phone: +91-9876543210</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <motion.span whileHover={{ scale: 1.2 }}>Instagram</motion.span>
              <motion.span whileHover={{ scale: 1.2 }}>Facebook</motion.span>
              <motion.span whileHover={{ scale: 1.2 }}>Twitter</motion.span>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <motion.p whileHover={{ x: 5 }}>Privacy Policy</motion.p>
            <motion.p whileHover={{ x: 5 }}>Terms</motion.p>
            <motion.p whileHover={{ x: 5 }}>Help</motion.p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 Crop Recommendation. | Designed with 💚 for Farmers. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
