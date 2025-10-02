import { Container } from "./styles";
import WarningIcon from "../../assets/icons/WarningIcon.png";
import { Button } from "../Button";

interface Props {
  textMessage: string;
  textButton1: string;
  textButton2?: string;
  onClick1: (e: unknown) => void;
  onClick2?: (e: unknown) => void;
}
export function ModalMessage({
  textMessage,
  onClick1,
  onClick2,
  textButton1,
  textButton2,
}: Props) {
  return (
    <Container>
      <section className="content">
        <img className="warningIcon" src={WarningIcon} alt="Warning" />
        <h2 className="messageText">{textMessage}</h2>
      </section>
      <footer className="modalFooter">
        <Button
          color="gray"
          functionButton={onClick1}
          borderRadius="6px"
          width="80px"
        >
          {textButton1}
        </Button>
        {textButton2 && onClick2 ? (
          <Button
            color="red"
            functionButton={onClick2}
            borderRadius="6px"
            width="80px"
          >
            {textButton2}
          </Button>
        ) : null}
      </footer>
    </Container>
  );
}
