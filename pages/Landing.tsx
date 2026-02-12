
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Zap, ShieldCheck } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const LOGO_URL = 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/bilim-markazi-logo.png'; // Bu yerda foydalanuvchi yuklagan logo manzili bo'ladi

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen bg-[#060a07] overflow-hidden text-white flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-lime-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-8 md:px-20">
        <div className="flex items-center gap-3 text-2xl font-bold font-heading">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-emerald-500 p-1">
             <img src="https://i.ibb.co/LhbXv8wN/image.png" alt="Bilim Markazi Logo" className="w-full h-full object-contain" />
          </div>
          <span className="tracking-tight">Bilim Markazi</span>
        </div>
        <button 
          onClick={onStart}
          className="hidden md:block px-6 py-2.5 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          Kirish
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm mb-8"
        >
          <Sparkles size={16} />
          <span>O'zbekistondagi eng yaxshi bilim platformasi</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black font-heading tracking-tight mb-8 leading-tight"
        >
          Ma'rifat bilan <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500">
            yuksalish
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-stone-400 text-lg md:text-xl max-w-2xl mb-12"
        >
          Bilim Markazi — bu sizning barcha ijtimoiy tarmoqlaringiz va 
          bilim resurslaringizni bitta chiroyli sahifada birlashtiruvchi platforma.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        >
          <button 
            onClick={onStart}
            className="flex-1 px-8 py-4 bg-emerald-600 rounded-2xl font-bold text-lg hover:bg-emerald-700 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2"
          >
            Boshlash
            <ArrowRight size={20} />
          </button>
        </motion.div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[
            { icon: <Layers className="text-emerald-400" />, title: "Bilimlar xazinasi", desc: "Barcha kurslaringiz va foydali havolalaringizni bitta joyga to'plang." },
            { icon: <Zap className="text-yellow-400" />, title: "Tezkor va oson", desc: "Bir necha soniyada o'z profilingizni yarating va ulashing." },
            { icon: <ShieldCheck className="text-emerald-400" />, title: "Ishonchli va xavfsiz", desc: "Bilim Markazi tomonidan tasdiqlangan va SEO optimizatsiya qilingan." }
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-900/30 text-left hover:border-emerald-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-900/30 flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-stone-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-emerald-900/30 py-10 px-6 text-center text-stone-600">
        <p>© 2024 Bilim Markazi. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
};

export default Landing;
