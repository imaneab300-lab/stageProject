import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Placeholder routes for nav links */}
          <Route path="/vault" element={<Home />} />
          <Route path="/signal" element={<Home />} />
          <Route path="/protocol" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
