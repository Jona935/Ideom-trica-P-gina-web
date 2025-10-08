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
        setTypedText(fullText.substring(0, i + 1));
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
      <div className="relative z-10 justify-center text-center text-foreground px-4 pointer-events-none w-full mx-auto md:pt-[4rem]">
        <h1 className="text-2xl md:text-5xl font-headline font-bold mb-4 md:px-[8rem] xl:px-[12rem]">
          {typedText}
          <span className="typing-cursor">|</span>
        </h1>
        <h2
          className="mt-6 text-lg md:text-2xl font-light animate-fade-in"
          dangerouslySetInnerHTML={{ __html: dict.workInProgress }}
        />
        
      </div>
      <Image src="/arrow.svg" alt="Logo" width={75} height={75} className="md:w-[120px] md:h-[120px] flext-center my-[3rem] rotate-[-0.785398163rad] md:rotate-0" />

      <footer className="relative z-10 w-full ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-foreground font-bold text-lg md:text-xl space-y-4 md:space-y-0 md:space-x-4">
            <a href="https://wa.me/8444609592" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap text-center">844 460 95 92</a>
            <a href="https://maps.app.goo.gl/EXNN1qBdzxh4VsoJ7" target="_blank" rel="noopener noreferrer" className="text-center hover:underline">Matamoros 216, Zona Centro, 25790 Monclova, Coah. MX</a>
            <a href="mailto:Hola@Ideomētrica.com" className=" hover:underline text-center">Hola@Ideomētrica.com</a>
        </div>
      </footer>
    </main>
  );
}
