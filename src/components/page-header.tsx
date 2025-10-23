import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

const heroBanner = PlaceHolderImages.find((p) => p.id === 'hero-banner')!;
const logos = [
  'logo-grameenphone',
  'logo-banglalink',
  'logo-airtel',
  'logo-robi',
  'logo-teletalk',
].map((id) => PlaceHolderImages.find((p) => p.id === id)!);

export function PageHeader() {
  return (
    <div className="text-center py-8 space-y-6">
      <h1 className="text-5xl font-headline font-bold tracking-tight text-primary">DataWave 2025</h1>
      <p className="text-xl text-muted-foreground">
        Your one-stop destination for ALL SIM offers in 2025
      </p>

      <Card className="overflow-hidden shadow-xl rounded-lg">
        <div className="relative w-full h-48 md:h-64">
          <Image
            src={heroBanner.imageUrl}
            alt={heroBanner.description}
            data-ai-hint={heroBanner.imageHint}
            fill
            className="object-cover"
            priority
          />
        </div>
      </Card>

      <div className="flex justify-center items-center flex-wrap gap-4 md:gap-8 pt-4">
        {logos.map((logo) => (
          <div key={logo.id} className="relative h-10 w-24" title={logo.description}>
            <Image
              src={logo.imageUrl}
              alt={logo.description}
              data-ai-hint={logo.imageHint}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Grameenphone, Banglalink, Airtel, Robi, Teletalk & more!
      </p>
    </div>
  );
}
