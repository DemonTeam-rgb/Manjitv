'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Side from '@/components/Side';
import Link from 'next/link';

export default function SearchCompnent() {
  const router = useRouter();
  const [search, setSearch] = useState();
  const [alldata, setAllData] = useState();
  const [loading, setLoading] = useState(false);

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
    <>
      <div className="w-full h-[90px]  text-white overflow-hidden">
  {/* Logo and Search Bar */}
  <div className="flex justify-between items-center w-full h-[60px] md:px-[5rem] py-2 absolute">
    {/* Logo */}
    <div>
      <Link href="/">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto ml-[49px]" /> {/* Adjusted height */}
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
            <path
              d="M460.355 421.59l-106.51-106.512c20.04-27.553 31.884-61.437 31.884-98.037C385.73 124.935 310.792 50 218.685 50c-92.106 0-167.04 74.934-167.04 167.04 0 92.107 74.935 167.042 167.04 167.042 34.912 0 67.352-10.773 94.184-29.158L419.945 462l40.41-40.41zM100.63 217.04c0-65.095 52.96-118.055 118.056-118.055 65.098 0 118.057 52.96 118.057 118.056 0 65.097-52.96 118.057-118.057 118.057-65.096 0-118.055-52.96-118.055-118.056z"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>

  {/* Sidebar */}
  <Side />

  {/* Search Results */}
  <div className="flex flex-row w-full h-full overflow-hidden">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={!loading ? `p-4 h-[91vh] overflow-y-scroll` : `hidden absolute`}
    >
      {search && (
        <>
          <div className="w-full md:w-[1000px] h-[600px] overflow-y-scroll bg-[#474747] absolute z-50 p-4">
            <div className="flex flex-col p-2 space-y-2">
              Auto complete
              {search?.autocomplete?.map((r, index) => (
                <div key={index} className="flex flex-col bg-green-500/30 px-4 py-1">
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col p-2 space-y-2">
              Series
              {search?.result?.series?.map((r) => (
                <div
                  key={r?.id}
                  onClick={() =>
                    router.push(`/details?q=${r?.link ? r.link.split(".co/")[1].split("/?h")[0] : ""}`)
                  }
                  className="flex flex-col bg-green-500/30 px-4 py-1 cursor-pointer"
                >
                  <span>{r.title}</span>
                  <span>{r.resume.split('<')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  </div>
</div>

    </>
  );
}