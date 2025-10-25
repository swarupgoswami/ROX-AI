import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

const CreateSessionForm = () => {

  const [formData,setFormData]=useState({
    role:"",
    experince:"",
    topicsToFocus:"",
    description:""
  });
  const [isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);

  const navigate=useNavigate();

  const handleChnage=(key,value)=>{
    setFormData((prevData)=>({
      ...prevData,
      [key]: value,
    }));
  }

  const handleCreateSession=async(e)=>{
    e.preventDefault();


    const {role,experince,topicsToFocus}=formData;

    if(!role || !experince || !topicsToFocus){
      setError("please fill all the required fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse=await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTION,
        {
          role,
          experince,
          topicsToFocus,
          numberOfQuestions:10
        }
      );

      const generatedQuestions=aiResponse.data;

      console.log("question are",generatedQuestions);


      const response=await axiosInstance.post(API_PATHS.SESSION.CREATE,{
        ...formData,
        questions:generatedQuestions,
      });
      if(response.data?.session?._id){
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("something went wrong. plaese try again later");
      }
      
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>
        start  a   new Interview journey
      </h3>
      <p className='text-xs text-slate-70 mt-[5px] mb-3'>
        Fill out  a few quick details and unlock yourpersonalized set of interview questions!
      </p>

      <form
      onSubmit={handleCreateSession}
      className='flex flex-col gap-3'
       action="">

        <Input
        value={formData.role}
        onChange={({target})=> handleChnage("role",target.value)}
        label="Target role"
        placeholder="(e.g frontend dev , backend dev ,  etc)"
        type="text"
        />


        <Input
        value={formData.experince}
        onChange={({target})=> handleChnage("experince",target.value)}
        label="years of experince"
        placeholder="(e.g 1 year , 3 year or more }"
        type="number"
        />

        <Input
        value={formData.topicsToFocus}
        onChange={({target})=> handleChnage("topicsToFocus",target.value)}
        label="topictofocus"
        placeholder="(coma seperated eg react , expree, node .. etc)"
        type="text"
        />


        <Input
        value={formData.description}
        onChange={({target})=> handleChnage("description",target.value)}
        label="Description "
        placeholder="(Any specific goals or notes for this session"
        type="text"
        />


        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button className='btn-primary w-full mt-2'
        type='submit'
        disabled={isLoading}>

          {isLoading && <SpinnerLoader/>}Create Session

        </button>

      </form>
      
    </div>
  )
}

export default CreateSessionForm
