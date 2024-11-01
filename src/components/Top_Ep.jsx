'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


const Top_Ep = () => {
    const router = useRouter();

    const [search, setSearch] = useState();
    const [alldata, setAllData] = useState();
    const [loading, setLoading] = useState(false);

    async function get_search_data(value) {
        try {
            setSearch(null);

            if (value.length > 3) {
                const response = await fetch('/api/search', {
                    method: "POST",
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
            setSearch([]);
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
        <div className="bg-black text-[#FFFFFF] p-4 md:p-6 lg:p-8">

            <div className="text-[1.25rem] font-bold fam p-4">
                {alldata && <>Top Picks for You</>}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                {alldata &&
                    alldata?.latestEpisodeArry?.map((item) => (
                        <div
                            className="flex flex-col items-center text-center truncate"
                            key={item.id}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: -100 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                onClick={() =>
                                    router.push(`/watch?q=${item?.href ? item.href.split(".co/")[1] : ""}`)
                                }
                                className="relative rounded-[8px] group overflow-hidden flex justify-center items-start"
                            >
                                <img
                                    className={
                                        item?.imgSrc && item.imgSrc.includes("noimg-episode.png")
                                            ? "rounded-[8px] group-hover:opacity-90 ease-in bg-cover bg-center h-[120px] md:h-[150px] lg:h-[180px]"
                                            : "group-hover:scale-110 rounded-[8px] group-hover:opacity-90 ease-in bg-cover bg-center transition-all duration-300"
                                    }
                                    src={
                                        item?.imgSrc && item.imgSrc.includes("noimg-episode.png")
                                            ? "https://i.pinimg.com/736x/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.jpg"
                                            : `${item.imgSrc.split("p/w")[0]}p/w500/${item.imgSrc.split("p/w")[1]?.split("/")[1]}`
                                    }
                                    alt={item.title}
                                    style={{ transitionDuration: "0.5s" }}
                                />

                                <div className="bg-[#2c2c2c31] justify-center items-center hover:cursor-pointer absolute top-0 hidden group-hover:flex rounded-[8px] w-full h-full transition-all duration-500 delay-200 ease-in-out">
                                    <img className="w-[40px] md:w-[50px]" src="https://cdn.hugeicons.com/icons/play-circle-bulk-rounded.svg" alt="Play button" />
                                </div>
                            </motion.div>

                            <div className="flex flex-col items-center truncate px-2 py-2">
                                <div className="truncate text-[#FFFFFF] font-[500] text-sm md:text-base">{item.title}</div>
                                <div className="truncate text-[#b5b5b5] text-[10px] md:text-xs">epi: {item.numEpi}</div>
                                <div className="truncate text-[#b5b5b5] text-[10px] md:text-xs">time: {item.time}</div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Top_Ep;
