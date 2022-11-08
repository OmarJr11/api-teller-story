import React, { Component } from 'react';
import './stories-trending.scss';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types'

export class StoriesTrending extends Component {
    static propTypes = {
        stories: PropTypes.array,
        isCategories: PropTypes.bool,
    }
    render () {
        const {stories, isCategories} = this.props 
        return (
            <Grid container="true" 
                  direction='column' 
                  gap={1}
                  sx={{
                      padding:'0px 8px 0px 8px',
                      width: '100%', 
                  }}>
                <div>
                    {
                        !isCategories 
                        ? <span className='text-600 text-20'>Trending</span>
                        : <span className='text-600 text-20'>Categories Trending</span>
                    }
                </div>
                {
                    stories.map( (story, index) => {
                        return (
                            <div key={index}>
                                <span className='text-600 text-15'>#{index+1} </span>
                                <span className='text-15'>{story}</span>
                            </div>
                        )
                    })
                }
            </Grid>
        )
    }
}