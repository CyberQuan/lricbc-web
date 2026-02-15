'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Featured Sections Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{t('nav.updates')}</h3>
            <p className="text-muted-foreground">
              Stay informed with the latest messages from our pastor and church announcements.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{t('nav.gallery')}</h3>
            <p className="text-muted-foreground">
              Explore memories from our retreats, holiday celebrations, and fellowship gatherings.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{t('nav.giving')}</h3>
            <p className="text-muted-foreground">
              Support our mission and ministry through online giving and other contributions.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
