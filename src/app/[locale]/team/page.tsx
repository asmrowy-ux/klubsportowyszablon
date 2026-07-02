import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamClient from "./TeamClient";

export default async function TeamPage() {
  const [players, settings] = await Promise.all([
    client.fetch(`*[_type == "player" && isLegend != true] | order(number asc)`),
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
      <TeamClient players={players} clubName={clubName} clubLogoUrl={clubLogoUrl} />
      <Footer />
    </main>
  );
}
