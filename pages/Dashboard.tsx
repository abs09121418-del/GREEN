import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, GripVertical, Settings, BarChart3, 
  User, Palette, Eye, Wand2, X, ChevronRight, Share2
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
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const addLink = () => {
    const newLink: LinkItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Yangi havola',
      url: 'https://',
      icon: 'Link',
      clicks: 0,
      active: true
    };
    setProfile(prev => ({ ...prev, links: [newLink, ...prev.links] }));
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
    const profession = prompt("Kasbingizni kiriting (masalan: Ustoz, Dizayner):");
    if (!profession) return;
    
    setIsGeneratingBio(true);
    const newBio = await generateBio(profession, "Bilim markazi, ta'lim, innovatsiya");
    setProfile(prev => ({ ...prev, bio: newBio }));
    setIsGeneratingBio(false);
  };

  return (
    <div className="min-h-screen bg-[#060a07] text-white flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-20 bg-stone-900 border-b md:border-b-0 md:border-r border-white/5 flex md:flex-col items-center justify-between py-4 md:py-8 px-6 md:px-0 z-50">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
           <img src="https://i.ibb.co/LhbXv8wN/image.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        
        <div className="flex md:flex-col gap-4">
          {[
            { id: 'links', icon: Plus },
            { id: 'appearance', icon: Palette },
            { id: 'analytics', icon: BarChart3 }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-stone-500 hover:text-white'}`}
            >
              <item.icon size={22} />
            </button>
          ))}
        </div>

        <div className="hidden md:block">
           <button className="p-3 text-stone-500 hover:text-white transition-colors">
            <Settings size={22} />
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-12 no-scrollbar">
        <div className="max-w-2xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-heading mb-1">
                {activeTab === 'links' ? 'Havolalar' : activeTab === 'appearance' ? 'Tashqi ko\'rinish' : 'Tahlillar'}
              </h1>
              <div className="flex items-center gap-2 text-stone-500 text-sm">
                <span className="truncate max-w-[150px] md:max-w-none">linkhub.app/{profile.username}</span>
                <button className="hover:text-emerald-400 transition-colors"><Share2 size={14} /></button>
              </div>
            </div>
            <button 
              onClick={() => setShowPreviewMobile(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold"
            >
              <Eye size={16} />
              Ko'rish
            </button>
          </header>

          {activeTab === 'links' && (
            <div className="space-y-6">
              <button 
                onClick={addLink}
                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
              >
                <Plus size={20} />
                Yangi havola qo'shish
              </button>

              <div className="space-y-4">
                <AnimatePresence>
                  {profile.links.map((link) => (
                    <motion.div
                      key={link.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <GlassCard className="!p-4 border-white/5 hover:border-emerald-500/30">
                        <div className="flex gap-4">
                          <div className="flex items-center text-stone-700 cursor-grab">
                            <GripVertical size={20} />
                          </div>
                          <div className="flex-1 space-y-3">
                            <input 
                              value={link.title}
                              onChange={(e) => updateLink(link.id, { title: e.target.value })}
                              className="w-full bg-transparent border-none font-bold text-lg focus:ring-0 p-0 outline-none text-white"
                              placeholder="Sarlavha"
                            />
                            <input 
                              value={link.url}
                              onChange={(e) => updateLink(link.id, { url: e.target.value })}
                              className="w-full bg-transparent border-none text-stone-500 text-sm focus:ring-0 p-0 outline-none"
                              placeholder="URL manzili"
                            />
                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                               <span className="text-[10px] text-stone-600 font-bold uppercase tracking-wider flex items-center gap-1">
                                 <BarChart3 size={10} />
                                 {link.clicks} marta bosildi
                               </span>
                               <div className="flex items-center gap-3">
                                  <button onClick={() => removeLink(link.id)} className="text-stone-600 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                  </button>
                                  <div 
                                    onClick={() => updateLink(link.id, { active: !link.active })}
                                    className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${link.active ? 'bg-emerald-500' : 'bg-stone-800'}`}
                                  >
                                    <div className={`w-3 h-3 bg-white rounded-full transition-all ${link.active ? 'translate-x-5' : 'translate-x-0'}`} />
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
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-bold mb-4">Profil</h3>
                <GlassCard className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group cursor-pointer">
                      <img src={profile.avatar} className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500" alt="Avatar" />
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus size={20} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <input 
                        value={profile.displayName}
                        onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                        className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-2 focus:border-emerald-500 outline-none"
                        placeholder="Ism-sharif"
                      />
                      <button 
                        onClick={handleAIAutoBio}
                        disabled={isGeneratingBio}
                        className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-bold uppercase tracking-widest"
                      >
                        <Wand2 size={14} />
                        {isGeneratingBio ? 'AI yaratmoqda...' : 'AI orqali Bio yaratish'}
                      </button>
                    </div>
                  </div>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-3 h-24 focus:border-emerald-500 outline-none resize-none"
                    placeholder="O'zingiz haqingizda qisqacha..."
                  />
                </GlassCard>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-4">Mavzular</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(Object.keys(THEMES) as ThemeType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setProfile(prev => ({ ...prev, theme: t }))}
                      className={`p-1 rounded-2xl border-2 transition-all ${profile.theme === t ? 'border-emerald-500 scale-[1.02]' : 'border-transparent'}`}
                    >
                      <div className={`h-24 rounded-xl ${THEMES[t].bg} flex flex-col items-center justify-center p-3 gap-2 overflow-hidden`}>
                        <div className={`w-8 h-1 rounded-full ${THEMES[t].accent}`} />
                        <div className={`w-12 h-1 rounded-full ${THEMES[t].accent} opacity-50`} />
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${THEMES[t].text}`}>{t}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Jami ko\'rishlar', value: '12,480', sub: '+12% o\'sish' },
                { label: 'O\'rtacha bosish', value: '3.2', sub: 'har bir foydalanuvchiga' }
              ].map((stat, i) => (
                <GlassCard key={i}>
                  <p className="text-stone-500 text-sm mb-1">{stat.label}</p>
                  <h4 className="text-3xl font-black">{stat.value}</h4>
                  <p className="text-emerald-500 text-xs font-bold mt-2">{stat.sub}</p>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Desktop Preview */}
      <aside className="hidden lg:flex w-[400px] xl:w-[500px] bg-stone-900/30 border-l border-white/5 items-center justify-center p-12">
        <div className="relative w-full max-w-[320px] aspect-[9/18.5] bg-black rounded-[3rem] border-[8px] border-stone-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-stone-800 rounded-b-2xl z-20" />
          <div className="w-full h-full overflow-y-auto no-scrollbar">
            <PublicProfile profile={profile} isPreview={true} />
          </div>
        </div>
      </aside>

      {/* Mobile Preview Modal */}
      <AnimatePresence>
        {showPreviewMobile && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black lg:hidden"
          >
            <button 
              onClick={() => setShowPreviewMobile(false)}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
              <X size={24} />
            </button>
            <div className="h-full overflow-y-auto">
              <PublicProfile profile={profile} isPreview={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Dashboard;