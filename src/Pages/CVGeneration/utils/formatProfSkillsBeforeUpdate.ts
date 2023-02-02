import { IAssessmentDetailedResult, IFormAssessmentResult } from 'models/ITechAssessment';
import { TProfSkill } from '../CVGenerationPage';
interface IArgs {
  profSkills: TProfSkill[];
  assessmentResult: IAssessmentDetailedResult;
  employeeId: string;
  positionId: string;
  levelId: string;
}
export function formatProfSkillsBeforeUpdate({
  profSkills,
  assessmentResult,
  employeeId,
  positionId,
  levelId,
}: IArgs): IFormAssessmentResult {
  const grades: { value: string; skillId: string; gradeId: string }[] = [];

  for (const group of profSkills) {
    group.skills.forEach((skill) => grades.push({ value: skill.level, gradeId: skill.gradeId, skillId: skill.id }));
  }

  return {
    employeeId,
    positionId,
    levelId,
    comment: assessmentResult?.comment || '',
    grades,
  };
}
