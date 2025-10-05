import styled from "styled-components";

interface Props {
  isSideBarOpen: boolean;
  primaryColor: string;
}
export const Container = styled.div<Props>`
  width: 90%;
  height: 40px;
  border-radius: ${(props) => (props.isSideBarOpen ? "25px" : "10px")};
  background-color: var(--text-primary);
  padding: 2px;
  display: ${(props) => (props.isSideBarOpen ? "flex" : "none")};
  cursor: pointer;

  &:hover {
    background-color: #cbcaca;
    transform: scale(1.05);

    .internal {
      background-color: #cbcaca;
    }
  }

  .internal {
    width: 100%;
    height: 100%;
    background-color: var(--text-primary);
    border-radius: 25px;
    border: 3px solid ${(props) => props.primaryColor};
    display: ${(props) => (props.isSideBarOpen ? "flex" : "none")};
    align-items: center;
  }

  .tournament-info {
    margin-left: 15px;
    display: flex;
    align-items: center;

    .tournament-logo {
      width: 20px;
    }

    .tournament-name {
      font-size: 18px;
      margin-left: 10px;
      color: ${(props) => props.primaryColor};
      white-space: nowrap;
    }

    svg {
      path {
        fill: #265643;
      }
    }
  }
`;
