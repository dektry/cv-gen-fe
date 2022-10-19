import { useState, useEffect } from 'react';

import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { technologiesSelector } from 'store/reducers/technologies';
import { getTechnologiesList } from 'store/reducers/technologies/thunks';

import { CvInfo } from 'Pages/CVGeneration';

import { Tag } from './components/Tag';
import { maxTagsNumber } from './utils/constants';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  skills?: string[];
  updateTags?: (tags: string[]) => void;
  updateCvInfo?: (fields: Partial<CvInfo>) => void;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  errorText?: string;
  value: string[];
  onSearch: (value: string) => void;
}

export const TagsInput = ({
  skills,
  updateTags,
  updateCvInfo,
  label,
  placeholder,
  multiline,
  errorText,
  value,
  onSearch,
}: IProps) => {
  const [tags, setTags] = useState(skills || []);
  const [inputValue, setInputValue] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(false);

  const classes = useStyles({ theme });

  useEffect(() => {
    if ((tags.length >= maxTagsNumber || !tags.length) && isChanged) {
      setError(true);
    } else {
      setError(false);
    }

    if (updateTags) {
      updateTags(tags);
    }

    if (updateCvInfo) {
      updateCvInfo({ softSkills: tags });
    }
  }, [tags]);

  const handleInputChange = (value: string[]) => {
    const lastElementInInput = value[value.length - 1];
    const tagsLengthIsNotExceeded = tags?.length < maxTagsNumber;
    const isExisting = tags.some((el) => el?.toLowerCase() === lastElementInInput?.toLowerCase());
    if (!isExisting && tagsLengthIsNotExceeded && lastElementInInput) {
      setIsChanged(true);
      setTags((prev) => [...prev, value[value.length - 1]]);
    }
  };
  const handleTagsChange = (value: string) => {
    setInputValue(value);
    onSearch(value);
  };

  const handleClickTag = (tag: string) => {
    const newTags = tags.filter((el) => el !== tag);
    setTags(newTags);
  };

  const helperText = errorText ? errorText : tags.length ? `*Maximum ${maxTagsNumber} skills` : '*Required field';

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={value}
      value={tags}
      inputValue={inputValue}
      disableClearable
      freeSolo
      autoSelect
      renderTags={(tags) => {
        return tags.map((tag) => <Tag key={tag} tag={tag} handleClickTag={handleClickTag} />);
      }}
      onChange={(_, value) => handleInputChange(value)}
      onInputChange={(_, value) => handleTagsChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.tagInput}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          value={tags}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};
