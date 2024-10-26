'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "@/css/test.module.css"

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
    <div className="bg-black w-screen md:w-full md:h-[250px] px-4 py-8">
      <div className="text-[1.25rem] text-white font-bold mb-4">
        {alldata && "Latest Series"}
      </div>

      {/* Slider with Limit 10 */}
      <div className={styles.cards} >
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
                className={styles.card}
              >
                {/* Card Image */}
                <div className={styles.image}>
                <img
                  className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                  src={item.imgSrc}
                  alt={item.title}
                  style={{ width: '150px', height: '225px', objectFit: 'cover' }}
                />
                </div>

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
