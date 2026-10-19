export type EtymologyEntry = {
  word: string;
  language: "Greek" | "Latin";
  root: string;
  meaning: string;
  history: string;
  source: string;
};

// The personal etymology collection. Add entries here to grow the list.
export const etymologies: EtymologyEntry[] = [
  {
    word: "Idiot", language: "Greek", root: "ἰδιώτης · idiōtēs",
    meaning: "A private person; a layperson",
    history: "From idios, meaning one’s own or private, through Latin idiota and French. The Greek term distinguished a private citizen or non-specialist from an official or expert; its modern insulting sense developed later.",
    source: "https://www.etymonline.com/word/idiot"
  },
  {
    word: "Idion", language: "Greek", root: "ἴδιον · idion",
    meaning: "One’s own; a distinctive property",
    history: "The neuter form of idios (ἴδιος), meaning one’s own, private or particular. Used as a noun in philosophical contexts, it can mean a property peculiar to a thing.",
    source: "https://en.wiktionary.org/wiki/ἴδιος"
  },
  {
    word: "Company", language: "Latin", root: "com- + panis",
    meaning: "Together + bread",
    history: "Through Old French compagnie, from Late Latin companio: a companion who shares bread. A word for fellowship and association later acquired its commercial meaning.",
    source: "https://www.etymonline.com/word/company"
  },
  {
    word: "Logos", language: "Greek", root: "λόγος · logos",
    meaning: "Word, account, reason",
    history: "Related to legein, to gather or speak. Its range includes speech, explanation, reckoning and rational argument; philosophical and theological traditions gave it further meanings.",
    source: "https://www.etymonline.com/word/Logos"
  },
  {
    word: "Virtue", language: "Latin", root: "virtūs · virtus",
    meaning: "Courage, excellence, moral worth",
    history: "Through Old French vertu, from Latin virtus, derived from vir (man). Its earlier associations with manliness and valor broadened into excellence and moral character. Greek aretē is a related philosophical concept, rather than the source of the English word.",
    source: "https://www.etymonline.com/word/virtue"
  },
  {
    word: "Fortune", language: "Latin", root: "fortūna · fortuna",
    meaning: "Chance, fate, luck",
    history: "Through Old French fortune, from Latin fortuna, related to fors (chance). Fortuna also named the Roman goddess of luck; the English word later came to mean substantial wealth.",
    source: "https://www.etymonline.com/word/fortune"
  },
  {
    word: "Entropy", language: "Greek", root: "ἐν + τροπή · en + tropē",
    meaning: "In + a turning or transformation",
    history: "Coined in German as Entropie by Rudolf Clausius in 1865 from Greek elements, with a form echoing energy. The root evokes transformation; the physical quantity has a precise thermodynamic meaning beyond the everyday shorthand of disorder.",
    source: "https://www.etymonline.com/word/entropy"
  }
];
