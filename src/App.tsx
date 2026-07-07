import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Students } from './pages/Students';
import { Payouts } from './pages/Payouts';
import { Contact } from './pages/Contact';
import { JoinNow } from './pages/JoinNow';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/students" element={<Students />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/brands" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-now" element={<JoinNow />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}
