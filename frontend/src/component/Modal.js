import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0, 0.5);
  z-index: 150;
  display: flex;
`;

const ModalContainer = styled.div`
  height: ${(props) => {
    return `${props.height}`;
  }};
  width: ${(props) => {
    return `${props.width}`;
  }};
  background: white;
  padding: 1.5rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
`;

export default function Modal(props) {
  return (
    <ModalWrapper className="modal-wrapper">
      <ModalContainer
        className="modal-container"
        width={props.width}
        height={props.height}
      >
        {props.children}
      </ModalContainer>
    </ModalWrapper>
  );
}
