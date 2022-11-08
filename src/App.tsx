import { Stack } from '@mui/material';
import { Header } from './layout/header/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Categories } from './components/categories/view/categories';
import { Footer } from './layout/footer/Footer';
import './App.scss';
import CreateStory from './pages/create-story/CreateStory';

function App() {
  return (
    <Stack
      direction={{
        xl: 'row',
        lg: 'row',
        md: 'row',
        sm: 'column',
        xs: 'column'
      }}
      alignItems='flex-tart'
      justifyContent='space-between'
      className='App'
    >
      <BrowserRouter>
        <Header />
        <Stack className='stack'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/create' element={<CreateStory />} />
            <Route path='/saved' element={<Home />} />
            <Route path='/documentation' element={<Home />} />
            <Route path='*' element={<div>Not Found</div>} />
          </Routes>
        </Stack>
        <Footer />
      </BrowserRouter>
    </Stack>
  );
}

export default App;
