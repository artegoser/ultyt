import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Link,
  Skeleton,
} from "@nextui-org/react";
import { Video } from "piped-api/dist/types";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, EyeIcon } from "@heroicons/react/24/solid";
import { shortenNumber } from "./utils";
export function VideoComponent({ video, uploaderAvatar }: VideoComponentProps) {
  const navigate = useNavigate();

  return (
    <Card isPressable onPress={() => navigate(video.url)} shadow="none">
      <CardHeader>
        <img className="w-full rounded-xl" src={video.thumbnail} />
      </CardHeader>
      <CardBody className="flex gap-3 flex-row">
        <Avatar
          className="flex-none"
          src={uploaderAvatar ? uploaderAvatar : video.uploaderAvatar}
        />
        <div className="flex gap-3 flex-col">
          <Link color="foreground" href={`#${video.url}`}>
            {video.title}
          </Link>
          <Link color="foreground" href={`#${video.uploaderUrl}`}>
            <div className="flex flex-row items-center">
              <p className="text-md">{video.uploaderName}</p>
              {video.uploaderVerified && (
                <CheckCircleIcon className="w-6 h-6 p-1" />
              )}
            </div>
          </Link>
          <div className="flex flex-row items-center">
            <EyeIcon className="w-6 h-6 p-1" />
            <p className="flex-none text-md">
              {`${shortenNumber(video.views)}${video.uploadedDate ? ` • ${video.uploadedDate}` : ""}`}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function SkeletonVideoComponent() {
  return (
    <Card isPressable shadow="none" className="space-y-5 p-4">
      <Skeleton className="rounded-lg">
        <div className="rounded-lg h-56 bg-default-300 p-4"></div>
      </Skeleton>
      <CardBody className="flex gap-3 flex-row">
        <Skeleton className="flex rounded-full w-12 h-12" />
      </CardBody>
    </Card>
  );
}
export function VideoContainer({ children }: VideoContainerProps) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-1 md:p-4">
      {children}
    </div>
  );
}

type VideoComponentProps = {
  video: Video;
  uploaderAvatar?: string;
};

type VideoContainerProps = {
  children: React.ReactNode;
};
