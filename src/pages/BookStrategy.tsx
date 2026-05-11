import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BookStrategy() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col xl:flex-row items-center justify-center gap-12 px-4 w-full max-w-6xl mx-auto z-10 py-12"
    >
      <div className="w-full xl:w-1/2 flex flex-col items-start text-left">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase">
          Book a <br/><span className="text-[#ccff00]">Strategy Call.</span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-md text-lg font-medium leading-relaxed">
          Schedule a 30-minute discovery session with our lead engineers. We'll discuss your goals, current bottlenecks, and how we can scale your digital presence.
        </p>

        <div className="flex flex-col gap-6 w-full max-w-md bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-4 text-white">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
              <Clock size={20} />
            </div>
            <div>
              <p className="font-bold">30 Minutes</p>
              <p className="text-sm text-gray-400">Strategy Session</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
              <Video size={20} />
            </div>
            <div>
              <p className="font-bold">Google Meet</p>
              <p className="text-sm text-gray-400">Link provided upon booking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-1/2 bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="text-[#ccff00]" size={24} />
          <h3 className="text-2xl font-bold text-white">Select a Date & Time</h3>
        </div>
        
        {/* Mock Calendar UI */}
        <div className="grid grid-cols-7 gap-2 mb-6 text-center text-sm">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => (
            <div key={index} className="text-gray-500 font-bold py-2">{d}</div>
          ))}
          {[...Array(31)].map((_, i) => {
            const isAvailable = i > 15 && i < 25 && i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`flex items-center justify-center aspect-square rounded-lg font-medium transition-colors cursor-default
                  ${isAvailable ? 'bg-[#ccff00]/10 text-[#ccff00] hover:bg-[#ccff00] hover:text-black cursor-pointer shadow-[0_0_10px_rgba(204,255,0,0.1)]' : 'text-gray-600'}
                  ${i === 15 ? 'bg-white/10 text-white' : ''}
                `}
              >
                {i + 1}
              </div>
            )
          })}
        </div>
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-3 h-3 rounded-full bg-[#ccff00]"></div>
            Available
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          >
            Continue
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
