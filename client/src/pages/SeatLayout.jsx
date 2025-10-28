import React, { useState, useEffect } from 'react'
import {useParams,useNavigate} from "react-router-dom"
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading'
import {ArrowRightIcon, ClockIcon} from "lucide-react"
import IosTimeFormat from '../lib/IosTimeFormat';
import BlurCircle from '../components/BlurCircle'
import {assets} from "../assets/assets"
import toast from 'react-hot-toast';



const SeatLayout = () => {

  const {id,date}=useParams();
  const navigate=useNavigate();
  const [selectedSeat, setSelectedSeat]=useState([]);
  const [selectedTime, setSelectTime]=useState(null);
  const [show, setShow]=useState(null);

  const getShow=async()=>{
     const show= dummyShowsData.find((show)=>show._id===id);
     setShow({
      movie:show,
      dateTime:dummyDateTimeData,
     })
  }

  const groupRow=[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"],["K","L"],["M","N"],["O","p"],["Q","S"]]

  const handleSeatClick=(data)=>{
     
    if(!selectedTime){
       return toast.error("Please select the show Time")  
    }
    if(!selectedSeat.includes(data) && selectedSeat.length>4){
        return toast.error("You can select only 5 seats")
    }
    setSelectedSeat((prev)=>prev.includes(data)?prev.filter((item)=>item!==data):[...prev,data])
  }
  const renderSeats=(row, count=9)=>(
      
    <div key={row} className='flex gap-2 mt-2'>
           <div className='flex flex-wrap items-center justify-center gap-2'>
              {
                Array.from({length:count},(_,i)=>{
                   const seatId=`${row}${i+1}`;
                   return(
                     <button key={seatId} onClick={()=>handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeat.includes(seatId) && "bg-primary text-white"}`}>
                         {seatId}
                     </button>
                   )
                })
              }
           </div>
    </div>
  )

  useEffect(()=>{
    getShow();
  },[id]);

  return show ? (

    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
       
       {/* availabel time */}
       <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
         
         <p className='text-lg font-semibold px-6'>Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date].map((item)=>(
              <div key={item.time} onClick={()=>setSelectTime(item)} className={`flex items-center gap-2 px-6 py-2 rounded-r-md cursor-pointer transition ${selectedTime?.time===item.time ? "bg-primary text-white": "hover:bg-primary/20"}`}>
                 <ClockIcon className="w-4 h-4"/>
                 <p className='text-sm'>{IosTimeFormat(item.time)}</p>
              </div>
          ))}
        </div>
       </div>

      {/* seat layout */}
       <div className='relative flex-1 flex flex-col items-center max-wd:mt-16'>
          <BlurCircle top="-100px" left="0px"/>
          <BlurCircle bottom="0px" right="0px"/>
          <h1 className='text-2xl font-semibold mb-5'>Select Your Seat</h1>
          <img src={assets.screenImage} alt="screen"/>
          <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

          <div className='flex flex-col text-sm text-gray-300 items-center mt-10'>

              <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
                {
                  groupRow[0].map((row)=>(
                    renderSeats(row)
                  ))
                }
              </div>

              <div className='grid grid-cols-2  gap-11'>
                  {
                    groupRow.slice(1).map((group,index)=>(
                      <div key={index}>
                         {group.map((row)=>(
                           renderSeats(row)
                        ))}
                      </div>
                    ))
                  }
              </div>
              <p className='text-gray-400 text-sm mt-20'>NON SCREEN SIDE</p>
              <img src={assets.screenImage} alt="screen"  className ="mt-4" style={{ transform: "scaleY(-1)"}}/>

              <button onClick={()=>navigate("/my-bookings")} className='mt-40 flex items-center gap-1 px-10 py-4 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
                Proceed to Checkout
                <ArrowRightIcon strokeWidth={3} className='h-4 w-4'/>
              </button>

          </div>
       </div>

    </div>

  ):
  (
    <Loading/>
  )
}

export default SeatLayout