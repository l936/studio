'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function OfferSection() {
  return (
    <section className="space-y-4 text-center">
      <div className="flex justify-center items-center gap-2">
        <Sparkles className="text-accent" />
        <h2 className="text-xl font-bold text-foreground">
          সমস্ত নেটওয়ার্কের জন্য বিনামূল্যে 100GB ডেটা প্ল্যান!
        </h2>
        <Sparkles className="text-accent" />
      </div>
      <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-6 rounded-lg shadow-lg">
        এখানে ক্লিক করুন &rarr;
      </Button>
      <p className="text-sm text-muted-foreground">Limited time offer - Claim your free data now!</p>
    </section>
  );
}
