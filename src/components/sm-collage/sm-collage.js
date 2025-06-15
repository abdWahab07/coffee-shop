import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import reelOneThumbnail from "../../assets/social-media-collage/reelOneThumbnail.PNG";
import reelTwoThumbnail from "../../assets/social-media-collage/reelTwoThumbnail.PNG";
import reelThreeThumbnail from "../../assets/social-media-collage/reelThreeThumbnail.PNG";
import reelFourThumbnail from "../../assets/social-media-collage/reelFourThumbnail.PNG";
import reelFiveThumbnail from "../../assets/social-media-collage/reelFiveThumbnail.PNG";
import reelSixThumbnail from "../../assets/social-media-collage/reelSixThumbnail.PNG";
import reelSevenThumbnail from "../../assets/social-media-collage/reelSevenThumbnail.PNG";
import reelEightThumbnail from "../../assets/social-media-collage/reelEightThumbnail.PNG";
import reelNineThumbnail from "../../assets/social-media-collage/reelNineThumbnail.PNG";
import reelTenThumbnail from "../../assets/social-media-collage/reelTenThumbnail.PNG";

import "./sm-collage.css";

const instagramVideos = [
  {
    url: "https://www.instagram.com/reel/C5Z5dLrLsRM/",
    thumbnail: reelOneThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C5Z5ePfLYR1/",
    thumbnail: reelTwoThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C6X5ePfXYR1/",
    thumbnail: reelThreeThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C7Y6ePfQWR1/",
    thumbnail: reelFourThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C8Z7ePfMRR1/",
    thumbnail: reelFiveThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C9Z8ePfQRR1/",
    thumbnail: reelSixThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C1A1ePfRRR1/",
    thumbnail: reelSevenThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C2B2ePfTRR1/",
    thumbnail: reelEightThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C3C3ePfGRR1/",
    thumbnail: reelNineThumbnail,
  },
  {
    url: "https://www.instagram.com/reel/C4D4ePfHRR1/",
    thumbnail: reelTenThumbnail,
  },
];

const directions = [
  { x: -100, y: -100 },
  { x: 100, y: -100 },
  { x: -100, y: 100 },
  { x: 100, y: 100 },
  { x: 0, y: -150 },
  { x: 0, y: 150 },
  { x: -150, y: 0 },
  { x: 150, y: 0 },
];

const SmCollage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="collage-container" ref={ref}>
      {instagramVideos.map((video, index) => {
        const dir = directions[index % directions.length];
        const rotate = (index % 2 === 0 ? -1 : 1) * (5 + Math.random() * 10);

        return (
          <motion.a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="video-frame"
            key={index}
            initial={{ opacity: 0, x: dir.x, y: dir.y, rotate }}
            animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
            transition={{
              delay: index * 0.1,
              duration: 0.8,
              ease: "backOut",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={video.thumbnail}
              alt={`Instagram video ${index + 1}`}
              className="thumbnail"
            />
            <motion.div
              className="play-overlay"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="play-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="48"
                height="48"
              >
                <path fill="white" d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </motion.a>
        );
      })}
    </div>
  );
};

export default SmCollage;
