const IosTimeFormat=(dateTime)=>{
     const date=new Date(dateTime);
     const time=date.toLocaleTimeString("en-us",{
         hour:'2-digit',
         minute:'2-digit',
         hour12:true
     })
     return time
}

export default IosTimeFormat