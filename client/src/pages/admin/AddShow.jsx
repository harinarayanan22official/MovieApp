import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import Kconvertor from "../../lib/Kconvertor";

const AddShow = () => {
  
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [dataTimeSelection, setDataTimeSelection] = useState({});
  const [dataTimeInput, setDataTimeInput] = useState(""); 
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovie = async () => {
    setNowPlayingMovie(dummyShowsData);
  };

  useEffect(() => {
    fetchNowPlayingMovie();
  }, []);

  const handleDateTimeAdd= ()=>{
      if(!dataTimeInput){
        return;
      }
      const[date,time]=dataTimeInput.split("T");
      if(!date || !time){
        return ;
      }

      setDataTimeSelection((prev)=>{
           
        const times=prev[date] ||[];
        if(!times.includes(time)){
            return {...prev,[date]:[...times,time]};
        }
        return prev;
  })

}

  const handleRemoveTime=(date,time)=>{

     setDataTimeSelection((prev)=>{
           
         const filterTime= prev[date].filter((d)=>d!==time);
         if(filterTime.length===0){
             const { [date]:_,...rest}=prev;
             return rest
         }
         return { ...prev,[date]:filterTime}
     })
  }


  return nowPlayingMovie.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      <div className="overflow-x-auto pb-4 mt-4">
        <div className="group flex flex-wrap gap-6 w-max">
          {nowPlayingMovie.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-40 cursor-pointer transition duration-300 hover:-translate-y-1 
                          group-hover:opacity-40 hover:!opacity-100`}
              onClick={() => setSelectedMovie(movie.id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">{Kconvertor(movie.vote_count)} Votes</p>
                </div>

                {selectedMovie === movie.id && (
                  <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                    <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                )}
              </div>

              <p className="font-medium truncate mt-2">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
         <label className="block text-sm font-medium mb-2">Show Price</label>

         <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
             <p className="text-gray-400 text-sm">{currency}</p>
             <input min={0} type="number" value={showPrice} onChange={(e)=>(setShowPrice(e.target.value))} placeholder="Enter show price" className="outline-none"/>
         </div>
      </div>

      <div className="mt-6">
         <label className="text-sm block font-medium mb-2">Select Date and Time</label>

         <div className="inline-flex gap-5 border border-gray-600 p-3 pl-3 rounded-lg">
          
            <input type="datetime-local" value={dataTimeInput} onChange={(e)=>(setDataTimeInput(e.target.value))} className="outline-none rounded-md"/>

            <button  onClick={handleDateTimeAdd} className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer">Add Time</button>
         </div>
      </div>

      {
        Object.keys(dataTimeSelection).length>0 && (
            
          <div className="mt-6">
             <h2 className="mb-2">Selected Date-Time</h2>
             <ul className="space-y-3">
                 {
                   Object.entries(dataTimeSelection).map(([date,times])=>(
                      <li key={date}>
                            <div className="font-medium">{date}</div>
                            <div className="flex flex-wrap gap-2 mt-1 text-sm">
                               {
                                times.map((time)=>(
                                  <div key={time} className="border border-primary px-2 py-1 flex items-center rounded">
                                     <span>{time}</span>
                                     <DeleteIcon onClick={()=>(handleRemoveTime(date,time))} width={15} className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"/>
                                  </div>
                                ))
                               }
                            </div>
                      </li>
                   ))
                 }
             </ul>
          </div>
        )
      }

      <button className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer">Add show</button>

    </>
  ) : (
    <Loading />
  );
};

export default AddShow;
