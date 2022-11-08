import React, { Component } from 'react';
import './user-component.scss';
import { Grid } from '@mui/material';
import user from '../../assets/images/user.jpeg';


export class UserComponent extends Component {
    render () {
        return (
            <Grid container ="true"
                  className='user-component' 
                  direction='row'
                  gap={1}
                  sx={{
                      padding: '8px',
                      width: '100%', 
                      height: '70px',
                      borderBottom: '2px solid #DEE1E7'
                  }}>
                <div className='image-user'>
                    <img src={user} alt='Teller Story'/>
                </div>
                <div className='h-100 container-center text-600'>
                    <span>Omar Gonzalez</span>
                </div>
            </Grid>
        )
    }
}