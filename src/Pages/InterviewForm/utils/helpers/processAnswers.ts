import {
  IInterviewAnswers,
  IInterviewResult,
  IInterviewMatrix,
} from 'interfaces/interview.interface';

export const processAnswers = (
  interviewResult: IInterviewResult,
  interviewMatrix: IInterviewMatrix,
) => {
  let resultAnswers: IInterviewAnswers = {};
  for (const answer of interviewResult.answers) {
    const { skill, actual } = answer;
    let skillFromMatrix;
    for (const el of interviewMatrix) {
      skillFromMatrix = el.skills.find(item => item.value === skill);
      if (skillFromMatrix) {
        resultAnswers = {
          ...resultAnswers,
          [skillFromMatrix.id]: actual,
        };
      }
    }
  }

  return resultAnswers;
};
