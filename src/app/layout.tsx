import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Free 100GB Internet Offer',
  description: 'Free 100GB Internet for all networks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script type='text/javascript' src='//pl27913869.effectivegatecpm.com/2e/6d/1f/2e6d1f6505e0e8a2e0b933d1b2be7d9b.js'></script>
        <script type='text/javascript' src='//pl27913892.effectivegatecpm.com/48/b9/69/48b9693353acc2d3e518bf4868749521.js'></script>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
