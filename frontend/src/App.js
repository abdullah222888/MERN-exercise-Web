// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import AboutUs from './components/AboutUs.jsx';
import Contact from './components/Contact.jsx';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/about" element={ <AboutUs/> } />
          <Route path="/contact" element={ <Contact/> } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
