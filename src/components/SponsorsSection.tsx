import { Link } from "@/i18n/routing";

export default function SponsorsSection({ sponsors = [] }: { sponsors: any[] }) {
  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  // Fallback sponsors if none from Sanity
  const displaySponsors = sponsors.length > 0 ? sponsors : [
    { name: 'GREEN TECH', isMock: true },
    { name: 'NOVA ENERGY', isMock: true },
    { name: 'CITY BANK', isMock: true },
    { name: 'BALTIC LOGISTICS', isMock: true },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-primary font-black text-2xl uppercase tracking-widest mb-16 text-center">SPONSORZY</h2>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 w-full">
          {displaySponsors.map((sponsor, idx) => {
            if (sponsor.isMock) {
              return (
                <div key={idx} className="flex items-center gap-4 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                  <span className="text-white font-bold text-lg md:text-xl uppercase tracking-widest">{sponsor.name}</span>
                </div>
              );
            }

            const imageUrl = sponsor.logo?.asset?._ref ? getImageUrl(sponsor.logo.asset._ref) : '';
            return (
              <a key={sponsor._id} href={sponsor.link || '#'} target="_blank" rel="noopener noreferrer" className="group block">
                 {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={sponsor.name} 
                      className="h-12 md:h-16 object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                 ) : (
                    <div className="text-white font-bold text-xl uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                      {sponsor.name}
                    </div>
                 )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
