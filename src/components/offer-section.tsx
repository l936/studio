'use client';

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';

export function OfferSection() {
  const [showAd, setShowAd] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAd && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showAd && countdown === 0) {
      setShowAd(false);
    }
    return () => clearTimeout(timer);
  }, [showAd, countdown]);

  const handleButtonClick = () => {
    setCountdown(30);
    setShowAd(true);
  };

  const progressValue = ((30 - countdown) / 30) * 100;

  return (
    <section className="space-y-4 text-center">
      <div className="flex justify-center items-center gap-2">
        <Sparkles className="text-accent" />
        <h2 className="text-xl font-bold text-foreground">
          সমস্ত নেটওয়াকের জন্য বিনামূল্যে 25 GB ডেটা প্ল্যান!
        </h2>
        <Sparkles className="text-accent" />
      </div>
      <Button
        size="lg"
        className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-6 rounded-lg shadow-lg"
        onClick={handleButtonClick}
      >
        এখানে ক্লিক করুন &rarr;
      </Button>
      <p className="text-sm text-muted-foreground">Limited time offer - Claim your free data now!</p>

      <AlertDialog open={showAd} onOpenChange={setShowAd}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Advertisement</AlertDialogTitle>
            <AlertDialogDescription>
              Please wait for the ad to finish. Closing this will not grant the offer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <Progress value={progressValue} />
            <p className="text-center font-mono text-lg">
              Ad will close in {countdown} second{countdown !== 1 ? 's' : ''}
            </p>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
