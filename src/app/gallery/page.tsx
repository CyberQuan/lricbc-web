import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGalleryEvents } from "@/lib/local-gallery";
import GalleryList from "@/components/GalleryList";

export default async function GalleryPage() {
  const events = await getGalleryEvents();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <GalleryList initialEvents={events} />
      <Footer />
    </main>
  );
}
