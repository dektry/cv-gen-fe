import { cloneDeep } from 'lodash';

import { ICandidate } from 'models/ICandidate';

export function cleanCandidateFields(candidate: Partial<ICandidate>): Partial<ICandidate> {
  const copy = cloneDeep(candidate);
  delete copy.languages;
  delete copy.education;
  delete copy.experience;
  delete copy.yearsOfExperience;

  return copy;
}
