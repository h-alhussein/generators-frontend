import React, { useRef, useState } from 'react';
import axios from 'src/axios';
import search from "../../assets/search.png";
import clear from "../../assets/clear.png"
import cloud from "../../assets/cloud.png"
import snow from "../../assets/snow.png"
import drizzle from "../../assets/drizzle.png"
import rain from "../../assets/rain.png"
import wind from "../../assets/wind.png"
import humidity from "../../assets/humidity.png"
import "./weather.css";


const Weather = () => {
  const inputref= useRef();
  const [wetter,setwetter]=useState(false);
  const allIcons = {
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
  }
  const getwetter = async (city) => {
    try {
      const response = await axios.post('/api/v1/weather',JSON.stringify({ city: city }),{
        headers: {
          'Content-Type': 'application/json',
        },
      }
      
      )
      const data = response.data;
    
      console.log(data.weather[0])
      const icon= allIcons[response.data.weather[0].icon] ||clear ;
      setwetter({
        humidity:data.main.humidity,
        windspeed:data.wind.speed,
        temperature:Math.floor(data.main.temp/10),
        location: data.name,
        icon : icon
      })
      console.log(wetter)
    } catch (err) {
      
        alert(err.response.data)
      
      console.log(err)
    }
  }

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputref} type="text" placeholder='Search' />
        <img src={search} alt="" onClick={() => { getwetter(inputref.current.value)
          
        }} />
      </div>
      {wetter?<>
        <img className='weather-icon' src={wetter.icon} alt="" />
     <p className='temperature'>{wetter.temperature}°C</p>
     <p className='location'>{wetter.location}</p>
    <div className="weather-data">
      <div className="col">
        <img src={humidity} alt="" />
        <div><p>{wetter.humidity}%</p>
        <span>humedity</span>
        </div>
      </div>

      <div className="col">
        <img src={wind} alt="" />
        <div><p>{wetter.windspeed} KM</p>
        <span>Wind Speed</span>
        </div>
      </div>
    </div></>:<></>}


    </div>
  );
}

export default Weather;
