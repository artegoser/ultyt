import { Avatar, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { Channel } from "piped-api/dist/types";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { shortenNumber } from "./utils";
export function ChannelComponent({
  channel,
  uploaderAvatar,
}: ChannelComponentProps) {
  const navigate = useNavigate();

  return (
    <Card
      isPressable
      onPress={() => {
        navigate(channel.url || "");
      }}
      shadow="none"
    >
      <CardHeader>
        <Avatar
          className="flex-none"
          src={uploaderAvatar ? uploaderAvatar : channel.thumbnail}
        />
        <Link color="foreground" className="pl-4" href={`#${channel.url}`}>
          <div className="flex flex-row items-center">
            <p className="text-md">{channel.name}</p>
            {channel.verified && <CheckCircleIcon className="w-6 h-6 p-1" />}
          </div>
        </Link>
      </CardHeader>
      <CardBody className="flex gap-3 flex-row">
        <p className="flex-none text-md">
          {`${shortenNumber(channel.videos || -1)} videos`}
        </p>
      </CardBody>
    </Card>
  );
}

type ChannelComponentProps = {
  channel: Channel;
  uploaderAvatar?: string;
};
