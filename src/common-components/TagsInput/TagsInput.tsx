import { useState, useEffect } from 'react';

import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { Tag } from './components/Tag';
import { maxTagsNumber } from './utils/constants';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  skills: string[];
  updateTags: (tags: string[]) => void;
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
  label,
  placeholder,
  multiline,
  errorText,
  value,
  onSearch,
}: IProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(false);

  const classes = useStyles({ theme });

  useEffect(() => {
    if ((skills.length >= maxTagsNumber || !skills?.length) && isChanged) {
      setError(true);
    } else {
      setError(false);
    }
  }, [skills]);

  const handleInputChange = (value: string[]) => {
    const lastElementInInput = value[value.length - 1];
    const tagsLengthIsNotExceeded = skills.length < maxTagsNumber;
    const isExisting = skills.some((el) => el?.toLowerCase() === lastElementInInput?.toLowerCase());
    if (!isExisting && tagsLengthIsNotExceeded && lastElementInInput) {
      setIsChanged(true);
      const tagsCopy = [...skills];
      tagsCopy.push(lastElementInInput);

      // setTags(tagsCopy);
      updateTags(tagsCopy);
    }
  };
  const handleTagsChange = (value: string) => {
    setInputValue(value);
    onSearch(value);
  };

  const handleClickTag = (tag: string) => {
    const newTags = skills.filter((el) => el !== tag);
    // setTags(newTags);
    updateTags(newTags);
  };

  const helperText = errorText ? errorText : skills.length ? `*Maximum ${maxTagsNumber} skills` : '*Required field';

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={value}
      value={skills}
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
          value={skills}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};
