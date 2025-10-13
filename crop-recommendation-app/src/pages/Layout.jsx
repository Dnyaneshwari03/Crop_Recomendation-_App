import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSeedling, FaChartLine, FaInfoCircle, FaSignInAlt } from 'react-icons/fa';
import './Layout.css';

function Layout() {
  const navigate = useNavigate();


  return (
    <>
      <header className="navbar">
        <h1>🌾 Crop Recommendation </h1>
        <nav>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/')}>
            <FaHome /> Home
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/crop-info')}>
            <FaSeedling /> Crop Info
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/recommendation')}>
            <FaChartLine /> Recommendation
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/about')}>
            <FaInfoCircle /> About Us
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/login')}>
            <FaSignInAlt /> Login
          </motion.button>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default Layout;
