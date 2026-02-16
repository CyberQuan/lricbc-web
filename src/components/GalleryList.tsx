'use client';

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { GalleryEvent } from "@/lib/local-gallery";
import Link from "next/link";
import { Search, Calendar, ExternalLink, X } from "lucide-react";

export default function GalleryList({ initialEvents }: { initialEvents: GalleryEvent[] }) {
  const { t, i18n } = useTranslation('common');
  const [filter, setFilter] = useState<'all' | string>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  const langSuffix = i18n.language === 'en' ? 'en' : 'zh';

  // Extract all available years from events
  const years = useMemo(() => {
    const y = new Set<string>();
    initialEvents.forEach(e => {
      if (e.date) {
        y.add(new Date(e.date).getFullYear().toString());
      }
    });
    return Array.from(y).sort((a, b) => b.localeCompare(a));
  }, [initialEvents]);

  const filteredEvents = useMemo(() => {
    return initialEvents.filter(event => {
      const matchesCategory = filter === 'all' || event.category === filter;
      const eventYear = event.date ? new Date(event.date).getFullYear().toString() : '';
      const matchesYear = selectedYear === 'all' || eventYear === selectedYear;
      
      const query = searchQuery.toLowerCase();
      const title = (event[`title_${langSuffix}` as keyof GalleryEvent] as string || "").toLowerCase();
      const matchesSearch = !searchQuery || title.includes(query);

      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [initialEvents, filter, searchQuery, selectedYear, langSuffix]);

  const categories = ['all', 'fellowship', 'holiday', 'worship', 'others'];

  const categoryBadgeStyles: Record<string, string> = {
    fellowship: "text-amber-600 bg-amber-50",
    holiday: "text-emerald-600 bg-emerald-50",
    worship: "text-sky-600 bg-sky-50",
    others: "text-slate-500 bg-slate-50",
  };

  return (
    <>
      <section className="bg-gradient-to-b from-sky-100/60 to-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-light tracking-tight md:text-9xl mb-8 text-sky-900">{t('gallery.title')}</h1>
          <p className="text-3xl font-light text-sky-600/70 italic max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 flex-grow">
        
        {/* Advanced Search & Filter Panel */}
        <div className="max-w-6xl mx-auto mb-20 space-y-8 bg-white/40 backdrop-blur-xl p-10 rounded-[3.5rem] border border-sky-100 shadow-xl">
          <div className="relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-8 w-8 text-sky-300 group-focus-within:text-sky-500 transition-colors" />
            <Input 
              placeholder={t('gallery.searchPlaceholder') || "Find an event or memory..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-20 pr-16 py-10 text-2xl font-light rounded-full border-sky-50 bg-white shadow-inner focus-visible:ring-sky-200 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-2 hover:bg-sky-50 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-sky-400" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Year Selector */}
            <div className="flex items-center bg-sky-50 p-2 rounded-full border border-sky-100 mr-4">
              <Calendar className="ml-4 mr-2 h-5 w-5 text-sky-400" />
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-sky-900 font-bold uppercase tracking-widest text-sm px-4 py-2 outline-none cursor-pointer"
              >
                <option value="all">{i18n.language === 'en' ? 'All Years' : '所有年份'}</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="h-8 w-px bg-sky-100 mx-2 hidden md:block" />

            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "ghost"}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-8 py-6 text-sm tracking-widest uppercase transition-all ${
                  filter === cat 
                    ? "bg-sky-600 text-white shadow-lg scale-105" 
                    : "text-sky-900/60 hover:bg-white hover:text-sky-600"
                }`}
              >
                {t(`gallery.categories.${cat}`)}
              </Button>
            ))}
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event) => {
              const cardContent = (
                <Card className="h-full overflow-hidden group cursor-pointer border-none shadow-sm hover:shadow-2xl hover:shadow-sky-200 transition-all rounded-[2.5rem] bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={event.thumbnail}
                      alt={event[`title_${langSuffix}` as keyof GalleryEvent] as string}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {event.googlePhotosUrl && (
                      <div className="absolute top-6 right-6 bg-emerald-500/90 backdrop-blur-md p-3 rounded-full text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        <ExternalLink className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${categoryBadgeStyles[event.category] || categoryBadgeStyles.others}`}>
                        {t(`gallery.categories.${event.category}`)}
                      </span>
                      {event.date && (
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                          {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-light text-sky-950 leading-tight group-hover:text-sky-600 transition-colors line-clamp-2">
                      {event[`title_${langSuffix}` as keyof GalleryEvent] as string}
                    </h3>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-50">
                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                        {event.googlePhotosUrl ? 'Full Album' : `${event.images.length} Photos`}
                      </span>
                      <span className="text-sky-400 text-xs font-black group-hover:translate-x-1 transition-transform">
                        {i18n.language === 'en' ? 'View →' : '查看 →'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );

              return event.googlePhotosUrl ? (
                <a key={event.id} href={event.googlePhotosUrl} target="_blank" rel="noopener noreferrer">
                  {cardContent}
                </a>
              ) : (
                <Link key={event.id} href={`/gallery/${event.id}`}>
                  {cardContent}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 space-y-6">
            <div className="bg-sky-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="h-16 w-16 text-sky-200" />
            </div>
            <p className="text-3xl font-light text-sky-900/40 italic">
              No matching memories found
            </p>
            <Button 
              variant="link" 
              onClick={() => {setSearchQuery(""); setFilter('all'); setSelectedYear('all');}}
              className="text-sky-600 text-xl"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
