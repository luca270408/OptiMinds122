import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StartProject() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-4 w-full z-10"
    >
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">
          START YOUR <span className="text-[#ccff00]">PROJECT.</span>
        </h2>
        <p className="text-gray-400 mb-8">
          Tell us about your vision. We'll engineer the digital presence you deserve.
        </p>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="First Name" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
          />
          <textarea 
            placeholder="Project Details" 
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
          ></textarea>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full bg-[#ccff00] text-black font-bold py-4 rounded-xl mt-4 hover:bg-[#b3e600] transition-colors duration-300 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.2)]"
          >
            Submit Request
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
