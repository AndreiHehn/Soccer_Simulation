import styled from "styled-components";

interface Props {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

export const Container = styled.main<Props>`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${(props) => props.primaryColor};
  overflow: hidden;
`;
