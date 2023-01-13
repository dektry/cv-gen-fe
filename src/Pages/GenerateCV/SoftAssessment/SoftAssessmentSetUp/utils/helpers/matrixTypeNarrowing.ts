import { ISoftAssessment } from 'models/ISoftAssessment';
import { IFormSoftSkillsMatrix } from 'models/ISoftSkillsMatrix';

export function matrixTypeNarrowing(matrix: IFormSoftSkillsMatrix | ISoftAssessment) {
  return (matrix as ISoftAssessment).id !== undefined;
}
