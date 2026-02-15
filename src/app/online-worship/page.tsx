import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLatestVideoId } from "@/lib/youtube";
import OnlineWorshipClient from "@/components/OnlineWorshipClient";

export default async function OnlineWorshipPage() {
  const channelId = "UCefUbMKSUD_2YGB3tWLwsAw";
  const latestVideoId = await getLatestVideoId(channelId);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <OnlineWorshipClient 
        channelId={channelId} 
        latestVideoId={latestVideoId} 
      />
      <Footer />
    </main>
  );
}
