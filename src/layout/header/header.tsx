import React, { Component } from 'react';
import './header.scss';
import logo from '../../assets/images/teller-story-logo.png';
import { Navbar } from '../navbar/Navbar';
import { Grid } from '@mui/material';

export class Header extends Component {
  render() {
    return (
      <Grid
        className='header'
        width={{
          xl: '190px',
          lg: '190px',
          md: '190px',
          sm: '100%',
          xs: '100%'
        }}
        height={{
          xl: '100vh',
          lg: '100vh',
          md: '100vh',
          sm: '120px',
          xs: '105px'
        }}
        direction='column'
        alignItems='center'
        justifyContent='flex-end'
        padding={{
          xl: '0px 0px 6px 0px',
          lg: '0px 0px 6px 0px',
          md: '0px 0px 6px 0px',
          sm: '0px',
          xs: '0px'
        }}
        gap={{
          xl: 0.4,
          lg: 0.4,
          md: 0.4,
          sm: 0,
          xs: 0
        }}
        container
      >
        <div className='logo container-center'>
          <div className='image'>
            <img src={logo} alt='Teller Story' />
          </div>
        </div>
        <Navbar />
      </Grid>
    );
  }
}
