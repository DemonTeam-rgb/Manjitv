'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function DetailsPart({ id }) {
    const router = useRouter();
    const [alldata, setAllData] = useState();
    const [epidata, setEpiData] = useState();
    const [loading, setLoading] = useState(false);
    const [visibleEpisodes, setVisibleEpisodes] = useState(10);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const get_all_data = async () => {
        setLoading(true);
        const response = await fetch('/api/details', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "query": id }),
        });
        const data = await response.json();
        setLoading(false);
        setAllData(data);
    };

    const get_epi_data = async (season, post) => {
        setLoading(true);
        const response = await fetch('/api/epiData', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "season": season, "post": post }),
        });
        const data = await response.json();
        setLoading(false);
        setEpiData(data);
    };

    const loadMoreEpisodes = () => {
        setVisibleEpisodes(prev => prev + 10);
    };

    useEffect(() => {
        get_all_data();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 w-full h-screen flex flex-col">
                {loading && (
                    <div className="p-4 h-[91vh] w-full flex justify-center items-center">
                        <div>
                            <img
                                draggable="false"
                                className="w-[150px] sm:w-[200px] md:w-[250px]"
                                src="https://media1.tenor.com/m/khzZ7-YSJW4AAAAC/cargando.gif"
                                alt="Loading"
                            />
                        </div>
                    </div>
                )}

                <div className={!loading ? `p-4 h-auto` : `hidden`}>
                    {alldata && (
                        <div className="bg-black text-white md:h-auto">
                            {/* Background and Poster */}
                            <div className="w-full h-[300px] flex">
                                <div
                                    className="w-full h-[400px] sm:h-[300px] bg-cover bg-center absolute"
                                    style={{
                                        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${alldata?.imdbData[0]?.backdrop_path})`,
                                        filter: 'blur(10px)',
                                    }}
                                ></div>

                                <div className="w-full z-10 md:p-6 flex flex-col sm:flex-row items-center sm:items-start">
                                    <div className="flex-1 flex justify-center items-center py-4 sm:py-0 mx-auto sm:mx-0">
                                        <img
                                            className="w-[244px] h-[400px] sm:w-[200px] sm:h-[300px] rounded-[15px]"
                                            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${alldata?.imdbData[0]?.poster_path}`}
                                            alt="Movie Poster"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Movie Info */}
                            <div className="bg-black mt-[100px] md:mt-[80px] text-white p-5 rounded-lg max-w-xs md:max-w-md lg:max-w-lg">
                                <h2 className="text-lg font-bold mb-3">{alldata?.imdbData[0]?.name}</h2>
                                <div className="flex items-center mb-4">
                                    <img
                                        src={
                                            alldata?.imdbData[0]?.vote_average >= 9
                                                ? "https://cdn.hugeicons.com/icons/star-solid-rounded.svg"
                                                : alldata?.imdbData[0]?.vote_average >= 5
                                                    ? "https://cdn.hugeicons.com/icons/star-bulk-rounded.svg"
                                                    : "https://cdn.hugeicons.com/icons/star-twotone-rounded.svg"
                                        }
                                        alt="Rating Star"
                                        className="w-6 h-6 mr-2"
                                    />
                                    <div className="text-sm">
                                        {alldata?.imdbData[0]?.vote_average} ({alldata?.imdbData[0]?.vote_count})
                                    </div>
                                </div>
                                <div className="text-sm mb-4">{alldata?.imdbData[0]?.overview}</div>
                                <div className="text-yellow-500 text-xs cursor-pointer">MORE DETAILS</div>
                            </div>

                            {/* Sessions and Episodes */}
                            <div className="pt-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 items-center">
                                {alldata && (
                                    <div className="text-[1.25rem] text-[#FFFF] font-bold fam">Episodes</div>
                                )}

                                {/* Sessions Dropdown */}
                                <div
                                    className="text-[#FFFF] h-[40px] flex items-center justify-center transition-all cursor-pointer hover:text-[#FFFF] rounded-full px-4 py-2"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className="mx-2 h-[25px] border rounded-full">Sessions</span>

                                    <div
                                        className={isDropdownOpen
                                            ? `flex flex-row justify-start space-x-3 items-center h-full genNav w-auto max-w-[480px] overflow-x-auto transition-all duration-500 ease-in-out`
                                            : `flex flex-row justify-start space-x-3 items-center h-full genNav w-0 transition-all duration-500 ease-in-out overflow-hidden`}
                                    >
                                        {alldata && alldata?.numberOfSessions?.map(r => (
                                            <div
                                                onClick={() => { get_epi_data(r.dataSeason, r.dataPost); setIsDropdownOpen(false); }}
                                                key={r.dataSeason}
                                                className="text-[#FFFF] flex-row rounded-md w-[40px] h-[25px] flex justify-center items-center transition-all cursor-pointer bg-[#53535342] hover:bg-[#5353537a]"
                                            >
                                                {r.dataSeason}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Episodes Section */}
                            <div className="text-white mt-8">
                                <div className="text-lg font-bold mb-5">Episodes</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {(epidata || alldata?.sessionEpisodesArray)?.slice(0, visibleEpisodes).map((item) => (
                                        <div
                                            onClick={() =>
                                                router.push(`/watch?q=${item?.href ? item.href.split('.co/')[1] : ''}`)
                                            }
                                            key={item.id}
                                            className="flex items-center cursor-pointer"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={`${item.postThumbnail.split('p/w')[0]}p/w500/${item.postThumbnail.split('p/w')[1].split('/')[1]}`}
                                                    alt={item.h2}
                                                    className="w-44 h-24 object-cover rounded-md"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <img
                                                        src="https://cdn.hugeicons.com/icons/play-circle-bulk-rounded.svg"
                                                        alt="Play button"
                                                        className="w-8 h-8"
                                                    />
                                                </div>
                                                <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                                                    {item.time}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-semibold text-sm">{item.h2 || "Tower of God"}</div>
                                                <div className="text-xs text-gray-400">epi: {item.numEpi}</div>
                                                <div className="text-xs text-gray-400">DUBBED</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Load More Button */}
                                {visibleEpisodes < (epidata || alldata?.sessionEpisodesArray)?.length && (
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            onClick={loadMoreEpisodes}
                                            className="mt-2.5 p-2.5 text-white bg-[#24252A] font-semibold text-center text-base"
                                        >
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
