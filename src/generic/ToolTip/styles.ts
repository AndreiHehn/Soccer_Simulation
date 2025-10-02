import styled from "styled-components";

interface Props {
  iconColor: string;
  $iconSize: string;
  boxColor: string;
  boxPosition: string;
  $borderRadius: string;
  $fontSize: string;
  showMessage: boolean;
}

export const Container = styled.div<Props>`
  position: relative;
  display: inline-flex; /* garante que o tamanho do container seja o do ícone */
  align-items: center;
  justify-content: center;

  svg {
    width: ${(props) => props.$iconSize};
    height: ${(props) => props.$iconSize};
  }

  path {
    fill: ${(props) => props.iconColor};
  }

  .tooltip-box {
    position: absolute;
    padding: 4px 8px;
    width: max-content;
    background-color: ${(props) => props.boxColor};
    border-radius: ${(props) => props.$borderRadius};
    white-space: nowrap;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
    display: ${(props) => (!props.showMessage ? "none" : "flex")};

    .tooltip-message {
      font-weight: 600;
      font-size: ${(props) => props.$fontSize};
      color: ${(props) => props.iconColor};
    }

    ${(props) =>
      props.boxPosition === "top" &&
      `
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 6px;
      `}
    ${(props) =>
      props.boxPosition === "bottom" &&
      `
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 6px;
      `}
    ${(props) =>
      props.boxPosition === "right" &&
      `
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 6px;
      `}
       ${(props) =>
      props.boxPosition === "top-right" &&
      `
        bottom: 100%;
        left: 100%;
        margin-bottom: 6px;
        margin-left: 6px;
      `}
      ${(props) =>
      props.boxPosition === "bottom-right" &&
      `
        top: 100%;
        left: 100%;
        margin-top: 6px;
        margin-left: 6px;
      `}
  }
`;
