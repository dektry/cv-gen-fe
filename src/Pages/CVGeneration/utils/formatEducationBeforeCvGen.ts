import { IEducation } from 'models/IEducation';

export function formatEducationBeforeCvGen(education: IEducation[]) {
  return education.map((el) => ({
    university: el.university,
    specialization: el.specialization,
    startYear: el.startYear,
    endYear: el.endYear,
  }));
}
