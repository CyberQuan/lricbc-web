'use client';

import { Youtube, ExternalLink, Calendar, Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Link from "next/link";

interface OnlineWorshipClientProps {
  channelId: string;
  latestVideoId: string | null;
}

export default function OnlineWorshipClient({ channelId, latestVideoId }: OnlineWorshipClientProps) {
  const { t } = useTranslation('common');
  const [useLive, setUseLive] = useState(true);
  
  // If we're not using the "live" redirect, we use the specific latest video ID
  const embedUrl = useLive 
    ? `https://www.youtube.com/embed/live?channel=${channelId}&autoplay=0`
    : `https://www.youtube.com/embed/${latestVideoId}?autoplay=0`;

  const channelUrl = `https://www.youtube.com/channel/${channelId}`;

  return (
    <>
      {/* Compact Responsive Banner */}
      <section className="bg-gradient-to-b from-sky-100/60 to-white py-6 md:py-10 border-b border-sky-50">
        <div className="container mx-auto px-4 text-center">
          <div className="hidden md:inline-flex items-center gap-2 px-4 py-1 bg-white/40 backdrop-blur-md rounded-full border border-sky-200 mb-4 animate-pulse">
            <div className="h-2 w-2 bg-red-500 rounded-full" />
            <span className="text-xs font-black uppercase tracking-widest text-sky-900">
              {t('onlineWorshipPage.liveStatus') || 'Live Broadcast'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-light tracking-tight text-sky-900 leading-tight">
            {t('onlineWorshipPage.title') || '網上崇拜 Online Worship'}
          </h1>
          <p className="hidden md:block mt-4 text-xl font-light text-sky-600/70 italic max-w-2xl mx-auto leading-relaxed">
            {t('onlineWorshipPage.quote') || '"For where two or three gather in my name, there am I with them." — Matthew 18:20'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6 md:py-12 flex-grow">
        <div className="max-w-6xl mx-auto">
          
          {/* Video Selection Tabs (Only show if we have a latest video) */}
          {latestVideoId && (
            <div className="flex justify-center mb-8 gap-4">
              <Button 
                variant={useLive ? "default" : "outline"}
                onClick={() => setUseLive(true)}
                className="rounded-full px-8 py-4 font-bold uppercase tracking-widest text-xs"
              >
                Try Live Stream
              </Button>
              <Button 
                variant={!useLive ? "default" : "outline"}
                onClick={() => setUseLive(false)}
                className="rounded-full px-8 py-4 font-bold uppercase tracking-widest text-xs"
              >
                Watch Latest Recording
              </Button>
            </div>
          )}

          {/* Video Player Container */}
          <div className="bg-black rounded-[3rem] shadow-2xl overflow-hidden aspect-video relative group border-4 md:border-8 border-white">
            <iframe
              src={embedUrl}
              title="YouTube worship stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {!useLive && (
            <div className="mt-6 flex items-center justify-center gap-2 text-sky-600 bg-sky-50 py-3 px-6 rounded-full w-fit mx-auto border border-sky-100">
              <Info className="h-5 w-5" />
              <span className="text-sm font-medium">Viewing the most recent service recording</span>
            </div>
          )}

          {/* Info & Call to Actions */}
          <div className="grid md:grid-cols-3 gap-12 mt-12 md:mt-20">
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light text-sky-950 uppercase tracking-widest">
                  {t('onlineWorshipPage.communityTitle') || 'Join our Community'}
                </h2>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light italic">
                  {t('onlineWorshipPage.communityContent') || 'If the live player above says "Live stream is offline," you will find our most recent recorded services directly on our YouTube channel.'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-sky-100 flex flex-col items-center text-center space-y-4 transition-transform hover:scale-105">
                  <Calendar className="h-10 w-10 text-sky-500" />
                  <h3 className="text-lg font-bold uppercase tracking-widest text-sky-900">
                    {t('onlineWorshipPage.serviceTimeTitle') || 'Service Times'}
                  </h3>
                  <p className="text-slate-500 font-light text-base md:text-lg">
                    {t('onlineWorshipPage.serviceTimeContent') || 'Every Sunday at 9:00 AM CST'}
                  </p>
                </div>
                <Link 
                  href="/about#weekly-schedule"
                  className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-sky-100 flex flex-col items-center text-center space-y-4 transition-transform hover:scale-105 group"
                >
                  <Users className="h-10 w-10 text-sky-500 group-hover:text-sky-600 transition-colors" />
                  <h3 className="text-lg font-bold uppercase tracking-widest text-sky-900 group-hover:text-primary transition-colors">
                    {t('onlineWorshipPage.connectTitle') || 'Get Connected'}
                  </h3>
                  <p className="text-slate-500 font-light text-base md:text-lg">
                    {t('onlineWorshipPage.connectContent') || 'Join our fellowship groups throughout the week'}
                  </p>
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-sky-600 rounded-[3rem] p-10 md:p-12 text-white shadow-xl flex flex-col items-center text-center space-y-8">
                <Youtube className="h-12 w-12 md:h-16 w-16" />
                <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                  {t('onlineWorshipPage.youtubeTitle') || 'Visit our Channel'}
                </h3>
                <p className="text-sky-100/80 font-light italic text-base md:text-lg leading-relaxed">
                  {t('onlineWorshipPage.youtubeContent') || 'Subscribe to get notified whenever we go live or post new messages.'}
                </p>
                <Button asChild className="w-full bg-white text-sky-600 hover:bg-sky-50 rounded-full py-6 md:py-8 text-lg md:text-xl font-bold shadow-2xl transition-all hover:scale-105">
                  <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    {t('onlineWorshipPage.youtubeButton') || 'Subscribe'} <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
