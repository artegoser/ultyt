import { Video } from "piped-api/dist/types";
import { SkeletonVideoComponent, VideoComponent } from "../components/video";
import React from "react";

export default class TrendingPage extends React.Component {
  state: { trending: Video[] } = {
    trending: [],
  };

  async componentDidMount() {
    console.log("trending");
    const trending = await window.piped_api.trending(
      localStorage.getItem("region") || "US"
    );
    this.setState({ trending });
  }

  render() {
    const { trending } = this.state;

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
}
