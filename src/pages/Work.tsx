import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const projects = [
  { id: 1, name: 'Nexus Finance', category: 'Fintech', color: 'from-blue-500/20 to-purple-500/20' },
  { id: 2, name: 'Orbit E-commerce', category: 'Retail', color: 'from-orange-500/20 to-red-500/20' },
  { id: 3, name: 'Lumina AI', category: 'SaaS', color: 'from-green-500/20 to-emerald-500/20' },
  { id: 4, name: 'Velocity Motors', category: 'Automotive', color: 'from-zinc-500/20 to-slate-500/20' },
];

export default function Work() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center px-4 md:px-8 py-12 w-full z-10 w-full max-w-7xl mx-auto"
    >
      <div className="w-full mb-12">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
          OUR <span className="text-[#ccff00]">WORK.</span>
        </h2>
        <p className="text-gray-400 max-w-xl text-lg font-medium">
          A selection of performance-optimized digital experiences engineered for maximum conversion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className={`cursor-pointer rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br ${project.color} backdrop-blur-sm aspect-[4/3] relative group flex flex-col justify-end p-8`}
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-0" />
            <div className="relative z-10 flex flex-col items-start gap-2">
              <span className="text-xs font-bold tracking-widest text-[#ccff00] uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                {project.category}
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
                {project.name}
              </h3>
            </div>
            
            <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1M13 1H4.6M13 1V9.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
