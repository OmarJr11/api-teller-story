import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story } from '../../../common/interfaces';
interface StoryState {
  stories: Story[];
  currentPage: number;
  attemptLoadStory: boolean;
}

const initialState: StoryState = {
  stories: [],
  currentPage: 1,
  attemptLoadStory: false,
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    addStory: (state, action: PayloadAction<Story>) => {
      state.stories.unshift(action.payload);
    },
    addStories: (state, action: PayloadAction<Story[]>) => {
      state.stories.push(...action.payload);
      state.attemptLoadStory = false;
    },
    startLoadingStories: (state) => {
      state.attemptLoadStory = true;
    },
  },
});

export const { addStory, addStories, startLoadingStories } =
  storiesSlice.actions;

export default storiesSlice.reducer;
