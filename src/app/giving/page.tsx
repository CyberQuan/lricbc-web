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

      <section className="bg-gradient-to-b from-sky-100/60 to-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-light tracking-tight md:text-9xl mb-8 text-sky-900">{t('giving.title')}</h1>
          <p className="text-3xl font-light text-sky-600/70 italic max-w-3xl mx-auto">
            {t('giving.subtitle')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* Purpose Section */}
          <div className="text-center space-y-8 bg-white/40 backdrop-blur-md p-12 rounded-[3rem] border border-sky-50 shadow-sm">
            <Heart className="h-12 w-12 text-sky-400 mx-auto" />
            <h2 className="text-4xl font-light tracking-wide text-sky-900 uppercase">{t('giving.purpose.title')}</h2>
            <p className="text-xl text-sky-800/70 leading-relaxed font-light italic">
              {t('giving.purpose.content')}
            </p>
          </div>

          {/* Methods Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-light text-center tracking-[0.2em] uppercase text-sky-500">{t('giving.methods.title')}</h2>
            
            <div className="grid gap-10 md:grid-cols-2">
              
              {/* Online (Aplos) */}
              <Card className="flex flex-col border-none bg-sky-500 text-white rounded-[2.5rem] shadow-xl heavenly-glow overflow-hidden">
                <CardHeader className="pb-8 pt-10 px-10 text-center">
                  <CreditCard className="h-10 w-10 mx-auto mb-4 text-sky-100" />
                  <CardTitle className="text-2xl font-light tracking-wider uppercase mb-2">
                    {t('giving.methods.online.title')}
                  </CardTitle>
                  <CardDescription className="text-sky-100 font-light">
                    {t('giving.methods.online.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-10 flex-grow flex flex-col justify-center">
                  <Button asChild className="w-full py-8 text-lg rounded-full bg-white text-sky-600 hover:bg-sky-50 transition-all font-bold uppercase tracking-widest">
                    <a 
                      href="https://www.aplos.com/aws/give/LittleRockImmanuelChineseBaptistChurch/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      {t('giving.methods.online.button')}
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Check / Mail */}
              <Card className="flex flex-col border-none bg-white/60 backdrop-blur-md rounded-[2.5rem] shadow-sm">
                <CardHeader className="pb-8 pt-10 px-10">
                  <Mail className="h-10 w-10 text-sky-400 mb-4" />
                  <CardTitle className="text-2xl font-light tracking-wider uppercase mb-2 text-sky-900">
                    {t('giving.methods.check.title')}
                  </CardTitle>
                  <CardDescription className="text-sky-600 font-light italic">
                    {t('giving.methods.check.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-10 space-y-6">
                  <p className="font-bold text-sky-500 uppercase tracking-widest text-xs">{t('giving.methods.check.payable')}</p>
                  <div className="p-6 bg-sky-50/50 rounded-3xl text-sky-900 font-light border border-sky-100 leading-relaxed shadow-inner">
                    Little Rock Immanuel Chinese Baptist Church<br />
                    {t('giving.methods.check.address')}
                  </div>
                </CardContent>
              </Card>

              {/* In-Person */}
              <Card className="flex flex-col md:col-span-2 border-none bg-sky-50/30 backdrop-blur-sm rounded-[2.5rem] p-4">
                <CardHeader className="flex flex-row items-center gap-6">
                  <div className="bg-white p-4 rounded-full shadow-sm">
                    <Banknote className="h-8 w-8 text-sky-400" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-light tracking-wider uppercase text-sky-900">
                      {t('giving.methods.check.title')} (現場奉獻)
                    </CardTitle>
                    <CardDescription className="font-light text-sky-700">
                      {t('giving.methods.check.description')}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
