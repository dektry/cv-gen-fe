import { ITableExtension } from './ICommon';
import { NullableField } from './TNullableField';

export interface ICandidateEducation {
  id: NullableField<string>;
  pfId: number;
  school: string;
  name: string;
  from_year: number;
  to_year: NullableField<number>;
  subject: string;
  description: string;
}

export interface ICandidateExperience {
  id: NullableField<string>;
  pfId: number;
  title: string;
  company: string;
  starts_on: string;
  ends_on: NullableField<string>;
  location: NullableField<string>;
  description: string;
}

export interface ICandidateLanguage {
  id: NullableField<string>;
  code: string;
  level: string;
}

export interface ICandidate {
  id: string;
  pfId: number;
  pfUpdatedAt: string;
  fullName: string;
  position: NullableField<string>;
  level: NullableField<string>;
  location: NullableField<string>;
  timezone: NullableField<string>;
  email?: string;
  education?: ICandidateEducation[];
  experience: ICandidateExperience[];
  yearsOfExperience?: number;
  languages?: ICandidateLanguage[];
}

export type ICandidateTable = Omit<ICandidate, 'education' | 'experience' | 'languages'>;

export interface ICandidatesState extends ITableExtension {
  currentCandidate: ICandidate;
  chosenCandidate: NullableField<ICandidateTable>;
  candidates: ICandidateTable[];
  isLoading: boolean;
  isLoadingOneCandidate: boolean;
}
