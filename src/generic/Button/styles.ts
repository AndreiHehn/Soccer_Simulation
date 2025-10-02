import styled from "styled-components";

interface Props {
  color: string;
  $borderRadius: string;
  $margin: string;
  $width: string;
  $height: string;
}

export const Container = styled.button<Props>`
  color: #ffffff;
  background-color: ${({ color }) =>
    color == "red"
      ? "#FF0000"
      : color == "blue"
      ? "#0963CE"
      : color == "green"
      ? "#06BD70"
      : color == "gray"
      ? "#71717A"
      : null};

  border: none;
  border-radius: ${(props) => props.$borderRadius};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};

  padding: 3px 12px;
  margin: ${(props) => props.$margin};

  line-height: 24px;
  font-weight: 500;
  font-size: 14px;
  font-family: "Segoe UI";
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: ${({ color }) =>
      color == "red"
        ? "#AA0505"
        : color == "blue"
        ? "#022F64"
        : color == "green"
        ? "#037746"
        : color == "gray"
        ? "#2f3640"
        : null};
  }

  &:disabled {
    background-color: ${({ color }) =>
      color == "red"
        ? "#fa8989"
        : color == "blue"
        ? "#a3a2fc"
        : color == "green"
        ? "#abffb6"
        : color == "gray"
        ? "#e8e8e8"
        : null};

    cursor: not-allowed;
  }
`;
