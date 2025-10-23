import { PageHeader } from '@/components/page-header';
import { OfferSection } from '@/components/offer-section';
import { SocialProof } from '@/components/social-proof';
import { CommentsSection } from '@/components/comments-section';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <header className="w-full">
        <div className="container mx-auto px-4">
          <PageHeader />
        </div>
      </header>
      <main className="w-full container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto space-y-12">
          <OfferSection />
          <Separator />
          <SocialProof />
          <CommentsSection />
        </div>
      </main>
      <footer className="w-full py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DataWave 2025. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
