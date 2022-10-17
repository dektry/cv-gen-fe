import { useState, useEffect } from 'react';

import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { technologiesSelector } from 'store/reducers/technologies';
import { getTechnologiesList } from 'store/reducers/technologies/thunks';

import { IProject } from 'models/IProject';

import { Tag } from './components/Tag';

interface IProps {
  skills?: string[];
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  updateProjectInfo: (fields: Partial<IProject>) => void;
}

export const TagsInput = ({ skills, error, setError, updateProjectInfo }: IProps) => {
  const [tags, setTags] = useState(skills || []);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  const { technologiesNames } = useSelector(technologiesSelector);

  useEffect(() => {
    if (tags.length >= 15 || !tags.length) {
      setError(true);
    } else {
      setError(false);
    }
    updateProjectInfo({ tools: tags });
  }, [tags]);

  const handleInputChange = (value: string[]) => {
    const isExisting = tags.some((el) => el?.toLowerCase() === value[value.length - 1]?.toLowerCase());
    if (!isExisting && tags?.length < 15 && value[value.length - 1]) {
      setTags((prev) => [...prev, value[value.length - 1]]);
    }
  };
  const handleTagsChange = (value: string) => {
    setInputValue(value);
    dispatch(getTechnologiesList(value));
  };

  const handleClickTag = (tag: string) => {
    const newTags = tags.filter((el) => el !== tag);
    setTags(newTags);
  };

  const helperText = tags.length ? 'Maximum 15 skills' : 'Required field';
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={technologiesNames}
      value={tags}
      inputValue={inputValue}
      disableClearable
      freeSolo
      autoSelect
      renderTags={(tags) => {
        return tags.map((tag) => <Tag key={tag} tag={tag} handleClickTag={handleClickTag} />);
      }}
      onChange={(event, value) => handleInputChange(value)}
      onInputChange={(event, value) => handleTagsChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search technologies"
          placeholder="Search technologies"
          multiline={true}
          value={tags}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};
