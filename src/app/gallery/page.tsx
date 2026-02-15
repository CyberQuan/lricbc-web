'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { galleryQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default function GalleryPage() {
  const { t, i18n } = useTranslation('common');
  const [filter, setFilter] = useState<'all' | string>('all');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const langSuffix = i18n.language === 'en' ? 'en' : 'zh';

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await client.fetch(galleryQuery);
        setItems(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const filteredMedia = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  const categories = ['all', 'worship', 'retreat', 'fellowship', 'holiday'];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-to-b from-sky-100/60 to-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-light tracking-tight md:text-9xl mb-8 text-sky-900">{t('gallery.title')}</h1>
          <p className="text-3xl font-light text-sky-600/70 italic max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              onClick={() => setFilter(cat)}
              className="rounded-full px-8 py-6 text-sm tracking-widest uppercase"
            >
              {t(`gallery.categories.${cat}`)}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 font-light text-sky-400">Loading Light...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMedia.map((item) => (
              <Card key={item._id} className="overflow-hidden group cursor-pointer border-none shadow-sm hover:shadow-2xl hover:shadow-sky-200 transition-all rounded-[2.5rem] bg-white/40 backdrop-blur-sm">
                <CardContent className="p-0 relative aspect-[4/3]">
                  {item.type === 'image' ? (
                    item.image && (
                      <img
                        src={urlForImage(item.image).url()}
                        alt={item[`title_${langSuffix}`]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )
                  ) : (
                    <div className="relative w-full h-full bg-sky-900 flex items-center justify-center">
                      <div className="bg-white/90 p-4 rounded-full shadow-2xl z-10 heavenly-glow">
                        <Play className="h-8 w-8 text-sky-500 fill-sky-500" />
                      </div>
                      {item.image ? (
                         <img
                          src={urlForImage(item.image).url()}
                          alt={item[`title_${langSuffix}`]}
                          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="text-white/50 text-xs font-light tracking-widest uppercase">Sacred Video</div>
                      )}
                    </div>
                  )}
                  
                  {/* Elegant Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white text-xl font-light mb-1">{item[`title_${langSuffix}`]}</p>
                    <p className="text-sky-300 text-xs font-bold uppercase tracking-widest">{t(`gallery.categories.${item.category}`)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
