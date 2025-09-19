import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [cityInput,setCityInput]=useState("");
  const [weatherData,setWeatherData]=useState(null);
  const [loading,setLoading]=useState(false);
  const apiKey= import.meta.env.VITE_APP_MY_SECRET_KEY;


  async function getWeatherData() {
    setLoading(true);
     

    const resp = await fetch(
       `http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityInput}`
    );
       
    const data = await resp.json();
    console.log(data)

    setWeatherData(data);

    setCityInput("");
    setLoading(false);

     if(!cityInput.trim()){
        alert( "Enter city");
        return;
    }
     else if(data.success === false){
        alert("Enter correct city name")
        return;
    }
  }
 

  return(
    <>
    <h1>Weather App</h1>

    <div className='input'>
      <input type="text" placeholder='Enter city' value={cityInput} onChange={(event)=>setCityInput(event.target.value)} />
      <button  onClick={()=>getWeatherData()} >Search</button>
    </div>
    
    <div  className='result' >
        {loading?( <span className='loader'> </span>) :  (<span className='card'>  
          <h2>{weatherData?.location?.name}</h2>
          <p>Temperature: {weatherData?.current?.temperature}°C</p>
          <p>Humidity: {weatherData?.current?.humidity}%</p>
          <p> Region: {weatherData?.location?.region}</p>
          <p>Country: {weatherData?.location?.country}</p>
       </span>) }
       
       
          
    </div>
    
    
    </>



  )


}

export default App
