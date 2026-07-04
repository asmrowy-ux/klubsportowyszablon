import { ChevronRight, Globe, Trophy, Users, Briefcase, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function HeroSection({ clubName = '', logoRef = '', description = '' }: { clubName?: string, logoRef?: string, description?: string }) {
  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const bgLogoUrl = getImageUrl(logoRef);
  const titleParts = clubName ? clubName.split(' ') : ['WICHER', 'GDYNIA'];
  const titleFirst = titleParts[0] || 'WICHER';
  const titleRest = titleParts.slice(1).join(' ') || 'GDYNIA';
  const displayDescription = description || `Oficjalna strona ${clubName || 'Klubu'}. Bądź na bieżąco z najnowszymi wiadomościami, meczami i ekskluzywnymi treściami klubowymi.`;

  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-background">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-30"
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
      />
      
      {/* Animated gradient overlay over the image */}
      <div className="absolute inset-0 bg-gradient-animated opacity-20 mix-blend-overlay z-0 pointer-events-none" />

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />


      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        
        {/* Left Column: Logo, Title, Text, Socials */}
        <div className="flex flex-col items-start pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 mb-8">
            {bgLogoUrl && (
              <img src={bgLogoUrl} alt={clubName} className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-2xl" />
            )}
            <div className="flex flex-col leading-none pt-4">
              <h1 className="text-6xl md:text-[5.5rem] font-black uppercase tracking-tighter text-foreground m-0 p-0 leading-[0.85] drop-shadow-lg">
                {titleFirst}
              </h1>
              <h1 className="text-6xl md:text-[5.5rem] font-black uppercase tracking-tighter text-primary m-0 p-0 leading-[0.85] drop-shadow-lg">
                {titleRest}
              </h1>
            </div>
          </div>

          <div className="w-20 h-1 bg-primary mb-8 ml-2" />

          <p className="text-foreground/80 max-w-lg text-lg leading-relaxed mb-10 font-medium ml-2 whitespace-pre-line">
            {displayDescription}
          </p>

          <div className="flex items-center gap-6 ml-2">
            <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary text-muted-foreground transition-colors group">
              <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary text-muted-foreground transition-colors group">
              <FacebookIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary text-muted-foreground transition-colors group">
              <InstagramIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary text-muted-foreground transition-colors group">
              <YoutubeIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: "KLUB" Menu Card */}
        <div className="flex justify-start lg:justify-end pt-12">
          <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[48px] w-full max-w-[360px] h-[680px] shadow-2xl overflow-hidden flex flex-col">
            
            {/* Top Left Accents */}
            <div className="absolute top-12 -left-4 w-32 h-32 pointer-events-none">
              <div className="absolute w-[100px] h-[2px] bg-[#FFB800] -rotate-45 top-[40px] left-[10px]" />
              <div className="absolute w-[80px] h-[2px] bg-[#FFB800] -rotate-45 top-[60px] left-[10px]" />
            </div>

            {/* Top Right Accents */}
            <div className="absolute -top-6 -right-6 w-48 h-48 pointer-events-none">
              <div className="absolute w-[100px] h-[1px] bg-[#FFB800] -rotate-45 top-[60px] left-[60px]" />
              <div className="absolute w-[140px] h-[4px] bg-[#FFB800] -rotate-45 top-[80px] left-[30px]" />
              <div className="absolute w-[120px] h-[12px] bg-[#FFB800] -rotate-45 top-[105px] left-[60px]" />
              <div className="absolute w-[40px] h-[2px] bg-[#FFB800] -rotate-45 top-[125px] left-[130px]" />
            </div>

            {/* Left Middle Accents */}
            <div className="absolute top-[52%] -left-6 w-16 h-24 pointer-events-none">
              <div className="absolute w-[30px] h-[2px] bg-[#FFB800] -rotate-45 top-[10px] left-[10px]" />
              <div className="absolute w-[50px] h-[2px] bg-[#FFB800] -rotate-45 top-[30px] left-[5px]" />
            </div>

            {/* Bottom Right Accents */}
            <div className="absolute -bottom-8 -right-8 w-56 h-56 pointer-events-none">
              <div className="absolute w-[160px] h-[2px] bg-[#FFB800] -rotate-45 top-[110px] left-[30px]" />
              <div className="absolute w-[140px] h-[6px] bg-[#FFB800] -rotate-45 top-[130px] left-[50px]" />
              <div className="absolute w-[100px] h-[14px] bg-[#FFB800] -rotate-45 top-[155px] left-[80px]" />
              
              {/* Dotted line below */}
              <div className="absolute flex gap-1 -rotate-45 top-[190px] left-[110px]">
                <div className="w-1.5 h-1.5 rounded-full border border-[#FFB800]"></div>
                <div className="w-1.5 h-1.5 rounded-full border border-[#FFB800]"></div>
                <div className="w-1.5 h-1.5 rounded-full border border-[#FFB800]"></div>
                <div className="w-1.5 h-1.5 rounded-full border border-[#FFB800]"></div>
                <div className="w-1.5 h-1.5 rounded-full border border-[#FFB800]"></div>
              </div>
            </div>

            {/* Dots on the Left */}
            <div className="absolute top-[180px] left-[24px] flex flex-col gap-2 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-[1px] border-[1.5px] border-[#FFB800]"></div>
              <div className="w-1.5 h-1.5 rounded-[1px] border-[1.5px] border-[#FFB800]"></div>
              <div className="w-1.5 h-1.5 rounded-[1px] border-[1.5px] border-[#FFB800]"></div>
              <div className="w-1.5 h-1.5 rounded-[1px] border-[1.5px] border-[#FFB800]"></div>
            </div>

            {/* Content */}
            <h2 className="relative z-10 text-[#FFB800] font-black text-3xl uppercase tracking-widest mt-24 ml-12 mb-10">
              KLUB
            </h2>
            
            <div className="relative z-10 flex-1 mx-6 mb-16">
              <div className="border border-white/10 rounded-[24px] overflow-hidden flex flex-col bg-transparent">
                
                <Link href="/history" className="flex items-center justify-between group px-6 py-5 border-b border-white/10 hover:bg-white/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <Trophy className="w-5 h-5 text-[#FFB800]" />
                    <span className="text-white font-medium text-lg tracking-wide group-hover:text-[#FFB800] transition-colors">Historia</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all" />
                </Link>
                
                <Link href="/stadium" className="flex items-center justify-between group px-6 py-5 border-b border-white/10 hover:bg-white/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#FFB800]">
                        <ellipse cx="12" cy="8" rx="8" ry="3" />
                        <path d="M4 8v6c0 1.66 3.58 3 8 3s8-1.34 8-3V8" />
                        <path d="M12 11v3" />
                        <path d="M8 10.5v2" />
                        <path d="M16 10.5v2" />
                      </svg>
                    </div>
                    <span className="text-white font-medium text-lg tracking-wide group-hover:text-[#FFB800] transition-colors">Stadion</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all" />
                </Link>
                
                <Link href="/board" className="flex items-center justify-between group px-6 py-5 border-b border-white/10 hover:bg-white/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <Users className="w-5 h-5 text-[#FFB800]" />
                    <span className="text-white font-medium text-lg tracking-wide group-hover:text-[#FFB800] transition-colors">Zarząd</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all" />
                </Link>
                
                <Link href="/careers" className="flex items-center justify-between group px-6 py-5 border-b border-white/10 hover:bg-white/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <Briefcase className="w-5 h-5 text-[#FFB800]" />
                    <span className="text-white font-medium text-lg tracking-wide group-hover:text-[#FFB800] transition-colors">Kariera</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all" />
                </Link>
                
                <Link href="/contact" className="flex items-center justify-between group px-6 py-5 hover:bg-white/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <Mail className="w-5 h-5 text-[#FFB800]" />
                    <span className="text-white font-medium text-lg tracking-wide group-hover:text-[#FFB800] transition-colors">Kontakt</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all" />
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
