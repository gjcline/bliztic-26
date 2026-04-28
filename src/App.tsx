import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PartnerLayout from './components/PartnerLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Expertise from './pages/Expertise';
import About from './pages/About';
import BlogIndex from './pages/blog/index';
import BlogPost from './pages/blog/BlogPost';
import Partner from './pages/Partner';
import Service from './pages/Service';
import Contact from './pages/Contact';
import PartnerLogin from './pages/PartnerLogin';
import Dev from './pages/Dev';
import Fund from './pages/Fund';
import GTM from './pages/GTM';
import GTMFund from './pages/GTMFund';
import AIWorkforce from './pages/AIWorkforce';
import Offers from './pages/Offers';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Qualify from './pages/Qualify';
import Pricing from './pages/Pricing';
import Explore from './pages/Explore';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';

const ExternalRedirect = ({ url }: { url: string }) => {
  React.useEffect(() => {
    window.location.href = url;
  }, [url]);
  return null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Navigate to="/expertise" replace />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/service" element={<Service />} />
          <Route path="/systems-audit" element={<ExternalRedirect url="https://cdr.bliztic.com" />} />
          <Route path="/contact" element={<Navigate to="/qualify" replace />} />
          <Route path="/fund" element={<Fund />} />
          <Route path="/gtm" element={<GTM />} />
          <Route path="/gtm-fund" element={<GTMFund />} />
          <Route path="/ai-workforce" element={<AIWorkforce />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/partner"
          element={
            <PartnerLayout>
              <Partner />
            </PartnerLayout>
          }
        />
        <Route path="/qualify" element={<Qualify />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;