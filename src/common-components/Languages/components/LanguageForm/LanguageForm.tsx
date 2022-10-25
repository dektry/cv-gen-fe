import { useMemo } from 'react';
import { CustomSelect } from 'common-components/CustomSelect';
import { ILanguage } from 'models/ILanguage';

import { languageLevels, languages } from '../../utils/constants';
import { formattedLanguages, formattedLanguageLevels } from './utils/helpers';

import { useStyles } from './styles';

interface IProps {
  language: ILanguage;
  onChange: (fields: Partial<ILanguage>) => void;
}

export const LanguageForm = ({ language, onChange }: IProps) => {
  const classes = useStyles();

  const languagesOptions = useMemo(() => formattedLanguages(languages), []);
  const levelsOptions = useMemo(() => formattedLanguageLevels(languageLevels), []);

  return (
    <div className={classes.container}>
      <CustomSelect
        options={languagesOptions}
        label={'Language'}
        name="value"
        value={language?.value || ''}
        required
        onChange={(e) => onChange({ value: e.target.value })}
      />
      <CustomSelect
        options={levelsOptions}
        label={'Language level'}
        name="level"
        value={language?.level || ''}
        required
        onChange={(e) => onChange({ level: e.target.value })}
      />
    </div>
  );
};
