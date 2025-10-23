import { PageHeader } from '@/components/page-header';
import { OfferSection } from '@/components/offer-section';
import { SocialProof } from '@/components/social-proof';
import { CommentsSection } from '@/components/comments-section';
import { AppFooter } from '@/components/app-footer';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <header className="w-full">
        <PageHeader />
      </header>
      <main className="w-full container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto space-y-8">
          <OfferSection />
          <Separator />
          <SocialProof />
          <CommentsSection />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
