import styled from "styled-components";
import { darken } from "polished"; // biblioteca para manipular cores

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

  .logo {
    svg {
      width: 300px;
      height: 300px;

      path {
        fill: var(--text-primary);
      }
    }
  }

  .welcome-text {
    color: ${(props) => props.textColor};
    font-size: 24px;
  }

  .tournament-logo {
    margin-bottom: 30px;
    img {
      width: 250px;
    }
  }

  .start-simulation {
    margin-top: 20px;

    button {
      background-color: ${(props) => props.secondaryColor};

      &:hover {
        background-color: ${(props) => darken(0.2, props.secondaryColor)};
      }
    }
  }
`;
