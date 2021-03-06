import { useState } from "react";
import styled from "styled-components";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { sendCodeToEmailAction, verifyCodeAction } from "../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const EmailWrapper = styled.div``;

const EmailBody = styled.div`
  margin-top: 8rem;
  background: rgb(240, 240, 240);
  display: flex;
  min-width: 1200px;
  padding-top: 2rem;
  padding-bottom: 2rem;

  .a {
    display: flex;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Card = styled.div`
  padding: 2rem;
  background: white;
  width: 30rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 3px;

  .card-header {
    h1 {
      margin: 0;
      font-weight: 500;
      font-size: 1.5rem;
    }
  }
`;

const Card_Step_1 = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  .title {
  }

  input {
    margin-top: 1.5rem;
    height: 2.5rem;
    border: 0.1px solid rgb(219, 219, 219);
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
    justify-content: center;
    align-items: center;

    span {
      color: red;
    }
  }

  button {
    height: 2.5rem;
    color: white;
    background: rgb(243, 131, 108);
    font-weight: 600;

    &:hover {
      color: rgb(219, 219, 219);
    }
  }
`;

const Card_Step_2 = styled.div`
  margin-top: 1rem;
  input {
    height: 2.5rem;
    border: 0.1px solid rgb(219, 219, 219);
    width: 100%;
    &:hover {
      border-color: blue;
    }

    &:focus {
      border-color: black;
    }
  }

  .old-email {
    margin-top: 1.5rem;
  }

  .new-email {
    margin-top: 1.5rem;
  }

  .error-notify {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: red;
    }
  }

  .button-next {
    button {
      width: 100%;
      height: 2.5rem;
      color: white;
      background: rgb(243, 131, 108);
      font-weight: 600;

      &:hover {
        color: rgb(219, 219, 219);
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0, 0.5);
  display: flex;
  z-index: 200;

  .card {
    margin: auto;
    background: white;
    width: 27rem;
    height: 10rem;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    .d {
      text-align: center;
      font-size: 1.4rem;
    }

    .e {
      margin-top: auto;
      text-align: center;

      button {
        width: 10rem;
        height: 2.5rem;
        color: white;
        font-weight: 600;
        background: rgb(243, 131, 108);

        &:hover {
          color: rgb(219, 219, 219);
        }
      }
    }
  }
`;

export default function EmailScreen() {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [codeOldEmail, setCodeOldEmail] = useState("");
  const [codeNewEmail, setCodeNewEmail] = useState("");
  const [isUpdateEmailSuccess, setIsUpdateEmailSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.user);

  function handleSendEmail() {
    dispatch(
      sendCodeToEmailAction(user._id, newEmail, password, setError, setStep)
    );
  }

  function handleVerifyCode() {
    dispatch(
      verifyCodeAction(
        user.email,
        codeOldEmail,
        newEmail,
        codeNewEmail,
        setError,
        user._id,
        setIsUpdateEmailSuccess
      )
    );
  }

  return (
    <EmailWrapper className="email-wrapper">
      <Header />
      {isUpdateEmailSuccess && (
        <Modal>
          <div className="card">
            <div className="d">
              <span>Thay ?????i ?????a Ch??? Email Th??nh C??ng</span>
            </div>
            <div className="e">
              <button
                onClick={() => {
                  navigate("/customer/profile")
                }}
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      )}
      <EmailBody className="email-body">
        <div className="a">
          <Card className="card">
            <div className="card-header">
              <h1>C???p Nh???t Email</h1>
            </div>
            {step === 1 && (
              <Card_Step_1 className="card-body-step-1">
                <div className="title">Nh???p ?????a ch??? Email c???n thay ?????i</div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email m???i"
                  onChange={(e) => {
                    setError("");
                    setNewEmail(e.target.value.trim());
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendEmail();
                    }
                  }}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="M???t kh???u x??c th???c"
                  onChange={(e) => {
                    setError("");
                    setPassword(e.target.value.trim());
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendEmail();
                    }
                  }}
                />
                <div className="error-notify">
                  {error === "emailEmpty" && (
                    <span>Email kh??ng ???????c ????? tr???ng</span>
                  )}
                  {error === "passwordEmpty" && (
                    <span>M???t kh???u kh??ng ???????c ????? tr???ng</span>
                  )}
                  {error === "invalidEmail" && (
                    <span>?????a ch??? Email kh??ng h???p l???</span>
                  )}
                  {error === "wrongPassword" && (
                    <span>M???t kh???u kh??ng ????ng</span>
                  )}
                  {error === "newEmailAlreadyUse" && (
                    <span>Email m???i ???? ???????c s??? d???ng</span>
                  )}
                </div>
                <button onClick={handleSendEmail}>TI???P THEO</button>
              </Card_Step_1>
            )}
            {step === 2 && (
              <Card_Step_2 className="card-body-step-2">
                <div className="text">
                  {user.email ? (
                    <span>Nh???p m?? x??c minh v???i Email c?? v?? m???i</span>
                  ) : (
                    <span>Nh???p m?? x??c minh v???i Email m???i</span>
                  )}
                </div>
                {user.email && (
                  <div className="old-email">
                    <input
                      type="text"
                      placeholder="M?? x??c minh Email c??"
                      onChange={(e) => {
                        setError("");
                        setCodeOldEmail(e.target.value.trim());
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleVerifyCode();
                        }
                      }}
                    />
                  </div>
                )}

                <div className="new-email">
                  <input
                    type="text"
                    placeholder="M?? x??c minh Email m???i"
                    onChange={(e) => {
                      setError("");
                      setCodeNewEmail(e.target.value.trim());
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleVerifyCode();
                      }
                    }}
                  />
                </div>
                <div className="error-notify">
                  {error === "verifyCodeFail" && (
                    <span>M?? v???a nh???p kh??ng ch??nh x??c</span>
                  )}
                  {error === "timeoutVerifyCode" && (
                    <Modal>
                      <div className="card">
                        <div className="d">
                          <span>H???t Th???i Gian Nh???p M??</span>
                        </div>
                        <div className="e">
                          <button
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </Modal>
                  )}
                  {error === "codeEmpty" && (
                    <span>M?? x??c minh kh??ng ???????c ????? tr???ng</span>
                  )}
                </div>
                <div className="button-next">
                  <button onClick={handleVerifyCode}>TI???P THEO</button>
                </div>
              </Card_Step_2>
            )}
          </Card>
        </div>
      </EmailBody>
      <Footer />
    </EmailWrapper>
  );
}
