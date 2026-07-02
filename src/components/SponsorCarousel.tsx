"use client";

interface Sponsor {
  _id: string;
  name: string;
  logo: { asset: { _ref: string } };
  url?: string;
}

function getImageUrl(ref: string) {
  if (!ref) return '';
  return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
}

export default function SponsorCarousel({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors || sponsors.length === 0) return null;

  // Multiply sponsors to ensure they take up a good amount of width
  const multiplied = Array(5).fill(sponsors).flat();

  const renderSponsors = (keyPrefix: string) => (
    multiplied.map((sponsor, i) => {
      const logoUrl = getImageUrl(sponsor.logo?.asset?._ref || '');
      const inner = (
        <div className="flex-shrink-0 h-10 w-32 flex items-center justify-center opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
          {logoUrl ? (
            <img src={logoUrl} alt={sponsor.name} className="max-h-10 max-w-[120px] object-contain" />
          ) : (
            <span className="text-lg font-black tracking-widest uppercase text-white whitespace-nowrap">{sponsor.name}</span>
          )}
        </div>
      );

      if (sponsor.url) {
        return <a key={`${keyPrefix}-${sponsor._id}-${i}`} href={sponsor.url} target="_blank" rel="noopener noreferrer">{inner}</a>;
      }
      return <div key={`${keyPrefix}-${sponsor._id}-${i}`}>{inner}</div>;
    })
  );

  return (
    <div className="pt-10 pb-8 border-y border-white/10 overflow-hidden relative flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-black tracking-[0.3em] uppercase mb-10 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">
        Sponsorzy
      </h3>

      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none mt-16" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none mt-16" />

      {/* Wrapper that is exactly twice the width of one group */}
      <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
        <div className="flex gap-16 px-8">
          {renderSponsors('group1')}
        </div>
        <div className="flex gap-16 px-8" aria-hidden="true">
          {renderSponsors('group2')}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-gradient {
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
