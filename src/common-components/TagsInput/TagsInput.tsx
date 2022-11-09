import { useState } from 'react';

import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { Tag } from './components/Tag';
import { maxTagsNumber } from './utils/constants';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  skills: string[] | [];
  updateTags: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  value: string[];
  onSearch: (value: string) => void;
  key?: string;
  setFieldValue: (field: string, value: string[], shouldValidate?: boolean | undefined) => void;
  onBlur: {
    (e: React.FocusEvent<HTMLElement, Element>): void;
    <T = HTMLElement>(fieldOrEvent: T): T extends string ? (e: HTMLElement) => void : void;
  };
  touched: boolean | undefined;
  error: string | string[] | undefined;
}

export const TagsInput = ({
  skills,
  updateTags,
  label,
  placeholder,
  multiline,
  value,
  onSearch,
  setFieldValue,
  onBlur,
  touched,
  error,
}: IProps) => {
  const [tags, setTags] = useState(skills || []);
  const [inputValue, setInputValue] = useState('');

  const classes = useStyles({ theme });

  const handleInputChange = (e: React.SyntheticEvent<Element, Event>, value: string[]) => {
    const lastElementInInput = value[value.length - 1];
    const tagsLengthIsNotExceeded = tags?.length < maxTagsNumber;
    const isExisting = tags?.some((el) => el?.toLowerCase() === lastElementInInput?.toLowerCase());
    if (!isExisting && tagsLengthIsNotExceeded && lastElementInInput) {
      const tagsCopy = [...tags];
      tagsCopy.push(lastElementInInput);

      setTags(tagsCopy);
      updateTags(tagsCopy);

      setFieldValue('tools', tagsCopy, true);
    }
  };
  const handleTagsChange = (e: React.SyntheticEvent<Element, Event>, value: string) => {
    setInputValue(value);
    onSearch(value);
  };

  const handleClickTag = (tag: string) => {
    const newTags = tags?.filter((el) => el !== tag);
    setTags(newTags);
    updateTags(newTags);
  };

  return (
    <Autocomplete
      multiple
      options={value}
      value={tags}
      inputValue={inputValue}
      disableClearable
      freeSolo
      autoSelect
      renderTags={(tags) => {
        return tags.map((tag) => <Tag key={tag} tag={tag} handleClickTag={handleClickTag} />);
      }}
      onChange={(e, value) => handleInputChange(e, value)}
      onInputChange={(e, value) => handleTagsChange(e, value)}
      onBlur={onBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          id="tools"
          name="tools"
          className={classes.tagInput}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          value={tags}
          error={!!(error && touched)}
          helperText={error}
        />
      )}
    />
  );
};
