import { motion } from 'motion/react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Audit() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-4 w-full z-10 py-12"
    >
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl text-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 text-sm font-medium mx-auto cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        
        <div className="w-16 h-16 bg-[#ccff00]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#ccff00]">
          <Search size={32} />
        </div>

        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white uppercase">
          Free Site <span className="text-[#ccff00]">Audit.</span>
        </h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          Drop your website URL below and our team will analyze its performance, design, and conversion rate completely free.
        </p>

        <form className="flex flex-col gap-4 text-left">
          <input 
            type="url" 
            placeholder="https://yourwebsite.com" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            required
          />
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            required
          />
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full bg-[#ccff00] text-black font-bold py-4 rounded-xl mt-4 hover:bg-[#b3e600] transition-colors duration-300 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.2)] text-lg"
          >
            Scan Website Now
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
