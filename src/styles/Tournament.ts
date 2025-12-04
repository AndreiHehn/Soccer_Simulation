import { darken, lighten } from "polished";
import styled from "styled-components";

interface Props {
  tournamentName: string;
  secondaryColor: string;
  tertiaryColor: string;
  backgroundColor: string;
  textColor: string;
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
  position: relative;

  .steps-nav {
    position: absolute;
    top: 20px;
    display: flex;
    gap: 80px;

    .step {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:hover {
        .step-name {
          transform: scale(1.05);
        }
      }

      .step-name {
        font-size: 14px;
        color: ${(props) => props.textColor};
      }

      .selected-step {
        width: 0%;
        height: 3px;
        background-color: ${(props) => props.textColor};
        border: none;
        border-radius: 2px;
        margin-top: 5px;
        opacity: 0;
        transition: width 0.3s ease, opacity 0.3s ease;
      }

      &.active {
        .selected-step {
          width: 100%;
          opacity: 1;
        }

        .step-name {
          font-weight: 600;
        }
      }

      &.disabled {
        cursor: default;

        .step-name {
          color: #9a9a9c;
        }

        &:hover {
          .step-name {
            transform: none;
          }
        }
      }
    }
  }

  // Teams Selection
  .teams-selection {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px 16px;
    max-height: 400px;
    overflow-y: ${(props) =>
      props.tournamentName == "Champions League" ? "auto" : "hidden"};
    padding-right: 10px;
  }

  .team-slot {
    display: flex;
    align-items: center;
  }

  .team-flag {
    width: 30px;
    margin-right: 10px;
    user-select: none;
  }

  .footer-buttons {
    position: absolute;
    bottom: 30px;
    display: flex;
    gap: 10px;

    button {
      background-color: ${(props) => props.secondaryColor};

      &:hover {
        background-color: ${(props) => darken(0.2, props.secondaryColor)};
      }

      &:disabled {
        background-color: ${(props) => lighten(0.15, props.secondaryColor)};
      }
    }
  }

  /* Largura do scroll */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Fundo do trilho */
  ::-webkit-scrollbar-track {
    background: ${(props) => props.textColor};
    border-radius: 8px;
  }

  /* "Botão" que desliza */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.tertiaryColor};

    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }

  // Matches
  .matchday {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-bottom: 30px;
    user-select: none;

    .matchday-number {
      color: ${(props) => props.textColor};
      font-size: 16px;
      font-weight: 400;
      width: 130px;
      text-align: center;
    }

    .previous-matchday,
    .next-matchday {
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
  }

  // Statistics
  .cards {
    display: flex;
    gap: 20px;
  }
`;
