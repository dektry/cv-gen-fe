interface ILanguageOptions {
  value: string;
  label: string;
}

export function formattedLanguages(languages: string[]) {
  const result: ILanguageOptions[] = [];

  languages.forEach((language) => result.push({ value: language, label: language }));

  return result;
}

export function formattedLanguageLevels(levels: string[]) {
  const result: ILanguageOptions[] = [];

  levels.forEach((level) => result.push({ value: level, label: level }));

  return result;
}
