import { Video } from "piped-api/dist/types";
import { useEffect, useState } from "react";
import { SkeletonVideoComponent, VideoComponent } from "../components/video";

export default function Trending() {
  const [trending, setTrending] = useState([] as Video[]);

  useEffect(() => {
    async function getTrending() {
      const trending = await window.piped_api.trending("US"); //await window.piped_api.search("artegoser");
      setTrending(trending);
    }

    if (trending.length === 0) {
      getTrending();
    }
  });

  if (trending.length === 0) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-4">
        {[...Array(20).keys()].map((num) => (
          <SkeletonVideoComponent key={num} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-4">
      {trending.map((video) => (
        <VideoComponent video={video} key={video.url} />
      ))}
    </div>
  );
}
