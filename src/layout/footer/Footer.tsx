import React, { Component } from 'react';
import './footer.scss';
import { Grid } from '@mui/material';
import { UserComponent } from '../../shared/user-component/user-component';
import { StoriesTrending } from '../../shared/stories-trending/stories-trending';

export class Footer extends Component {
  render() {
    const stories = [
      'Me cago en todo lo cagable',
      'Y este niño, y este pedazo trozo de mierda?',
      'Callase señora, vayase a la mierda',
      'Fumo?',
      'Aparta hijo e puta'
    ];
    return (
      <Grid
        container
        className='footer hide-footer'
        direction='column'
        gap={1}
        width={{
          xl: '240px',
          lg: '240px',
          md: '240px',
          sm: '100%'
        }}
        height={{
          xl: '100vh',
          lg: '100vh',
          md: '100vh'
        }}
      >
        <UserComponent />
        <StoriesTrending stories={stories} isCategories={false} />
        <StoriesTrending stories={stories} isCategories={true} />
      </Grid>
    );
  }
}
