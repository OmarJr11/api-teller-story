import './header-body.scss';
import { Grid, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

export const HeaderBody = ({name}: any) => {

    return (
      <Grid
        item
        className="header-body"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        sx={{
          width: '100%',
          height: '70px',
          borderBottom: '2px solid #DEE1E7',
        }}
        container
      >
        <h2 className="text-600 name">{name}</h2>
        <Button className='button'
                endIcon={<SendIcon />}
                component={Link}
                to="create">
          <span className="text-600 text-13 white">Publish</span>
        </Button>
      </Grid>
    );
}
