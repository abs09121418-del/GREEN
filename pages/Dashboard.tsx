
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, GripVertical, Settings, BarChart3, 
  ExternalLink, User, Image as ImageIcon, Palette, 
  Eye, CheckCircle2, ChevronRight, Wand2
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_USER, THEMES } from '../constants';
import { UserProfile, LinkItem, ThemeType } from '../types';
import PublicProfile from './PublicProfile';
import { generateBio } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(MOCK_USER);
  const [activeTab, setActiveTab] = useState<'links' | 'appearance' | 'analytics'>('links');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const addLink = () => {
    const newLink: LinkItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Yangi havola',
      url: 'https://',
      icon: 'Link',
      clicks: 0,
      active: true
    };
    setProfile(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const removeLink = (id: string) => {
    setProfile(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }));
  };

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(l => l.id === id ? { ...l, ...updates } : l)
    }));
  };

  const handleAIAutoBio = async () => {
    setIsGeneratingBio(true);
    const profession = prompt("Kasbingizni kiriting (masalan: Ustoz, Shifokor):") || "Mutaxassis";
    const interests = prompt("Qiziqishlaringizni kiriting:") || "Bilim ulashish";
    
    const newBio = await generateBio(profession, interests);
    setProfile(prev => ({ ...prev, bio: newBio }));
    setIsGeneratingBio(false);
  };

  return (
    <div className="min-h-screen bg-[#060a07] text-white flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-24 bg-stone-900 border-r border-stone-800 flex md:flex-col items-center justify-between py-6 px-4 md:px-0 sticky top-0 z-50 md:h-screen">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-1 border-2 border-emerald-500 mb-12 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
           <img src="https://i.ibb.co/LhbXv8wN/image.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        
        <div className="flex md:flex-col gap-6">
          <button 
            onClick={() => setActiveTab('links')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'links' ? 'bg-emerald-950/40 text-emerald-400' : 'text-stone-500 hover:text-white'}`}
          >
            <Plus size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'appearance' ? 'bg-emerald-950/40 text-emerald-400' : 'text-stone-500 hover:text-white'}`}
          >
            <Palette size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'analytics' ? 'bg-emerald-950/40 text-emerald-400' : 'text-stone-500 hover:text-white'}`}
          >
            <BarChart3 size={24} />
          </button>
        </div>

        <div className="mt-auto hidden md:block">
           <button className="p-3 text-stone-500 hover:text-white transition-colors">
            <Settings size={24} />
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-1 text-emerald-50">
              {activeTab === 'links' ? 'Havolalar' : activeTab === 'appearance' ? 'Tashqi ko\'rinish' : 'Tahlillar'}
            </h1>
            <p className="text-stone-500">
              bilimmarkazi.app/{profile.username}
            </p>
          </div>
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-emerald-900/20 border border-emerald-500/20 rounded-xl text-sm"
          >
            <Eye size={16} />
            Preview
          </button>
        </header>

        {activeTab === 'links' && (
          <div className="space-y-6">
            <button 
              onClick={addLink}
              className="w-full py-4 border-2 border-dashed border-emerald-900/30 rounded-2xl text-stone-500 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Yangi havola qo'shish
            </button>

            <AnimatePresence>
              {profile.links.map((link) => (
                <motion.div
                  key={link.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <GlassCard className="!p-4 !bg-emerald-950/5 hover:!bg-emerald-950/10 !border-emerald-900/20">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center justify-center text-stone-700 cursor-grab active:cursor-grabbing">
                        <GripVertical size={20} />
                      </div>
                      <div className="flex-1 space-y-4">
                        <input 
                          value={link.title}
                          onChange={(e) => updateLink(link.id, { title: e.target.value })}
                          className="w-full bg-transparent border-none font-bold text-lg focus:ring-0 p-0 outline-none text-emerald-50"
                          placeholder="Havola sarlavhasi"
                        />
                        <input 
                          value={link.url}
                          onChange={(e) => updateLink(link.id, { url: e.target.value })}
                          className="w-full bg-transparent border-none text-stone-500 text-sm focus:ring-0 p-0 outline-none"
                          placeholder="https://example.com"
                        />
                        <div className="flex items-center justify-between pt-2 border-t border-emerald-900/10">
                           <div className="flex items-center gap-4">
                              <span className="text-xs text-stone-600 flex items-center gap-1">
                                <BarChart3 size={12} />
                                {link.clicks} marta bosildi
                              </span>
                           </div>
                           <div className="flex items-center gap-3">
                              <button 
                                onClick={() => removeLink(link.id)}
                                className="p-2 text-stone-600 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                              <div className="w-10 h-5 bg-stone-800 rounded-full relative p-1 cursor-pointer" onClick={() => updateLink(link.id, { active: !link.active })}>
                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${link.active ? 'bg-emerald-500 translate-x-5' : 'bg-stone-600 translate-x-0'}`} />
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Appearance & Analytics tabs update automatically with constants and colors */}
      </main>

      {/* Live Preview Column (Desktop Only) */}
      <aside className="hidden lg:flex w-[450px] bg-emerald-950/10 border-l border-emerald-900/20 p-10 flex-col items-center justify-center sticky top-0 h-screen">
        <div className="text-sm text-stone-500 mb-6 flex items-center gap-2">
           <Eye size={16} />
           Jonli tahrirlash ko'rinishi
        </div>
        <div className="relative w-[320px] h-[640px] border-[8px] border-stone-800 rounded-[3rem] shadow-2xl overflow-hidden bg-black">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-800 rounded-b-2xl z-20" />
          <div className="w-full h-full overflow-y-auto no-scrollbar">
            <PublicProfile profile={profile} isPreview={true} />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
