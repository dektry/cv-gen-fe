import { ICvEducation } from 'models/ICVGeneration';

export const formatEducationBeforeCvGen = (education: ICvEducation[]): string[][] => {
  return education.map((el) => {
    if (el.university && el.specialization && el.startYear && el.endYear) {
      return [el.university, el.specialization, el.startYear + '-' + el.endYear];
    } else {
      return [];
    }
  });
};
