'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, History, Target, Heart, BookOpen, Download } from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation('common');

  const missionPoints = t('about.mission.points', { returnObjects: true }) as string[];
  const coreValues = t('about.values.list', { returnObjects: true }) as string[];
  const historyItems = t('about.history.items', { returnObjects: true }) as {year: string, text: string}[];
  const beliefs = t('about.faith.beliefs', { returnObjects: true }) as {title: string, content: string}[];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Heavenly Hero for About Us */}
      <section className="bg-gradient-to-b from-sky-100/60 to-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-light tracking-tight md:text-9xl mb-8 text-sky-900">{t('about.title')}</h1>
          <p className="text-3xl font-light text-sky-600/70 italic">
            "{t('about.slogan')}"
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sky-500">
              <Target className="h-8 w-8" />
              <h2 className="text-3xl font-light tracking-wide uppercase">{t('about.vision.title')}</h2>
            </div>
            <p className="text-xl text-sky-800 leading-relaxed bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-sky-100 shadow-sm italic font-light">
              {t('about.vision.content')}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sky-500">
              <CheckCircle2 className="h-8 w-8" />
              <h2 className="text-3xl font-light tracking-wide uppercase">{t('about.mission.title')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.isArray(missionPoints) && missionPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/40 border border-sky-50 rounded-2xl shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                  <span className="font-light text-sky-900">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-sky-500 text-white py-24 heavenly-glow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Heart className="h-10 w-10 mx-auto text-sky-100" />
            <h2 className="text-3xl font-light tracking-[0.3em] uppercase">{t('about.values.title')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {Array.isArray(coreValues) && coreValues.map((value, i) => (
              <div key={i} className="p-8 border border-white/20 rounded-3xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
                <p className="text-xl font-light tracking-wide">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Faith Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <BookOpen className="h-10 w-10 mx-auto text-sky-500" />
            <h2 className="text-4xl font-light tracking-tight text-sky-900">{t('about.faith.title')}</h2>
            <p className="text-sky-600/80 font-light italic">{t('about.faith.subtitle')}</p>
            <div className="pt-6">
              <Button asChild variant="outline" className="rounded-full px-8 py-6 border-sky-200 text-sky-600 hover:bg-sky-50 gap-2">
                <a 
                  href="https://lricbc.org/wp-content/uploads/2022/07/Baptist-Faith-Message.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  {t('about.faith.downloadLink')}
                </a>
              </Button>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {Array.isArray(beliefs) && beliefs.map((belief, i) => (
              <Card key={i} className="border-none bg-white/50 backdrop-blur-sm shadow-sm rounded-[2rem] hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-medium text-sky-600 tracking-wide uppercase">{belief.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-800/70 font-light leading-relaxed">{belief.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <History className="h-10 w-10 mx-auto text-sky-500" />
          <h2 className="text-3xl font-light tracking-[0.2em] uppercase text-sky-900">{t('about.history.title')}</h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-sky-200 before:to-transparent">
            {Array.isArray(historyItems) && historyItems.map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-sky-400 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="text-[10px] font-bold">{item.year.slice(-2)}</span>
                </div>
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/60 backdrop-blur-md border-sky-50 rounded-3xl shadow-sm">
                   <div className="font-bold text-sky-600 mb-1">{item.year}</div>
                   <div className="text-sky-900/70 font-light">{item.text}</div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
