import styled from "styled-components";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FacebookLogin from "../component/FacebookLogin";
import GoogleLogin from "../component/GoogleLogin";
import {
  sendPhoneNumberAction,
  sendCodeAction,
  resendCodeAction,
  sendInfoAction,
} from "../action/userAction";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import LoadingBar from '../component/LoadingBar'
import { useEffect } from "react";

const SignupWrapper = styled.div``;

const SignupHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  background: white;
  z-index: 100;
`;

const SignupHeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;

  .div-home-link {
    display: flex;
    align-items: center;
    margin-left: 1.5rem;

    img {
      width: 3rem;
    }

    span {
      color: rgb(248, 74, 47);
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

  .text-signup {
    margin-left: 1rem;
    font-size: 1.5rem;
  }

  .support-link {
    margin-left: auto;
    margin-right: 1.5rem;
    color: rgb(248, 74, 47);
  }
`;

const SignupBody = styled.div`
  margin-top: 5rem;
  background: rgb(248, 74, 47);
`;

const SignupBodyContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  background: rgb(248, 74, 47);
  display: flex;
`;

const Card = styled.div`
  width: 25rem;
  background: white;
  margin: 5rem auto;
  display: flex;
  border-radius: 3px;
`;

const CardStep_1 = styled.div`
  margin: 5%;
  width: 90%;
  display: flex;
  flex-direction: column;

  .text-signup {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }

  input {
    margin-top: 1rem;
    border: 1px solid rgb(219, 219, 219);
    height: 2.5rem;
    padding-left: 0.5rem;

    &:hover {
      border-color: blue;
    }

    &:focus {
      border-color: black;
    }
  }

  .error-notify {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-alert {
      line-height: 0;
      margin-right: 0.5rem;
    }

    span {
      font-size: 0.9rem;
      color: red;
    }
  }

  .button-next {
    height: 2.5rem;
    background: rgb(243, 131, 108);
    color: white;
    font-weight: 600;

    &:hover {
      color: rgb(219, 219, 219);
    }
  }

  .div-or {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    .left {
      flex-grow: 4;
      border: 0.5px solid rgb(219, 219, 219);
    }

    .text {
      text-align: center;
      color: rgb(219, 219, 219);
    }

    .space {
      flex-grow: 1;
    }

    .right {
      flex-grow: 4;
      border: 0.5px solid rgb(219, 219, 219);
    }
  }

  .div-login-with {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .condition-link {
    margin-top: 1rem;
    text-align: center;

    a {
      color: initial;
      color: rgb(243, 131, 108);
    }
  }

  .signin-link {
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;

    a {
      color: rgb(243, 131, 108);
    }
  }
`;

const CardStep_2 = styled.div`
  margin: 5%;
  width: 90%;
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
    font-size: 1.4rem;
  }

  .subtitle {
    margin: 1rem 1rem 0 1rem;
    text-align: center;

    .a {
      display: block;
    }
  }

  input {
    margin-top: 1rem;
    border: 1px solid rgb(219, 219, 219);
    height: 2.5rem;
    padding-left: 0.5rem;

    &:hover {
      border-color: blue;
    }

    &:focus {
      border-color: black;
    }
  }

  .error-notify {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-alert {
      line-height: 0;
      margin-right: 0.5rem;
    }

    span {
      font-size: 0.9rem;
      color: red;
    }
  }

  .modal-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(0, 0, 0, 0.5);
    display: flex;

    .modal {
      width: 20rem;
      margin: auto;
      background: white;

      .modal-container {
        width: 90%;
        margin: 5%;
        display: flex;
        flex-direction: column;

        span {
          font-size: 1.5rem;
          text-align: center;
        }

        button {
          margin-top: 1rem;
          margin-bottom: 1rem;
          height: 2.5rem;
          background: rgb(243, 131, 108);
          color: white;
          font-size: 1.2rem;
          &:hover {
            color: rgb(219, 219, 219);
          }
        }
      }
    }
  }

  .button-next {
    height: 2.5rem;
    background: rgb(243, 131, 108);
    color: white;
    font-weight: 600;

    &:hover {
      color: rgb(219, 219, 219);
    }
  }

  .resend-code {
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;

    .b {
      color: rgb(243, 131, 108);
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const CardStep_3 = styled.div`
  margin: 5%;
  width: 90%;
  display: flex;
  flex-direction: column;

  .icon {
    line-height: 0;
    position: absolute;
    right: 10px;
    &:hover {
      cursor: pointer;
    }
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
  }

  .subtitle {
    margin-top: 0.5rem;
    text-align: center;
  }

  input {
    border: 1px solid rgb(219, 219, 219);
    height: 2.5rem;
    padding-left: 0.5rem;
    margin-left: 1rem;
    flex-grow: 1;

    &:hover {
      border-color: blue;
    }

    &:focus {
      border-color: black;
    }
  }

  .first-name {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }

  .error-notify {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-alert {
      line-height: 0;
      margin-right: 0.5rem;
    }

    span {
      font-size: 0.9rem;
      color: red;
    }
  }

  .last-name {
    display: flex;
    align-items: center;
  }

  .email {
    display: flex;
    align-items: center;
  }

  .password {
    display: flex;
    align-items: center;

    position: relative;
  }

  .repassword {
    display: flex;
    align-items: center;

    position: relative;
  }

  .phone-number {
    display: flex;
    align-items: center;

    .b {
      margin-left: auto;
    }
  }

  button {
    height: 2.5rem;
    background: rgb(243, 131, 108);
    color: white;
    font-weight: 600;
    margin-bottom: 1rem;
    margin-top: 1rem;

    &:hover {
      color: rgb(219, 219, 219);
    }
  }
`;

export default function SignupScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [isResend, setIsResend] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isPEmpty, setIsPEmpty] = useState(true);
  const [repassword, setRepassword] = useState("");
  const [isShowRepassword, setIsShowRepassword] = useState(false);
  const [isRPEmpty, setIsRPEmpty] = useState(true);
  const dispatch = useDispatch();

  function handleSendPhoneNumber() {
    dispatch(sendPhoneNumberAction(phoneNumber, setStep, setError));
  }

  function handleSendCode() {
    sendCodeAction(phoneNumber, code, setStep, setError);
  }

  function handleResendCode() {
    dispatch(resendCodeAction(phoneNumber, setIsResend));
  }

  function handleSendInfo() {
    dispatch(
      sendInfoAction(
        phoneNumber,
        firstName,
        lastName,
        password,
        repassword,
        setError
      )
    );
  }

  useEffect(() => {
    document.title = "Shopee - Đăng ký"
  }, [])

  return (
    <SignupWrapper className="signup">
      <LoadingBar />
      <SignupHeader>
        <SignupHeaderContainer className="signup-header-container">
          <Link to="/" className="div-home-link">
            <img src="/shopee.png" />
            <span>Shopee</span>
          </Link>
          <span className="text-signup">Đăng Ký</span>
          <Link className="support-link" to="/">
            Cần trợ giúp?
          </Link>
        </SignupHeaderContainer>
      </SignupHeader>
      <SignupBody className="signup-body">
        <SignupBodyContainer>
          <Card className="card">
            {step === 1 && (
              <CardStep_1>
                <span className="text-signup">Đăng Ký</span>
                <input
              
                  type="text"
                  name="phone" defaultValue="(+84) "
                  placeholder="Số Điện Thoại"
                  onChange={(e) => {
                    setError("");
                    setPhoneNumber(e.target.value.trim());
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendPhoneNumber();
                    }
                  }}
                />
                <div className="error-notify">
                  {error === "phoneNumberEmpty" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Vui lòng nhập số điện thoại</span>
                    </>
                  )}
                  {error === "phoneNumberAlreadyUse" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Số điện thoại đã được sử dụng</span>
                    </>
                  )}
                  {error === "invalidPhoneNumber" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Số điện thoại không hợp lệ</span>
                    </>
                  )}
                    {error === "wrongPhoneNumberFormat" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Sai định dạng số điện thoại</span>
                    </>
                  )}
                </div>
                <button
                  className="button-next"
                  onClick={handleSendPhoneNumber}
                >
                  TIẾP THEO
                </button>
                <div className="div-or">
                  <span className="space"></span>
                  <span className="left"></span>
                  <span className="space"></span>
                  <span className="text">HOẶC</span>
                  <span className="space"></span>
                  <span className="right"></span>
                  <span className="space"></span>
                </div>
                <div className="div-login-with">
                  <FacebookLogin />
                  <GoogleLogin />
                </div>
                <div className="condition-link">
                  Bằng việc đăng ký, bạn đã đồng ý với Shopee về <Link to="/terms-of-service">Điều khoản dịch
                  vụ</Link> & <Link to="/privacy-policy">Chính sách bảo mật</Link>
                </div>
                <div className="signin-link">
                  <span>Bạn đã có tài khoản? &emsp;</span>
                  <Link to="/customer/signin">Đăng nhập</Link>
                </div>
              </CardStep_1>
            )}
            {step === 2 && (
              <CardStep_2>
                <span className="title">Vui Lòng Nhập Mã Xác Minh</span>
                <span className="subtitle">
                  <span className="a">
                    Chúng tôi đã gửi {isResend && "lại"} một mã tồn tại trong 5
                    phút về số điện thoại {phoneNumber},
                  </span>
                  <span className="b">nhập mã xác nhận</span>
                </span>
                <input
                  type="text"
                  name="code"
                  placeholder="Mã xác nhận"
                  onChange={(e) => {
                    setError("");
                    setCode(e.target.value.trim());
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendCode();
                    }
                  }}
                />
                <div className="error-notify">
                  {error === "codeEmpty" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Mã xác nhận không được để trống</span>
                    </>
                  )}
                  {error === "codeIncorrect" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Mã xác nhận không chính xác</span>
                    </>
                  )}
                  {error === "timeoutVerifyCode" && (
                    <div className="modal-wrapper">
                      <div className="modal">
                        <div className="modal-container">
                          <span>Hết thời gian nhập mã, đăng ký lại</span>
                          <button onClick={() => window.location.reload()}>
                            OK
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button className="button-next" onClick={handleSendCode}>
                  TIẾP THEO
                </button>
                <div className="resend-code">
                  <span className="a">Bạn chưa nhận được mã? &emsp;</span>
                  <span onClick={handleResendCode} className="b">
                    Gửi lại mã
                  </span>
                </div>
              </CardStep_2>
            )}
            {step === 3 && (
              <CardStep_3>
                <span className="title">Đăng Ký</span>
                <span className="subtitle">Nhập thông tin đăng ký</span>
                <div className="first-name">
                  <span>Họ*</span>
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => {
                      setError("");
                      setFirstName(e.target.value.trim());
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendInfo();
                      }
                    }}
                  />
                </div>
                <div className="error-notify">
                  {error === "firstNameEmpty" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Họ không được để trống</span>
                    </>
                  )}
                </div>
                <div className="last-name">
                  <span>Tên*</span>
                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) => {
                      setError("");
                      setLastName(e.target.value.trim());
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendInfo();
                      }
                    }}
                  />
                </div>
                <div className="error-notify">
                  {error === "lastNameEmpty" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Tên không được để trống</span>
                    </>
                  )}
                </div>
                <div className="password">
                  <span>Mật khẩu*</span>
                  <input
                    {...(isShowPassword
                      ? { type: "text" }
                      : { type: "password" })}
                    name="password"
                    onChange={(e) => {
                      setError("");
                      setPassword(e.target.value.trim());
                      if (e.target.value) {
                        setIsPEmpty(false);
                      } else {
                        setIsPEmpty(true);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendInfo();
                      }
                    }}
                  />
                  {isShowPassword ? (
                    <span
                      style={{ ...(isPEmpty && { display: "none" }) }}
                      className="icon"
                      onClick={() => setIsShowPassword(false)}
                    >
                      <AiOutlineEyeInvisible />
                    </span>
                  ) : (
                    <span
                      style={{ ...(isPEmpty && { display: "none" }) }}
                      className="icon"
                      onClick={() => setIsShowPassword(true)}
                    >
                      <AiOutlineEye />
                    </span>
                  )}
                </div>
                <div className="error-notify">
                  {error === "passwordEmpty" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Mật khẩu không được để trống</span>
                    </>
                  )}
                  {error === "invalidPassword" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>
                        Mật khẩu phải tối thiểu 8 ký tự, bao gồm chữ hoa, chữ
                        thường và chữ số
                      </span>
                    </>
                  )}
                </div>
                <div className="repassword">
                  <span>Nhập lại mật khẩu*</span>
                  <input
                    {...(isShowRepassword
                      ? { type: "text" }
                      : { type: "password" })}
                    name="repassword"
                    onChange={(e) => {
                      setError("");
                      setRepassword(e.target.value.trim());
                      if (e.target.value) {
                        setIsRPEmpty(false);
                      } else {
                        setIsRPEmpty(true);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendInfo();
                      }
                    }}
                  />
                  {isShowRepassword ? (
                    <span
                      style={{ ...(isRPEmpty && { display: "none" }) }}
                      className="icon"
                      onClick={() => setIsShowRepassword(false)}
                    >
                      <AiOutlineEyeInvisible />
                    </span>
                  ) : (
                    <span
                      style={{ ...(isRPEmpty && { display: "none" }) }}
                      className="icon"
                      onClick={() => setIsShowRepassword(true)}
                    >
                      <AiOutlineEye />
                    </span>
                  )}
                </div>
                <div className="error-notify">
                  {error === "repasswordEmpty" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Mật khẩu không được để trống</span>
                    </>
                  )}
                  {error === "passwordNotMatch" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Mật khẩu không khớp</span>
                    </>
                  )}
                </div>
                <div className="phone-number">
                  <span className="a">Số điện thoại</span>
                  <span className="b">{phoneNumber}</span>
                </div>
                <button onClick={handleSendInfo}>ĐĂNG KÝ</button>
              </CardStep_3>
            )}
          </Card>
        </SignupBodyContainer>
      </SignupBody>
      <Footer />
    </SignupWrapper>
  );
}
