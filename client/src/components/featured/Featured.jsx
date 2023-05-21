import React from 'react'
import './Featured.css'
import useFetch from '../../hooks/useFetch.js'
import { Link } from "react-router-dom";

const Featured = () => {
 const {data,loading,error}=useFetch("/hotels/countByCity?cities=Goa,Delhi,Kolkata,Lonavala,Jaipur")
//  console.log(data);
  return (
    <div className="featured">
      { loading?
      ("Loading please wait")
      :
        <><div className="featuredItem">
          {/* <Link to={`/hotels?city=${data.city}`}> */}
        <img
          src="https://assets.serenity.co.uk/58000-58999/58779/1296x864.jpg"
          alt=""
          className="featuredImg"
        />
        {/* </Link> */}
        <div className="featuredTitles">
          <h1>Goa</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Delhi</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="http://www.residencestyle.com/wp-content/uploads/2019/12/Reaching-Lonavala.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Lonavala</h1>
          <h2>{data[3]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://www.investinjaipur.com/wp-content/uploads/2019/05/jaipur-city-palace.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Jaipur</h1>
          <h2>{data[4]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://wallpapercave.com/wp/wp4631472.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Kolkata</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
      </>}
      </div>
  )
}

export default Featured;
