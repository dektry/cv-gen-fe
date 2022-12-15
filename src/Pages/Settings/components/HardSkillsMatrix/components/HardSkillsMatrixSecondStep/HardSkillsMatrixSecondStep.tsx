import { useForm, useFieldArray, FormProvider } from 'react-hook-form';

import { useSelector } from 'react-redux';
import { hardSkillsMatrixSelector } from 'store/reducers/hardSkillsMatrix';

import { HardSkillLevelsTable } from './components/HardSkillLevelsTable';

export const HardSkillsMatrixSecondStep = () => {
  const { currentMatrix } = useSelector(hardSkillsMatrixSelector);

  const methods = useForm({
    defaultValues: { skillGroups: currentMatrix.skillGroups },
  });

  const { fields } = useFieldArray({
    name: 'skillGroups',
    control: methods.control,
    keyName: 'skillGroupKey',
  });

  return (
    <FormProvider {...methods}>
      {fields.map((skillGroup, idx) => (
        <HardSkillLevelsTable key={skillGroup.skillGroupKey} skillGroup={skillGroup} idx={idx} />
      ))}
    </FormProvider>
  );
};
