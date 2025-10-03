import styled from "styled-components";

interface Props {
  isSideBarOpen: boolean;
}
export const Container = styled.div<Props>`
  width: 100%;
  height: 40px;
  border-radius: ${(props) => (props.isSideBarOpen ? "25px" : "10px")};
  background-color: white;
  padding: 2px;

  &:hover {
    background-color: #cbcaca;

    .internal {
      background-color: #cbcaca;
    }
  }

  .internal {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 25px;
    border: 3px solid red;
    display: ${(props) => (props.isSideBarOpen ? "flex" : "none")};
    align-items: center;
  }

  .tournament-info {
    margin-left: 15px;
    display: flex;
    align-items: center;

    .tournament-logo {
      width: 12%;
      max-height: 36px;
    }

    .tournament-name {
      font-size: 18px;
      margin-left: 10px;
      color: red;
    }
  }
`;
