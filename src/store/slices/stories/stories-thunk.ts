import { gql, useQuery } from '@apollo/client';
import { AppDispatch } from '../../store';
import { addStories, startLoadingStories } from './storiesSlice';

export const getStories = () => {
  return async (dispatch: AppDispatch, getState: any) => {
    dispatch(startLoadingStories());
  };
};
