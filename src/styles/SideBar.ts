import styled from "styled-components";

interface Props {
  isOpen: boolean;
}

export const Container = styled.aside<Props>`
  width: ${(props) => (props.isOpen ? "275px" : "58px")};
  height: 100dvh;
  position: absolute;
  padding: 4px;
  background-color: #265643;
  transition: 0.5s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    svg {
      width: ${(props) => (props.isOpen ? "120px" : "50px")};
      height: ${(props) => (props.isOpen ? "80px" : "50px")};

      path {
        fill: white;
      }
    }

    .app-name {
      display: ${(props) => (props.isOpen ? "flex" : "none")};
      font-size: 18px;
      color: white;
    }
  }
`;
