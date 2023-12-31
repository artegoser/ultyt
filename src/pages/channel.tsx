import { Channel, Tab } from "piped-api/dist/types";
import { SkeletonVideoComponent, VideoContainer } from "../components/video";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { capitalize, shortenNumber } from "../components/utils";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ItemComponent } from "../components/item";

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

  async updateChannel() {
    const channel = (await window.piped_api.channel(
      this.props.id || ""
    )) as Channel;

    this.setState({ ...this.state, channel });
  }

  async componentDidUpdate() {
    if (this.props.id !== this.state?.channel?.id) {
      await this.updateChannel();
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
        <VideoContainer>
          {[...Array(20).keys()].map((num) => (
            <SkeletonVideoComponent key={num} />
          ))}
        </VideoContainer>
      );
    } else {
      return (
        <div className="grid grid-rows p-1 md:p-4">
          <Card radius="lg" shadow="none">
            <div className="md:p-4">
              <img className="w-full rounded-xl" src={channel.bannerUrl} />
            </div>
            <CardFooter className="md:p-4 justify-between ">
              <div className="flex flex-row gap-2 flex-wrap">
                <div className="flex flex-row text-xl font-bold md:pl-2">
                  <div>{channel.name}</div>
                  {channel.verified && (
                    <CheckCircleIcon className="w-6 h-6 md:p-1" />
                  )}
                </div>

                <div className="text-xl font-bold md:pl-2">
                  {shortenNumber(channel.subscriberCount)} subscribers
                </div>
              </div>
            </CardFooter>
          </Card>

          <div className="flex flex-row flex-wrap gap-2 m-4">
            <Button
              onClick={() => {
                setSearchParams({ tabId: "videos" });
              }}
              key="videos"
              className="text-xl font-bold"
            >
              Videos
            </Button>
            {channel.tabs.map((tab, index) => {
              return (
                <Button
                  onClick={async () => {
                    await setSearchParams({ tabId: String(index) });

                    await this.updateTab();
                  }}
                  key={tab.name}
                  className="text-xl font-bold"
                >
                  {capitalize(tab.name)}
                </Button>
              );
            })}
          </div>

          <VideoContainer>
            {(tabId !== "videos"
              ? tab?.content || []
              : channel.relatedStreams
            ).map((item) => {
              return (
                <ItemComponent
                  key={Math.random()}
                  item={item}
                  channel={channel}
                />
              );
            })}
          </VideoContainer>
        </div>
      );
    }
  }
}
