"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";

interface Post {
  _id: string;
  title: string;
  slug?: { current: string };
  category?: string;
  publishedAt?: string;
  mainImage?: { asset: { _ref: string } };
}

function getImageUrl(ref: string) {
  if (!ref) return '';
  return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`;
}

import { replaceClubTag } from "@/utils/textUtils";

export default function NewsCarousel({ posts, clubName, clubLogoUrl }: { posts: Post[], clubName?: string, clubLogoUrl?: string }) {
  const t = useTranslations("NewsGrid");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll);
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.offsetWidth || 400;
    el.scrollBy({ left: dir === 'left' ? -cardWidth - 24 : cardWidth + 24, behavior: 'smooth' });
  };

  if (posts.length === 0) return null;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            {t('latest')} <span className="text-primary">{t('stories')}</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={() => scroll('left')}
                disabled={!canScrollLeft ? true : undefined}
                className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all ${canScrollLeft ? 'hover:border-primary hover:text-primary' : 'opacity-30 cursor-not-allowed'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                disabled={!canScrollRight ? true : undefined}
                className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all ${canScrollRight ? 'hover:border-primary hover:text-primary' : 'opacity-30 cursor-not-allowed'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link href="/news" className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              {t('allNews')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {posts.map((post, i) => (
            <Link 
              href={`/news/${post.slug?.current || '#'}`} 
              key={post._id} 
              className={`group flex-shrink-0 snap-start ${i === 0 ? 'w-[70vw] md:w-[55%]' : 'w-[80vw] sm:w-[45%] md:w-[30%]'}`}
            >
              <div className={`relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? 'h-[400px] md:h-[500px]' : 'h-[350px] md:h-[400px]'}`}>
                {post.mainImage ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${getImageUrl(post.mainImage.asset._ref)})` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-secondary flex items-center justify-center overflow-hidden">
                    {clubLogoUrl && <img src={clubLogoUrl} alt="Logo" className="w-full h-full object-cover blur-2xl opacity-30 dark:opacity-40 mix-blend-luminosity" />}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <span className="inline-block px-3 py-1 bg-primary text-background text-xs font-bold tracking-widest uppercase mb-3">
                    {post.category || 'News'}
                  </span>
                  <h3 className={`font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors ${i === 0 ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {replaceClubTag(post.title, clubName || '')}
                  </h3>
                  {post.publishedAt && (
                    <p className="text-xs text-gray-400 mt-3">{new Date(post.publishedAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/news" className="inline-flex items-center justify-center px-8 py-4 border-2 border-border text-foreground font-bold text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all w-full">
            {t('allNews')}
          </Link>
        </div>
      </div>
    </section>
  );
}
