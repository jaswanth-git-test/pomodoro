import React,{useState} from 'react';
import './App.css';

function App() {
  let [val,setVal] = useState("")
  let [cycle,setCycle] = useState("")
  let [seconds,setSeconds] = useState(0);
  let [minutes,setMinutes] = useState(0);
  let [hours,setHours] = useState(0)
  let [breakSec,setBreakSec] = useState(0);
  let [breakMin,setBreakMin] = useState(0);
  let [workSec,setWorkSec] = useState(0);
  let [workMin,setWorkMin] = useState(0);
  let [overAllMins,setOverAllMins]  = useState(0);
  
  let timerId;
  let workTimerId;
  let breakTimerId;
  const startWorkTimer = ()=>{
    setBreakMin(0);
    setBreakSec(0);
    clearInterval(breakTimerId);
      workTimerId = setInterval(()=>{
        workSec += 1;
        setWorkSec(workSec);
        if(workSec===59){
          if(workMin===24){
            setWorkMin(0);
            setWorkSec(0);
            clearInterval(workTimerId);
            }
          else{
            workMin +=1;
            setWorkMin(workMin);
            setWorkSec(0);
          }
          
        }
        
      },1000)
  }

  const startBreakTimer = ()=>{
        setWorkMin(0);
        setWorkSec(0);
        clearInterval(workTimerId);
        breakTimerId = setInterval(()=>{
            breakSec += 1;
            setBreakSec(breakSec);
            if(breakSec===59){
              if(breakMin===4){
                setBreakMin(0);
                setBreakSec(0);
                clearInterval(breakTimerId)
              }
              else{
                breakMin += 1;
                setBreakMin(breakMin);
                setBreakSec(0);
              }
              
            }
        },1000)
  }
  const startTimer = ()=>{
    startWorkTimer();
    timerId = setInterval(() => {
      seconds += 1;
      setSeconds(seconds);
      
      if(seconds===59){
        if(minutes===59){
          
          hours += 1;
          setHours(hours);
          setMinutes(0);
          setSeconds(0);
          startWorkTimer();

        }
        else if(overAllMins ===(cycle*30-1)){
          clearInterval(timerId);
          setSeconds(0);
          setMinutes(0);
          setOverAllMins(0);
        }
        else if(minutes === 24){
          minutes += 1;
          overAllMins += 1;
          seconds = 0;
          setMinutes(minutes);
          setSeconds(seconds);
          setOverAllMins(overAllMins);
          startBreakTimer();
        }
        else if(minutes===29){
          minutes += 1;
          overAllMins += 1;
          seconds = 0;
          setMinutes(minutes);
          setSeconds(seconds);
          setOverAllMins(overAllMins);
          startWorkTimer();
        }
        else if(minutes === 54){
          minutes += 1;
          overAllMins += 1;
          seconds = 0;
          setMinutes(minutes);
          setSeconds(seconds);
          setOverAllMins(overAllMins);
          startBreakTimer();
        }
        else{
          minutes += 1;
          overAllMins += 1;
          seconds = 0;
          setMinutes(minutes);
          setSeconds(seconds);
          setOverAllMins(overAllMins);
        }
        
      }
      
      
    }, 1000);
  }
  
    
    
  
   

  
  return (
    <div className='main-container container '>
      <div className='m-3 d-flex flex-column w-50 ml-auto mr-auto'>
          <input  type="text" className='form-control m-3 w-50 align-self-center' placeholder='enter a integer eg.,1' value={val} onChange={(e)=>{setVal(e.target.value)}}/>
          <button className='btn btn-primary w-25 align-self-center' onClick={()=>{setCycle(val);setVal("")}}>Set Cycle</button>
          <div className='m-3 text-center'>
            {cycle&&<div>{`${cycle>1?"Cycles are":"Cycle is"}  set to ${cycle}`}</div>}
          </div>
          
      </div>
      <div className='d-flex m-3'>
         <div className='m-3'>
              <div>
                  <span>{minutes===0?"00":minutes}</span>    :   <span>{seconds===0?"00":seconds}</span>
              </div>
              <div>
                  <button className='btn btn-primary' onClick={startTimer}>Start Timer</button>
              </div>
              
         </div>
         <div className='work-timer m-3'>
            <div>
              <span>00</span>:<span>00</span>
            </div>
            <div>
              <h4>Work Timer</h4>
            </div>

        </div>
        <div className='break-timer m-3'>
            <div>
              <span>00</span>:<span></span>
            </div>
            <div>
              <h4>Break Timer</h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App;