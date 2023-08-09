import { Avatar, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { Video } from "piped-api/dist/types";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, EyeIcon } from "@heroicons/react/24/solid";
import { shortenNumber } from "./utils";
export function VideoComponent({ video }: VideoComponentProps) {
  const navigate = useNavigate();

  return (
    <Card
      isBlurred
      isPressable
      onPress={() => navigate(video.url)}
      shadow="none"
    >
      <CardHeader>
        <img className="w-full rounded-xl" src={video.thumbnail} />
      </CardHeader>
      <CardBody className="flex gap-3 flex-row">
        <Avatar className="flex-none" src={video.uploaderAvatar} />
        <div className="flex gap-3 flex-col">
          <Link color="foreground" href={video.url}>
            {video.title}
          </Link>
          <Link color="foreground" href={video.uploaderUrl}>
            <div className="flex flex-row items-center">
              <p className="flex-none text-md">{video.uploaderName}</p>
              {video.uploaderVerified && (
                <CheckCircleIcon className="w-6 h-6 p-1" />
              )}
            </div>
          </Link>
          <div className="flex flex-row items-center">
            <EyeIcon className="w-6 h-6 p-1" />
            <p className="flex-none text-md">
              {`${shortenNumber(video.views)} • ${video.uploadedDate}`}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

type VideoComponentProps = {
  video: Video;
};
