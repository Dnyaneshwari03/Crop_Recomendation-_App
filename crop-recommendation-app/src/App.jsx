
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CropInfo from './pages/CropInfo';

import About from './pages/About';
import Login from './pages/Login';
import Layout from './pages/Layout';
import './App.css';
import CropPredictor from './pages/CropPredictor';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/crop-info" element={<CropInfo />} />
          <Route path="/recommendation" element={<CropPredictor/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
