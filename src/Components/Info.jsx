import React from 'react'
import { useEffect,useState } from 'react';
export default function Info({weatherData}) {
     const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!weatherData?.timezone) return;

    const updateDateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + weatherData.timezone * 1000);

      const formattedTime = local.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const formattedDate = local.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setTime(formattedTime);
      setDate(formattedDate);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, [weatherData?.timezone]);
  return (
    <div className='rounded-l-3xl relative w-[60%] h-[100%] float-left bg-[url("./assets/itembg1.jpg")] bg-fixed bg-cover bg-center'>
        <div className='float-right pt-3 pr-8 text-white'>
            <h2 className='text-6xl font-extralight'>{weatherData.city}</h2>
            <h3 className='text-3xl font-extralight text-right m-0'>{weatherData.country}</h3>
        </div>
        <div className='absolute bottom-0 w-full flex text-white justify-between items-end px-6 pb-4 '>
            <div className='flex flex-col' >
               <p className='text-5xl font-extralight'>{time}</p>
                <p className='text-2xl font-extralight text-gray-300'>{date}</p>
            </div>
           <div className='text-8xl font-extralight'> 
               <p>{weatherData.temperature}°C</p>
           </div>
        </div>

    </div>
  )
}
