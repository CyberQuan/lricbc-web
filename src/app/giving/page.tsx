'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CreditCard, Mail, Banknote, ExternalLink } from "lucide-react";

export default function GivingPage() {
  const { t } = useTranslation('common');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-to-b from-sky-100/60 to-white py-8 md:py-10 border-b border-sky-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/40 backdrop-blur-md rounded-full border border-sky-200 mb-4 animate-pulse">
            <div className="h-2 w-2 bg-sky-500 rounded-full" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-sky-900">
              {t('giving.title')}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-sky-900 leading-tight">
            {t('giving.title')}
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-light text-sky-600/70 italic max-w-2xl mx-auto leading-relaxed px-4">
            {t('giving.subtitle')}
          </p>

          <div className="max-w-2xl mx-auto pt-8 mt-8 border-t border-sky-100 animate-in fade-in slide-in-from-top-4 duration-1000">
            <p className="text-base sm:text-xl font-light text-slate-500 italic leading-relaxed px-4">
              {t('giving.quote')}
            </p>
            <p className="mt-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-sky-500/60">
              — {t('giving.quoteVerse')}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 sm:py-16 flex-grow">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-20">
          
          {/* Purpose Section */}
          <div className="text-center space-y-6 sm:space-y-8 bg-white/40 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-sky-50 shadow-sm">
            <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-sky-400 mx-auto" />
            <h2 className="text-2xl sm:text-4xl font-light tracking-wide text-sky-900 uppercase">{t('giving.purpose.title')}</h2>
            <p className="text-lg sm:text-xl text-sky-800/70 leading-relaxed font-light italic">
              {t('giving.purpose.content')}
            </p>
          </div>

          {/* Methods Section */}
          <div className="space-y-8 sm:space-y-12">
            <h2 className="text-2xl sm:text-3xl font-light text-center tracking-[0.2em] uppercase text-sky-500">{t('giving.methods.title')}</h2>
            
            <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
              
              {/* Online (Aplos) */}
              <Card className="flex flex-col border-none bg-sky-500 text-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl heavenly-glow overflow-hidden">
                <CardHeader className="pb-6 sm:pb-8 pt-8 sm:pt-10 px-8 sm:px-10 text-center">
                  <CreditCard className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-4 text-sky-100" />
                  <CardTitle className="text-xl sm:text-2xl font-light tracking-wider uppercase mb-2">
                    {t('giving.methods.online.title')}
                  </CardTitle>
                  <CardDescription className="text-sky-100 font-light text-sm sm:text-base">
                    {t('giving.methods.online.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 sm:px-10 pb-8 sm:pb-10 flex-grow flex flex-col justify-center">
                  <Button asChild className="w-full py-6 sm:py-8 text-base sm:text-lg rounded-full bg-white text-sky-600 hover:bg-sky-50 transition-all font-bold uppercase tracking-widest">
                    <a 
                      href="https://www.aplos.com/aws/give/LittleRockImmanuelChineseBaptistChurch/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      {t('giving.methods.online.button')}
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Check / Mail / In-Person */}
              <Card className="flex flex-col border-none bg-white/60 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] shadow-sm">
                <CardHeader className="pb-6 sm:pb-8 pt-8 sm:pt-10 px-8 sm:px-10">
                  <div className="flex gap-4 mb-4">
                    <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-sky-400" />
                    <Banknote className="h-8 w-8 sm:h-10 sm:w-10 text-sky-400" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-light tracking-wider uppercase mb-2 text-sky-900">
                    {t('giving.methods.check.title')}
                  </CardTitle>
                  <CardDescription className="text-sky-600 font-light italic text-sm sm:text-base">
                    {t('giving.methods.check.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 sm:px-10 pb-8 sm:pb-10 space-y-4 sm:space-y-6">
                  <p className="font-bold text-sky-500 uppercase tracking-widest text-[10px] sm:text-xs">{t('giving.methods.check.payable')}</p>
                  <div className="p-5 sm:p-6 bg-sky-50/50 rounded-2xl sm:rounded-3xl text-sky-900 font-light border border-sky-100 leading-relaxed shadow-inner text-sm sm:text-base">
                    Little Rock Immanuel Chinese Baptist Church<br />
                    {t('giving.methods.check.address')}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
