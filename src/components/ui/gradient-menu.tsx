import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Briefcase, GitMerge, LineChart, LogIn } from 'lucide-react';

const menuItems = [
  { title: 'Home', path: '/', icon: <Home size={20} />, gradientFrom: '#a955ff', gradientTo: '#ea51ff' },
  { title: 'Expertise', path: '/expertise', icon: <Briefcase size={20} />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED' },
  { title: 'Process', path: '/process', icon: <GitMerge size={20} />, gradientFrom: '#FF9966', gradientTo: '#FF5E62' },
  { title: 'Audit', path: '/audit', icon: <LineChart size={20} />, gradientFrom: '#80FF72', gradientTo: '#7EE8FA' },
  { title: 'Login', path: '/login', icon: <LogIn size={20} />, gradientFrom: '#ffa9c6', gradientTo: '#f434e2' }
];

export default function GradientMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex flex-nowrap justify-center gap-2 sm:gap-3 md:gap-6">
      {menuItems.map(({ title, path, icon, gradientFrom, gradientTo }, idx) => (
        <li
          key={idx}
          onClick={() => navigate(path)}
          style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as React.CSSProperties}
          className="relative shrink-0 w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] bg-white/5 border border-white/10 rounded-full flex items-center justify-center transition-all duration-500 hover:w-[130px] sm:hover:w-[140px] md:hover:w-[180px] group cursor-pointer hover:border-transparent"
        >
          {/* Gradient background on hover */}
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
          {/* Blur glow */}
          <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>

          {/* Icon */}
          <span className="relative z-10 transition-all duration-500 group-hover:scale-0 group-hover:opacity-0 delay-0 text-gray-400 group-hover:text-white">
            {icon}
          </span>

          {/* Title */}
          <span className="absolute text-white font-bold uppercase tracking-wide text-[10px] sm:text-xs md:text-sm transition-all duration-500 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 delay-150 z-20">
            {title}
          </span>
        </li>
      ))}
    </ul>
  );
}
