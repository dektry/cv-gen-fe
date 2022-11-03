import { IEmployee } from 'models/IEmployee';
import { CvInfo } from '../CVGenerationPage';

export function formatEmployeeBeforeUpdate(employee: IEmployee, cvInfo: CvInfo) {
  return {
    ...employee,
    firstName: cvInfo.firstName,
    position: `${cvInfo.position} –– ${employee.position?.split(' –– ')[0] || ''}`,
    description: cvInfo.description,
    softSkillsToCv: cvInfo.softSkills,
    yearsOfExperience: cvInfo.yearsOfExperience,
  };
}
