import { motion } from 'motion/react';
import { ArrowLeft, Code, Palette, Zap, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const capabilities = [
  {
    icon: Palette,
    title: 'Visual Identity',
    description: 'We craft distinctive visual languages that command attention and communicate value instantly.',
  },
  {
    icon: Code,
    title: 'Performance Engineering',
    description: 'Lightning-fast, highly optimized code architectures built for scale and seamless experiences.',
  },
  {
    icon: Zap,
    title: 'Conversion Optimization',
    description: 'Data-backed design decisions focused entirely on turning your visitors into paying customers.',
  },
  {
    icon: LineChart,
    title: 'Growth Strategy',
    description: 'Comprehensive digital roadmaps to scale your brand and dominate your market sector.',
  }
];

export default function Expertise() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center px-4 md:px-8 py-12 w-full max-w-7xl mx-auto z-10"
    >
      <div className="w-full text-left mb-12">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
          OUR <span className="text-[#ccff00]">EXPERTISE.</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg font-medium">
          We combine scientific design with elite engineering to build digital dominants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0)] hover:shadow-[0_8px_30px_rgba(204,255,0,0.1)]"
            >
              <div className="w-14 h-14 bg-[#ccff00]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#ccff00]/20 text-[#ccff00]">
                <Icon size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                {cap.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                {cap.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
