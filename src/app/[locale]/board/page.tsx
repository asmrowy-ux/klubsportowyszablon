import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

export default async function BoardPage() {
  const [boardMembers, settings] = await Promise.all([
    client.fetch(`*[_type == "staff" && department == "board"] | order(_createdAt asc)`),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`)
  ]);

  const clubName = settings?.title || '';

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const clubLogoUrl = getImageUrl(settings?.logo?.asset?._ref);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Zarząd</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 border-b border-border pb-6">
          Zarząd <span className="text-primary">Klubu</span>
        </h1>

        {boardMembers.length === 0 ? (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">Brak członków zarządu.</h2>
            <p className="text-gray-400 dark:text-gray-500">Dodaj ich w sekcji Staff w Sanity (Dział: Zarząd).</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {boardMembers.map((member: any) => {
              const imageUrl = getImageUrl(member.image?.asset?._ref);
              
              return (
                <div key={member._id} className="group bg-secondary/30 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                  <div className="aspect-[3/4] relative bg-secondary">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-background/50 overflow-hidden relative">
                        {clubLogoUrl && <img src={clubLogoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 dark:opacity-30 mix-blend-luminosity" />}
                        <span className="text-gray-500 font-bold uppercase relative z-10">Brak Zdjęcia</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col relative z-10 -mt-12 bg-gradient-to-t from-secondary via-secondary to-transparent pt-12">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-1 text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4">
                      {member.role.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
