'use client';

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { GalleryEvent } from "@/lib/local-gallery";
import Link from "next/link";

export default function GalleryList({ initialEvents }: { initialEvents: GalleryEvent[] }) {
  const { t, i18n } = useTranslation('common');
  const [filter, setFilter] = useState<'all' | string>('all');
  
  const langSuffix = i18n.language === 'en' ? 'en' : 'zh';

  const filteredEvents = filter === 'all' 
    ? initialEvents 
    : initialEvents.filter(event => event.category === filter);

  const categories = ['all', 'fellowship', 'holiday', 'worship', 'others'];

  return (
    <>
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

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/gallery/${event.id}`}>
              <Card className="overflow-hidden group cursor-pointer border-none shadow-sm hover:shadow-2xl hover:shadow-sky-200 transition-all rounded-[3rem] bg-white/40 backdrop-blur-sm">
                <CardContent className="p-0 relative aspect-[4/3]">
                  <img
                    src={event.thumbnail}
                    alt={event[`title_${langSuffix}` as keyof GalleryEvent] as string}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Elegant Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-sky-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                    <p className="text-white text-3xl font-light mb-2">
                      {event[`title_${langSuffix}` as keyof GalleryEvent] as string}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sky-300 text-sm font-bold uppercase tracking-widest">
                        {t(`gallery.categories.${event.category}`)}
                      </p>
                      {event.date && (
                        <p className="text-white/60 text-xs font-medium">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <p className="text-white/40 text-[10px] mt-4 uppercase tracking-tighter">
                      {event.images.length} Photos
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-20 text-sky-900/20 text-2xl font-light italic">
            More memories coming soon...
          </div>
        )}
      </section>
    </>
  );
}
