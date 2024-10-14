import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm(){
    // usestateについて
    // [状態変数、値を更新するための関数]=usestate(初期値)
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const navigate = useNavigate();//ページ遷移用変数

    // csrftokenを取得するための関数
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
    
    // フォームの送信処理
    const handleSubmit=async(e)=>{
        e.preventDefault(); //ページのリロード防止
        console.log('Sending request with:', { email, password });
        try{
            const requestData = JSON.stringify({ email, password });//JSON形式にしてリクエストデータに格納
            console.log('Request data:', requestData);
            const csrfToken = getCookie('csrftoken')  //トークンを取得してリクエストのヘッダーに設定
            console.log('csrfToken',csrfToken)
            // fetchAPIを利用してサーバーにポストリクエストを送信
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
        

            // レスポンスを確認し、エラーハンドリング
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
            navigate('/stopwatch')
        }catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };
        
    // HTMLについて
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
