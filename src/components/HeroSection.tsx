import { ArrowRight, Play } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function HeroSection({ clubName = '', logoRef = '' }: { clubName?: string, logoRef?: string }) {
  const t = useTranslations("Hero");

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const bgLogoUrl = getImageUrl(logoRef);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-background">
      {/* Smooth Base Gradient */}
      <div 
        className="absolute inset-0 z-0 opacity-50 dark:opacity-100"
        style={{
          background: 'radial-gradient(circle at 10% 10%, rgba(212, 175, 55, 0.25) 0%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(100, 100, 100, 0.1) 0%, transparent 60%)'
        }}
      />
      
      {/* Dynamic Animated Pattern (Logos + Reflectors/Grid) */}
      {bgLogoUrl && (
        <svg className="absolute inset-0 z-0 w-full h-full opacity-60 dark:opacity-100">
          <defs>
            <pattern 
              id="club-pattern" 
              x="0" 
              y="0" 
              width="200" 
              height="200" 
              patternUnits="userSpaceOnUse"
            >
              {/* Animated Grid Lines */}
              <line x1="0" y1="0" x2="200" y2="200" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" className="animate-pulse" />
              <line x1="200" y1="0" x2="0" y2="200" stroke="var(--border)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Animated Spotlights (Reflektory) */}
              <circle cx="200" cy="0" r="5" fill="var(--foreground)" className="animate-ping" style={{ animationDuration: '3s' }} opacity="0.8" />
              <circle cx="0" cy="200" r="8" fill="var(--color-primary)" className="animate-pulse" style={{ animationDuration: '2s' }} opacity="0.9" />
              <circle cx="100" cy="200" r="3" fill="var(--foreground)" className="animate-pulse" style={{ animationDuration: '4s' }} opacity="0.6" />
              <circle cx="200" cy="100" r="4" fill="var(--color-primary)" className="animate-pulse" style={{ animationDelay: '2s' }} opacity="0.7" />
              
              {/* Logo */}
              <image 
                href={bgLogoUrl} 
                x="40" 
                y="40" 
                width="120" 
                height="120" 
                preserveAspectRatio="xMidYMid meet" 
                opacity="0.25"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#club-pattern)" />
        </svg>
      )}

      {/* Subtle overlays for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/20 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 md:pb-32 h-full">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-primary text-background text-xs font-bold tracking-widest uppercase mb-4">
            {t('latestNews')}
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-glow text-foreground">
            {t('title1')} <br />
            <span className="text-primary">{t('title2')}</span> {t('title3')}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-300 max-w-xl mb-8 font-light">
            {t('subtitle', { clubName })}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/news" 
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-background font-bold text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
            >
              {t('readFull')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/club/article"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-border text-foreground font-bold text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              {t('watchVideo')}
            </Link>
          </div>
        </div>

        <div className="absolute right-4 lg:right-8 bottom-8 md:bottom-24 w-[300px] hidden lg:block bg-secondary/80 backdrop-blur-lg border border-border p-6 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
          <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-4">{t('nextMatch')} • Champions League</div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-background mb-2">NC</div>
              <span className="text-xs font-bold uppercase truncate max-w-[80px] text-foreground">{clubName || 'NC'}</span>
            </div>
            <div className="text-sm font-bold text-gray-500">VS</div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center font-bold text-background mb-2">MD</div>
              <span className="text-xs font-bold uppercase text-foreground">Madrid</span>
            </div>
          </div>
          <div className="text-center text-xs font-semibold text-primary uppercase tracking-wider group-hover:text-foreground transition-colors">
            {t('buyTickets')} <ArrowRight className="inline-block ml-1 w-3 h-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
