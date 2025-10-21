import styled from "styled-components";

interface Props {
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

  .teams-selection {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px 16px;
  }
`;
