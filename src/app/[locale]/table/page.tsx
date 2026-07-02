import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeagueTable from "@/components/LeagueTable";

export default async function TablePage() {
  const table = await client.fetch(`*[_type == "leagueTable"][0]{ seasonName, competition, teams }`);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-center">
          Tabela <span className="text-primary">Ligi</span>
        </h1>
        {table && (
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-12">
            {table.competition} • Sezon {table.seasonName}
          </p>
        )}

        {!table || !table.teams || table.teams.length === 0 ? (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">Tabela nie została jeszcze uzupełniona.</h2>
            <p className="text-gray-400 dark:text-gray-500">Przejdź do /studio → League Table i dodaj drużyny!</p>
          </div>
        ) : (
          <LeagueTable teams={table.teams} />
        )}
      </div>

      <Footer />
    </main>
  );
}
