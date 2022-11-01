import { IEducation } from 'models/IEducation';

export const formatEducationBeforeCvGen = (education: IEducation[]): string[][] => {
  return education.map((el) => [el.university, el.specialization, el.startYear + '-' + el.endYear]);
};
