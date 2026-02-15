'use client';

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { GalleryEvent } from "@/lib/local-gallery";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Maximize2, X } from "lucide-react";
import Link from "next/link";

export default function GalleryDetailView({ event }: { event: GalleryEvent }) {
  const { t, i18n } = useTranslation('common');
  const langSuffix = i18n.language === 'en' ? 'en' : 'zh';
  
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = event.images;
  const currentImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const title = event[`title_${langSuffix}` as keyof GalleryEvent] as string;

  return (
    <section className="flex-grow py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Button asChild variant="link" className="mb-12 pl-0 text-sky-600 text-2xl font-bold hover:no-underline group/back">
            <Link href="/gallery" className="flex items-center">
              <ChevronLeft className="mr-2 h-8 w-8 transition-transform group-hover/back:-translate-x-2" />
              {t('gallery.backToList') || 'Back to Gallery'}
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sky-100 pb-12">
            <div className="space-y-4">
              <p className="text-sky-500 font-black uppercase tracking-[0.3em] text-sm">
                {t(`gallery.categories.${event.category}`)}
              </p>
              <h1 className="text-5xl md:text-7xl font-light text-sky-950 leading-tight">
                {title}
              </h1>
            </div>
            {event.date && (
              <p className="text-2xl font-light text-sky-900/40 italic">
                {new Date(event.date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentImages.map((src, index) => (
            <div 
              key={index} 
              className="relative aspect-square group cursor-zoom-in overflow-hidden rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 bg-sky-50"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white h-10 w-10 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-20 text-center">
            <Button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="rounded-full px-12 py-8 text-xl font-bold bg-sky-600 hover:bg-sky-700 shadow-xl hover:scale-105 transition-all"
            >
              Load More Photos ({images.length - visibleCount} remaining)
            </Button>
          </div>
        )}

        {/* Full Screen Viewer */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] bg-sky-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <Button 
              className="fixed top-8 right-8 rounded-full bg-white/10 hover:bg-white/20 text-white border-none h-12 w-12"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative max-w-full max-h-full">
              <img 
                src={selectedImage} 
                alt="Selected view" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
              />
              <p className="text-white/60 text-center mt-6 font-light tracking-widest uppercase text-sm">
                {title}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
