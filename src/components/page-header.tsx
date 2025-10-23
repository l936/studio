import Image from 'next/image';

export function PageHeader() {
  return (
    <div className="bg-primary text-primary-foreground text-center p-3">
      <Image
        src="https://i.ibb.co/9H1Pnmm/file-000000002be861fa816deb850c15af40-1.png"
        alt="Free internet offer"
        width={750}
        height={400}
        className="object-contain w-full"
      />
    </div>
  );
}
