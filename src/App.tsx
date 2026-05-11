/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Starfield from './components/Starfield';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import StartProject from './pages/StartProject';
import Work from './pages/Work';
import Expertise from './pages/Expertise';
import Process from './pages/Process';
import Audit from './pages/Audit';
import Login from './pages/Login';
import BookStrategy from './pages/BookStrategy';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col w-full h-full">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/start-project" element={<StartProject />} />
          <Route path="/work" element={<Work />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/process" element={<Process />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-strategy" element={<BookStrategy />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-[100dvh] text-white font-sans relative overflow-x-hidden bg-[#090A0F] flex flex-col">
        <Starfield />
        
        <div className="relative z-10 flex flex-col flex-1 h-full">
          <Navbar />
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}
