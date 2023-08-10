import { Item } from "piped-api/dist/types";
import { SkeletonVideoComponent, VideoContainer } from "../components/video";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { ItemComponent } from "../components/item";
import { Button } from "@nextui-org/react";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <SearchPageComponent
      search={searchParams.get("q") || ""}
      setSearchParams={setSearchParams}
    />
  );
}

class SearchPageComponent extends React.Component<
  { search: string; setSearchParams },
  {
    items: Item[];
    corrected: boolean;
    suggestion: string | null;
    nextpage: string;
    search: string;
  }
> {
  async componentDidMount() {
    const { items, corrected, suggestion, nextpage } =
      await window.piped_api.search(this.props.search);

    this.setState({
      items,
      corrected,
      suggestion,
      nextpage,
      search: this.props.search,
    });
  }

  async componentDidUpdate() {
    if (this.props.search !== this.state.search) {
      const { items, corrected, suggestion, nextpage } =
        await window.piped_api.search(this.props.search);

      this.setState({
        items,
        corrected,
        suggestion,
        nextpage,
        search: this.props.search,
      });
    }
  }

  render() {
    if (!this.state) {
      return null;
    }

    const { items } = this.state;

    if (items.length === 0) {
      return (
        <VideoContainer>
          {[...Array(20).keys()].map((num) => (
            <SkeletonVideoComponent key={num} />
          ))}
        </VideoContainer>
      );
    }

    return (
      <>
        {this.state.suggestion && (
          <div className="text-lg p-4">
            Did you mean
            <Button
              className="m-2"
              onClick={() =>
                this.props.setSearchParams({ q: this.state.suggestion })
              }
            >
              {this.state.suggestion}
            </Button>
            ?
          </div>
        )}
        <VideoContainer>
          {items.map((video) => (
            <ItemComponent item={video} key={video.url} />
          ))}
        </VideoContainer>
      </>
    );
  }
}
