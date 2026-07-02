import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { PortableText } from '@portabletext/react';

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([
    client.fetch(`*[_type == "jobOffer" && isActive == true] | order(_createdAt desc)`),
    client.fetch(`*[_type == "siteSettings"][0]{ title }`)
  ]);

  const clubName = settings?.title || '';

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Kariera</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          Dołącz do <span className="text-primary">Zespołu</span>
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Szukamy pasjonatów, którzy chcą tworzyć historię {clubName} razem z nami. Sprawdź aktualne oferty pracy poniżej.
        </p>

        {jobs.length === 0 ? (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">Brak otwartych rekrutacji.</h2>
            <p className="text-gray-400 dark:text-gray-500">Obecnie nie szukamy nowych pracowników, ale zaglądaj tu regularnie!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job: any) => (
              <details key={job._id} className="group bg-secondary/30 rounded-xl border border-border [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    </div>
                  </div>
                  <ChevronDown className="w-6 h-6 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                
                <div className="p-6 pt-0 border-t border-border mt-4">
                  <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mt-6">
                    <PortableText value={job.description} />
                  </div>
                  <div className="mt-8">
                    <a href="mailto:rekrutacja@novacityfc.pl" className="inline-flex px-8 py-3 bg-primary text-background font-bold uppercase tracking-widest text-sm hover:bg-foreground transition-colors">
                      Aplikuj teraz
                    </a>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
