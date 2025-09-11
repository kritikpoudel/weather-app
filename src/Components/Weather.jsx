import React, { useEffect, useRef, useState } from 'react'
import react_icon from '../assets/react.svg'
import search_icon from '../assets/search.svg'
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"


export default function Weather({setWeatherData,weatherData}) {
    const inputRef=useRef();
     const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13dn":snow_icon, 
    }
    const search =async(city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        const response= await fetch(url);
        const data= await response.json();
        console.log(data);
        const icon=allIcons[data.weather[0].icon]|| clear_icon
        setWeatherData({
            temperature:Math.floor(data.main.temp),
            whindSpeed:data.wind.speed,
            humidity:data.main.humidity,
            visibility:data.visibility,
            country:data.sys.country,
            city:data.name,
            condition:data.weather[0].main,
            timezone: data.timezone,
            icon:icon

        })
            
        } catch (error) {
            setWeatherData(false);
        console.error("Error in fetching data");
        }
        
    }
     useEffect(()=>{
            search("Kathmandu");
        },[])
  return (
    <div className='w-[40%] h-[100%] float-right text-white'>
        <div className='flex justify-center '>
            <img className='size-25 mt-7' src={weatherData.icon} alt="" />
        </div>
        <div className='flex flex-col items-center'>
                <h2 className='text-4xl font-light mt-4 border-b w-[80%] text-center border-gray-500'>{weatherData.condition}</h2>
                <div className='flex mt-6'>
                <input ref={inputRef} className='border-b border-gray-500 outline-none px-2 flex-1 bg-transparent text-white placeholder-gray-300'
                type="text" placeholder='search any city'/>
                <img className='w-6 h-6 cursor-pointer'
                src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
            </div>
            <p className='mt-6 font-bold text-lg border-b w-[80%] text-center mx-5 border-gray-500'>{weatherData.city}, {weatherData.country}</p>
        </div>
        <div className='w-[80%] mt-6 space-y-4 text-sm  mx-10 '>
            <div className='flex justify-between border-b border-gray-500 px-6 pb-2'>
                <span>Temperature</span>
                <span>{weatherData.temperature}°C</span>
            </div>
            <div className='flex justify-between border-b border-gray-500 px-6 pb-2'>
                <span>Humidity</span>
                <span>{weatherData.humidity}%</span>
            </div>
            <div className='flex justify-between border-b border-gray-500 px-6 pb-2'>
                <span>Visibility</span>
                <span>{weatherData.visibility} m</span>
            </div>
            <div className='flex justify-between border-b border-gray-500 px-6 pb-2'>
                <span>Wind Speed</span>
                <span>{weatherData.whindSpeed} m/s</span>
            </div>
        </div>

    </div>
  )
}
