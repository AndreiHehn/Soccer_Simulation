import styled from "styled-components";
import { lighten } from "polished";

interface Props {
  secondaryColor: string;
  tertiaryColor: string;
  backgroundColor: string;
  textColor: string;
}

export const Container = styled.article<Props>`
  .phase-selection {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    .qualifying-phase {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${(props) => props.tertiaryColor};
      border-radius: 50%;
      width: 35px;
      height: 35px;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => lighten(0.05, props.tertiaryColor)};
        svg {
          transform: scale(1.1);
        }
      }

      svg path {
        fill: ${(props) => props.textColor};
      }
    }

    .inactive {
      background-color: ${(props) => lighten(0.08, props.tertiaryColor)};
      cursor: default;

      &:hover {
        background-color: ${(props) => lighten(0.08, props.tertiaryColor)};
        svg {
          transform: none;
        }
      }
    }

    .current-phase {
      font-size: 18px;
      color: ${(props) => props.textColor};
      width: 200px;
      text-align: center;
    }
  }
  .matches {
    .leg {
      font-size: 16px;
      color: ${(props) => props.textColor};
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }
  }
`;
