import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input"
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext';

const Login = ({setCurrentPage}) => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(null);

    const {updateUser}=useContext(UserContext);

    const navigate=useNavigate();


    // submit handler
    const handleLogin=async(e)=>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("please enter a valid email address");
            return;
        }

        if(!password){
            setError("please enter your password");
            return;

        }
        setError('');


        // login api call 

        try {
            const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
                email,
                password,
            });

            const {token}=response.data;
            if(token){
                localStorage.setItem("token",token);
                updateUser(response.data);
                navigate('/dashboard');
            }
        } catch (error) {
            if(error.response && error.data.message){
                setError(error.response.data.message);
            }else{
                setError("something went wrong please try again");
                console.log(error);
            }
        }
    }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify center'>
        <h3 className='text-lg font-semibold text-black'>
            Welcome back
        </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            plaese enter you details to login
        </p>


        <form action="" onSubmit={handleLogin}>
            <Input type="text" value={email} onChange={({target})=> setEmail(target.value)} 
            label="email address"
            placeholder='john@example.com'
            />


            <Input type="password"
            value={password} 
            onChange={({target})=>setPassword(target.value)}
            label="passowrd"
            placeholder='min 8 chnaracter'
            />


            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit' className='btn-primary'>
                LOGIN 
            </button>


            <p className='text-[13px] text-slate-800 mt-3'>
                DONT HAVE AN  ACCOUNT{" "}
                <button className='font-medium text-primary underline cursor-pointer'
                onClick={()=>{
                    setCurrentPage("signup");
                }}>sign up</button> 
            </p>
        </form>
      
    </div>
  )
}

export default Login
