import { IInterviewAnswers, IInterviewResult, IInterviewMatrix } from 'models/IInterview';

export const processInterviewAnswers = (interviewResult: IInterviewResult, interviewMatrix: IInterviewMatrix) => {
  let resultAnswers: IInterviewAnswers = {};
  for (const answer of interviewResult.answers) {
    const { skill, actual } = answer;
    let skillFromMatrix;
    for (const el of interviewMatrix) {
      skillFromMatrix = el.skills.find((item) => item.value === skill);
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
