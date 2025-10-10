const dictionaries = {
  en: {
    title: "Ethereal Canvas",
    subtitle: "Move your cursor to paint.",
    description: " Design Studio Focused on architecture, interior, construction, real Estate appraisal and all things Creative, leading the lenghts of México and northeast.",
    workInProgress: "We are working on our new digital identity. <br>In the meantime, let's talk!"
  },
  "es-MX": {
    title: "Lienzo Etéreo",
    subtitle: "Mueve tu cursor para pintar.",
    description: "Estudio creativo de arquitectura que impulsa proyectos de diseño, construcción, interiorismo y avalúo en el noreste y a lo largo de México.",
    workInProgress: "Estamos trabajando en nuestra nueva identidad digital. <br>Mientras tanto, ¡conversemos!"
  },
};

export const locales = Object.keys(dictionaries) as Locale[];
export type Locale = keyof typeof dictionaries;

export const getDictionary = (locale: Locale) => dictionaries[locale];
