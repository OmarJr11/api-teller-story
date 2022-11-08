import { Component } from 'react';
import { Stack } from "@mui/material";
import './category-card.scss'
import PropTypes from 'prop-types'

export class CategoryCard extends Component {
    static propTypes = {
        category: PropTypes.object,
    }

    render () {
        const { category } = this.props;
        return (
            <Stack className='category-card box-shadow pointer' 
                   direction="column"
                   alignItems='flex-start'
                   justifyContent="flex-start"
                   sx={{
                    width: '140px',
                    height: '140px',
                   }}
                   container
                   id={category.id}
                   onClick={this.props.parentCallback}>
                <Stack className='w-100 border-radius-top image'
                       sx={{
                        height: '75%',
                       }}
                       container>
                    <img className='border-radius-top' src={category.img} alt={category.name}/>
                </Stack>
                <Stack className='w-100 border-radius-bottom category-card-footer'
                       container
                       alignItems='center'
                       justifyContent='center'
                       sx={{
                        height: '25%',
                        textAlign: 'center',
                       }}>
                    <span className='text-600'>{category.name}</span>
                </Stack>
            </Stack>
        )
    }
}