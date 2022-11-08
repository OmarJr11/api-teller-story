import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './slices/stories/storiesSlice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
  },
});

// Can still subscribe to the store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
