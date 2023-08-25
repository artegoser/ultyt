import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function NavbarComponent() {
  const [search, setSearch] = useState(undefined as string | undefined);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [suggestions, setSuggestions] = useState([] as string[]);
  async function updateSuggestions(query) {
    const res = await window.piped_api.suggestions(query);
    setSuggestions(res);
  }

  return (
    <Navbar>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link className="font-bold text-inherit" to="/trending">
            ULTYT
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex gap-4" justify="start">
        <NavbarItem>
          <div className="relative inline-block text-left">
            <Input
              isClearable
              radius="lg"
              placeholder="Type to search..."
              startContent={<MagnifyingGlassIcon className="h-6 w-6" />}
              onChange={(e) => {
                updateSuggestions(e.target.value);
                setSearch(e.target.value);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await setSuggestions([]);
                  await navigate(`/search?q=${search}`);
                }
              }}
              onClear={() => {
                setSuggestions([]);
                setSearch("");
              }}
              value={
                (search !== undefined ? search : searchParams.get("q")) || ""
              }
            />
            <div
              className="absolute right-0 z-10 mt-2 flex flex-col backdrop-blur-3xl rounded-xl bg-gray-50 dark:bg-transparent"
            >
              {suggestions.length > 0 &&
                suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    onClick={() => navigate(`/search?q=${suggestion}`)}
                    className="m-1 break-all"
                  >
                    {suggestion}
                  </Button>
                ))}
            </div>
          </div>
        </NavbarItem>
      </NavbarContent>

      <Menu />
    </Navbar>
  );
}

function genMenu(menu: boolean) {
  let NavItem, Nav;

  if (menu) {
    NavItem = NavbarMenuItem;
    Nav = NavbarMenu;
  } else {
    NavItem = NavbarItem;
    Nav = NavbarContent;
  }

  return (
    <Nav className="hidden sm:flex gap-4" justify="center">
      <NavItem>
        <Link to="/trending">Trending</Link>
      </NavItem>
      <NavItem>
        <Link to="/feed">Feed</Link>
      </NavItem>
      <NavItem>
        <Link to="/playlists">Playlists</Link>
      </NavItem>
      <NavItem>
        <Link to="/preferences">Preferences</Link>
      </NavItem>
    </Nav>
  );
}

function Menu() {
  return (
    <>
      {genMenu(false)}
      {genMenu(true)}
    </>
  );
}
