import styled from "styled-components";
import { Link } from "react-router-dom";

const CardLoadedWrapper = styled.div`
  width: ${(props) => {
    return `${props.width}`;
  }};
  height: ${(props) => {
    return `${props.height}`;
  }};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border: 0.1px solid rgb(245, 245, 245);

  &:hover {
    transition: 0.3s 0s all linear;
    box-shadow: 0px 0px 5px 1px rgb(200, 200, 200);
  }

  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .img-div {
      display: flex;
      height: 70%;

      img {
        width: 6rem;
        height: 6rem;
        margin: auto;
      }
    }

    .text {
      margin-top: 0.5rem;
      flex-grow: 1;
      display: flex;

      span {
        margin: auto;
        text-align: center;
      }
    }
  }
`;

const CardLoadingWrapper = styled.div`
  width: ${(props) => {
    return `${props.width}`;
  }};
  height: ${(props) => {
    return `${props.height}`;
  }};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border: 0.1px solid rgb(245, 245, 245);

  .img-div-loading {
    display: flex;
    height: 70%;

    div {
      width: 75%;
      height: 75%;
      margin: auto;
      background: rgb(200, 200, 200);
    }
  }

  .text-loading {
    display: flex;
    flex-grow: 1;

    span {
      height: 1rem;
      width: 70%;
      margin: auto;
      background: rgb(200, 200, 200);
      border-radius: 3px;
    }
  }
`;

export function CardLoaded(props) {
  return (
    <CardLoadedWrapper
      className="card"
      height={props.height}
      width={props.width}
    >
      <Link to={props.to}>
        <div className="img-div">
          <img src={props.src} />
        </div>
        <div className="text">
          <span>{props.name}</span>
        </div>
      </Link>
    </CardLoadedWrapper>
  );
}

export function CardLoading(props) {
  return (
    <CardLoadingWrapper
      className="card-loading"
      height={props.height}
      width={props.width}
    >
      <div className="img-div-loading">
        <div></div>
      </div>
      <div className="text-loading">
        <span></span>
      </div>
    </CardLoadingWrapper>
  );
}
