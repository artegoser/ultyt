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
      className="md:col-span-2 xl:col-span-4 2xl:col-span-5 gap-2 p-1 md:p-4"
    >
      <CardHeader>
        <div className="flex flex-row flex-wrap">
          <Avatar src={uploaderAvatar ? uploaderAvatar : channel.thumbnail} />
          <Link color="foreground" className="pl-4" href={`#${channel.url}`}>
            <div className="flex flex-row items-center">
              <p className="text-md">{channel.name}</p>
              {channel.verified && <CheckCircleIcon className="w-6 h-6 p-1" />}
            </div>
          </Link>
        </div>
      </CardHeader>

      <CardBody className="flex flex-col p-1">
        <p className="text-start">{channel.description || "No description"}</p>
        {(channel.videos || -1) >= 0 && (
          <p className="text-md">
            {`${shortenNumber(channel.videos || -1)} videos`}
          </p>
        )}
      </CardBody>
    </Card>
  );
}

type ChannelComponentProps = {
  channel: Channel;
  uploaderAvatar?: string;
};
