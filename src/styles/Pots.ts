import { darken, lighten } from "polished";
import styled from "styled-components";

interface Props {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  backgroundColor: string;
  textColor: string;
}

export const Container = styled.main<Props>`
  .main-content {
    display: flex;
    align-items: center;
  }
  .pot-container,
  .group-container {
    display: flex;

    .pot {
      margin-right: 10px;
    }

    .pot-title,
    .group-title {
      font-size: 16px;
      color: ${(props) => props.textColor};
      width: auto;
      background-color: ${(props) => props.primaryColor};
      padding: 4px 5px;
      width: 250px;
      text-align: center;
      margin-bottom: 4px;
    }

    .pot-team,
    .group-team {
      background-color: ${(props) => props.tertiaryColor};
      display: flex;
      align-items: center;
      height: 40px;
      .team-name {
        font-size: 16px;
        color: ${(props) => props.textColor};
        padding: 4px 5px;
      }
      .team-logo {
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
    }
  }

  .group-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }

  .change-tab {
    width: 35px;
    height: 35px;
    background-color: ${(props) => props.tertiaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 35px / 2);

    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }

    svg path {
      fill: ${(props) => props.textColor};
    }
  }

  .pots-button {
    right: 100px;
  }

  .groups-button {
    left: 100px;
  }
  .buttons {
    position: absolute;
    bottom: 30px;
    width: 1040px;
    justify-content: center;
    display: flex;

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
`;
