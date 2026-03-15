"use client";

import { motion } from 'framer-motion';

interface DataInsightProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
}

export function DataInsightWidget({ label, value, trend }: DataInsightProps) {
  return (
    <motion.div 
      whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className="flex items-center justify-between p-3 border border-charcoal/5 rounded-sm bg-offwhite/50 backdrop-blur-md group cursor-default transition-colors"
    >
      <span className="text-xs font-mono text-charcoal/60 uppercase tracking-widest">{label}</span>
      <div className="flex items-center space-x-2">
        <span className="font-mono font-medium text-charcoal">{value}</span>
        {trend === 'up' && <span className="text-sage text-xs">↑</span>}
        {trend === 'down' && <span className="text-burnt-orange text-xs">↓</span>}
      </div>
      
      {/* Hidden decorative tech element that shows on hover */}
      <div className="absolute inset-0 border border-slate-blue/0 group-hover:border-slate-blue/20 transition-colors pointer-events-none" />
    </motion.div>
  );
}
