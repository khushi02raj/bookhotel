import React, { useContext, useState } from 'react'
import {faBed, faCar, faPlane, faTaxi, faHouse, faCalendarDays, faPerson} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {  format } from 'date-fns'
import './Header.css';
import {useNavigate} from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
const Header = ({type}) => {
  const [dest,setDest]=useState("")
  const [dates,setDates]=useState([{
    startDate:new Date(),
    endDate:new Date(),
    key:'selection'
  }])
  const [opt,setOpt]=useState({
    adult:1,
    children:0,
    room:1
  })
  const [openOpt,setOpenOpt]=useState(false);
  const [openCal,setOpenCal]=useState(false);
  const handleCount=(name,opeartion)=>{
    setOpt((prev)=>{
      return{
      ...prev,
      [name]:opeartion==="i"?opt[name]+1:opt[name]-1
    };

    });
  };

  const {dispatch}=useContext(SearchContext)
  const navigate=useNavigate()
  const handleSearch=()=>{
    dispatch({type:"NEW_SEARCH",payload:{dest,dates,opt}})
    navigate("/hotels",{state:{dest,dates,opt}})
  }
  return (
    <div className='header'>
      <div className="list">
        <div className="item active"><FontAwesomeIcon icon={faBed}/> Stays</div>
        <div className="item"><FontAwesomeIcon icon={faPlane}/> Flights</div>
        <div className="item"><FontAwesomeIcon icon={faCar}/> Car rentals</div>
        <div className="item"><FontAwesomeIcon icon={faBed}/> Attractions</div>
        <div className="item"><FontAwesomeIcon icon={faTaxi}/> Airpot Taxis</div>

      </div>
      {type!=="list" &&
      <>
      <div className='text'>
        <h1 className="headerTitle"> A lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free BookHere account</p>
        </div>
        <div className="search">
            <div className="searchItem">
            <FontAwesomeIcon icon={faHouse}  className='headerIcon'/>
            <input type='text' placeholder='Where are you going?' className='inputSearch' onChange={e=>setDest(e.target.value)}/>
            </div>
            <div className="searchItem">
            <FontAwesomeIcon icon={faCalendarDays}  className='headerIcon'/>
            <span onClick={()=>setOpenCal(!openCal)} className='inputSearch'>{`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
            { openCal &&< DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates} className='date'
            />}
            </div>
            <div className="searchItem">
            <FontAwesomeIcon icon={faPerson}  className='headerIcon'/>
            <span className='inputSearch' onClick={()=>setOpenOpt(!openOpt)}>{`${opt.adult} adult . ${opt.children} children .  ${opt.room} room`}</span>
            { openOpt && <div className="optContainer">
              <div className="optItem">
                <span className='optText'>Adult</span>
                    <button disabled={opt.adult<=1} className='optCounter' onClick={()=>handleCount("adult","d")}>-</button>
                    <span className='optNum'>{opt.adult}</span>
                    <button className='optCounter' onClick={()=>handleCount("adult","i")}>+</button>
                </div>
                <div className="optItem">
                <span className='optText'>Children</span>
                  <button disabled={opt.children<=0} className='optCounter' onClick={()=>handleCount("children","d")}>-</button>
                  <span className='optNum'>{opt.children}</span>
                  <button className='optCounter' onClick={()=>handleCount("children","i")}> +</button>
                </div>
                <div className="optItem">
                <span className='optText'>Rooms</span>
                  <button disabled={opt.room<=1} className='optCounter' onClick={()=>handleCount("room","d")}>-</button>
                  <span className='optNum'>{opt.room}</span>
                  <button className='optCounter' onClick={()=>handleCount("room","i")}>+</button>
                </div>
            </div>}
            </div>
            <button className='headerButton' onClick={handleSearch}>Search</button>
        </div>
        </>}
    </div>
  )
}

export default Header
