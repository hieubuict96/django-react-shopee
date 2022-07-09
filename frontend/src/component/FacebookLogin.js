import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { signinFacebookAction } from "../action/userAction";
import styled from "styled-components";

const FacebookDiv = styled.div`
  height: 100%;

  span {
    display: inline-block !important;
    height: 100% !important;

    button {
      height: 100% !important;
      border-radius: 3px !important;
      width: 9rem;
      font-size: 0.9rem;
    }
  }
`;

export default function LoginFacebook() {
  const dispatch = useDispatch();

  function responseFacebook(data) {
    dispatch(signinFacebookAction(data));
  }

  return (
    <FacebookDiv className="facebook-div">
      <FacebookLogin
        appId="356231529742931"
        autoLoad={false} //nên cho tất cả google và fb về false cho tính năng autoLoad và isSignedIn
        fields="name,email,picture,id"
        callback={responseFacebook}
        textButton="Facebook"
      />
    </FacebookDiv>
  );
}
