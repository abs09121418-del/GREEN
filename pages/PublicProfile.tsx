
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, Github, Twitter, Send, Youtube, 
  ExternalLink, CheckCircle2, Globe, BookOpen 
} from 'lucide-react';
import { UserProfile, ThemeType } from '../types';
import { THEMES } from '../constants';

interface PublicProfileProps {
  profile: UserProfile;
  isPreview?: boolean;
}

const IconMap: Record<string, React.ReactNode> = {
  Instagram: <Instagram size={20} />,
  Github: <Github size={20} />,
  Twitter: <Twitter size={20} />,
  Send: <Send size={20} />,
  Youtube: <Youtube size={20} />,
  Link: <ExternalLink size={20} />,
  Globe: <Globe size={20} />,
  BookOpen: <BookOpen size={20} />
};

const SocialIconMap: Record<string, any> = {
  instagram: Instagram,
  github: Github,
  twitter: Twitter,
  telegram: Send,
  youtube: Youtube
};

const PublicProfile: React.FC<PublicProfileProps> = ({ profile, isPreview = false }) => {
  const theme = THEMES[profile.theme];

  return (
    <div className={`min-h-full w-full ${theme.bg} ${theme.text} flex flex-col items-center pt-16 pb-20 px-6 transition-colors duration-500`}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center mb-10 w-full"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 blur-md opacity-50 animate-pulse" />
          <img 
            src={profile.avatar} 
            alt={profile.displayName} 
            className="relative w-28 h-28 rounded-full object-cover border-4 border-white/10" 
          />
          {profile.isVerified && (
            <div className="absolute bottom-1 right-1 bg-white text-blue-500 rounded-full p-1 border-2 border-zinc-950">
              <CheckCircle2 size={16} fill="currentColor" className="text-white" />
            </div>
          )}
        </div>
        
        <h1 className="text-2xl font-bold font-heading mb-2 flex items-center gap-2">
          {profile.displayName}
        </h1>
        <p className="text-sm font-medium opacity-60 mb-4">@{profile.username}</p>
        <p className="text-sm leading-relaxed max-w-sm opacity-80">{profile.bio}</p>
      </motion.div>

      {/* Social Links Small */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-5 mb-12"
      >
        {Object.entries(profile.socials).map(([key, val]) => {
          if (!val) return null;
          const Icon = SocialIconMap[key];
          return (
            <a 
              key={key} 
              href={`#${key}`} 
              className="opacity-70 hover:opacity-100 hover:scale-110 transition-all"
            >
              <Icon size={24} />
            </a>
          );
        })}
      </motion.div>

      {/* Main Links List */}
      <div className="w-full max-w-md space-y-4">
        {profile.links.filter(l => l.active).map((link, idx) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (idx * 0.1) }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 w-full p-4 rounded-2xl border ${theme.card} ${theme.border} transition-all group`}
          >
            <div className={`w-10 h-10 rounded-xl ${theme.accent} flex items-center justify-center text-white`}>
              {IconMap[link.icon] || <ExternalLink size={20} />}
            </div>
            <span className="flex-1 font-semibold">{link.title}</span>
            <ExternalLink size={18} className="opacity-0 group-hover:opacity-40 transition-opacity" />
          </motion.a>
        ))}
      </div>

      {!isPreview && (
        <footer className="mt-20 opacity-40 text-[10px] tracking-[0.2em] font-bold uppercase">
           Link Hub orqali yaratilgan
        </footer>
      )}
    </div>
  );
};

export default PublicProfile;
