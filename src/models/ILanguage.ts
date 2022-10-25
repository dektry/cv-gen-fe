export interface ILanguage {
  id?: string;
  value: string;
  level: string;
  employeeId?: string;
}

export interface ILanguageState {
  isLanguagesLoading: boolean;
  languages: ILanguage[] | [];
}
