import { useContext } from "react";
import { Container } from "../styles/SideBarButton";
import { AppContext } from "../lib/context";

interface Props {
  name: string;
  logo: string;
  color: string;
}

export default function SideBarButton({ name, logo, color }: Props) {
  const { isSideBarOpen } = useContext(AppContext);

  return (
    <Container isSideBarOpen={isSideBarOpen} primaryColor={color}>
      <div className="internal">
        <div className="tournament-info">
          <img className="tournament-logo" src={logo} alt="logo" />
          <h2 className="tournament-name">{name}</h2>
        </div>
      </div>
    </Container>
  );
}
