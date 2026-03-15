"use client";

import { getImageUrl } from '@/data/images';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-charcoal text-offwhite font-sans antialiased m-0 p-0">
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
           <img 
            src={getImageUrl('images/v1/hero/hero_cityscape_lg.webp')}
            alt="404"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent pointer-events-none" />
          
          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto -mt-20">
            <h1 className="text-8xl md:text-[180px] leading-none font-bold font-mono tracking-tighter text-[#E65C00] mb-2 drop-shadow-lg" style={{ color: '#CC5200' }}>404</h1>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">Page Not Found</h2>
            <p className="text-lg md:text-xl text-[#B3B2B0] font-light leading-relaxed mb-12">
              Sorry, the page you are looking for does not exist. This data point has been removed from our systems. 
              Use this opportunity to discover new products.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/en/tooted" className="inline-flex items-center justify-center px-10 py-4 bg-[#F2F0ED] text-[#1A1A1A] font-bold uppercase tracking-wide decoration-none">
                Explore Products
              </a>
              <a href="/en" className="inline-flex items-center justify-center px-10 py-4 border border-[#F2F0ED]/20 text-[#F2F0ED] font-mono text-sm uppercase tracking-wider decoration-none bg-[#1A1A1A]/30 backdrop-blur-sm">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
