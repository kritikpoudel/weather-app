import { useState } from "react";
import Info from "./Components/Info";
import Weather from "./Components/weather";
// import background from"./assets/mainbg.jpg"

export default function App() {
  const [weatherData,setWeatherData]=useState(false);
  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-[url('./assets/mainbg.jpg')] bg-fixed"> 
      <div className="w-[65%] h-[80vh] bg-black/80 rounded-3xl">
 <Info weatherData={weatherData}/>
  <Weather setWeatherData={setWeatherData} weatherData={weatherData}/>
   </div>
    </div>
  )
}

