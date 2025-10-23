import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function PageHeader() {
  const headerImage = PlaceHolderImages.find((p) => p.id === 'hero-banner');
  return (
    <div className="bg-primary text-primary-foreground text-center p-3 space-y-2">
      <h1 className="text-2xl font-bold">ফ্রি 25GB Internet! সমস্ত নেটওয়ার্কে এখনই উপভোগ করুন।</h1>
      {headerImage && (
        <Image
          src={headerImage.imageUrl}
          alt={headerImage.description}
          data-ai-hint={headerImage.imageHint}
          width={750}
          height={400}
          className="object-contain w-full"
        />
      )}
    </div>
  );
}
