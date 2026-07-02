"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { PortableText } from '@portabletext/react';

import { replaceClubTag, processPortableText } from "@/utils/textUtils";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any | null;
  type: 'player' | 'staff';
  clubName?: string;
}

export default function ProfileModal({ isOpen, onClose, profile, type, clubName = '' }: ProfileModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      setTimeout(() => setIsVisible(false), 300); // Wait for animation
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  function getImageUrl(ref?: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const imageUrl = getImageUrl(profile?.image?.asset?._ref);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-full max-w-4xl bg-secondary rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-primary hover:text-black rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
          {/* Image Section */}
          <div className="w-full md:w-2/5 bg-background relative flex items-end justify-center min-h-[300px] md:min-h-full">
            {imageUrl ? (
              <img src={imageUrl} alt={profile?.name} className="absolute bottom-0 w-full h-[120%] object-cover object-top mask-image-bottom opacity-80" style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%)' }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-9xl">NC</div>
            )}
            
            <div className="relative z-10 p-8 w-full bg-gradient-to-t from-background via-background/80 to-transparent pt-32">
              {type === 'player' && profile?.number && (
                <div className="text-primary font-black text-6xl mb-2">{profile.number}</div>
              )}
              <h2 className="text-3xl font-black uppercase tracking-tight">{profile?.name}</h2>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-sm mt-1">
                {type === 'player' ? profile?.position : profile?.role}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-3/5 p-8 overflow-y-auto custom-scrollbar">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/5">
              <div className="bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Narodowość</div>
                <div className="font-bold">{profile?.nationality || '-'}</div>
              </div>
              
              {type === 'player' ? (
                <>
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Wiek</div>
                    <div className="font-bold">
                      {profile?.birthDate ? Math.floor((new Date().getTime() - new Date(profile.birthDate).getTime()) / 31557600000) : '-'}
                    </div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Występy</div>
                    <div className="font-bold text-primary">{profile?.appearances || 0}</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Gole</div>
                    <div className="font-bold">{profile?.goals || 0}</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Asysty</div>
                    <div className="font-bold">{profile?.assists || 0}</div>
                  </div>
                  {(profile?.position === 'goalkeeper' || profile?.position === 'Bramkarz') && (
                    <div className="bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                      <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Czyste Konta</div>
                      <div className="font-bold">{profile?.cleanSheets || 0}</div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Dołączył</div>
                    <div className="font-bold">
                      {profile?.joinedDate ? new Date(profile.joinedDate).getFullYear() : '-'}
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Doświadczenie</div>
                    <div className="font-bold text-sm truncate">{replaceClubTag(profile?.experience, clubName) || '-'}</div>
                  </div>
                </>
              )}
            </div>

            {/* Biography */}
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Biografia
              </h3>
              {profile?.bio ? (
                <div className="prose prose-invert prose-p:text-gray-400 prose-p:leading-relaxed max-w-none">
                  <PortableText value={processPortableText(profile.bio, clubName)} />
                </div>
              ) : (
                <p className="text-gray-500 italic">Brak biografii dla tego profilu.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
