import { Video } from "piped-api/dist/responses.interface";
import { useEffect, useState } from "react";

import {Avatar, Badge, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
export default function Trending() {
  
  const [trending, setTrending] = useState([] as Video[]);

  useEffect(() => {
    async function getTrending(){
      
        const trending = await window.piped_api.trending("US");
        setTrending(trending);
        console.log(trending);
    }

    if (trending.length === 0) {
      getTrending();
    }
  });

  return <div className="grid grid-cols-6 gap-4 p-4">{trending.map((video) => <Card key={video.url}>
    <CardHeader><Image className="w-full" src={video.thumbnail}/></CardHeader>
    <Divider/>
    <CardBody className="grid grid-cols-3">
    <Avatar src={video.uploaderAvatar} />
    <p className="text-md">{video.uploaderName}</p>
    </CardBody>
  </Card>)}</div>;
}
