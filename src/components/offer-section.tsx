'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, MessageSquare, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from './ui/input';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

type Step = 'initial' | 'ad' | 'share' | 'form' | 'submitted';

export function OfferSection() {
  const [step, setStep] = useState<Step>('initial');
  const [countdown, setCountdown] = useState(30);
  const [shares, setShares] = useState({ messenger: false, whatsapp: false });

  const totalShares = Object.values(shares).filter(Boolean).length;
  const allShared = totalShares === 2;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'ad' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (step === 'ad' && countdown === 0) {
      setStep('share');
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);
  
  useEffect(() => {
    if(allShared) {
      setTimeout(() => setStep('form'), 500);
    }
  }, [allShared]);

  const handleButtonClick = () => {
    setCountdown(30);
    setStep('ad');
  };

  const handleShareClick = (platform: 'messenger' | 'whatsapp') => {
    const urlToShare = encodeURIComponent(window.location.href);
    let webUrl: string;

    if (platform === 'messenger') {
      webUrl = `fb-messenger://share?link=${urlToShare}`;
      setShares(s => ({ ...s, messenger: true }));
    } else {
      webUrl = `https://wa.me/?text=${urlToShare}`;
      setShares(s => ({ ...s, whatsapp: true }));
    }
    
    window.open(webUrl, '_blank', 'width=600,height=400');
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep('submitted');
  };

  const closeDialog = () => {
    setStep('initial');
    setShares({ messenger: false, whatsapp: false });
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
      <p className="text-sm text-muted-foreground">Must watch 10 ads.</p>

      <AlertDialog open={step !== 'initial'} onOpenChange={(open) => !open && closeDialog()}>
        <AlertDialogContent>
          {step === 'ad' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Advertisement</AlertDialogTitle>
                <AlertDialogDescription>
                  Please wait for the ad to finish. Closing this will not grant the offer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4">
                <div className="w-full aspect-[9/16] bg-black">
                  <iframe src="https://www.effectivegatecpm.com/tvh7hvci4?key=fe0fb694d10be2c533f8b1b751077009" className="w-full h-full" />
                </div>
                <Progress value={progressValue} />
                <p className="text-center font-mono text-lg">
                  Ad will close in {countdown} second{countdown !== 1 ? 's' : ''}
                </p>
              </div>
            </>
          )}
          {step === 'share' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Share to Unlock</AlertDialogTitle>
                <AlertDialogDescription>
                  Share this offer to unlock the next step.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 py-4">
                <Button onClick={() => handleShareClick('messenger')} className="w-full" size="lg" disabled={shares.messenger}>
                  <MessageSquare className="mr-2" /> Share on Messenger
                </Button>
                 <Button onClick={() => handleShareClick('whatsapp')} className="w-full bg-green-500 hover:bg-green-600" size="lg" disabled={shares.whatsapp}>
                  <WhatsAppIcon /> Share on WhatsApp
                </Button>
                <p className="text-center text-sm text-muted-foreground">{totalShares} of 2 shares completed</p>
              </div>
              <AlertDialogFooter>
                <Button variant="outline" onClick={closeDialog}>Close</Button>
              </AlertDialogFooter>
            </>
          )}
          {step === 'form' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Claim Your Offer</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter your phone number to receive the free data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Input type="tel" placeholder="Enter your phone number" required />
                <AlertDialogFooter>
                  <Button type="submit">Send</Button>
                </AlertDialogFooter>
              </form>
            </>
          )}
          {step === 'submitted' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Offer Claimed!</AlertDialogTitle>
                <AlertDialogDescription>
                  Your request has been submitted. You will receive your data within 24 hours.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button onClick={closeDialog}>Close</Button>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
