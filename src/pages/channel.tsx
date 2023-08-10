import { Channel, Playlist, Tab, Video } from "piped-api/dist/types";
import {
  SkeletonVideoComponent,
  VideoComponent,
  VideoContainer,
} from "../components/video";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { capitalize } from "../components/utils";
import React from "react";
import { PlaylistComponent } from "../components/playlist";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ChannelPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabId = searchParams.get("tabId") || "videos";

  return (
    <ChannelPageСomponent
      id={id}
      setSearchParams={setSearchParams}
      tabId={tabId}
    />
  );
}

class ChannelPageСomponent extends React.Component<
  { id; setSearchParams; tabId },
  { channel: Channel; tab: Tab | undefined }
> {
  async componentDidMount() {
    const channel = (await window.piped_api.channel(
      this.props.id || ""
    )) as Channel;

    if (this.props.tabId === "videos") {
      return this.setState({ channel });
    }

    if (!this.state?.tab) {
      const tab = await window.piped_api.channelTabs(
        channel.tabs[this.props.tabId].data
      );

      this.setState({ channel, tab });
    }
  }

  async updateTab() {
    if (this.props.tabId === "videos") {
      return;
    }
    const { channel } = this.state;
    const tab = await window.piped_api.channelTabs(
      channel.tabs[this.props.tabId].data
    );
    this.setState({ channel, tab });
  }

  componentDidUpdate() {
    if (!this.state.tab) {
      this.updateTab();
    }
  }
  render() {
    if (!this.state) {
      return null;
    }

    const { channel, tab } = this.state;
    const { setSearchParams, tabId } = this.props;

    if (!channel) {
      return (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-4">
          {[...Array(20).keys()].map((num) => (
            <SkeletonVideoComponent key={num} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-rows p-4">
          <Card radius="lg" shadow="none">
            <div className="p-4">
              <img className="w-full rounded-xl" src={channel.bannerUrl} />
            </div>
            <CardFooter className="p-4 justify-between ">
              <div className="flex flex-row">
                <div className="flex flex-row gap-2 text-xl font-bold pl-2">
                  {channel.name}
                </div>
                {channel.verified && (
                  <CheckCircleIcon className="w-6 h-6 p-1" />
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="flex flex-row flex-wrap gap-2  mt-4">
            <Button
              onClick={() => {
                setSearchParams({ tabId: "videos" });
              }}
              key="videos"
              className="text-xl font-bold mt-4"
            >
              Videos
            </Button>
            {channel.tabs.map((tab, index) => {
              return (
                <Button
                  onClick={() => {
                    setSearchParams({ tabId: String(index) });

                    this.setState({
                      ...this.state,
                      tab: undefined,
                    });
                  }}
                  key={tab.name}
                  className="text-xl font-bold mt-4"
                >
                  {capitalize(tab.name)}
                </Button>
              );
            })}
          </div>

          {tabId !== "videos" ? (
            <VideoContainer>
              {tab?.content.map((item) => {
                if (item.type === "stream") {
                  item = item as Video;
                  return (
                    <VideoComponent
                      video={item}
                      key={item.url}
                      uploaderAvatar={channel.avatarUrl}
                    />
                  );
                } else if (item.type === "playlist") {
                  item = item as Playlist;
                  return (
                    <PlaylistComponent
                      playlist={item}
                      key={item.url}
                      uploaderAvatar={channel.avatarUrl}
                    />
                  );
                } else if (item.type === "channel") {
                  item = item as Channel;
                  return <div>Soon...</div>;
                } else {
                  <div className="" key={Math.random()}>
                    Idk how to render this
                  </div>;
                }
              })}
            </VideoContainer>
          ) : (
            <VideoContainer>
              {channel.relatedStreams.map((video) => (
                <VideoComponent
                  video={video}
                  key={video.url}
                  uploaderAvatar={channel.avatarUrl}
                />
              ))}
            </VideoContainer>
          )}
        </div>
      );
    }
  }
}
