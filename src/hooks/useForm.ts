import { useState } from 'react';
import { StoryCreation } from '../pages/create-story/CreateStory';

export const useForm = (initialState: StoryCreation | any) => {
  const [values, setValues] = useState(initialState);

  const handleInput = ({ target }: any) => {
    setValues({
      ...values,
      [target.name]: target.value
    });
  };

  return [values, handleInput, setValues];
};
