'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "@/css/test3.module.css";

const Post = () => {
    const router = useRouter();
    const [alldata, setAllData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Limit to 10 items per page

    // Fetch all data
    const get_all_data = async () => {
        setLoading(true);
        const response = await fetch('/api/home');
        const data = await response.json();
        setLoading(false);
        setAllData(data?.latestSeriesArry || []); // Fallback to empty array if no data
        console.log(data);
    };

    useEffect(() => {
        get_all_data();
    }, []);

    // Calculate current data for the page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = alldata.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-black">
            <div className={styles.popular_title}>
                {alldata.length > 0 && "Popular"}
            </div>

            {/* Slider with pagination */}
            <div className={styles.popular}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    currentItems.map((item) => (
                        <motion.div
                            key={item.id}
                            onClick={() => router.push(`/details?q=${item?.href ? item.href.split(".co/")[1] : ""}`)}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Card Image */}
                            <div className={styles.post_con}>
                                <img
                                    src={item.imgSrc}
                                    alt={item.title}
                                />
                                <div className={styles.title}>
                                    {item.title}
                                </div>
                                <div className={styles.public}>{item.vote}</div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Pagination buttons */}
            <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: Math.ceil(alldata.length / itemsPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 rounded-md border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                            } hover:bg-blue-400 transition-colors duration-300`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default Post;
