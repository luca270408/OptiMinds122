import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-4 w-full z-10"
    >
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        
        <h2 className="text-3xl font-black tracking-tighter mb-2 text-white">
          CLIENT <span className="text-[#ccff00]">PORTAL</span>
        </h2>
        <p className="text-gray-400 mb-8 text-sm font-medium">
          Sign in to access your project dashboard and assets.
        </p>

        <form className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
          />
          <div className="flex justify-between items-center text-sm mt-2 mb-4">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="accent-[#ccff00]" />
              Remember me
            </label>
            <a href="#" className="text-[#ccff00] hover:underline font-medium">Forgot Password?</a>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          >
            Sign In
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
