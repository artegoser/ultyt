import { Avatar, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { Playlist } from "piped-api/dist/types";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { shortenNumber } from "./utils";
export function PlaylistComponent({
  playlist,
  uploaderAvatar,
}: PlaylistComponentProps) {
  const navigate = useNavigate();

  return (
    <Card isPressable onPress={() => navigate(playlist.url)} shadow="none">
      <CardHeader>
        <img className="w-full rounded-xl" src={playlist.thumbnail} />
      </CardHeader>
      <CardBody className="flex gap-3 flex-row">
        <Avatar
          className="flex-none"
          src={uploaderAvatar ? uploaderAvatar : playlist.uploaderAvatar}
        />
        <div className="flex gap-3 flex-col">
          <Link color="foreground" href={`#${playlist.url}`}>
            {playlist.name}
          </Link>
          <Link color="foreground" href={`#${playlist.uploaderUrl}`}>
            <div className="flex flex-row items-center">
              <p className="text-md">{playlist.uploaderName}</p>
              {playlist.uploaderVerified && (
                <CheckCircleIcon className="w-6 h-6 p-1" />
              )}
            </div>
          </Link>
          <div className="flex flex-row items-center">
            <p className="flex-none text-md">
              {`${shortenNumber(playlist.videos)} videos`}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

type PlaylistComponentProps = {
  playlist: Playlist;
  uploaderAvatar?: string;
};
