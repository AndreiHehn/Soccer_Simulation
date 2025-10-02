import { useContext } from "react";
import { Container } from "../styles/SideBarButton";
import { AppContext } from "../lib/context";

export default function SideBarButton() {
  const { isSideBarOpen } = useContext(AppContext);

  return <Container isSideBarOpen={isSideBarOpen}></Container>;
}
