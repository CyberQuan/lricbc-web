'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, History, Target, Heart, BookOpen, Download } from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation('common');

  // Explicitly cast to handle nested arrays in i18n safely
  const missionPoints = t('about.mission.points', { returnObjects: true }) as string[];
  const coreValues = t('about.values.list', { returnObjects: true }) as string[];
  const historyItems = t('about.history.items', { returnObjects: true }) as {year: string, text: string}[];
  const beliefs = t('about.faith.beliefs', { returnObjects: true }) as {title: string, content: string}[];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section for About Us */}
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-6xl mb-4">{t('about.title')}</h1>
          <p className="text-2xl font-medium text-blue-100 italic">
            "{t('about.slogan')}"
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <Target className="h-8 w-8" />
              <h2 className="text-3xl font-bold">{t('about.vision.title')}</h2>
            </div>
            <p className="text-xl text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border-l-4 border-primary">
              {t('about.vision.content')}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <CheckCircle2 className="h-8 w-8" />
              <h2 className="text-3xl font-bold">{t('about.mission.title')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.isArray(missionPoints) && missionPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-white border rounded-lg shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Heart className="h-10 w-10 mx-auto text-primary" />
            <h2 className="text-3xl font-bold">{t('about.values.title')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {Array.isArray(coreValues) && coreValues.map((value, i) => (
              <div key={i} className="p-6 border border-slate-700 rounded-lg hover:border-primary transition-colors">
                <p className="text-xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Faith Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <BookOpen className="h-10 w-10 mx-auto text-primary" />
            <h2 className="text-3xl font-bold">{t('about.faith.title')}</h2>
            <p className="text-slate-600">{t('about.faith.subtitle')}</p>
            <div className="pt-4">
              <p className="text-sm text-slate-500 mb-2">{t('about.faith.downloadText')}</p>
              <Button asChild variant="outline" className="gap-2">
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
          
          <div className="grid gap-6 md:grid-cols-2">
            {Array.isArray(beliefs) && beliefs.map((belief, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-primary">{belief.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">{belief.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-4">
          <History className="h-10 w-10 mx-auto text-primary" />
          <h2 className="text-3xl font-bold">{t('about.history.title')}</h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {Array.isArray(historyItems) && historyItems.map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="text-xs font-bold">{item.year.slice(-2)}</span>
                </div>
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 shadow-sm">
                   <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-primary">{item.year}</div>
                   </div>
                   <div className="text-slate-600">{item.text}</div>
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
