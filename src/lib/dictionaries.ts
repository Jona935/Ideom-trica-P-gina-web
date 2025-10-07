const dictionaries = {
  en: {
    title: "Ethereal Canvas",
    subtitle: "Move your cursor to paint.",
    description: "Design Studio Focused on architecture, interior, construction, real Estate appraisal and all things Creative, leading the lenghts of México and northeast."
  },
  "es-MX": {
    title: "Lienzo Etéreo",
    subtitle: "Mueve tu cursor para pintar.",
    description: "Estudio de Diseño Enfocado en arquitectura, interiorismo, construcción, avalúo inmobiliario y todo lo Creativo, liderando el territorio de México y noreste."
  },
};

export const locales = Object.keys(dictionaries) as Locale[];
export type Locale = keyof typeof dictionaries;

export const getDictionary = (locale: Locale) => dictionaries[locale];
