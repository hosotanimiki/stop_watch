import React,{useState, useRef, useEffect, useCallback} from 'react';
import './StopwatchForm.css';


function StopwatchForm(){
    const [startTime, setStartTime]=useState(0);
    const [stopTime, setStopTime]=useState(0);
    const [isRunning, setIsRunning]=useState(false);
    const [display, setDisplay]=useState('00:00.000');
    const [laps, setLaps]=useState([])
    const timeoutID=useRef(null)
    
    const formatTime=(time)=>{
        const m=String(time.getUTCMinutes()).padStart(2, '0');
        const s=String(time.getUTCSeconds()).padStart(2, '0');
        const ms=String(time.getUTCMilliseconds()).padStart(3, '0');
        return `${m}:${s}:${ms}`;
    };

    const displayTime=useCallback(()=>{
        const currentTime=new Date(Date.now()-startTime+stopTime);
        setDisplay(formatTime(currentTime));
        timeoutID.current=setTimeout(displayTime, 10);
    },[startTime,stopTime]);

    const start=()=>{
        setStartTime(Date.now());
        setIsRunning(true);
    };
    const stop=()=>{
        clearTimeout(timeoutID.current);
        setStopTime((prev)=>prev+(Date.now()-startTime));
        setIsRunning(false);
    };
    const reset=()=>{
        clearTimeout(Date.now());
        setDisplay('00:00.000')
        setStopTime(0);
        setIsRunning(false);
        setLaps([]);
    };
    const lap=()=>{
        setLaps([...laps, display]);  //displayを追加していく
    };

    useEffect(()=>{
        if (isRunning){
            displayTime();
        }else{
            clearTimeout(timeoutID.current);
        }
        return()=>clearTimeout(timeoutID.currentTime);
    },[isRunning, displayTime]);



    return(
        <div>
            <h1>ストップウォッチ</h1>
            <div id='container'>
                <div id='time'>{display}</div>
                <div id='buttons'>
                    <button id='start' onClick={start} disabled={isRunning}>スタート</button>
                    <button id='stop' onClick={stop} disabled={!isRunning}>ストップ</button>
                    <button id='reset' onClick={reset} disabled={isRunning || (!isRunning && stopTime === 0)}>リセット</button>
                    <button id='lap' onClick={lap} disabled={!isRunning}>ラップ</button>
                </div>
            </div>
            <div>
                <h2>ラップ</h2>
                <ul className='lap-list'>
                    {laps.map((lap, index)=>(
                        <li className='laps' key={index}>{lap}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default StopwatchForm;