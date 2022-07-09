import styled from "styled-components";
import { useSelector } from "react-redux";

const LoadingBarWrapper = styled.div`
  display: ${(props) => {
    if (props.isLoading) {
      return "block";
    }

    return "none";
  }};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 0.15rem;
  z-index: 200;

  .progress {
    height: 100%;
    background: rgb(27,116,228);
    animation-name: progress;
    animation-duration: 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
`;

export default function LoadingBar() {
  const user = useSelector((s) => s.user);

  return (
    <LoadingBarWrapper className="progress-bar" isLoading={user.isLoading}>
      <div className="progress"></div>
    </LoadingBarWrapper>
  );
}
