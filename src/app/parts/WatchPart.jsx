'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function WatchPart({ id }) {
    const router = useRouter();
    const [alldata, setAllData] = useState();
    const [loading, setLoading] = useState(false);
    const [frame, setFrame] = useState();
    const [page, setPage] = useState(1); // Track the current page
    const [hasMore, setHasMore] = useState(true); // Track if more episodes are available

    const get_all_data = async () => {
        setAllData(null);
        setLoading(true);
        const response = await fetch('/api/watch', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "query": id, "page": page }), // Pass the page number
        });
        const data = await response.json();
        setLoading(false);
        if (data.sessionEpisodesArray) {
            setAllData(prevData => ({
                ...data,
                sessionEpisodesArray: prevData ? [...prevData.sessionEpisodesArray, ...data.sessionEpisodesArray] : data.sessionEpisodesArray,
            }));
            setHasMore(data.sessionEpisodesArray.length > 0); // Check if there are more episodes
        }
    };

    useEffect(() => {
        get_all_data();
    }, [id, page]); // Fetch data whenever id or page changes

    const loadMoreEpisodes = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1); // Load next page
        }
    };

    return (
        <><div className="w-full h-full p-4 bg-black text-white">
            {/* Loader */}
            {loading ? (
                <div className="w-full h-[91vh] flex justify-center items-center">
                    <img
                        className="w-[150px]"
                        src="https://media1.tenor.com/m/khzZ7-YSJW4AAAAC/cargando.gif"
                        alt="Loading" />
                </div>
            ) : (
                <div className="w-full h-[91vh] overflow-y-scroll flex flex-col space-y-6">
                    {/* Video Player */}
                    <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                        {/* Iframe Section */}
                        <div className="w-full md:w-2/3 bg-black rounded-lg overflow-hidden">
                            {alldata && (
                                <iframe
                                    src={frame ? frame : alldata.iframeArry[0].src}
                                    className="w-full h-[250px] md:h-[500px]"
                                    allowFullScreen
                                    frameBorder="0" />
                            )}
                        </div>

                        {/* Episode Details */}
                        <div className="w-full md:w-1/3 bg-black rounded-lg shadow-lg p-4 flex flex-col h-[250px] space-y-4">
                            {alldata && (
                                <>
                                    <div className="text-white font-semibold text-lg truncate">
                                        {alldata.title}
                                    </div>
                                    <div className="text-gray-400 text-sm line-clamp-3 relative h-[100px]">
                                        {alldata.description}
                                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent h-6 pointer-events-none"></div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Episodes Grid */}
                    <div className="w-full flex flex-wrap grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alldata?.sessionEpisodesArray?.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => router.push(`/watch?q=${item?.href ? item.href.split('.co/')[1] : ''}`)}
                                className="group relative flex bg-black  rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
                            >
                                {/* Episode Thumbnail */}
                                <div className="relative overflow-hidden rounded-lg">
                                    <img
                                        className="w-full h-[180px] object-cover group-hover:scale-110 transition-transform duration-300"
                                        src={`${item.postThumbnail.split('p/w')[0]}p/w500/${item.postThumbnail.split('p/w')[1].split('/')[1]}`}
                                        alt={item.h2} />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <img
                                            className="w-10"
                                            src="https://cdn.hugeicons.com/icons/play-circle-bulk-rounded.svg"
                                            alt="Play button" />
                                    </div>
                                </div>

                                {/* Episode Info */}
                                <div className="p-4">
                                    <h3 className="truncate font-semibold text-white">{item.h2.split('x')[0]}</h3>
                                    <p className="text-sm text-gray-400">EP: {item.numEpi.split('x')[0]}</p>
                                    <p className="text-sm text-gray-400">Time: {item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="w-full flex justify-center mt-6">
                            <button
                                onClick={loadMoreEpisodes}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div><Footer /></>
    );
}
