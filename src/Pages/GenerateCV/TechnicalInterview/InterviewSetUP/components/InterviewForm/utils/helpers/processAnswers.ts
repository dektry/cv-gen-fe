import { IInterviewResult, IInterviewMatrix, IInterviewResultAnswers } from 'models/IInterview';

export const processInterviewAnswers = (interviewResult: IInterviewResult, interviewMatrix: IInterviewMatrix) => {
  let resultAnswers: IInterviewResultAnswers = {} as IInterviewResultAnswers;
  for (const answer of interviewResult.answers) {
    const { skill, assigned } = answer;
    let skillFromMatrix;
    for (const el of interviewMatrix) {
      skillFromMatrix = el.skills.find((item) => item.value === skill);
      if (skillFromMatrix) {
        resultAnswers = {
          ...resultAnswers,
          [skillFromMatrix.id]: assigned,
        };
      }
    }
  }

  return resultAnswers;
};
