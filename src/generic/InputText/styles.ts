import styled from "styled-components";

interface Props {
  backgroundColor: string;
  $borderColor: string;
  $borderRadius: string;
  $height: string;
  $width: string;
  $fontSize: string;
  $fontColor: string;
}
export const Container = styled.div<Props>`
  input[type="text"] {
    background-color: ${(props) => props.backgroundColor};
    border: 1px solid;
    border-radius: ${(props) => props.$borderRadius};
    border-color: ${(props) => props.$borderColor};
    height: ${(props) => props.$height};
    width: ${(props) => props.$width};
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: ${(props) => props.$fontSize};
    color: ${(props) => props.$fontColor};
    caret-color: ${(props) => props.$fontColor};
    padding: 4px 6px;

    ::placeholder {
      color: #71717a;
    }

    &:focus {
      outline: none;
      border-color: var(--text-primary);
    }
  }
`;
