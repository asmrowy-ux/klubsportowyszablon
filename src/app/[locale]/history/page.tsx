import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { PortableText } from '@portabletext/react';
import { replaceClubTag, processPortableText } from "@/utils/textUtils";

export default async function HistoryPage() {
  const [history, settings] = await Promise.all([
    client.fetch(`*[_type == "clubHistory"][0]`),
    client.fetch(`*[_type == "siteSettings"][0]{ title }`)
  ]);

  const clubName = settings?.title || '';

  const icons: Record<string, string> = {
    success: '🏆',
    promotion: '⬆️',
    relegation: '⬇️',
    transfer: '✍️',
    milestone: '🌟',
  };

  const colors: Record<string, string> = {
    success: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    promotion: 'text-green-400 border-green-400/30 bg-green-400/10',
    relegation: 'text-red-400 border-red-400/30 bg-red-400/10',
    transfer: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    milestone: 'text-primary border-primary/30 bg-primary/10',
  };

  // Process history description
  const processedDescription = history?.description ? processPortableText(history.description, clubName) : null;

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Historia</span>
        </div>

        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-primary/30 rounded-full text-primary text-sm font-bold tracking-widest mb-6">
            Założony w {history?.foundingYear || '----'}
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            Historia <span className="text-primary">{clubName.split(' ').pop()}</span>
          </h1>
          
          {processedDescription ? (
            <div className="prose dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-headings:text-foreground mx-auto text-left">
              <PortableText value={processedDescription} />
            </div>
          ) : (
            <p className="text-gray-500">Brak opisu historii. Dodaj go w Sanity Studio.</p>
          )}
        </div>

        {/* Timeline */}
        {history?.timeline && history.timeline.length > 0 && (
          <div className="mt-24 relative">
            <h2 className="text-3xl font-black uppercase tracking-widest text-center mb-16">
              Kalendarium <span className="text-primary">Wydarzeń</span>
            </h2>

            <div className="absolute left-1/2 top-32 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

            <div className="space-y-12 md:space-y-0">
              {history.timeline.sort((a: any, b: any) => b.year - a.year).map((event: any, index: number) => {
                const isLeft = index % 2 === 0;
                const typeStyle = colors[event.eventType] || colors.milestone;
                const icon = icons[event.eventType] || icons.milestone;

                return (
                  <div key={event._key} className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''} group`}>
                    
                    {/* Event Content */}
                    <div className={`w-full md:w-1/2 ${isLeft ? 'md:pl-16' : 'md:pr-16'} relative`}>
                      <div className={`p-6 rounded-2xl bg-secondary border border-border hover:border-primary/50 transition-all duration-300 transform group-hover:-translate-y-1 ${isLeft ? 'text-left' : 'text-right'}`}>
                        <div className={`text-3xl font-black mb-2 ${typeStyle.split(' ')[0]}`}>
                          {event.year}
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-foreground">
                          {replaceClubTag(event.title, clubName)}
                        </h3>
                        {event.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {replaceClubTag(event.description, clubName)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-background bg-secondary flex items-center justify-center text-xl z-10 hidden md:flex">
                      <div className={`w-full h-full rounded-full flex items-center justify-center border ${typeStyle}`}>
                        {icon}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
