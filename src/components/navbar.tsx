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
} from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function NavbarComponent() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
          <Input
            isClearable
            radius="lg"
            placeholder="Type to search..."
            startContent={<MagnifyingGlassIcon className="h-6 w-6" />}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${search}`);
              }
            }}
            defaultValue={searchParams.get("q") || ""}
          />
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
