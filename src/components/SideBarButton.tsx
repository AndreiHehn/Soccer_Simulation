import { useContext, type ReactNode } from "react";
import { Container } from "../styles/SideBarButton";
import { AppContext } from "../lib/context";
import React from "react";

interface Props {
  name: string;
  logo: string | React.ComponentType | ReactNode;
  color: string;
  functionButton: (e: unknown) => void;
}

export default function SideBarButton({
  name,
  logo,
  color,
  functionButton,
}: Props) {
  const { isSideBarOpen } = useContext(AppContext);

  return (
    <Container
      isSideBarOpen={isSideBarOpen}
      primaryColor={color}
      onClick={functionButton}
    >
      <div className="internal">
        <div className="tournament-info">
          {typeof logo === "string" ? (
            <img className="tournament-logo" src={logo} alt="logo" />
          ) : (
            // Se for componente React, renderiza diretamente
            React.createElement(logo as React.ComponentType)
          )}{" "}
          <h2 className="tournament-name">{name}</h2>
        </div>
      </div>
    </Container>
  );
}
