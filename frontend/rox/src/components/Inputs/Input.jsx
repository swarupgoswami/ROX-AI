import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full ">
      {label && (
        <label className="block font-bold mb-1 text-[13px] text-slate-800">
          {label}
        </label>
      )}

      <div className="flex items-center border  rounded-md px-2 py-1">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-slate-800"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={20}
              className="text-primary cursor-pointer"
              onClick={()=> toggleShowPassword()}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 cursor-pointer"
              onClick={()=>toggleShowPassword()}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;

