import {
  Box,
  FormControl,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { useForm } from '../../hooks/useForm';
import { CREATE_STORY } from '../../GraphQL/mutations/create-story';
import { GET_ALL_STORY } from '../../GraphQL/queries/get-stories';
import './create-story.scss';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export interface StoryCreation {
  storyTitle: string;
  storyText: string;
  image: string;
}

const CreateStory = () => {
  const [values, handleChange, setValues] = useForm({
    storyTitle: '',
    storyText: '',
    image: undefined,
  });

  const [file, setFile] = useState<any>(null);
  const [spinner, setSpinner] = useState<boolean>(false);

  const [createStory, resp] = useMutation(CREATE_STORY, {
    refetchQueries: [{ query: GET_ALL_STORY }]
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let res = await createStory({
      variables: {
        title: values.storyTitle,
        text: values.storyText,
        image: Number(file.id),
      }
    });

    setValues({
      storyTitle: '',
      storyText: '',
      image: '',
    });

    setFile(null);
  };

  const uploadToCloudinary = async (path: any, extension: string) => {
    const fileUpload = new FormData();
    fileUpload.append(
      'image',
      path
    );
    fileUpload.append('extension', extension);
    const requestOptions = {
      method: 'POST',
      body: fileUpload
    };
    fetch("http://localhost:3011/upload/image", requestOptions)
      .then((response) => response.json())  
      .then((file) => {
        values.image = Number(file.file.id);
        setSpinner(false);
        setFile(file.file);
      });
  }

  async function onFileChanged(e: any) {
    let load = e.target.files[0];
    setSpinner(true);
    const extension = (load.type.slice(6)).toUpperCase();
    await uploadToCloudinary(load, extension);
  }


  const imageLoaded = () => {
    return !spinner ? (
      <div className='image-file'>
        <input
          className='input'
          type='file'
          id='image'
          name='image'
          onChange={(e) => onFileChanged(e)}
        />
        <img src={file.url} alt='image' />
      </div>
    ) : (
      <Box width='100px' height='100px' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  };

  const loadImage = () => {
    return (
      <div className='image-file border'>
        <input
          className='input'
          type='file'
          id='image'
          name='image'
          value={values.image}
          onChange={(e) => onFileChanged(e)}
        />
        <AddAPhotoOutlinedIcon />
      </div>);
  };

  const fileComponent = () => {
    return !spinner && !file ? loadImage() : imageLoaded();
  }

  return (
    <Box component='section' className='publish-story'>
      <Typography className='secondary-color' variant='h4' sx={{ textAlign: 'center', my: '1.5rem' }}>
        Create a story!
      </Typography>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <Grid className='w-100'
              container
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap={1}>
          {fileComponent()}
        </Grid>
        <Grid className='w-100'
              container
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              height='80px'
              gap={1}>
          <div className='w-90'>
            <span className='label'>Title:</span>
          </div>
          <FormControl className='w-90'>
            <input
              type='text'
              name='storyTitle'
              value={values.storyTitle}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid className='w-100'
              container
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              height='200px'
              gap={1}>
          <div className='w-90'>
            <span className='label'>Story:</span>
          </div>
          <FormControl className='w-90'>
            <textarea name='storyText' 
                      value={values.storyText} 
                      onChange={handleChange}>
            </textarea>
          </FormControl>
        </Grid>
        <Button
          type='button'
          sx={{ marginBottom: '2rem' }}
          variant='contained'
          onClick={handleSubmit}
        >
          Post story
        </Button>
      </Box>
    </Box>
  );
};

export default CreateStory;
