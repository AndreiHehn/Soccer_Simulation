import styled from "styled-components";

interface Props {
  secondaryColor: string;
  tertiaryColor: string;
  backgroundColor: string;
  textColor: string;
}

export const Container = styled.table<Props>`
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  border-spacing: 0 2px;
  margin-top: 40px;

  .standings-header {
    border-radius: 15px 5px 0 0;
    height: 28px;
    color: ${(props) => props.textColor};
    background-color: ${(props) => props.secondaryColor};
  }

  .header-item,
  .standings-item {
    width: 45px;
    text-align: center;
    padding: 3px;
  }

  .standings {
    height: 28px;
    background-color: ${(props) => props.tertiaryColor};
    margin-bottom: 1px;
  }

  .standings-points {
    text-align: center;
  }

  #Team-column {
    width: 300px;
  }

  .standings-teams {
    display: flex;
    align-items: center;
    height: 28px;
  }

  .team-logo {
    width: 24px;
    height: 24px;
  }

  .team-name {
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
  }
`;
