import React, { useCallback, useEffect, useRef, useState } from 'react';
import './StopwatchForm.css';


function StopwatchForm(){
    
    //変数定義
    // usestateについて
    // [状態変数、値を更新するための関数]=usestate(初期値)
    const [startTime, setStartTime]=useState(0);
    const [stopTime, setStopTime]=useState(0);
    const [isRunning, setIsRunning]=useState(false);
    const [display, setDisplay]=useState('00:00.000');
    const [laps, setLaps]=useState([])
    const timeoutID=useRef(null)  //タイマー制御、クリアが可能に
    
    //時間表示のフォーマット
    const formatTime=(time)=>{
        const m=String(time.getUTCMinutes()).padStart(2, '0');
        const s=String(time.getUTCSeconds()).padStart(2, '0');
        const ms=String(time.getUTCMilliseconds()).padStart(3, '0');
        return `${m}:${s}:${ms}`;
    };

    const displayTime=useCallback(()=>{
        const currentTime=new Date(Date.now()-startTime+stopTime);
        setDisplay(formatTime(currentTime));
        //setTimeoutは、第二引数に指定した時間経過後に第一引数の関数を呼び出す関数で、戻り値はtimeoutID
        timeoutID.current=setTimeout(displayTime, 10);  
    },[startTime,stopTime]);

    const start=()=>{
        setStartTime(Date.now());
        setIsRunning(true);
    };
    const stop=()=>{
        clearTimeout(timeoutID.current);  //タイマークリア
        setStopTime((prev)=>prev+(Date.now()-startTime)); //変数の中に変数を入れることができる
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
        setLaps([...laps, display]);  //displayを追加
    };

    useEffect(()=>{
        if (isRunning){
            displayTime(); //動いている場合時間更新
        }else{
            clearTimeout(timeoutID.current); //止まっているならクリア
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