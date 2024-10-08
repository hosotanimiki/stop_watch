import React, {useState} from 'react';
import './LoginForm.css';

function LoginForm(){
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch('/watchapp/login/',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({email,password}),
                
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response text:', errorText);
                try {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.message || 'ログインに失敗しました');
                } catch (e) {
                    throw new Error('サーバーから不正なレスポンスが返されました: ' + errorText);
                }
            }
            const data = await response.json().catch(() => {
                throw new Error('サーバーから不正なレスポンスが返されました');
            });
            alert('ログイン成功');
        }catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };


    return(
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='login-input'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='email'                
                />
                <input
                    type='password'
                    className='login-input'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='Password'                
                />
                <button type='submit' className='login-button'>Login</button>
            </form>
        </div>
    );

}
export default LoginForm;
