"use client";
import React, { useEffect, useRef, useState } from "react";

const Input = ({ label, type, val, setVal }) => {
  const [show, setShow] = useState(false);
  const [isBorderActive, setIsBorderActive] = useState(false);
  const borderActiveRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleBorderActive, true);
  }, []);

  function handleBorderActive(e) {
    if (borderActiveRef.current.contains(e.target)) {
      setIsBorderActive(true);
    } else {
      setIsBorderActive(false);
    }
  }
  function showPasswordHandler() {
    setShow(!show);
  }

  console.log(isBorderActive, "bac");
  return (
    <div className="flex flex-col justify-start gap-2">
      <label htmlFor={label} className="text-sm font-semibold">
        {label}
      </label>
      {type === "password" ? (
        <div
          className={`w-[456px] flex items-center gap-2 border  rounded-md overflow-hidden ${
            isBorderActive ? "border-black" : "border-slate-300"
          }`}
          onClick={handleBorderActive}
        >
          <input
            value={val}
            ref={borderActiveRef}
            onChange={(e) => setVal(e.target.value)}
            type={!show ? type : "text"}
            placeholder="Enter"
            id={label}
            className="h-[48px] w-[400px] pl-2 outline-none border-none text-sm overflow-hidden focus:outline-none focus-border-none "
          />
          <span
            className="underline cursor-pointer"
            onClick={showPasswordHandler}
          >
            show
          </span>
        </div>
      ) : (
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          type={type}
          placeholder="Enter"
          id={label}
          className="h-[48px] w-[456px] pl-2 outline-none border border-slate-300 rounded-md text-sm  focus:outline-none focus:border-black "
        />
      )}
    </div>
  );
};

export default Input;
