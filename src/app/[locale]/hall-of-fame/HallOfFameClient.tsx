"use client";

import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

export default function HallOfFameClient({ legends, clubName }: { legends: any[], clubName?: string }) {
  const [selectedLegend, setSelectedLegend] = useState<any | null>(null);

  function getImageUrl(ref?: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  return (
    <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
      <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-primary">Hall of Fame</span>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          <span className="text-primary">Hall</span> of Fame
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Złote karty w historii Nova City FC. Najwięksi zawodnicy, którzy ukształtowali nasz klub i na zawsze zapisali się na kartach historii.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {legends.map((legend: any) => {
          const imgUrl = getImageUrl(legend.image?.asset?._ref);
          
          return (
            <div 
              key={legend._id} 
              onClick={() => setSelectedLegend(legend)}
              className="group relative bg-secondary rounded-xl overflow-hidden cursor-pointer border border-primary/20 hover:border-primary transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/40"
            >
              <div className="aspect-[3/4] bg-background relative flex items-end justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                {imgUrl ? (
                  <img 
                    src={imgUrl} 
                    alt={legend.name} 
                    className="absolute bottom-0 w-[90%] h-[90%] object-cover object-top mask-image-bottom transition-transform duration-700 group-hover:scale-110 sepia-[0.3]" 
                    style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-primary/10 font-black text-8xl">⭐</div>
                )}
                
                {/* Number Overlay */}
                {legend.number && (
                  <div className="absolute top-4 left-4 font-black text-5xl text-primary/30 group-hover:text-primary transition-colors">
                    {legend.number}
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="p-6 relative z-10 bg-gradient-to-t from-secondary via-secondary to-transparent -mt-10 pt-12 text-center">
                <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1 flex items-center justify-center gap-2">
                  <span className="w-4 h-[1px] bg-primary"></span>
                  Legenda
                  <span className="w-4 h-[1px] bg-primary"></span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                  {legend.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {legends.length === 0 && (
        <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-white/5">
          <h2 className="text-2xl font-bold mb-4 text-gray-400">Hall of Fame jest puste.</h2>
          <p className="text-gray-500">Przejdź do Sanity Studio, aby wyróżnić legendy klubu.</p>
        </div>
      )}

      <ProfileModal 
        isOpen={!!selectedLegend} 
        onClose={() => setSelectedLegend(null)} 
        profile={selectedLegend}
        type="player"
        clubName={clubName}
      />
    </div>
  );
}
