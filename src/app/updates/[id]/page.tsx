'use client';

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, ChevronLeft, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { postByIdQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export default function UpdateDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation('common');
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const langSuffix = i18n.language === 'en' ? 'en' : 'zh';

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await client.fetch(postByIdQuery, { id });
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">Loading...</div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Button asChild className="mt-4">
            <Link href="/updates">{t('updates.backToList')}</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <article className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 pl-0">
          <Link href="/updates" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('updates.backToList')}
          </Link>
        </Button>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-4 text-slate-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4" />
              <span className="capitalize">{t(`updates.categories.${post.category}`)}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl">{post[`title_${langSuffix}`]}</h1>
        </div>

        <div className="prose prose-slate max-w-none prose-lg">
          <PortableText value={post[`body_${langSuffix}`]} />
        </div>
      </article>

      <Footer />
    </main>
  );
}
