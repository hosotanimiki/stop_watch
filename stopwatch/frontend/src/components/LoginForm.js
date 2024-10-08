import React, {useState} from 'react';
import './LoginForm.css';

function LoginForm(){
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch('/watchapp/login',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({email,password}),
            
        });
        const data =await response.json();
        if (response.status===200){
            alert('ログイン成功');
        }else{
            alert(data.message);
        }
    };

    return(
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='login-input'
                    value={email}
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder='email'                
                />
                <input
                    type='password'
                    className='login-input'
                    value={password}
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder='Password'                
                />
                <button type='submit' className='login-button'>Login</button>
            </form>
        </div>
    );

}
export default LoginForm;