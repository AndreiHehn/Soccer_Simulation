import styled from "styled-components";

interface Props {
  isSideBarOpen: boolean;
}
export const Container = styled.div<Props>`
  width: 100%;
  height: 50px;
  border-radius: ${(props) => (props.isSideBarOpen ? "25px" : "10px")};
  background-color: blue;
`;
