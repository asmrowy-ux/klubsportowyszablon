import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight, MapPin, Users, Calendar } from "lucide-react";
import { PortableText } from '@portabletext/react';

export default async function StadiumPage() {
  const [stadium, settings] = await Promise.all([
    client.fetch(`*[_type == "stadium"][0]{
      ...,
      mainImage { asset { _ref } }
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{ title }`)
  ]);

  const clubName = settings?.title || '';

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const imageUrl = getImageUrl(stadium?.mainImage?.asset?._ref);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Stadion</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
          Nasz <span className="text-primary">Stadion</span>
        </h1>

        {!stadium ? (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">Brak danych stadionu.</h2>
            <p className="text-gray-400 dark:text-gray-500">Dodaj informacje w Sanity Studio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-6">{stadium.name}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {stadium.capacity && (
                  <div className="bg-secondary/50 p-6 rounded-xl border border-border flex items-center gap-4">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Pojemność</div>
                      <div className="text-2xl font-black">{stadium.capacity.toLocaleString()}</div>
                    </div>
                  </div>
                )}
                {stadium.opened && (
                  <div className="bg-secondary/50 p-6 rounded-xl border border-border flex items-center gap-4">
                    <Calendar className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Rok otwarcia</div>
                      <div className="text-2xl font-black">{stadium.opened}</div>
                    </div>
                  </div>
                )}
                {stadium.location && (
                  <div className="bg-secondary/50 p-6 rounded-xl border border-border flex items-center gap-4 sm:col-span-2">
                    <MapPin className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Lokalizacja</div>
                      <div className="text-lg font-bold">{stadium.location}</div>
                    </div>
                  </div>
                )}
              </div>

              {stadium.description && (
                <div className="prose dark:prose-invert prose-lg text-gray-700 dark:text-gray-300">
                  <PortableText value={stadium.description} />
                </div>
              )}
            </div>

            {imageUrl && (
              <div className="relative">
                <div className="sticky top-32 rounded-2xl overflow-hidden border border-border shadow-2xl">
                  <img src={imageUrl} alt={stadium.name} className="w-full h-auto object-cover aspect-[4/3]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
