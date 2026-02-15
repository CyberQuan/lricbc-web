import { getRandomGalleryImages } from "@/lib/local-gallery";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const bgImages = getRandomGalleryImages(10);

  return <HomeContent bgImages={bgImages} />;
}
