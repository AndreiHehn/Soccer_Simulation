import styled from "styled-components";

interface Props {
  isOpen: boolean;
}

export const Container = styled.aside<Props>`
  width: ${(props) => (props.isOpen ? "275px" : "58px")};
  height: 100dvh;
  position: absolute;
  padding: 4px;
  background-color: var(--app-primary);
  border-right: 3px solid #7aff1cff;
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
      color: white;
    }
  }

  .separator {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    margin-bottom: 5px;

    .section-category {
      font-size: 16px;
      color: white;
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

  .settings {
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
