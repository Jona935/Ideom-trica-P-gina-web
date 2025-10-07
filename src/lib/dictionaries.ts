const dictionaries = {
  en: {
    title: "Ethereal Canvas",
    subtitle: "Move your cursor to paint.",
  },
  "es-MX": {
    title: "Lienzo Etéreo",
    subtitle: "Mueve tu cursor para pintar.",
  },
};

export const locales = Object.keys(dictionaries) as Locale[];
export type Locale = keyof typeof dictionaries;

export const getDictionary = (locale: Locale) => dictionaries[locale];
