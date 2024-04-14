import React from "react";

const Button = ({ type, onClick }) => {
  return (
    <div>
      <button
        className="bg-black h-[56px] w-full text-white rounded-md border-none outline-none"
        onClick={onClick}
      >
        {type}
      </button>
    </div>
  );
};

export default Button;
