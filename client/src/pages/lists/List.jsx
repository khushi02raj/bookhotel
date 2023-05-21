import React,{useState} from 'react'
import './List.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import {faHouse, faCalendarDays, faPerson,faSearch} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {  format } from 'date-fns'
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch.js'

const List = () => {
  const location=useLocation()
 // console.log(location);
  const [dest,setDest]=useState(location.state.dest)
  const [dates,setDates]=useState(location.state.dates)
  const [opt,setOpt]=useState(location.state.opt)
  const [openOpt,setOpenOpt]=useState(false);
  const [openCal,setOpenCal]=useState(false);
   const { data, loading, error } = useFetch(`/hotels?city=${dest}`);
  const handleCount=(name,opeartion)=>{
    setOpt((prev)=>{
      return{
      ...prev,
      [name]:opeartion==="i"?opt[name]+1:opt[name]-1
    };

    });
  };
  
  return (
    <div>
      <Navbar/> <Header type="list"/>
      <div className="container">
        <div className="wrapper">
        <div className="left">
          <h1 className='searchTitle'>Search</h1>
          <div className="listSearch">
            <div className="listIp">Destination
            <FontAwesomeIcon icon={faSearch}  className='headerIcon'/>
            <input type='text' placeholder={dest} className='listVal' onChange={(e)=>{setDest(e.target.value)}}/>
            </div>
            <div className="listIp">Check-in date
            <FontAwesomeIcon icon={faCalendarDays}  className='headerIcon'/>
            <span onClick={()=>setOpenCal(!openCal)} className='listVal'>{`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
            { openCal &&< DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates} className='date'
            />}
            </div>
            <div className="listIp">Person
            <FontAwesomeIcon icon={faPerson}  className='headerIcon'/>
            <span className='listVal' onClick={()=>setOpenOpt(!openOpt)}>{`${opt.adult} adult . ${opt.children} children .  ${opt.room} room`}</span>
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
            <button className='headerButton'>Search</button>
        </div>
        
        
        </div>
        <div className="right">
          {/* <SearchItem/><SearchItem/><SearchItem/><SearchItem/> */}
        {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
        </div></div>
      </div>
    </div>
  )
}

export default List
