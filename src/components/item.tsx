import { Channel, Playlist, Video } from "piped-api/dist/types";
import { VideoComponent } from "./video";
import { PlaylistComponent } from "./playlist";
import { ChannelComponent } from "./channel";

export function ItemComponent({ item, channel }: ItemComponentProps) {
  if (item.type === "stream") {
    item = item as Video;
    return <VideoComponent video={item} uploaderAvatar={channel?.avatarUrl} />;
  } else if (item.type === "playlist") {
    item = item as Playlist;
    return (
      <PlaylistComponent playlist={item} uploaderAvatar={channel?.avatarUrl} />
    );
  } else if (item.type === "channel") {
    item = item as Channel;
    return <ChannelComponent channel={item} />;
  } else {
    <div className="" key={Math.random()}>
      Idk how to render this
    </div>;
  }
}

type ItemComponentProps = {
  channel?: Channel;
  item: Video | Playlist | Channel;
};
