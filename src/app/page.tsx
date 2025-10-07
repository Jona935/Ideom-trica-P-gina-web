"use client";

import Image from "next/image";
import { EtherealCanvas } from "@/components/ethereal-canvas";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/context/language-context";
import { getDictionary } from "@/lib/dictionaries";

export default function Home() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <Image src="/logo.png" alt="Logo" width={150} height={100} />
      </div>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <EtherealCanvas />
      <div className="relative z-10 text-center text-foreground px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 opacity-0 animate-fade-in [animation-delay:200ms]">
          {dict.title}
        </h1>
        <p className="text-lg md:text-xl font-body opacity-0 animate-fade-in [animation-delay:400ms]">
          {dict.subtitle}
        </p>
      </div>
    </main>
  );
}
