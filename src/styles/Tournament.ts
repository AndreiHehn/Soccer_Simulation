import styled from "styled-components";

interface Props {
  backgroundColor: string;
}
export const Container = styled.main<Props>`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${(props) => props.backgroundColor};
  overflow: hidden;
`;
