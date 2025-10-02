import styled from "styled-components";

export const Container = styled.div`
  width: 300px;
  height: 175px;
  padding: 20px 20px 20px 20px;
  background-color: var(--modal-background);
  border-radius: 9px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: calc(50% - 175px / 2);
  left: calc(50% - 300px / 2);
  display: flex;
  flex-direction: column;
  justify-content: end;
  z-index: 12;
  .content {
    display: flex;

    .warningIcon {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }

    .messageText {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }
  }

  .modalFooter {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
  }
`;
