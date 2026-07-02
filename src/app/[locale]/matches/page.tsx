import { client } from "@/sanity/lib/client";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchCenter from "@/components/MatchCenter";

export default async function MatchesPage() {
  const t = await getTranslations("MatchCenter");
  
  const [matches, settings] = await Promise.all([
    client.fetch(`*[_type == "match"] | order(date desc){
      ...,
      opponentLogo { asset { _ref } }
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`)
  ]);

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const ncLogoUrl = getImageUrl(settings?.logo?.asset?._ref);
  const ncName = settings?.title || '';
  const logoRef = settings?.logo?.asset?._ref || '';

  const finishedMatch = matches.find((m: any) => m.status === 'finished') || matches[0];
  const upcomingMatches = matches.filter((m: any) => m.status === 'upcoming').slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      {/* Featured Match Center Section */}
      <div className="pt-48">
        <MatchCenter 
          finishedMatch={finishedMatch} 
          upcomingMatches={upcomingMatches} 
          clubName={ncName} 
          clubLogoRef={logoRef} 
        />
      </div>
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 border-b border-white/10 pb-6">
          Wszystkie <span className="text-primary">Spotkania</span>
        </h2>

        {matches.length === 0 ? (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold mb-4 text-gray-400">No matches scheduled yet.</h2>
            <p className="text-gray-500">Go to /studio to add fixtures!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match: any) => {
              const oppLogoUrl = getImageUrl(match.opponentLogo?.asset?._ref);

              return (
                <Link href={`/matches/${match._id}`} key={match._id} className="block">
                  <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-secondary/30 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{match.competition}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(match.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    <div className="flex-2 flex items-center justify-center gap-4 md:gap-8 min-w-[300px]">
                      {/* Home Team */}
                      <div className="flex items-center justify-end gap-4 w-1/3">
                        <span className="font-bold uppercase text-sm md:text-lg hidden sm:block text-right truncate">
                          {match.isHome ? ncName : match.opponent}
                        </span>
                        {(match.isHome ? ncLogoUrl : oppLogoUrl) ? (
                          <img src={match.isHome ? ncLogoUrl : oppLogoUrl} alt="Logo" className="w-10 h-10 object-contain" />
                        ) : (
                          <div className="w-10 h-10 bg-background rounded-full border border-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                            {match.isHome ? 'NC' : match.opponentShort}
                          </div>
                        )}
                      </div>

                      {/* Score / VS */}
                      <div className="w-24 text-center px-4 py-2 bg-background font-black text-xl rounded border border-white/5 shrink-0 text-primary">
                        {match.status === 'finished' ? `${match.homeScore} - ${match.awayScore}` : 'VS'}
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center justify-start gap-4 w-1/3">
                        {(!match.isHome ? ncLogoUrl : oppLogoUrl) ? (
                          <img src={!match.isHome ? ncLogoUrl : oppLogoUrl} alt="Logo" className="w-10 h-10 object-contain" />
                        ) : (
                          <div className="w-10 h-10 bg-background rounded-full border border-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                            {!match.isHome ? 'NC' : match.opponentShort}
                          </div>
                        )}
                        <span className="font-bold uppercase text-sm md:text-lg hidden sm:block text-left truncate">
                          {!match.isHome ? ncName : match.opponent}
                        </span>
                      </div>
                    </div>

                  <div className="flex-1 text-right mt-4 md:mt-0">
                    <span className="px-6 py-2 border border-primary text-primary font-bold text-xs uppercase tracking-widest group-hover:bg-primary group-hover:text-background transition-colors inline-block">
                      {match.status === 'finished' ? 'Szczegóły' : t('tickets')}
                    </span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
