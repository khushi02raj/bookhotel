import React from 'react'
import './home.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Featured from '../../components/featured/Featured';
import PropertyList from '../../components/propertyList/PropertyList';
import FavPlaces from '../../components/favPlaces/FavPlaces';
import Contact from '../../components/contactbox/Contact';
import Footer from '../../components/footer/Footer';
const Home = () => {
  return (
    <div>
            <Navbar/>
<Header/>
      
      <div className="homeContainer">
      <h1 className="homeTitle">Explore India</h1>
        <Featured/>
        <h1 className="homeTitle">Browse by Property</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FavPlaces/>
        <Contact/>
        <Footer/>
      </div>
      
    </div>
  )
}

export default Home
