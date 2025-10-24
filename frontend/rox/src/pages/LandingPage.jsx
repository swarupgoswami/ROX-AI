import React, { useContext, useState } from "react";

import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import {LuSparkle} from 'react-icons/lu'
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {

  const {user}=useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if(!user){
      setOpenAuthModal(true);
    }else{
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#fffcef] ">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">
              your interview prep partner
            </div>

            {/* checking whther user data is there in the userContext filke in user usestate hook */}
            {user ? (
              <ProfileInfoCard/>
              ):(<button
              className="bg-linear-to-r from-[#ff9324] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer "
              onClick={() => {
                setOpenAuthModal(true);
              }}
            >
              Login/signup
            </button>)}
          </header>

          {/* hero section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-10 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkle/>
                  AI POWERED INTERVIEW PREP
                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace interview with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI POWERED
                </span>
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                get role specific questions, expanded answers when you need them
                ,dive deeper into concepts , and organize your way .preparation
                to mastery - your ultimate interview toolkit is here
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer hover:text-black"
                onClick={() => {
                  handleCTA();
                }}
              >
                get started
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="w-full min-h-full relative z-10 mb-56">
        <div className="">
          <section className="flex items-center justify-center mt-36">
            <img src={HERO_IMG} alt="hero image" className="w-[80vw] rounded-lg" />

          </section>
        </div>
      </div>


      <div className="w-full min-h-full bg-[#fffcef] mt-10">
        <div className="container mx-auto px-4 pt-6 pb-20">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center mb-12">
               Features that make you shine
            </h2>
            <div className="flex flex-col items-center gap-8">

              {/* 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0,3).map((feature)=>(
                  <div className="bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100 " key={feature.id}>
                    <h3 className="text-base font-semibold mb-3">{feature.title}

                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>



              {/* rest 2 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {APP_FEATURES.slice(3).map((feature)=>(
                  <div className="bg-[#fffef8] p-6 rounded-xl hover:shadow-lg shadow-amber-100 transition border border-amber-100  " key={feature.id}>
                    <h3 className="text-base font-semibold mb-3 ">{feature.title}</h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>


      <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5  ">
        made with ❤️ by rox
      </div>


      <Modal isOpen={openAuthModal}
      onClose={()=>{
        setOpenAuthModal(false);
        setCurrentPage("login");
      }}
      hideHeader
      >
        <div className="">
          {currentPage ==='login' && (
            <Login setCurrentPage={setCurrentPage}/>
          )}

          {
            currentPage ==='signup' && (
              <SignUp setCurrentPage={setCurrentPage}/>
            )
          }
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
