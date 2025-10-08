"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { EtherealCanvas } from "@/components/ethereal-canvas";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/context/language-context";
import { getDictionary } from "@/lib/dictionaries";

export default function Home() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const [typedText, setTypedText] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fullTextEn = "Design Studio Focused on architecture, interior, construction, real Estate appraisal and all things Creative, leading the lenghts of México and northeast.";
  const fullTextEs = "Estudio de Diseño Enfocado en arquitectura, interiorismo, construcción, avalúo inmobiliario y todo lo Creativo, liderando el territorio de México y noreste.";

  const fullText = locale === 'en' ? fullTextEn : fullTextEs;

  useEffect(() => {
    setTypedText(''); 
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    let i = 0;
    const startTyping = () => {
      typingIntervalRef.current = setInterval(() => {
        if (i < fullText.length) {
          setTypedText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
        }
      }, 100);
    };
    
    const timeoutId = setTimeout(startTyping, 100);

    return () => {
      clearTimeout(timeoutId);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [fullText]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 md:px-32">
      <div className="absolute top-4 left-4 z-10 flex items-center">
        <Image src="/logo4.png" alt="Logo" width={65} height={76} className="md:w-[100px] md:h-[100px]" />
        <div className="text-foreground">
          <p className="font-headline text-xl lg:text-4xl font-bold tracking-widest">Ideo</p>
          <p className="font-headline text-xl lg:text-4xl font-bold tracking-wider">mētrica</p>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <EtherealCanvas />
      <div className="relative md:px-[10rem] z-10 justify-center text-center text-foreground pointer-events-none">
        <h1 className="text-xl lg:text-4xl font-headline font-bold mb-0 mt-[5rem] md:mt-[10rem]">
          {typedText}
          <span className="typing-cursor">|</span>
        </h1>
        <h2
          className="mt-6 text-md md:text-2xl font-light animate-fade-in"
          dangerouslySetInnerHTML={{ __html: dict.workInProgress }}
        />
        
      </div>
      <Image src="/arrow.svg" alt="Logo" width={75} height={75} className="md:w-[120px] md:h-[120px] flex-center my-[1rem] md:my-[3rem] rotate-[-0.785398163rad] md:rotate-0" />

      <footer className="w-full">
        <div className="w-full max-w-[91%] flex items-center justify-between mx-auto uppercase text-[15px] lg:text-[1.1rem] tracking-[0.5px] text-center">
            <a href="https://wa.me/8444609592" target="_blank" rel="noopener noreferrer" className=" hover:underline whitespace-nowrap">844 460 95 92</a>
            <a href="https://maps.app.goo.gl/EXNN1qBdzxh4VsoJ7" target="_blank" rel="noopener noreferrer" className=" hover:underline">Matamoros 216, Zona Centro, 25790 Monclova, Coah. MX</a>
            <a href="mailto:Hola@Ideomētrica.com" className=" hover:underline">Hola@Ideomētrica.com</a>
        </div>
      </footer>
    </main>
  );
}
