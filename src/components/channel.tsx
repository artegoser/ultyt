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
      className="md:col-span-2 xl:col-span-3 2xl:col-span-4 gap-2 p-1 md:p-4"
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
          <p className="pt-4 text-start">
            {channel.description || "No description"}
          </p>
        </div>
      </CardHeader>
      {(channel.videos || -1) >= 0 && (
        <CardBody className="flex gap-3 flex-row">
          <p className="text-md">
            {`${shortenNumber(channel.videos || -1)} videos`}
          </p>
        </CardBody>
      )}
    </Card>
  );
}

type ChannelComponentProps = {
  channel: Channel;
  uploaderAvatar?: string;
};
