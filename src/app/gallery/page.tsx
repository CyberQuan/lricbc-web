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

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{t('gallery.title')}</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              onClick={() => setFilter(cat)}
            >
              {t(`gallery.categories.${cat}`)}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMedia.map((item) => (
              <Card key={item._id} className="overflow-hidden group cursor-pointer border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-0 relative aspect-video bg-slate-200">
                  {item.type === 'image' ? (
                    item.image && (
                      <img
                        src={urlForImage(item.image).url()}
                        alt={item[`title_${langSuffix}`]}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )
                  ) : (
                    <div className="relative w-full h-full bg-slate-800 flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full shadow-lg z-10">
                        <Play className="h-6 w-6 text-primary fill-primary" />
                      </div>
                      {item.image ? (
                         <img
                          src={urlForImage(item.image).url()}
                          alt={item[`title_${langSuffix}`]}
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                      ) : (
                        <div className="text-white/50 text-xs">Video Placeholder</div>
                      )}
                    </div>
                  )}
                  
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">{item[`title_${langSuffix}`]}</p>
                    <p className="text-white/70 text-sm capitalize">{t(`gallery.categories.${item.category}`)}</p>
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
