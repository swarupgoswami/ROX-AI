import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import uploadImage from '../../utils/uploadImage'

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");

  const [error, setError] = useState(null);

  const {updateUser}=useContext(UserContext);
  

  const navigate = useNavigate();

  // handle signup form submit
  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullname) {
      setError("please enter full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("please enter a valid email address");
      return;
    }

    if (!password || password.length < 8) {
      setError("password must be at least 8 character long");
      return;
    }

    setError("");

    // signup api call

    try {

      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || ""
      }


      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:fullname,
        email,
        password,
        profileImageUrl
      });

      const {token}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong please try again");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center ">
      <h3 className="text-lg font-semibold text-black">create an account </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        join us today by writing your details below
      </p>

      <form action="" onSubmit={handleSignup}>
        {/* profile photo section */}

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullname}
            onChange={({ target }) => setFullName(target.value)}
            label="full name"
            placeholder="john"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="email address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="password"
            placeholder="min 8 character"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          already an account ?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
