import styled from "styled-components";

interface Props {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  textColor: string;
}

export const Container = styled.section<Props>`
  width: 400px;
  height: 225px;
  background-color: ${(props) => props.tertiaryColor};
  padding: 10px;
  border-radius: 16px;
  user-select: none;

  .card-header {
    display: flex;
  }

  .cardTitle {
    color: ${(props) => props.textColor};
    width: 100%;
    text-align: center;
    font-size: 16px;
    height: 30px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${(props) => props.textColor};
  }

  .ordination-icon {
    path {
      fill: ${(props) => props.secondaryColor};
    }
    cursor: pointer;
  }

  .stats {
    height: 165px;
    overflow-y: scroll;
  }

  .stat-line {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
  }

  .team-logo {
    width: 25px;
    margin-right: 10px;
  }

  .team-name {
    color: ${(props) => props.textColor};
  }

  .value {
    position: absolute;
    right: 10px;
    color: ${(props) => props.textColor};
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
    background: ${(props) => props.secondaryColor};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;
