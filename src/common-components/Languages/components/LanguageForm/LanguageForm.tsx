import { useMemo } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { CustomSelect } from 'common-components/CustomSelect';
import { ILanguage } from 'models/ILanguage';

import { languageLevels, languages } from '../../utils/constants';
import { formattedLanguageLevels } from './utils/helpers';

import { useStyles } from './styles';

interface IProps {
  language: ILanguage;
  onChange: (fields: Partial<ILanguage>) => void;
}

export const LanguageForm = ({ language, onChange }: IProps) => {
  const classes = useStyles();
  const levelsOptions = useMemo(() => formattedLanguageLevels(languageLevels), []);

  return (
    <div className={classes.container}>
      <Autocomplete
        options={languages}
        inputValue={language?.value || ''}
        disableClearable
        freeSolo
        autoSelect
        onChange={(_, value) => onChange({ value })}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Language'}
            name="value"
            value={language?.value || ''}
            required
            onChange={(e) => onChange({ value: e.target.value })}
          />
        )}
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
