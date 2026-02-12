import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 ${className}`}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 opacity-0 transition-opacity duration-300 hover:opacity-100 blur-xl" />
      <div className="relative p-6">
        {children}
      </div>
    </div>
  );
};