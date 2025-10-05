import styled from "styled-components";

export const Container = styled.div`
  .section-separator {
    margin-top: 10px;

    .section-title {
      color: var(--text-primary);
      font-size: 14px;
      font-weight: 600;
    }

    .section-line {
      width: 100%;
      height: 0;
      border: none;
      border-top: 1px solid var(--text-primary);
      margin-bottom: 10px;
    }
  }

  .theme-radios {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .footer-buttons {
    display: flex;
    justify-content: end;
    margin-top: 10px;
    gap: 10px;
  }
`;
