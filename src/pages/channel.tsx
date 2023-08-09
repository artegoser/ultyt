import { Channel, Tab, Video } from "piped-api/dist/types";
import { useEffect, useState } from "react";
import {
  SkeletonVideoComponent,
  VideoComponent,
  VideoContainer,
} from "../components/video";
import { useParams, useSearchParams } from "react-router-dom";
import { Card, CardFooter } from "@nextui-org/react";
import { capitalize } from "../components/utils";

export default function ChannelPage() {
  const [channel, setChannel] = useState<Channel>();
  const [tab, setTab] = useState<Tab>();

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabId = searchParams.get("tabId") || "videos";

  useEffect(() => {
    async function getChannel() {
      const channel = (await window.piped_api.channel(id || "")) as Channel;
      setChannel(channel);
    }

    async function getTab(name: string) {
      const tab = await window.piped_api.channelTabs(channel?.tabs[name].data);
      setTab(tab);
    }

    if (!channel) {
      getChannel();
    }

    if (!tab && tabId !== "videos") {
      getTab(tabId);
    }
  });

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
        <div className="">
          <Card radius="lg" shadow="none">
            <div className="p-4">
              <img className="w-full rounded-xl" src={channel.bannerUrl} />
            </div>
            <CardFooter className="p-4 justify-between ">
              <div className="flex flex-col">
                <div className="flex flex-row gap-2 text-xl font-bold pl-2">
                  {channel.name}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-row flex-wrap gap-2 bg-white rounded-xl mt-4">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearchParams({ tabId: "videos" });
            }}
            key="videos"
            className="text-xl font-bold p-4"
          >
            Videos
          </div>
          {channel.tabs.map((tab, index) => {
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSearchParams({ tabId: String(index) });
                  setTab(undefined);
                }}
                key={tab.name}
                className="text-xl font-bold p-4"
              >
                {capitalize(tab.name)}
              </div>
            );
          })}
        </div>

        {tabId !== "videos" ? (
          <VideoContainer>
            {tab?.content.map((video) => {
              if (video.type === "stream") {
                video = video as Video;
                return (
                  <VideoComponent
                    video={video}
                    key={video.url}
                    uploaderAvatar={channel.avatarUrl}
                  />
                );
              } else {
                return (
                  <div className="" key={Math.random()}>
                    Soon...
                  </div>
                );
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
