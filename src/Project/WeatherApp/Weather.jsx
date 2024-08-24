import {  useEffect, useState} from "react";
import "./Weather.css"

import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';


import { NotificationContainer, NotificationManager } from "react-notifications";



function App() {
  let[city,setCity]=useState('')
  let[wDetails,setWDetais]=useState()
 


  let getData=(event)=>{
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      console.log(finalRes)
    if(finalRes.cod=="404"){
setWDetais(undefined)
NotificationManager.error("Data not found")

    }
    else{
      setWDetais(finalRes)
     
      NotificationManager.success("Congrats")
    }
    

    })
    event.preventDefault()
setCity('')
  }


  
  return (
   <>
   <NotificationContainer/>
  
<div className="container p-5">


  <div className="row text-center">
    <div className="col-lg-12">
      <h1 className="text-danger">React Weather App</h1>
    </div>
  </div>
  <div className="row text-center py-3">
    <div className="col-lg-12">
      <form onSubmit={getData}>
      <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder="Enter City"className="border-1 bg-body-secondary " />
      <button className="border-1" >Submit</button>
      </form>
    </div>
  </div>
  <div className="row text-center text-white d-flex justify-content-center p-5">
    <div className="col-lg-12 p-5" style={{width:"300px",border:"1px solid black",boxShadow:"0px 0px 10px 2px black"}}>
    {
    wDetails !== undefined
  ?
  <>
  <h3>{wDetails.name} <span>{wDetails.sys.country}</span> </h3>
    <h2>{wDetails.main.temp} °C</h2>
    <img  width={60} src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}/>
    <p style={{fontSize:"20px"}}>{wDetails.weather[0].description}</p>
  </>
  :
  "No data found"
  }
    </div>
  </div>
</div>

   </>
  );
}

export default App;