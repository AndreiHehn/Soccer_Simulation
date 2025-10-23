import styled from "styled-components";

interface Props {
  primaryColor: string;
  secondaryColor: string;
  matchBackground: string;
  textColor: string;
}

export const Container = styled.div<Props>`
  width: 700px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.matchBackground};
  color: ${(props) => props.textColor};
  position: relative;
  margin-bottom: 2px;
  user-select: none;

  .home-team,
  .away-team {
    display: flex;
    position: absolute;
    width: 300px;

    .home-team-name,
    .away-team-name {
      font-size: 18px;
      display: flex;
      align-items: center;
    }

    .home-team-logo,
    .away-team-logo {
      width: 30px;
      height: 30px;
    }
  }

  .home-team {
    left: 0;
    justify-content: flex-end;

    .home-team-logo {
      margin-left: 4px;
    }
  }

  .away-team {
    right: 0;
    justify-content: flex-start;

    .away-team-logo {
      margin-right: 4px;
    }
  }

  .results-container {
    display: flex;
    height: calc(100% - 4px);
    align-items: center;
    .home-goals,
    .away-goals {
      width: 30px;
      height: calc(100% - 4px);
      background-color: ${(props) => props.primaryColor};
      border: none;
      margin: 0 4px;
      caret-color: ${(props) => props.textColor};
      color: ${(props) => props.textColor};
      display: flex;
      text-align: center;
      border-radius: 4px;

      &:focus {
        border-color: green;
        outline: none;
        box-shadow: 0 0 2px ${(props) => props.secondaryColor}; /* adiciona um brilho leve */
      }
    }
  }

  .separator {
    width: 24px;
    text-align: center;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    /* margin: 0; */
  }
`;
