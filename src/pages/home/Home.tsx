import { useAppDispatch } from '../../hooks/redux-hooks';
import { CardStory } from '../../components/stories/components/card-story/Card-story';
import { Grid, Skeleton } from '@mui/material';
import './Home.scss';
import { HeaderBody } from '../../shared/header-body/header-body';
import { useQuery } from '@apollo/client';
import {
  addStories,
  startLoadingStories
} from '../../store/slices/stories/storiesSlice';
import { Story } from '../../common/interfaces';
import { GET_ALL_STORY } from '../../GraphQL/queries/get-stories';

export const Home = () => {
  const stories: Story[] = [];
  const dispatch = useAppDispatch();

  const getStoriesGQL = async () => {
    try {
      dispatch(startLoadingStories());
      const { loading, error, data } = useQuery(GET_ALL_STORY);

      if (!loading && data.getAllStory) {
        stories.push(...data.getAllStory);
        console.log(stories);
        dispatch(addStories(stories));
      }
    } catch (error) {
      console.log(error);
      
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  getStoriesGQL();

  return stories.length > 0 ? (
    <Grid
      className='home'
      width='100%'
      padding='0px 10px 0px 10px'
      direction='row'
      alignItems='flex-start'
      justifyContent={{
        xl: 'space-between',
        lg: 'space-between',
        md: 'space-between',
        sm: 'center',
        xs: 'center'
      }}
      container={true}
    >
      <Grid
        sx={{
          height: '100%',
          paddingBottom: '10px'
        }}
        width={{
          xl: '100%',
          lg: '100%',
          md: '100%',
          sm: '96%',
          xs: '96%'
        }}
        direction='column'
        gap={1.2}
        container
      >
        <HeaderBody name={'Home'} />
        {stories.map((story: Story) => {
          return (
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              key={story.id}
            >
              <CardStory
                id={story.id}
                title={story.title}
                text={story.text}
                creationDate={story.creationDate}
                like={story.like}
                url={story.file.url}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  ) : (
  <Grid
    className='home'
    width='100%'
    padding='10px 10px 0px 10px'
    direction='column'
    alignItems='flex-start'
    gap={2}
    justifyContent={{
      xl: 'start',
      lg: 'start',
      md: 'start',
      sm: 'start',
      xs: 'start'
    }}
    container={true}
    height='100%'
  >
    <Skeleton variant="rectangular" width='100%' height={100} />
    <Skeleton variant="rectangular" width='100%' height={235} />
    <Skeleton variant="rectangular" width='100%' height={235} />
  </Grid>

  );
};
