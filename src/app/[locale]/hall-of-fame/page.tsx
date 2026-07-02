import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HallOfFameClient from "./HallOfFameClient";

export default async function HallOfFamePage() {
  const [legends, settings] = await Promise.all([
    client.fetch(`*[_type == "player" && isLegend == true] | order(_createdAt asc)`),
    client.fetch(`*[_type == "siteSettings"][0]{ title }`)
  ]);

  const clubName = settings?.title || '';

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <HallOfFameClient legends={legends} clubName={clubName} />
      <Footer />
    </main>
  );
}
