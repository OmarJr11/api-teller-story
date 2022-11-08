import { Component } from 'react';
import './card-image.scss'
import PropTypes from 'prop-types'

export class CardImage extends Component {
    static propTypes = {
        url: PropTypes.any,
    }
    render () {
        const {url} = this.props;
        return (
            <div className='card-image'>
                <img src={url} alt='StoryImage'/>
            </div>
        )
    }
}