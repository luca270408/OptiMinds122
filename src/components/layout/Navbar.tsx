import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BrainCircuit } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Expertise', path: '/expertise' },
    { name: 'Process', path: '/process' },
    { name: 'Audit', path: '/audit' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 w-full z-50">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer relative z-50"
        >
          <div className="bg-[#ccff00] p-1.5 md:p-2 rounded-xl shadow-[0_0_15px_rgba(204,255,0,0.5)]">
            <BrainCircuit size={20} className="text-black" />
          </div>
          <span className="font-light text-lg md:text-xl tracking-widest text-white uppercase">OptiMinds</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-wrap items-center gap-8 text-sm text-gray-300 font-medium z-50">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link to={link.path} className="hover:text-[#ccff00] transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ccff00] transition-all group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
          <motion.button 
            onClick={() => navigate('/book-strategy')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm"
          >
            Book Strategy
          </motion.button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden relative z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#090A0F]/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold tracking-tight h-full overflow-y-auto w-full max-w-sm mx-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full"
                >
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white active:text-[#ccff00] transition-colors block py-3 border-b border-white/10 text-center"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full mt-auto pt-8"
              >
                <button 
                  onClick={() => navigate('/book-strategy')}
                  className="w-full bg-[#ccff00] text-black px-6 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:bg-[#b3e600] transition-colors"
                >
                  Book Strategy
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
