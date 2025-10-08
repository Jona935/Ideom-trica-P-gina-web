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
    setTypedText('');
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);


  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4">
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 md:space-x-4">
        <Image src="/logo4.png" alt="Logo" width={75} height={75} className="md:w-[100px] md:h-[100px]" />
        <div className="text-foreground">
          <p className="font-headline text-2xl md:text-4xl font-bold tracking-widest">Ideo</p>
          <p className="font-headline text-2xl md:text-4xl font-bold tracking-wider">mētrica</p>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <EtherealCanvas />
      <div className="relative z-10 text-center text-foreground px-4 pointer-events-none max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-5xl font-headline font-bold mb-4 min-h-[140px] md:min-h-[240px]">
          {typedText}
          <span className="typing-cursor">|</span>
        </h1>
        <h2
          className="text-lg md:text-2xl font-light animate-fade-in"
          dangerouslySetInnerHTML={{ __html: dict.workInProgress }}
        />
        
      </div>
      <Image src="/arrow.svg" alt="Logo" width={75} height={75} className="md:w-[150px] md:h-[150px] flext-center pt-5 rotate-[-0.785398163rad] md:rotate-0" />

      <footer className="relative z-10 w-full pt-8 pb-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-foreground text-base md:text-lg space-y-4 md:space-y-0">
            <a href="https://wa.me/8444609592" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap text-center">844 460 95 92</a>
            <a href="https://maps.app.goo.gl/EXNN1qBdzxh4VsoJ7" target="_blank" rel="noopener noreferrer" className="text-center hover:underline">Matamoros 216, Zona Centro, 25790 Monclova, Coah. MX</a>
            <a href="mailto:Hola@Ideomētrica.com" className="hover:underline text-center">Hola@Ideomētrica.com</a>
        </div>
      </footer>
    </main>
  );
}
