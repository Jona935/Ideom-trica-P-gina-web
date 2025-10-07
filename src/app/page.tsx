"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { EtherealCanvas } from "@/components/ethereal-canvas";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/context/language-context";
import { getDictionary } from "@/lib/dictionaries";

export default function Home() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const [typedText, setTypedText] = useState("");
  
  const fullTextEn = "Design Studio Focused on architecture, interior, construction, real Estate appraisal and all things Creative, leading the lenghts of México and northeast.";
  const fullTextEs = "Estudio de Diseño Enfocado en arquitectura, interiorismo, construcción, avalúo inmobiliario y todo lo Creativo, liderando el territorio de México y noreste.";

  const fullText = locale === 'en' ? fullTextEn : fullTextEs;

  useEffect(() => {
    setTypedText(''); // Reset text when language changes
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Slower typing speed

    return () => clearInterval(typingInterval);
  }, [fullText]);


  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-4">
        <Image src="/logo4.png" alt="Logo" width={250} height={150} />
        <div className="text-foreground">
          <p className="font-headline text-4xl font-bold tracking-widest">Ideo</p>
          <p className="font-headline text-4xl font-bold tracking-widest">mētrica</p>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <EtherealCanvas />
      <div className="relative z-10 text-center text-foreground px-4 pointer-events-none max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 min-h-[180px] md:min-h-[144px]">
          {typedText}
          <span className="typing-cursor">|</span>
        </h1>
      </div>
    </main>
  );
}
