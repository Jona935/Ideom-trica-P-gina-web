"use client";

import Image from "next/image";
import { EtherealCanvas } from "@/components/ethereal-canvas";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/context/language-context";
import { getDictionary } from "@/lib/dictionaries";
import TypeIt from "typeit-react";
import { Facebook, Instagram } from "lucide-react";

export default function Home() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  const fullTextEn = "Creative architecture studio driving design, construction, interior design, and appraisal projects in the northeast and throughout Mexico.";
  const fullTextEs = "Estudio creativo de arquitectura que impulsa proyectos de diseño, construcción, interiorismo y avalúo en el noreste y a lo largo de México.";

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start gap-4 overflow-hidden p-4 md:px-8">
      <EtherealCanvas />

      {/* --- Item 1: Header --- */}
      <header className="z-10 flex w-full items-start justify-between">
        <div className="flex flex-col items-start gap-4">
          <a href="https://www.xn--ideomtrica-mlb.com/" className="flex items-center">
            <Image src="/logo4.png" alt="Logo" width={65} height={76} className="md:w-[100px] md:h-[100px]" />
            <div className="ml-2 text-foreground">
              <p className="font-headline text-xl font-bold tracking-widest lg:text-4xl">Ideo</p>
              <p className="font-headline text-xl font-bold tracking-wider lg:text_4xl">mētrica</p>
            </div>
          </a>
          <div className="flex md:flex-col  gap-2 md:ml-2">
            <a href="https://www.facebook.com/share/1Jvno9tCqU/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-white/80">
              <Facebook size={30} />
            </a>
            <a href="https://www.instagram.com/ideometrica_arquitectos?igsh=anRibzhxeGs2Y3Zl" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-white/80">
              <Instagram size={30} />
            </a>
          </div>
        </div>
        <LanguageSwitcher />
      </header>

      {/* --- Item 2: Main Content --- */}
      <div className="pointer-events-none relative z-10 flex w-[80%] flex-grow flex-col items-center justify-center text-center text-foreground md:w-[65%]">
        <h1 className="h-[100%] w-full font-headline text-2xl font-bold md:text-4xl">
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
          className="animate-fade-in text-lg font-light mt-2 md:mt-[2rem] md:text-2xl"
          dangerouslySetInnerHTML={{ __html: dict.workInProgress }}
        />
        <Image src="/arrow.svg" alt="Logo" width={55} height={55} className="flex-center my-[1rem] rotate-[-0.785398163rad] md:my-[3rem] md:h-[120px] md:w-[120px] md:rotate-0" />
      </div>
      
      {/* --- Item 3: Footer --- */}
      <footer className="z-10 w-full">
        <div className="mx-auto flex w-full max-w-[91%] flex-col items-center justify-between space-y-2 text-center text-[13px] font-bold uppercase tracking-[0.5px] lg:flex-row lg:space-y-0 lg:text-base lg:space-x-4">
            <a href="mailto:Hola@Ideomētrica.com" className=" hover:underline">Hola@Ideomētrica.com</a>
            <a href="https://maps.app.goo.gl/EXNN1qBdzxh4VsoJ7" target="_blank" rel="noopener noreferrer" className=" hover:underline">Matamoros 216, Zona Centro, 25790 Monclova, Coah. MX</a>
            <a href="https://wa.me/8444609592" target="_blank" rel="noopener noreferrer" className=" hover:underline whitespace-nowrap">                             +52 844 460 95 92</a>
        </div>
      </footer>
    </main>
  );
}
