import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  .recharts-legend-wrapper {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 12px;
  }

  .recharts-pie *,
  .recharts-wrapper svg {
    outline: none !important;
  }

  .recharts-surface {
    width: fit-content;
    height: fit-content;
  }
`;
