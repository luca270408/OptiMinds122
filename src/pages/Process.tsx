import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'Deep dive into your business goals, target audience, and market positioning to formulate a winning strategy.'
  },
  {
    num: '02',
    title: 'Design Blueprint',
    desc: 'Crafting high-fidelity wireframes and visual concepts that align with the strategic objectives.'
  },
  {
    num: '03',
    title: 'Technical Engineering',
    desc: 'Developing lightning-fast, scalable frontend architecture and robust backend systems.'
  },
  {
    num: '04',
    title: 'Launch & Optimize',
    desc: 'Rigorous testing, optimized deployment, and continuous performance monitoring for maximum impact.'
  }
];

export default function Process() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center px-4 md:px-8 py-12 w-full max-w-5xl mx-auto z-10"
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
          THE <span className="text-[#ccff00]">PROCESS.</span>
        </h2>
        <p className="text-gray-400 max-w-xl text-lg font-medium">
          A systematic, battle-tested approach to delivering world-class digital products.
        </p>
      </div>

      <div className="w-full flex flex-col gap-6">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="flex flex-col md:flex-row gap-6 md:gap-12 p-8 rounded-3xl bg-white/5 border border-white/10 items-start md:items-center relative overflow-hidden transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(204,255,0,0.05)] cursor-pointer"
          >
            <div className="text-[6rem] leading-none font-black text-white/5 absolute -top-4 -right-4 pointer-events-none select-none">
              {step.num}
            </div>
            
            <div className="text-3xl md:text-5xl font-black text-[#ccff00]">
              {step.num}
            </div>
            <div className="flex-1 relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 font-medium">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
