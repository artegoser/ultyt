import { Video } from "piped-api/dist/types";
import {
  SkeletonVideoComponent,
  VideoComponent,
  VideoContainer,
} from "../components/video";
import React from "react";

export default class TrendingPage extends React.Component {
  state: { trending: Video[] } = {
    trending: [],
  };

  async componentDidMount() {
    const trending = await window.piped_api.trending(
      localStorage.getItem("region") || "US"
    );
    this.setState({ trending });
  }

  render() {
    const { trending } = this.state;

    if (trending.length === 0) {
      return (
        <VideoContainer>
          {[...Array(20).keys()].map((num) => (
            <SkeletonVideoComponent key={num} />
          ))}
        </VideoContainer>
      );
    }

    return (
      <VideoContainer>
        {trending.map((video) => (
          <VideoComponent video={video} key={video.url} />
        ))}
      </VideoContainer>
    );
  }
}
