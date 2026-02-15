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

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{t('giving.title')}</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t('giving.subtitle')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Purpose Section */}
          <div className="text-center space-y-6">
            <Heart className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-3xl font-bold">{t('giving.purpose.title')}</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {t('giving.purpose.content')}
            </p>
          </div>

          <hr />

          {/* Methods Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">{t('giving.methods.title')}</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              
              {/* Online (Aplos) */}
              <Card className="flex flex-col border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    {t('giving.methods.online.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('giving.methods.online.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center">
                  <Button asChild className="w-full py-6 text-lg">
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
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-6 w-6 text-primary" />
                    {t('giving.methods.check.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('giving.methods.check.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium text-primary">{t('giving.methods.check.payable')}</p>
                  <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-200">
                    Little Rock Immanuel Chinese Baptist Church<br />
                    {t('giving.methods.check.address')}
                  </div>
                </CardContent>
              </Card>

              {/* In-Person */}
              <Card className="flex flex-col md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="h-6 w-6 text-primary" />
                    {t('giving.methods.check.title')} (現場奉獻)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    {t('giving.methods.check.description')}
                  </p>
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
