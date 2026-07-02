import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MatchCenter from "@/components/MatchCenter";
import NewsCarousel from "@/components/NewsGrid";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

export default async function Home() {
  const [posts, settings, allMatches] = await Promise.all([
    client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...10]`),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`),
    client.fetch(`*[_type == "match"] | order(date desc)[0...10]{
      _id,
      opponent,
      opponentShort,
      opponentLogo { asset { _ref } },
      isHome,
      date,
      competition,
      status,
      homeScore,
      awayScore
    }`)
  ]);

  const clubName = settings?.title || '';
  const logoRef = settings?.logo?.asset?._ref || '';

  const finishedMatch = allMatches.find((m: any) => m.status === 'finished') || allMatches[0];
  const upcomingMatches = allMatches.filter((m: any) => m.status === 'upcoming').slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection clubName={clubName} logoRef={logoRef} />
      <MatchCenter 
        finishedMatch={finishedMatch} 
        upcomingMatches={upcomingMatches} 
        clubName={clubName} 
        clubLogoRef={logoRef} 
      />
      <NewsCarousel posts={posts} clubName={clubName} clubLogoUrl={logoRef ? `https://cdn.sanity.io/images/3kzdw0qu/production/${logoRef.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}` : undefined} />
      <Footer />
    </main>
  );
}
