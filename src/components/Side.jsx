"use client";

import Link from "next/link";
import { useState } from "react";

const Side = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage sidebar open/close state
  const [isGenresOpen, setIsGenresOpen] = useState(false); // Manage genres dropdown state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleGenres = () => {
    setIsGenresOpen(!isGenresOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger/Close Button - Visible on both mobile and desktop */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-black p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          // Close (X) Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Hamburger Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Sidebar - Toggleable on both mobile and desktop */}
      <div
        className={`bg-[#1c1c1e] w-[260px] h-full z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed overflow-hidden flex flex-col items-start p-4 mt-[30px]`}
      >
        {/* Menu Items */}
        <div className="w-full">
          <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">
            New Anime
          </div>
          <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">
            Popular
          </div>
          <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">
            Movies
          </div>
          <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">
            Language
          </div>

          {/* Genres Dropdown */}
          <div
            className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer flex justify-between items-center"
            onClick={toggleGenres}
          >
            Genres
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-5 h-5 transition-transform ${
                isGenresOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isGenresOpen && (
            <div className="ml-4 text-[14px] text-[#ffffff] p-2">
              <div className="p-2 hover:bg-black hover:rounded-[8px] cursor-pointer">
                Action
              </div>
              <div className="p-2 hover:bg-black hover:rounded-[8px] cursor-pointer">
                Adventure
              </div>
              <div className="p-2 hover:bg-black hover:rounded-[8px] cursor-pointer">
                Comedy
              </div>
            </div>
          )}

          <div className="border-t border-gray-600 mt-4"></div>
            <Link href="/">
          <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">
            Home
          </div>
            </Link>
            <Link href="/about">
          <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">
            About
          </div>
            </Link>
            <Link href="/contact">
          <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">
            Contact
          </div>
            </Link>
            <Link href="/dmca">
          <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">
            
            DMCA
          </div>
            </Link>
        </div>
      </div>

      {/* Background Overlay - Only visible when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Side;
