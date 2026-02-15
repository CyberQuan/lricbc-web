'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation('common');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{t('contact.title')}</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Contact Information & Map */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.title')}</CardTitle>
                <CardDescription>
                  Little Rock Immanuel Chinese Baptist Church
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{t('contact.info.address')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{t('contact.info.phone')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{t('contact.info.email')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Google Map Embed */}
            <div className="overflow-hidden rounded-lg border h-[300px] lg:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.366779146193!2d-92.40466492362483!3d34.74635677290333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d2a5d911111111%3A0x1111111111111111!2s9701%20W%20Markham%20St%2C%20Little%20Rock%2C%20AR%2072205!5e0!3m2!1sen!2sus!4v1709999999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.form.submit')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.form.name')}</Label>
                  <Input id="name" placeholder={t('contact.form.name')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.form.email')}</Label>
                  <Input id="email" type="email" placeholder={t('contact.form.email')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.form.message')}</Label>
                  <Textarea
                    id="message"
                    placeholder={t('contact.form.message')}
                    className="min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t('contact.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </main>
  );
}
