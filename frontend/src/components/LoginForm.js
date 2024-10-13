import React, {useState} from 'react';
import './LoginForm.css';

function LoginForm(){
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const getCookie = (name) => {
        let cookieValue = null;
        console.log('document.cookie',  document.cookie.length)
        console.log('undefined', undefined)
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };    
    

    const handleSubmit=async(e)=>{
        e.preventDefault(); 
        console.log('Sending request with:', { email, password });
        try{
            const requestData = JSON.stringify({ email, password });
            console.log('Request data:', requestData);
            const csrfToken = getCookie('csrftoken')
            console.log('csrfToken',csrfToken)
            const response=await fetch('/watchapp/login/',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'X-CSRF-TOKEN': `${csrfToken}`,
                    'X-CSRFTOKEN': `${csrfToken}`,
                },
                body: requestData,
                credentials: 'include',
            });
            console.log('Response status:', response.status);
            response.headers.forEach((value, name) => {
                console.log(`${name}: ${value}`);
            });
            console.log('Response headers:', response.headers);
        
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
            // const data = await response.json().catch(() => {
            await response.json().catch(() => {   
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
