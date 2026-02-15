'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { mockUpdates } from "@/lib/mock-updates";

export default function UpdatesPage() {
  const { t, i18n } = useTranslation('common');
  const [filter, setFilter] = useState<'all' | 'pastor' | 'sermon' | 'news'>('all');
  const [posts, setPosts] = useState<any[]>(mockUpdates);
  const [loading, setLoading] = useState(false);
  
  const langSuffix = i18n.language === 'en' ? 'en' : 'zh';

  const filteredUpdates = filter === 'all' 
    ? posts 
    : posts.filter(u => u.category === filter);

  const categories: ('all' | 'pastor' | 'sermon' | 'news')[] = ['all', 'pastor', 'sermon', 'news'];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-to-b from-sky-100/60 to-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-light tracking-tight md:text-9xl mb-8 text-sky-900">{t('updates.title')}</h1>
          <p className="text-3xl font-light text-sky-600/70 italic max-w-3xl mx-auto">
            {t('updates.subtitle')}
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
              {t(`updates.categories.${cat}`)}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 font-light text-sky-400 animate-pulse">Loading Peace...</div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredUpdates.map((update) => (
              <Card key={update.id} className="flex flex-col bg-white/40 backdrop-blur-md border-sky-50 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-sky-100 transition-all group overflow-hidden border-none">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(update.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="h-3 w-3" />
                      <span>{t(`updates.categories.${update.category}`)}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 text-2xl font-light text-sky-900 group-hover:text-sky-500 transition-colors">
                    {update.title[langSuffix as 'en' | 'zh']}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base font-light text-sky-700/70 line-clamp-3 italic">
                    {update.excerpt[langSuffix as 'en' | 'zh']}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild variant="link" className="px-0 text-sky-500 font-bold uppercase tracking-widest text-xs hover:text-sky-400">
                    <Link href={`/updates/${update.id}`}>
                      {t('updates.readMore')} →
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
