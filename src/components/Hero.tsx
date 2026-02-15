'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero({ backgroundImages }: { backgroundImages: string[] }) {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Background slideshow logic
  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000); // Cross-fade every 8 seconds

    return () => clearInterval(interval);
  }, [backgroundImages]);

  return (
    <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden">
      {/* Dynamic Gallery Background Layer */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              index === currentIndex ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt="Church Memory"
              fill
              className="object-cover scale-105 blur-[1px]"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Soft Overlays to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-white/80 to-sky-50/90 mix-blend-overlay" />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
      </div>

      {/* Radiant Background Effects (Original style preserved) */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-400/10 rounded-full blur-[120px] float" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/10 rounded-full blur-[100px] float" style={{ animationDelay: '3s' }} />

      <div className="container relative z-10 mx-auto px-1 py-12 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="mb-8 flex justify-center relative group">
          {/* Radiant Growing Light Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sky-400/30 rounded-full blur-[80px] animate-pulse pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/40 rounded-full blur-[40px] animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />
          
          <div className="relative h-32 w-64 md:h-[21rem] md:w-[88rem] transition-transform duration-700 hover:scale-105">
            <Image 
              src="/logo/LRICBC_Logo_v4_NameBottom-scaled.png" 
              alt="LRICBC Logo" 
              fill 
              className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
              priority
            />
          </div>
        </div>
        <div className="inline-block px-10 py-3 mb-8 text-lg md:text-xl font-bold tracking-[0.4em] text-sky-700 uppercase bg-white/80 backdrop-blur-xl rounded-full border border-sky-200 shadow-xl hover:shadow-sky-200/50 transition-all cursor-default">
          <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            {t('about.slogan')}
          </span>
        </div>
        <p className="mx-auto mb-10 max-w-4xl text-2xl text-sky-800/60 md:text-4xl font-light italic leading-tight">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col justify-center gap-8 sm:flex-row">
          <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-16 py-10 text-2xl font-medium heavenly-glow transition-all hover:scale-105 shadow-2xl">
            <Link href="/contact">
              {t('hero.cta')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="bg-white/60 backdrop-blur-xl hover:bg-sky-50 text-sky-700 border border-sky-200 rounded-full px-16 py-10 text-2xl font-light transition-all">
            <Link href="/about">
              {t('nav.about')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
