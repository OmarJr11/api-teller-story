import { Component } from 'react';
import { Grid } from '@mui/material';
import './categories.scss';
import { Footer } from '../../../layout/footer/Footer';
import { HeaderBody } from '../../../shared/header-body/header-body';
import { CategoryCard } from '../components/category-card/category-card';
import { CardStory } from '../../stories/components/card-story/Card-story';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import img1 from '../../../assets/images/categories/1.jpeg';
import img2 from '../../../assets/images/categories/2.jpeg';
import img3 from '../../../assets/images/categories/3.jpeg';
import img4 from '../../../assets/images/categories/4.jpeg';
import img5 from '../../../assets/images/categories/5.jpeg';
import img6 from '../../../assets/images/categories/6.jpeg';
import img7 from '../../../assets/images/categories/7.jpeg';
import img8 from '../../../assets/images/categories/8.jpg';
import img9 from '../../../assets/images/categories/1.jpeg';
import img10 from '../../../assets/images/categories/2.jpeg';

export class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          name: 'Random',
          img: img1,
          id: '1'
        },
        {
          name: 'Animales',
          img: img2,
          id: '2'
        },
        {
          name: 'Recordatorios',
          img: img3,
          id: '3'
        },
        {
          name: 'Furioso',
          img: img4,
          id: '4'
        },
        {
          name: 'Sorprendido',
          img: img5,
          id: '5'
        },
        {
          name: 'Tristeza',
          img: img6,
          id: '6'
        },
        {
          name: 'Regalos',
          img: img7,
          id: '7'
        },
        {
          name: 'Increible',
          img: img8,
          id: '8'
        },
        {
          name: 'Callese señora',
          img: img9,
          id: '9'
        },
        {
          name: 'Vayase a la mierda',
          img: img10,
          id: '10'
        }
      ],
      category: null
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  selectCategory(e) {
    let index;
    switch (e.target.tagName) {
      case 'IMG':
        index = e.target.parentElement.parentElement.id;
        this.setState({ category: this.state.categories[Number(index) - 1] });
        break;
      case 'DIV':
        index = e.target.parentElement.id;
        this.setState({ category: this.state.categories[Number(index) - 1] });
        break;
      case 'SPAN':
        index = e.target.parentElement.parentElement.id;
        this.setState({ category: this.state.categories[Number(index) - 1] });
        break;
      default:
        this.setState({ category: null });
        break;
    }
  }

  renderChooseOne() {
    console.log(this.state);

    return <h3 className='text-600 w-90 primary-color'>Choose One Category</h3>;
  }

  renderCategoryName() {
    console.log(this.state);
    return (
      <Grid direction='row' alignItems='center' container className='w-90'>
        <ArrowBackIos className='pointer' onClick={this.selectCategory} />
        <h3 className='text-600 w-90 primary-color'>
          {this.state.category.name}
        </h3>
      </Grid>
    );
  }

  render() {
    const categories = this.state.categories;
    return (
      <div className='categories container-start'>
        <Grid
          sx={{
            width: '72%',
            height: '100%',
            paddingBottom: '15px'
          }}
          direction='column'
          alignItems='center'
          gap={1.2}
          container
        >
          <HeaderBody name='Categories' />
          <Grid
            className='w-100'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{
              height: '60px'
            }}
            container
          >
            {this.state.category === null
              ? this.renderChooseOne()
              : this.renderCategoryName()}
          </Grid>
          <Grid
            container
            direction='row'
            className='w-100'
            sx={{
              padding: this.state.category === null ? '0px 3px' : '0px'
            }}
            gap={this.state.category === null ? 3.7 : 1.2}
          >
            {this.state.category === null ? (
              categories.map((category, index) => {
                return (
                  <CategoryCard
                    category={category}
                    key={index + 1}
                    parentCallback={this.selectCategory}
                    id={index}
                  />
                );
              })
            ) : (
              <>
                <Grid item>
                  <CardStory />
                </Grid>
                <Grid item>
                  <CardStory />
                </Grid>
                <Grid item>
                  <CardStory />
                </Grid>
                <Grid item>
                  <CardStory />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}
