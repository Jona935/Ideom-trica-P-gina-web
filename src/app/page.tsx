"use client";

import Image from "next/image";
import { EtherealCanvas } from "@/components/ethereal-canvas";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/context/language-context";
import { getDictionary } from "@/lib/dictionaries";
import TypeIt from "typeit-react";

export default function Home() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  const fullTextEn = "Design Studio Focused on architecture, interior, construction, real Estate appraisal and all things Creative, leading the lenghts of México and northeast.";
  const fullTextEs = "Estudio de Diseño Enfocado en arquitectura, interiorismo, construcción, avalúo inmobiliario y todo lo Creativo, liderando el territorio de México y el noreste.";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 md:px-32">
      <a href="https://www.xn--ideomtrica-mlb.com/" className="absolute top-4 left-4 z-10 flex items-center">
        <Image src="/logo4.png" alt="Logo" width={65} height={76} className="md:w-[100px] md:h-[100px]" />
        <div className="text-foreground ml-2">
          <p className="font-headline text-xl lg:text-4xl font-bold tracking-widest">Ideo</p>
          <p className="font-headline text-xl lg:text-4xl font-bold tracking-wider">mētrica</p>
        </div>
      </a>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <EtherealCanvas />
      <div className="relative z-10 justify-center text-center text-foreground pointer-events-none">
        <h1 className="md:px-[10rem] text-2xl lg:text-4xl font-headline font-bold mt-[1rem] md:mt-[10rem] h-[12rem]">
           <TypeIt
              key={locale}
              options={{
                strings: [locale === 'en' ? fullTextEn : fullTextEs],
                speed: 90,
                waitUntilVisible: true,
                cursorChar: "<span class='typing-cursor'>|</span>",
              }}
            />
        </h1>
        <h2
          className="md:mt-[10rem] sm:mt-12 text-lg md:text-2xl font-light animate-fade-in"
          dangerouslySetInnerHTML={{ __html: dict.workInProgress }}
        />
        
      </div>
      <Image src="/arrow.svg" alt="Logo" width={75} height={75} className="md:w-[120px] md:h-[120px] flex-center my-[1rem] md:my-[3rem] rotate-[-0.785398163rad] md:rotate-0" />

      <footer className="w-full mt-5 z-10">
        <div className="w-full font-bold max-w-[91%] flex flex-col lg:flex-row items-center justify-between mx-auto uppercase text-[13px] lg:text-[1.1rem] tracking-[0.5px] text-center lg:space-x-4 space-y-2 lg:space-y-0">
            <a href="mailto:Hola@Ideomētrica.com" className=" hover:underline">Hola@Ideomētrica.com</a>
            <a href="https://maps.app.goo.gl/EXNN1qBdzxh4VsoJ7" target="_blank" rel="noopener noreferrer" className=" hover:underline">Matamoros 216, Zona Centro, 25790 Monclova, Coah. MX</a>
            <a href="https://wa.me/8444609592" target="_blank" rel="noopener noreferrer" className=" hover:underline whitespace-nowrap">                             +52 844 460 95 92</a>
        </div>
      </footer>
    </main>
  );
}
