'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newUpdatesCount, setNewUpdatesCount] = useState(0);

  useEffect(() => {
    fetch('/api/updates/count')
      .then(res => res.json())
      .then(data => setNewUpdatesCount(data.count))
      .catch(() => setNewUpdatesCount(0));
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/online-worship', label: t('nav.onlineWorship') || 'Online Worship' },
    { href: '/updates', label: t('nav.updates'), showBadge: newUpdatesCount > 0 },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/giving', label: t('nav.giving') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-md border-b border-white/50">
      <div className="container mx-auto flex h-20 items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-12 w-12">
              <Image 
                src="/logo/cropped-LRICBC_Logo.png" 
                alt="LRICBC Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-light tracking-[0.3em] text-slate-800 transition-colors group-hover:text-primary uppercase">LRICBC</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm xl:text-base font-bold tracking-widest uppercase transition-colors hover:text-primary text-slate-500 whitespace-nowrap group/nav"
            >
              {link.label}
              {link.showBadge && (
                <span className="absolute -top-3 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-bounce shadow-lg ring-2 ring-white">
                  {newUpdatesCount}
                </span>
              )}
            </Link>
          ))}
          <div className="pl-4 border-l border-slate-200">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-2 lg:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              <Menu className="h-6 w-6" />
              {newUpdatesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-red-500" />
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 py-6 lg:hidden bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xl font-medium tracking-wide transition-colors hover:text-primary whitespace-nowrap flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                {link.showBadge && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[12px] text-white font-black">
                    {newUpdatesCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
