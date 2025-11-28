import React from "react";
import { HiOutlineSun } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { RiSettings4Line } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center py-6 select-none">

      <div className="
        w-[92%] max-w-[1250px] h-[75px]
        bg-[#14161c] rounded-2xl border border-white/10
        backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.25)]
        flex items-center justify-between px-10
      ">
        
        <h2 className="font-logo text-[36px] tracking-[4px] text-white">
  GenUI
</h2>
        <div className="flex items-center gap-4">
          <button className="nav-icon">
            <HiOutlineSun className="text-[20px]" />
          </button>

          <button className="nav-icon">
            <FaRegUser className="text-[18px]" />
          </button>

          <button className="nav-icon">
            <RiSettings4Line className="text-[20px]" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
