import { Component } from 'react';
import { Stack } from "@mui/material";
import './create-card-story.scss'
import AddIcon from '@mui/icons-material/Add';
export class CreateCardStory extends Component {
    render () {
        return (
            <Stack className='create-card-story' 
                   direction="column"
                   alignItems='center'
                   justifyContent="center"
                   spacing={3}>
                <Stack className='w-100'>  
                    <h1 className='w-100 text-center'>
                        Cuentanos tu historia. La comunidad de teller te quiere leer
                    </h1>

                </Stack>
                <div className='icon-add'>
                    <AddIcon sx={{ fontSize: 45}}/>
                </div>
            </Stack>
        )
    }
}