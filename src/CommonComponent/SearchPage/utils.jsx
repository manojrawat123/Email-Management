import React from 'react';

export const handleCreateNewOption = (inputValue, existingOptions, setOptions) => {
  const newOption = { value: inputValue, label: inputValue };
  setOptions([newOption, ...existingOptions]);
  return newOption;
};
