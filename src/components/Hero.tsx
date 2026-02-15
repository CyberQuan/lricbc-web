'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  const { t } = useTranslation('common');

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Placeholder for background image or pattern */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/80 to-slate-900/80" />
      
      <div className="container relative z-10 mx-auto px-4 py-32 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/contact">
              {t('hero.cta')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="text-white border border-white hover:bg-white/10 hover:text-white">
            <Link href="/about">
              {t('nav.about')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
