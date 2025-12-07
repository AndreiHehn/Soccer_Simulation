import styled from "styled-components";
import { darken } from "polished";

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

  .rankings-nav {
    position: absolute;
    top: 20px;
    display: flex;
    gap: 80px;

    .active-ranking {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:hover {
        .step-name {
          transform: scale(1.05);
        }
      }

      .rank-name {
        font-size: 14px;
        color: ${(props) => props.textColor};
      }

      .selected-ranking {
        width: 100%;

        height: 3px;
        background-color: ${(props) => props.textColor};
        border: none;
        border-radius: 2px;
        margin-top: 5px;

        transition: width 0.3s ease, opacity 0.3s ease;
      }
    }
  }

  .ranking {
    max-height: 560px;
    overflow-y: auto;
    padding-right: 10px;

    .team-ranking {
      display: flex;
      background-color: ${(props) => darken(0.2, props.primaryColor)};
      color: ${(props) => props.textColor};
      width: 400px;
      height: auto;
      gap: 10px;
      margin-bottom: 6px;
      font-size: 12px;
      padding: 4px 0;
      border-radius: 12px;
      align-items: center;
      position: relative;

      .team-position {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .team-logo {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
      }

      .flag {
        display: flex;
        justify-content: center;
        width: 24px;
        height: 24px;
        position: absolute;
        right: 10px;
      }

      .team-name {
        display: flex;
        align-items: center;
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
    background: ${(props) => darken(0.2, props.primaryColor)};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;
