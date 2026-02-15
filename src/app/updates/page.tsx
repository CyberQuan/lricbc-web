'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";

export default function UpdatesPage() {
  const { t, i18n } = useTranslation('common');
  const [filter, setFilter] = useState<'all' | 'pastor' | 'sermon' | 'news'>('all');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const langSuffix = i18n.language === 'en' ? 'en' : 'zh';

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(postsQuery);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredUpdates = filter === 'all' 
    ? posts 
    : posts.filter(u => u.category === filter);

  const categories: ('all' | 'pastor' | 'sermon' | 'news')[] = ['all', 'pastor', 'sermon', 'news'];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{t('updates.title')}</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t('updates.subtitle')}
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
              {t(`updates.categories.${cat}`)}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredUpdates.map((update) => (
              <Card key={update._id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(update.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 capitalize">
                      <Tag className="h-4 w-4" />
                      <span>{t(`updates.categories.${update.category}`)}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">
                    {update[`title_${langSuffix}`]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base line-clamp-3">
                    {update[`excerpt_${langSuffix}`]}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="px-0 text-primary">
                    <Link href={`/updates/${update._id}`}>
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
