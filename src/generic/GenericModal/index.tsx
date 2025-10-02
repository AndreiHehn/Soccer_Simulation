import { Container, OutSideClick } from "./styles";
import CloseIcon from "../../assets/icons/CloseIcon.svg?react";
import type { ReactNode } from "react";

export interface Props {
  title?: string;
  functionCloseModal?: () => void;
  children: ReactNode;

  mobileFullScreen?: boolean;
  width?: string;
  height?: string;
  titleFontSize?: string;
  mobileCentralized?: boolean;

  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
}

export function ModalGeneric({
  title,
  functionCloseModal,
  children,
  mobileFullScreen,
  height,
  width,
  top,
  bottom,
  right,
  left,
  titleFontSize,
}: Props) {
  return (
    <>
      <OutSideClick></OutSideClick>
      <Container
        $mobileFullScreen={mobileFullScreen ? mobileFullScreen : false}
        $titleFontSize={titleFontSize}
        $width={width}
        $height={height}
        $top={top}
        $bottom={bottom}
        $right={right}
        $left={left}
      >
        <header className="modalHeader">
          <h1 className="modalTitle">{title}</h1>
          {functionCloseModal && (
            <div className="closeButton">
              <CloseIcon onClick={functionCloseModal} />
            </div>
          )}
        </header>

        <section className="modalBody">{children}</section>
      </Container>
    </>
  );
}
