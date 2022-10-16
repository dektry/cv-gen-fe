import React, { useState, useEffect } from 'react';

import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps } from '@mui/system';

import { Tag } from './components/Tag';

interface IProps {
  skills: string[];
}

export const TagsInput = ({ skills }: IProps) => {
  const [tags, setTags] = useState(skills);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (tags?.length >= 15) {
      setError(true);
    }
  }, [tags]);
  const sx: SxProps = [
    {
      '&.MuiChip-root': {
        background: '#333333',
        borderRadius: '100px',
        flex: 'none',
        order: 0,
        flexGrow: 0,
        color: '#ffffff',
      },
    },
  ];
  const handleInputChange = (value: string[]) => {
    setTags(value);
  };
  const handleTagsChange = (value: string) => {
    setInputValue(value);
    const isExisting = tags.some((el) => el?.toLowerCase() === inputValue?.toLowerCase());
    if (!isExisting && tags?.length < 15) {
      setTags((prev) => [...prev, inputValue]);
    }
  };

  const handleClickTag = (tag: string) => {
    const newTags = tags.filter((el) => el !== tag);
    setTags(newTags);
  };
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={tags}
      value={tags}
      // inputValue={inputValue}
      handleHomeEndKeys
      freeSolo
      autoSelect
      ChipProps={{ classes: sx }}
      renderTags={(tags) => {
        return tags.map((tag) => <Tag tag={tag} handleClickTag={handleClickTag} />);
      }}
      onChange={(event, value) => handleInputChange(value)}
      onInputChange={(event, value) => handleTagsChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          placeholder="Tags"
          multiline={true}
          value={tags}
          error={error}
          helperText={'Maximum 15 skills'}
        />
      )}
    />
  );
};
