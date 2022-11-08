import { Box } from '@mui/material';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Tooltip } from '@mui/material';
import './Navbar.scss';
import Home from '@mui/icons-material/Home';
import Bookmark from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Category from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MarkunreadIcon from '@mui/icons-material/Markunread';
export class Navbar extends Component {
  render() {
    return (
      <Grid
        className='menu'
        direction='row'
        alignItems='center'
        justifyContent='center'
        width={{
          xl: '100%',
          lg: '100%',
          md: '100%',
          sm: '96%',
          xs: '96%'
        }}
        height={{
          xl: '89%',
          lg: '89%',
          md: '89%',
          sm: '50%',
          xs: '40%'
        }}
        container
      >
        <Box
          className='box-start'
          sx={{
            display: 'flex',
            gap: 1
          }}
          height={{
            xl: '75%',
            lg: '75%',
            md: '75%',
            sm: '80%',
            xs: '80%'
          }}
          alignItems='center'
          justifyContent='flex-start'
          flexDirection={{
            xl: 'column',
            lg: 'column',
            md: 'column',
            sm: 'row',
            xs: 'row'
          }}
        >
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px',
              sm: '100%',
              xs: '100%'
            }}
          >
            <Tooltip title='Home' placement='right'>
              <NavLink className='nav-link' to='/'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection={{
                    xl: 'row',
                    lg: 'row',
                    md: 'row',
                    sm: 'column',
                    xs: 'column'
                  }}
                  height={{
                    xl: '100%',
                    lg: '100%',
                    md: '100%',
                    sm: '80%',
                    xs: '80%'
                  }}
                  alignItems='center'
                  justifyContent={{
                    xl: 'flex-start',
                    lg: 'flex-start',
                    md: 'flex-start',
                    sm: 'center',
                    xs: 'center'
                  }}
                  gap={{
                    xl: 1,
                    lg: 1,
                    md: 1,
                    sm: 0,
                    xs: 0
                  }}
                >
                  <Home />
                  <span className='text-600 hide-text-xs'>Home</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px',
              sm: '100%',
              xs: '100%'
            }}
          >
            <Tooltip title='Categories' placement='right'>
              <NavLink className='nav-link' to='/categories'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection={{
                    xl: 'row',
                    lg: 'row',
                    md: 'row',
                    sm: 'column',
                    xs: 'column'
                  }}
                  height={{
                    xl: '100%',
                    lg: '100%',
                    md: '100%',
                    sm: '80%',
                    xs: '80%'
                  }}
                  alignItems='center'
                  justifyContent={{
                    xl: 'flex-start',
                    lg: 'flex-start',
                    md: 'flex-start',
                    sm: 'center',
                    xs: 'center'
                  }}
                  gap={{
                    xl: 1,
                    lg: 1,
                    md: 1,
                    sm: 0,
                    xs: 0
                  }}
                >
                  <Category />
                  <span className='text-600 hide-text-xs'>Categories</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px',
              sm: '100%',
              xs: '100%'
            }}
          >
            <Tooltip title='Saved' placement='right'>
              <NavLink className='nav-link' to='/saved'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection={{
                    xl: 'row',
                    lg: 'row',
                    md: 'row',
                    sm: 'column',
                    xs: 'column'
                  }}
                  height={{
                    xl: '100%',
                    lg: '100%',
                    md: '100%',
                    sm: '80%',
                    xs: '80%'
                  }}
                  alignItems='center'
                  justifyContent={{
                    xl: 'flex-start',
                    lg: 'flex-start',
                    md: 'flex-start',
                    sm: 'center',
                    xs: 'center'
                  }}
                  gap={{
                    xl: 1,
                    lg: 1,
                    md: 1,
                    sm: 0,
                    xs: 0
                  }}
                >
                  <Bookmark />
                  <span className='text-600 hide-text-xs'>Saved</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px',
              sm: '100%',
              xs: '100%'
            }}
          >
            <Tooltip title='Notifications' placement='right'>
              <NavLink className='nav-link' to='/notifications'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection={{
                    xl: 'row',
                    lg: 'row',
                    md: 'row',
                    sm: 'column',
                    xs: 'column'
                  }}
                  height={{
                    xl: '100%',
                    lg: '100%',
                    md: '100%',
                    sm: '80%',
                    xs: '80%'
                  }}
                  alignItems='center'
                  justifyContent={{
                    xl: 'flex-start',
                    lg: 'flex-start',
                    md: 'flex-start',
                    sm: 'center',
                    xs: 'center'
                  }}
                  gap={{
                    xl: 1,
                    lg: 1,
                    md: 1,
                    sm: 0,
                    xs: 0
                  }}
                >
                  <NotificationsIcon />
                  <span className='text-600 hide-text-xs'>Notifications</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px',
              sm: '100%',
              xs: '100%'
            }}
          >
            <Tooltip title='My user' placement='right'>
              <NavLink className='nav-link' to='/user'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection={{
                    xl: 'row',
                    lg: 'row',
                    md: 'row',
                    sm: 'column',
                    xs: 'column'
                  }}
                  height={{
                    xl: '100%',
                    lg: '100%',
                    md: '100%',
                    sm: '80%',
                    xs: '80%'
                  }}
                  alignItems='center'
                  justifyContent={{
                    xl: 'flex-start',
                    lg: 'flex-start',
                    md: 'flex-start',
                    sm: 'center',
                    xs: 'center'
                  }}
                  gap={{
                    xl: 1,
                    lg: 1,
                    md: 1,
                    sm: 0,
                    xs: 0
                  }}
                >
                  <PersonIcon />
                  <span className='text-600 hide-text-xs'>My User</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px',
              sm: '100%',
              xs: '100%'
            }}
          >
            <Tooltip title='Trending' placement='right'>
              <NavLink className='nav-link' to='/trending'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection={{
                    xl: 'row',
                    lg: 'row',
                    md: 'row',
                    sm: 'column',
                    xs: 'column'
                  }}
                  height={{
                    xl: '100%',
                    lg: '100%',
                    md: '100%',
                    sm: '80%',
                    xs: '80%'
                  }}
                  alignItems='center'
                  justifyContent={{
                    xl: 'flex-start',
                    lg: 'flex-start',
                    md: 'flex-start',
                    sm: 'center',
                    xs: 'center'
                  }}
                  gap={{
                    xl: 1,
                    lg: 1,
                    md: 1,
                    sm: 0,
                    xs: 0
                  }}
                >
                  <TagIcon />
                  <span className='text-600 hide-text-xs'>Trending</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
        </Box>
        <Box
          className='box-end'
          display={{
            xl: 'flex',
            lg: 'flex',
            md: 'flex',
            sm: 'none',
            xs: 'none'
          }}
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1
          }}
        >
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px'
            }}
          >
            <Tooltip title='Suggestions' placement='right'>
              <NavLink className='nav-link' to='/suggestions'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection='row'
                  alignItems='center'
                  gap={1}
                >
                  <MarkunreadIcon />
                  <span className='text-600'>Sugerencias</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px'
            }}
          >
            <Tooltip title='Settings' placement='right'>
              <NavLink className='nav-link' to='/settings'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection='row'
                  alignItems='center'
                  gap={1}
                >
                  <SettingsIcon />
                  <span className='text-600'>Settings</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
          <Grid
            container
            className='item'
            height={{
              xl: '40px',
              lg: '40px',
              md: '40px'
            }}
          >
            <Tooltip title='Logout' placement='right'>
              <NavLink className='nav-link' to='/logout'>
                <Grid
                  container
                  sx={{ height: '100%' }}
                  flexDirection='row'
                  alignItems='center'
                  gap={1}
                >
                  <LogoutIcon />
                  <span className='text-600'>Logout</span>
                </Grid>
              </NavLink>
            </Tooltip>
          </Grid>
        </Box>
      </Grid>
    );
  }
}
