import { IEmployee } from 'models/IEmployee';
import { CvInfoForm } from 'models/ICVGeneration';

export function formatEmployeeBeforeUpdate(employee: IEmployee, cvInfo: CvInfoForm) {
  return {
    ...employee,
    firstName: cvInfo.firstName || '',
    position: `${cvInfo.position || ''} –– ${employee.position?.split(' –– ')[0] || ''}`,
    description: cvInfo.description || '',
    softSkillsToCv: cvInfo.softSkills || [],
    yearsOfExperience: cvInfo.yearsOfExperience || 0,
  };
}
