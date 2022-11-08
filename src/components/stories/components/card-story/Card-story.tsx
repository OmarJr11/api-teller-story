import { Stack } from '@mui/material';
import './card-story.scss';
import { CardImage } from '../../../../shared/card-image/card-image';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

export const CardStory = ({ title, text, creationDate, like, url }: any) => {
  
  function getDate() {
    let date = new Date(creationDate);
    let finalDate;
    let today = new Date();
    
    if( 
      date.getDay() === today.getDay() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear()
    ) {
      if(date.getHours() === today.getHours()) {
        finalDate = date.getMinutes() === date.getMinutes()
          ? 'Ahora'
          : 'Hace ' + (today.getMinutes() - date.getMinutes());
      } else {
        console.log(date.getHours(),today.getHours());

        finalDate = 'Hace ' + String(Number(today.getHours()) - Number(date.getHours())) + ' horas';
      }
    } else {
      finalDate = date.toLocaleDateString();
    }
    return finalDate;
  }

  return (
    <Stack
      className="card-story box-shadow"
      direction={{
        xl: 'row',
        lg: 'row',
        md: 'row',
        sm: 'row',
        xs: 'column',
      }}
      width={{
        xl: '100%',
        lg: '100%',
        md: '100%',
        sm: '100%',
        xs: '90%',
      }}
      height={{
        xl: '235px',
        lg: '235px',
        md: '235px',
        sm: '235px',
        xs: '90%',
      }}
      alignItems={{
        xl: 'none',
        lg: 'none',
        md: 'none',
        sm: 'none',
        xs: 'center',
      }}
      justifyContent="space-between"
    >
      <CardImage url={url} />
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          width: '75%',
          height: '100%',
          padding: '12px 12px 8px 12px',
        }}
        spacing={1}
      >
        <Stack
          className="w-100"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            maxHeight: '60px',
          }}
        >
          <h2 className="text-600 w-90 border">{title}</h2>
          <BookmarkBorderIcon />
        </Stack>
        <p className="w-100 h-60 border">{text}</p>
        <Stack
          direction="row"
          className="w-100"
          justifyContent="space-around"
          sx={{
            height: '15%',
            paddingRight: '4px',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            flex={25}
          >
            <span className="strong">{getDate()}</span>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={3}
            flex={75}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.1}
            >
              <FavoriteBorderIcon />
              <span className="strong">{like}</span>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.1}
            >
              <InsertCommentOutlinedIcon />
              <span className="strong">100</span>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
