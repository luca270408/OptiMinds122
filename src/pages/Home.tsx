import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import GradientMenu from '../components/ui/gradient-menu';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, NexaTech",
    content: "OptiMinds completely transformed our digital presence. Our conversion rate doubled in just 3 months.",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Marcus Thorne",
    role: "Founder, Zenith",
    content: "Their attention to detail and performance optimization is unmatched. A true partner in growth.",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    name: "Elena Rodriguez",
    role: "VP Marketing, Lumina",
    content: "The best design and engineering team we've ever worked with. The results speak for themselves.",
    avatar: "https://i.pravatar.cc/150?u=3"
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 flex flex-col w-full z-10 pb-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 text-center min-h-[calc(100vh-100px)] w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 border border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00] text-[10px] md:text-xs font-bold tracking-widest px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-6 md:mb-10 shadow-[0_0_20px_rgba(204,255,0,0.15)] backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ccff00] rounded-full animate-pulse" />
          PERFORMANCE OPTIMIZED
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[3.5rem] leading-[0.85] sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl"
        >
          WE BUILD<br />
          GORGEOUS<br />
          WEBSITES.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xs md:max-w-xl text-gray-400 text-sm md:text-xl mb-8 md:mb-12 font-medium"
        >
          Elevating digital presence through scientific design. We don't just build sites; we engineer visual identities that convert.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-24 relative w-full sm:w-auto"
        >
          {/* Glow behind start button */}
          <div className="hidden sm:block absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#ccff00] rounded-full blur-[60px] opacity-20 pointer-events-none" />
          
          <motion.button 
            onClick={() => navigate('/start-project')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full sm:w-auto justify-center bg-[#ccff00] text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#b3e600] flex items-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-colors"
          >
            Start Project →
          </motion.button>
          <motion.button 
            onClick={() => navigate('/work')}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto justify-center border border-white/20 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg backdrop-blur-sm transition-colors"
          >
            View Our Work
          </motion.button>
        </motion.div>

        {/* Footer Icons */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center w-full mt-10 md:mt-0"
        >
          <GradientMenu />
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-20 mt-12 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
            CLIENT <span className="text-[#ccff00]">SUCCESS</span>
          </h2>
          <p className="text-gray-400 mx-auto max-w-xl text-lg">
            Don't just take our word for it. Here's what our partners say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(204,255,0,0.1)] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="flex gap-1 text-[#ccff00] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-8 flex-1 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-white/10" />
                <div>
                  <h4 className="text-white font-bold tracking-tight">{testimonial.name}</h4>
                  <p className="text-[#ccff00] text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
