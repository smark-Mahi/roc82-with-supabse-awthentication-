"use client";
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useGlobalContext } from "../Hooks/globalStates";

const Navbar = () => {
  const { username } = useGlobalContext();

  console.log(username);
  return (
    <nav className="w-screen h-24 bg-white flex flex-col">
      <div className="flex justify-end ">
        <div className="flex gap-6 mr-10 text-xs mt-2">
          <span>Help</span>
          <span>Orders&Return</span>
          {username && <span>Hi,{username}</span>}
        </div>
      </div>
      <div className="flex justify-between items-center py-4 mx-8">
        <div>
          <h1 className="text-2xl font-bold cursor-pointer">
            <Link href="/">ECOMMERCE</Link>
          </h1>
        </div>
        <div>
          <ul className="flex font-bold text-sm gap-6">
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New Stock</li>
            <li>Trending</li>
          </ul>
        </div>
        <div className="flex gap-6 items-center mr-4">
          <CiSearch className="text-xl" />
          <FiShoppingCart className="text-md" />
        </div>
      </div>
      <header className="h-fit flex justify-center py-2 bg-[#F4F4F4]">
        <div className="flex gap-4 items-center text-xs font-semibold">
          <span>&lsaquo;</span>
          <span>Get 10% off on bussiness sign up</span>
          <span>&rsaquo;</span>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
