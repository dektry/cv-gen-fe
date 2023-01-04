import { IFormSoftSkillsMatrix } from 'models/ISoftSkillsMatrix';

interface IProps {
  matrix?: IFormSoftSkillsMatrix;
}

export const SoftSkillsMatrixSecondStep = ({ matrix }: IProps) => {
  return <>{matrix?.position?.name}</>;
};
