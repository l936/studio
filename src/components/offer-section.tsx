'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { personalizeOffer } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Sparkles, Terminal } from 'lucide-react';

const initialState = {
  personalizedOffer: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Personalizing...' : 'Personalize Offer'}
      <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function OfferSection() {
  const [state, formAction] = useFormState(personalizeOffer, initialState);
  const [offerText, setOfferText] = useState('Get your free 100GB Data Plan for ALL networks!');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.personalizedOffer) {
      setOfferText(state.personalizedOffer);
    }
    if (!state.error && state.personalizedOffer) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section className="space-y-6">
      <Card className="bg-accent/20 border-accent/50 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline text-accent-foreground/90">
            ফ্রি 100GB Internet!
          </CardTitle>
          <CardDescription className="text-accent-foreground/70">
            সমস্ত নেটওয়ার্কে এখনই উপভোগ করুন!
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="text-center shadow-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{offerText}</CardTitle>
          <CardDescription>Claim your free 100GB data plan for any network!</CardDescription>
        </CardHeader>
        <CardContent>
          <a href="#">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
              CLICK HERE
            </Button>
          </a>
        </CardContent>
        <CardFooter className="flex-col gap-4 bg-secondary/50 p-6">
          <div className="text-sm text-foreground">Or, let AI personalize the offer for you!</div>
          <form action={formAction} ref={formRef} className="w-full max-w-md space-y-4">
            <div>
              <Label htmlFor="interests" className="sr-only">
                Your Interests
              </Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="Tell us what you love to do online, e.g., 'I love streaming movies and playing online games with friends...'"
                className="bg-background"
                required
              />
            </div>
            {state.error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            <SubmitButton />
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}
