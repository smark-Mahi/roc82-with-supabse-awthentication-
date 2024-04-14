"use client";
import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
const Categories = ({ category, setData, data }) => {
  const [selected, setSelected] = useState(false);
  function selectHandler(category) {
    setSelected(!selected);
    let key;
    data.filter((item, i) => {
      if (item.id === category.id) {
        key = i;
      }
    });
    data[key] = {
      id: category.id,
      name: category.name,
      isSelected: !category.isSelected,
    };
    const updatedData = [...data];
    console.log(data[key], "updated");
    setData(updatedData);
  }

  useEffect(() => {
    const isServer = typeof window === "undefined";
    if (!isServer) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  return (
    <li className="flex items-center gap-2">
      <span
        onClick={() => selectHandler(category)}
        className={`w-4 h-4 rounded-sm cursor-pointer flex items-center justify-center  ${
          category.isSelected ? "bg-black" : "bg-[rgb(204,204,204)]"
        }`}
      >
        {category.isSelected ? (
          <IoCheckmark className="text-white text-sm" />
        ) : (
          ""
        )}
      </span>{" "}
      <span>{category.name}</span>
    </li>
  );
};

export default Categories;
