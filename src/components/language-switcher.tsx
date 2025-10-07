"use client";

import * as React from "react";
import { Languages } from "lucide-react";

import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")}>
          <span className="w-5 h-5 mr-2 flex items-center justify-center text-xs border border-foreground rounded-sm">EN</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("es-MX")}>
          <span className="w-5 h-5 mr-2 flex items-center justify-center text-xs border border-foreground rounded-sm">ES</span>
          Español (MX)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
