const timeFormat=(minutes)=>{
    const hour=Math.floor(minutes/60);
    const remainingMinutes=Math.floor(minutes%60);

    return `${hour}h ${remainingMinutes}m`
}

export default timeFormat