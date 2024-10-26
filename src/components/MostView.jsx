"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "@/css/test2.module.css";

const MostView = () => {
  const router = useRouter();
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animeDetails, setAnimeDetails] = useState([]);

  // Fetch all data from your own API
  const get_all_data = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/home');
      const data = await response.json();
      const latestSeries = data?.latestSeriesArry?.slice(10, 20); // Limit to 20 items
      setAllData(latestSeries || []); // Ensure it's at least an empty array
      fetchAnimeDetails(latestSeries || []); // Fetch anime details based on titles
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Fetch anime details from Kitsu API based on title
  const fetchAnimeDetails = async (animeList) => {
    const detailsPromises = animeList.map(async (item) => {
      try {
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(item.title)}`);
        const data = await response.json();

        // Check if there's a valid result and title
        const matchingAnime = data?.data?.find(anime => {
          const animeTitle = anime.attributes?.titles?.en_jp || anime.attributes?.titles?.en || anime.attributes?.canonicalTitle;
          return animeTitle && animeTitle.toLowerCase().trim() === item.title.toLowerCase().trim();
        });

        return matchingAnime || null;
      } catch (error) {
        console.error("Error fetching anime details from Kitsu:", error);
        return null;
      }
    });

    const fetchedDetails = await Promise.all(detailsPromises);
    setAnimeDetails(fetchedDetails);
  };

  useEffect(() => {
    get_all_data();
  }, []);

  return (
    <div className={styles.most_viewed_section}>
      <h2>
        {alldata.length > 0 && "Latest Anime Series"}
      </h2>

      {loading ? <p>Loading...</p> : null} {/* Display loading state */}

      <ul>
        {alldata.length > 0 ? (
          alldata.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => router.push(`/details?q=${item?.href ? item.href.split(".co/")[1] : ""}`)}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <li>
                {/* Card Image */}
                <img
                  src={item.imgSrc}
                  alt={item.title}
                />

                {/* Card Title and Synopsis (fetched from Kitsu API) */}
                <div className={styles.content}>
                  <div className={styles.anime_title}>
                    {item.title}
                  </div>
                  <div className={styles.description}>
                    {/* Display the synopsis if available, otherwise show 'No synopsis available' */}
                    {animeDetails[index]?.attributes?.synopsis
                      ? animeDetails[index].attributes.synopsis
                      : "No synopsis available"}
                  </div>
                </div>
              </li>
            </motion.div>
          ))
        ) : (
          <p>No data available</p> // Handle case when there's no data
        )}
      </ul>
    </div>
  );
};

export default MostView;
