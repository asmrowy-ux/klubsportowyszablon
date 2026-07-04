import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const page = await client.fetch(
    `*[_type == "customPage" && slug.current == $slug][0]{
      title,
      body,
      mainImage { asset { _ref } }
    }`,
    { slug }
  );

  if (!page) return notFound();

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`;
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero section */}
      <div className="relative w-full h-[30vh] md:h-[40vh] bg-secondary flex items-end">
        {page.mainImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${getImageUrl(page.mainImage.asset._ref)})` }}
            />
            <div className="absolute inset-0 bg-gradient-animated opacity-20 pointer-events-none z-10" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-20" />
        
        <div className="relative z-30 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight drop-shadow-md">
            {page.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full min-h-[40vh]">
        <div className="prose prose-invert prose-lg max-w-none">
          {page.body?.map((block: any, i: number) => {
            if (block._type === 'block') {
              const Tag = block.style === 'h2' ? 'h2' : block.style === 'h3' ? 'h3' : block.style === 'h4' ? 'h4' : 'p';
              const classMap: Record<string, string> = {
                h2: 'text-3xl font-black uppercase tracking-tighter mt-10 mb-4',
                h3: 'text-2xl font-bold uppercase tracking-tight mt-8 mb-3',
                h4: 'text-xl font-bold mt-6 mb-2',
                normal: 'text-gray-300 leading-relaxed mb-6 text-lg',
              };
              
              const text = block.children?.map((child: any) => child.text).join('') || '';

              return (
                <Tag key={i} className={classMap[block.style || 'normal'] || classMap.normal}>
                  {text}
                </Tag>
              );
            }
            if (block._type === 'image' && block.asset?._ref) {
              return (
                <div key={i} className="my-8 rounded-xl overflow-hidden border border-border">
                  <img src={getImageUrl(block.asset._ref)} alt="Image" className="w-full h-auto object-cover" />
                </div>
              );
            }
            return null;
          })}
        </div>
      </article>

      <Footer />
    </main>
  );
}
