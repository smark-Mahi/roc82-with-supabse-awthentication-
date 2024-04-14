"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Reusablecomponents/Button";
import { getLoggername } from "../helpers/token";
import { useRouter } from "next/navigation";

const OTP = () => {
  const username = getLoggername();
  const router = useRouter();
  const length = 8;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  function verifyOtpHandler() {
    router.push("/");
  }

  function handleChange(index, e) {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];

    //allow only 1 input by taking last value
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //move to next input if current input feild is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    const combineOtp = newOtp.join("");
  }

  function handleKeyDown(index, e) {
    //move to previous input if current input feild got cancelled
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  }
  return (
    <div className=" h-screen flex justify-center pt-24">
      <div className="w-[576px] h-[453px] flex flex-col  items-center gap-6 border border-solid border-[#c7c7c7] rounded-xl py-8">
        <h1 className="text-2xl font-bold ">Verify your email</h1>
        <div className="text-center text-sm">
          <p className="text-center  tracking-wider  font-light">
            Enter the 8 digit code you have received on{" "}
          </p>
          <p className="font-semibold ">
            {username.substring(0, 3)}***@gmail.com
          </p>
        </div>
        <div className="mt-6 flex flex-col ">
          <p>code</p>
          <div className="flex mb-12">
            {otp.map((value, i) => (
              <input
                ref={(input) => (inputRefs.current[i] = input)}
                key={i}
                type="text"
                value={value}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-[46px] h-[48px] m-2 text-center text-sm bg-white text-black rounded-md outline-none border border-solid border-[#aaaaaa] focus:ring-2 focus:ring-black"
              />
            ))}
          </div>
          <Button type="VERIFy" onClick={verifyOtpHandler} />
        </div>
      </div>
    </div>
  );
};

export default OTP;
