import { ITableExtension } from './ICommon';

export interface ICandidateEducation {
  id: string | null;
  pfId: number;
  school: string;
  name: string;
  from_year: number;
  to_year: number | null;
  subject: string;
  description: string;
}

export interface ICandidateExperience {
  id: string | null;
  pfId: number;
  title: string;
  company: string;
  starts_on: string;
  ends_on: string | null;
  location: string | null;
  description: string;
}

export interface ICandidateLanguage {
  id: string | null;
  code: string;
  level: string;
}

export interface ICandidate {
  id: string;
  pfId: number;
  pfUpdatedAt: string;
  fullName: string;
  position: string | null;
  level: string | null;
  location: string | null;
  timezone: string | null;
  email?: string;
  education: ICandidateEducation[];
  experience: ICandidateExperience[];
  yearsOfExperience?: number;
  languages: ICandidateLanguage[];
}

export type ICandidateTable = Omit<ICandidate, 'education' | 'experience' | 'languages'>;

export interface ICandidatesState extends ITableExtension {
  currentCandidate: ICandidate;
  chosenCandidate: ICandidateTable | null;
  candidates: ICandidateTable[];
  isLoading: boolean;
}
