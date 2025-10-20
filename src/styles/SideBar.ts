import styled from "styled-components";

interface Props {
  isOpen: boolean;
  tournamentColor?: string;
  lineColor?: string;
}

export const Container = styled.aside<Props>`
  width: ${(props) => (props.isOpen ? "275px" : "58px")};
  height: 100dvh;
  position: absolute;
  top: 0;
  padding: 4px;
  background-color: ${(props) =>
    props.tournamentColor ? props.tournamentColor : "var(--app-primary)"};
  border-right: 3px solid
    ${(props) => (props.lineColor ? props.lineColor : "#7aff1c")};
  transition: 0.5s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;
    svg {
      width: ${(props) => (props.isOpen ? "120px" : "50px")};
      height: ${(props) => (props.isOpen ? "80px" : "50px")};

      path {
        fill: white;
      }
    }

    .app-name {
      display: ${(props) => (props.isOpen ? "flex" : "none")};
      font-size: 18px;
      color: var(--text-primary);
    }
  }

  .separator {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    margin-bottom: 5px;

    .section-category {
      font-size: 16px;
      color: var(--text-primary);
      font-weight: 400;
      display: flex;
      white-space: nowrap;
    }
  }

  .tournaments-buttons {
    margin-top: ${(props) => !props.isOpen && "30px"};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .settings-menu {
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
`;
