"use client";

import Link from "next/link";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";


const Side = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage sidebar open/close state
  const [isGenresOpen, setIsGenresOpen] = useState(false); // Manage genres dropdown state
  const router = useRouter();
  const [search, setSearch] = useState();
  const [alldata, setAllData] = useState();
  const [loading, setLoading] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleGenres = () => {
    setIsGenresOpen(!isGenresOpen);
  };

  async function get_search_data(value) {
    try {
      setSearch(null);
      if (value.length > 3) {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: value }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setSearch(data);
      } else {
        setSearch(null);
      }
    } catch (error) {
      console.error('Error fetching search data:', error);
      setSearch([]); // Optionally set an empty array on error
    }
  }

  const get_all_data = async () => {
    setAllData();
    setLoading(true);
    const response = await fetch('/api/home');
    const data = await response.json();
    setLoading(false);
    setAllData(data);
  };

  useEffect(() => {
    get_all_data();
  }, []);


  return (
    <div className="flex">
      {/* Hamburger/Close Button */}
      <button
        className="mt-4 ml-5 top-10 left-4 z-50 text-white bg-black p-2 rounded-md h-fit"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* Top Bar with Logo and Search */}
      <div className="flex justify-between items-center w-full h-[60px] md:px-[5rem] py-2 absolute bg-black/60 backdrop-blur-md z-20">
        <div>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto ml-[49px]" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mx-auto h-full rounded-[8px]">
          <div className="border border-[#EFEEEF] h-full w-[275px] md:w-[749px] rounded-[8px] flex flex-row bg-[#1c1c1e]">
            <input
              type="text"
              onChange={(e) => get_search_data(e.target.value)}
              className="text-[12px] text-[#fff] bg-transparent outline-none w-full h-full px-6 rounded-[8px]"
              placeholder="Search here..."
            />
            <span className="h-full flex justify-center items-center px-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
                <path d="M460.355 421.59l-106.51-106.512c20.04-27.553 31.884-61.437 31.884-98.037C385.73 124.935 310.792 50 218.685 50c-92.106 0-167.04 74.934-167.04 167.04 0 92.107 74.935 167.042 167.04 167.042 34.912 0 67.352-10.773 94.184-29.158L419.945 462l40.41-40.41zM100.63 217.04c0-65.095 52.96-118.055 118.056-118.055 65.098 0 118.057 52.96 118.057 118.056 0 65.097-52.96 118.057-118.057 118.057-65.096 0-118.055-52.96-118.055-118.056z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-[#1c1c1e] w-[260px] h-full z-40 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed flex flex-col items-start p-4 mt-[30px]`}
      >
        <div className="w-full">
          {/* Sidebar Links */}
          <Link href="/" onClick={() => {
            router.push("/")
          }}>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`w-5 h-5 transition-transform ${isGenresOpen ? "rotate-180" : "rotate-0"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {isGenresOpen && (
              <div className="ml-4 text-[14px] text-[#ffffff] p-2">
                <div className="p-2 hover:bg-black hover:rounded-[8px] cursor-pointer">Action</div>
                <div className="p-2 hover:bg-black hover:rounded-[8px] cursor-pointer">Adventure</div>
                <div className="p-2 hover:bg-black hover:rounded-[8px] cursor-pointer">Comedy</div>
              </div>
            )}
          </Link>

          {/* Additional Links */}
          <div className="border-t border-gray-600 mt-4"></div>
          <Link href="/">
            <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">Home</div>
          </Link>
          <Link href="/about">
            <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">About</div>
          </Link>
          <Link href="/contact">
            <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">Contact</div>
          </Link>
          <Link href="/dmca">
            <div className="text-[14px] text-[#ffffff] p-3 transition-all hover:bg-black hover:rounded-[8px] cursor-pointer">DMCA</div>
          </Link>
        </div>
      </div>

      {/* Overlay when Sidebar is Open */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleSidebar}></div>}

      <div className="flex flex-row w-full h-full overflow-hidden absolute z-10"> {/* Added 'relative' for proper absolute positioning */}
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className={!loading ? `p-4 h-[91vh] overflow-y-scroll` : `hidden absolute`}
  >
    {search && (
      <div className="absolute z-50 inset-0 overflow-y-auto bg-[#474747] p-4 flex flex-col space-y-4"> {/* Changed to 'inset-0' for full coverage and adjusted spacing */}
        <div className="flex flex-col">
          <h2 className="text-white font-semibold">Auto Complete</h2>
          {search?.autocomplete?.map((r, index) => (
            <div key={index} className="flex flex-col bg-green-500/30 rounded p-2">
              <span className="text-gray-800">{r}</span> {/* Improved text visibility */}
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <h2 className="text-white font-semibold">Series</h2>
          {search?.result?.series?.map((r) => (
            <div
              key={r?.id}
              onClick={() =>
                router.push(`/details?q=${r?.link ? r.link.split(".co/")[1].split("/?h")[0] : ""}`)
              }
              className="flex flex-col bg-green-500/30 rounded p-2 cursor-pointer hover:bg-green-500" // Added hover effect and rounded corners
            >
              <span className="text-gray-800 font-medium">{r.title}</span> {/* Improved text visibility */}
              <span className="text-gray-600">{r.resume.split('<')[0]}</span> {/* Improved text visibility */}
            </div>
          ))}
        </div>
      </div>
    )}
  </motion.div>
</div>

    </div>
  );

};

export default Side;
