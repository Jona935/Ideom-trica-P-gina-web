"use client";

import * as React from "react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLocale = () => {
    if (locale === "en") {
      setLocale("es-MX");
    } else {
      setLocale("en");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleLocale} className="w-10 h-10 border border-transparent hover:border-white rounded-md text-sm font-medium">
      {locale === "en" ? "US" : "MX"}
      <span className="sr-only">Change language</span>
    </Button>
  );
}
