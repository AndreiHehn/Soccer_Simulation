import { Container } from "./styles";
import InfoIcon from "../../assets/icons/InfoIcon.svg?react";
import { useState } from "react";

interface Props {
  iconColor: string;
  iconSize?: string;
  message: string;
  boxColor: string;
  boxPosition: "top" | "right" | "bottom" | "top-right" | "bottom-right";
  borderRadius?: string;
  fontSize?: string;
}

export default function ToolTip({
  iconColor,
  iconSize,
  message,
  boxColor,
  boxPosition,
  borderRadius,
  fontSize,
}: Props) {
  const [isMessageActive, setMessageActive] = useState(false);
  const screenSize = window.innerWidth;

  return (
    <Container
      iconColor={iconColor}
      $iconSize={iconSize ?? "24px"}
      boxColor={boxColor}
      showMessage={isMessageActive}
      boxPosition={boxPosition}
      $borderRadius={borderRadius ?? "0px"}
      $fontSize={fontSize ?? "8px"}
    >
      <InfoIcon
        onMouseEnter={() => setMessageActive(!isMessageActive)}
        onMouseLeave={() => setMessageActive(!isMessageActive)}
        onClick={() => screenSize < 720 && setMessageActive(!isMessageActive)}
      ></InfoIcon>
      <div className="tooltip-box">
        <h2 className="tooltip-message">{message}</h2>
      </div>
    </Container>
  );
}
