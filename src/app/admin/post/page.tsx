'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { createAnnouncement } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminPostPage() {
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message?: string }>({ type: 'idle' });

  async function handleSubmit(formData: FormData) {
    setStatus({ type: 'loading' });
    const result = await createAnnouncement(formData);
    
    if (result.success) {
      setStatus({ type: 'success', message: "Announcement posted successfully!" });
    } else {
      setStatus({ type: 'error', message: result.error || "An error occurred" });
    }
  }

  if (status.type === 'success') {
    return (
      <main className="min-h-screen flex flex-col bg-sky-50/30">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <Card className="max-w-md w-full rounded-[3rem] shadow-2xl text-center p-12 space-y-8">
            <CheckCircle2 className="h-24 w-24 text-emerald-500 mx-auto" />
            <h2 className="text-4xl font-light text-sky-950">Post Created!</h2>
            <p className="text-xl text-slate-500 font-light italic">Your church announcement is now live on the updates page.</p>
            <div className="flex flex-col gap-4">
              <Button asChild className="rounded-full py-8 text-xl font-bold bg-sky-600 hover:bg-sky-700">
                <Link href="/updates">View Updates</Link>
              </Button>
              <Button variant="ghost" onClick={() => setStatus({ type: 'idle' })} className="text-sky-600">
                Post Another
              </Button>
            </div>
          </Card>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-sky-50/30">
      <Navbar />
      
      <section className="py-20 flex-grow container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-light text-sky-950">Post Announcement</h1>
            <p className="text-2xl text-sky-600/60 font-light italic">Create a new church announcement directly to the website.</p>
          </div>

          <form action={handleSubmit}>
            <Card className="rounded-[3.5rem] shadow-2xl border-none overflow-hidden bg-white/80 backdrop-blur-xl p-8 md:p-12 space-y-12">
              
              {/* Admin Protection */}
              <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100 space-y-4">
                <div className="flex items-center gap-3 text-amber-700 font-black uppercase tracking-widest text-sm">
                  <Lock className="h-4 w-4" />
                  <span>Security Authorization</span>
                </div>
                <Input 
                  name="adminKey" 
                  type="password" 
                  required 
                  placeholder="Enter Admin Post Key" 
                  className="bg-white border-amber-200 py-8 text-2xl rounded-2xl focus-visible:ring-amber-300"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Chinese Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-sky-500 pl-2">標題 (中文)</Label>
                    <Input name="title_zh" required placeholder="例如：本週五團契聚會" className="py-8 text-xl rounded-2xl border-sky-100 focus-visible:ring-sky-200" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-sky-500 pl-2">內容 (中文)</Label>
                    <Textarea name="content_zh" required placeholder="請輸入公告內容..." className="min-h-[300px] p-6 text-xl rounded-[2rem] border-sky-100 focus-visible:ring-sky-200" />
                  </div>
                </div>

                {/* English Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-sky-500 pl-2">Title (English)</Label>
                    <Input name="title_en" required placeholder="e.g. This Friday Fellowship" className="py-8 text-xl rounded-2xl border-sky-100 focus-visible:ring-sky-200" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-sky-500 pl-2">Content (English)</Label>
                    <Textarea name="content_en" required placeholder="Enter announcement content..." className="min-h-[300px] p-6 text-xl rounded-[2rem] border-sky-100 focus-visible:ring-sky-200" />
                  </div>
                </div>
              </div>

              {status.type === 'error' && (
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-6 w-6" />
                  <span className="font-medium text-lg">{status.message}</span>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={status.type === 'loading'}
                className="w-full py-12 text-3xl font-bold rounded-full bg-sky-600 hover:bg-sky-700 transition-all shadow-2xl heavenly-glow"
              >
                {status.type === 'loading' ? "Posting..." : "Publish Announcement"}
                <Send className="ml-4 h-8 w-8" />
              </Button>
            </Card>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
