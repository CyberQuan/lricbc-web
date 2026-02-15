import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGalleryEvents } from "@/lib/local-gallery";
import GalleryList from "@/components/GalleryList";

export default function GalleryPage() {
  const events = getGalleryEvents();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <GalleryList initialEvents={events} />
      <Footer />
    </main>
  );
}
