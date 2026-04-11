import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Zine } from './pages/Zine';
import { Post } from './pages/Post';
import { Students } from './pages/Students';
import { Brands } from './pages/Brands';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/zine" element={<Zine />} />
          <Route path="/zine/:slug" element={<Post />} />
          <Route path="/students" element={<Students />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}
