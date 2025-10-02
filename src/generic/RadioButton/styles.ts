import styled from "styled-components";

interface Props {
  radioColor: string;
  radioBGColor: string;
}

export const Container = styled.label<Props>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Segoe UI";
  font-size: 14px;
  width: fit-content;
  color: var(--text-primary);
  cursor: pointer;

  input[type="radio"] {
    appearance: none;
    background-color: ${(props) => props.radioBGColor};
    margin: 0;
    width: 18px;
    height: 18px;
    border: 1px solid ${(props) => props.radioColor};
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }

    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: scale(0);
      transition: transform 120ms ease-in-out;
      box-shadow: inset 1em 1em ${(props) => props.radioColor};
    }

    &:checked::before {
      transform: scale(1);
    }
  }
`;
