'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "@/css/test.module.css";

const Series = () => {
  const router = useRouter();
  const [alldata, setAllData] = useState();
  const [loading, setLoading] = useState(false);

  // Fetch all data
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
    <div className="bg-black w-full px-4 py-8">
      <div className="text-[1.25rem] text-white font-bold mb-4">
        {alldata && "Latest Series"}
      </div>

      {/* Slider with Limit 10 */}
      <div className={`${styles.cards} grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8`}>
        {alldata &&
          alldata?.latestSeriesArry
            ?.slice(0, 10) // Limit to 10 items
            .map((item) => (
              <motion.div
                key={item.id}
                onClick={() => router.push(`/details?q=${item?.href ? item.href.split(".co/")[1] : ""}`)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className={`${styles.card} relative group overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-300`}
              >
                {/* Card Image */}
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={item.imgSrc}
                  alt={item.title}
                  style={{ height: '225px' }}
                />

                {/* Card Title and Vote (Initially Hidden) */}
                <div className="absolute inset-0 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-lg px-2 py-2">
                  <div className="text-white text-base font-semibold truncate">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-400">{item.vote}</div>
                </div>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default Series;
