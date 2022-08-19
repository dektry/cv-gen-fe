import React, { useState } from 'react';

export default function useInput(initVal: string) {
  const [value, setValue] = useState(initVal);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  //type number
  const onChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setValue(value);
    }
  };
  //set state
  const setInputState = (value: string) => {
    setValue(value);
  };

  const onClear = () => {
    setValue('');
  };

  return {
    value,
    onChange,
    onChangeNumber,
    setInputState,
    onClear,
  };
}
