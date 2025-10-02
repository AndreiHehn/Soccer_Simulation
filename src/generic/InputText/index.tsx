import { Container } from "./styles";

interface Props {
  backgroundColor: string;
  borderColor?: string;
  borderRadius?: string;
  height?: string;
  width?: string;
  fontSize?: string;
  fontColor?: string;
  maxLenght?: number;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText({
  backgroundColor,
  borderColor,
  borderRadius,
  height,
  width,
  fontSize,
  fontColor,
  maxLenght,
  defaultValue,
  placeholder,
  onChange,
}: Props) {
  return (
    <Container
      backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $height={height}
      $width={width}
      $fontSize={fontSize ?? "12px"}
      $fontColor={fontColor}
    >
      <input
        type="text"
        onChange={onChange}
        maxLength={maxLenght}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </Container>
  );
}
