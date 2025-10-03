import { useContext } from "react";
import { Container } from "../styles/SideBar";
import { AppContext } from "../lib/context";
import SideBarButton from "./SideBarButton";
import Logo from "../assets/icons/soccer_simulation_logo.svg?react";

export default function SideBar() {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(AppContext);
  return (
    <Container
      isOpen={isSideBarOpen}
      onMouseEnter={() => setIsSideBarOpen(true)}
      // onMouseLeave={() => setIsSideBarOpen(false)}
    >
      <div className="logo">
        <Logo></Logo>
        <h2 className="app-name">REACT SOCCER SIMULATION</h2>
      </div>
      <SideBarButton></SideBarButton>
    </Container>
  );
}
