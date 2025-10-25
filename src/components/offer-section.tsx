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
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from './ui/input';
import { MessageSquare } from 'lucide-react';

type Step = 'initial' | 'ad' | 'share' | 'form' | 'submitted';

const REQUIRED_SHARES = 15;

export function OfferSection() {
  const [step, setStep] = useState<Step>('initial');
  const [countdown, setCountdown] = useState(30);
  const [shareCount, setShareCount] = useState(0);

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
    if (step === 'share' && shareCount >= REQUIRED_SHARES) {
      setStep('form');
    }
  }, [shareCount, step]);

  const handleButtonClick = () => {
    setCountdown(30);
    setShareCount(0);
    setStep('ad');
  };

  const handleShareClick = () => {
    const urlToShare = encodeURIComponent(window.location.href);
    const textToShare = encodeURIComponent("Check out this amazing offer for free internet!");
    
    const webUrl = `https://www.facebook.com/dialog/send?app_id=YOUR_APP_ID&link=${urlToShare}&redirect_uri=${window.location.href}`;

    window.open(webUrl, '_blank');

    setShareCount((prev) => prev + 1);
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep('submitted');
  };
  
  const closeDialog = () => {
    setStep('initial');
  }

  const progressValue = ((30 - countdown) / 30) * 100;
  const shareProgress = (shareCount / REQUIRED_SHARES) * 100;


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
                <div className='w-full aspect-[9/16] bg-black'>
                  <iframe src="https://www.effectivegatecpm.com/tvh7hvci4?key=fe0fb694d10be2c533f8b1b751077009" className='w-full h-full' />
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
                  Share this offer with 15 friends on Messenger to unlock the next step.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 py-4">
                <Button onClick={handleShareClick} className="w-full" size="lg">
                  <MessageSquare className="mr-2" /> Share on Messenger
                </Button>
                <div className="space-y-2">
                  <Progress value={shareProgress} />
                  <p className="text-center text-sm text-muted-foreground">
                    {shareCount} of {REQUIRED_SHARES} shares completed
                  </p>
                </div>
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
