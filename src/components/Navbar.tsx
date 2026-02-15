'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import Image from 'next/image';

export default function Navbar() {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/online-worship', label: t('nav.onlineWorship') || 'Online Worship' },
    { href: '/updates', label: t('nav.updates') },
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
              className="text-sm xl:text-base font-bold tracking-widest uppercase transition-colors hover:text-primary text-slate-500 whitespace-nowrap"
            >
              {link.label}
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
            <Menu className="h-6 w-6" />
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
                className="text-xl font-medium tracking-wide transition-colors hover:text-primary whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
