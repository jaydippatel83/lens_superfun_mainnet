
import './App.css';
import ArtistSlider from './components/ArtistSlider';
import TrendingSlider from './components/TrendingSlider'; 
import Header from './header/Header';
import Stories from './components/Stories';
import TopCreators from './components/TopCreators';
import Search from './components/Search';
import { Fragment, useEffect } from 'react';

function App() { 
  return (
    <div className='footer-position' style={{ marginTop: '100px' }}>
      <Header />
      <TopCreators/>
      {/* <Search/> */}
      <TrendingSlider/>
      {/* <ArtistSlider/>  */}
      <Stories/>
    </div>
  );
}

export default App;
