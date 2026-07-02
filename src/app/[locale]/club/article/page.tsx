import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function getYouTubeEmbedUrl(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
}

export default async function ClubArticlePage() {
  const [settings, article] = await Promise.all([
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } }, logoSize }`),
    client.fetch(`*[_type == "clubArticle"][0]`)
  ]);

  const clubName = settings?.title || '';
  const embedUrl = article?.videoUrl ? getYouTubeEmbedUrl(article.videoUrl) : null;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative pt-48 pb-20 bg-secondary border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            {article?.title || `O klubie ${clubName}`}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Video Section */}
          {embedUrl ? (
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-16 border border-white/10">
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="Club Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : article?.videoUrl ? (
            <div className="mb-16 text-center">
              <a href={article.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                Obejrzyj wideo tutaj
              </a>
            </div>
          ) : (
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-16 border border-white/10 bg-secondary flex items-center justify-center">
              <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Brak wideo</span>
            </div>
          )}

          {/* Article Body */}
          {article?.body && (
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={article.body} />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
