import styled from "styled-components";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { handleChangeProfileAction, h } from "../action/userAction";
import { useEffect } from "react";

const ProfileUserWrapper = styled.div`
  .redirect-seller {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;

    a {
      color: blue;
    }
  }

  .body {
    min-width: 1200px;
    margin-top: 8rem;
    background: rgb(240, 240, 240);

    .ab {
      height: 2rem;
    }

    .card {
      width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 3px;

      .card-header {
        h1 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        span {
          margin-top: 1rem;
        }
      }

      .hr-top {
        margin: 2rem 1rem;
        border: 0.1px solid rgb(219, 219, 219);
      }
    }
  }
`;

const CardBody = styled.div`
  display: flex;

  input {
    border: 1px solid rgb(219, 219, 219);
    height: 2.5rem;
    padding-left: 0.5rem;
    margin-left: 1rem;
    &:hover {
      border-color: blue;
    }

    &:focus {
      border-color: black;
    }
  }

  .card-content {
    width: 60%;
    display: flex;
    flex-direction: column;

    .first-name {
      display: flex;

      span {
        width: 20%;
        line-height: 2.5rem;
        text-align: right;
      }

      input {
        flex-grow: 1;
      }
    }

    .error-notify {
      height: 2rem;
      display: flex;
      align-items: center;

      span {
        margin-left: calc(20% + 1rem);
        color: red;
      }
    }

    .last-name {
      display: flex;

      span {
        width: 20%;
        line-height: 2.5rem;
        text-align: right;
      }

      input {
        flex-grow: 1;
      }
    }

    .email {
      display: flex;

      div {
        display: flex;

        margin-left: 1rem;

        a {
          margin-left: 1rem;
          color: blue;
        }
      }

      .a {
        width: 20%;
        text-align: right;
      }

      > a {
        margin-left: 1rem;
        color: blue;
      }
    }

    .phone-number {
      display: flex;
      margin-top: 1rem;

      div {
        display: flex;

        margin-left: 1rem;

        a {
          margin-left: 1rem;
          color: blue;
        }
      }

      .a {
        width: 20%;
        text-align: right;
      }

      > a {
        margin-left: 1rem;
        color: blue;
      }
    }

    .shop-name {
      display: flex;
      margin-top: 2rem;

      span {
        width: 20%;
        line-height: 2.5rem;
        text-align: right;
      }

      input {
        flex-grow: 1;
      }
    }

    .address {
      display: flex;
      margin-top: 2rem;

      span {
        width: 20%;
        line-height: 2.5rem;
        text-align: right;
      }

      input {
        flex-grow: 1;
      }
    }

    .button-save {
      width: 10rem;
      height: 2.5rem;
      margin-left: auto;
      margin-right: auto;
      background: rgb(248, 74, 47);
      color: white;
      font-size: 1.2rem;
      margin-top: 2rem;

      &:hover {
        color: rgb(219, 219, 219);
      }
    }
  }

  hr {
    border: 0.1px solid rgb(219, 219, 219);
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .card-img {
    width: 40%;
    display: flex;
    flex-direction: column;

    input {
      all: initial;
    }

    .img-buyer {
      display: flex;
      align-items: center;

      img {
        height: 5rem;
        width: 5rem;
        border-radius: 50%;
        object-fit: cover;
      }

      div {
        margin-left: 5rem;
        flex-grow: 1;
        height: 3rem;
        display: flex;
        align-items: center;

        input {
          display: none;
        }

        button {
          height: 2.5rem;
          width: 6rem;

          label {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 2.5rem;
            background: rgb(248, 74, 47);
            color: white;
            font-weight: 500;
            border-radius: 3px;

            &:hover {
              cursor: pointer;
              color: rgb(219, 219, 219);
            }
          }
        }
      }
    }

    .img-shop {
      display: flex;
      margin-top: 2rem;
      align-items: center;

      img {
        height: 5rem;
        width: 5rem;
        border-radius: 50%;
        object-fit: cover;
      }

      div {
        margin-left: 5rem;
        flex-grow: 1;
        height: 3rem;
        display: flex;
        align-items: center;

        input {
          display: none;
        }

        button {
          height: 2.5rem;
          width: 6rem;

          label {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 2.5rem;
            background: rgb(248, 74, 47);
            color: white;
            font-weight: 500;
            border-radius: 3px;

            &:hover {
              cursor: pointer;
              color: rgb(219, 219, 219);
            }
          }
        }
      }
    }

    .h {
      width: 35%;
      color: rgb(150, 150, 150);
    }
  }
`;

export default function ProfileUserScreen() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [shopName, setShopName] = useState(user.shop.shopName || "");
  const [error, setError] = useState("");
  const [address, setAddress] = useState(user.address || "");
  const [previewImgBuyer, setPreviewImgBuyer] = useState("");
  const [previewImgShop, setPreviewImgShop] = useState("");

  const formData = new FormData();
  formData.append("_id", user._id);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("shopName", shopName);
  formData.append("address", address);
  formData.append("imgBuyer", previewImgBuyer);
  formData.append("imgShop", previewImgShop);

  const emailHidden = user.email
    ? `${user.email.slice(0, 2)}******${user.email.slice(
        user.email.indexOf("@")
      )}`
    : "";

  const phoneNumberHidden = user.phoneNumber
    ? `******${user.phoneNumber.slice(user.phoneNumber.length - 3)}`
    : "";

  function handleChangeProfile() {
    dispatch(
      handleChangeProfileAction(formData, setPreviewImgBuyer, setPreviewImgShop)
    );
  }

  useEffect(() => {
    document.title = "Shopee - Thông tin cá nhân"
  },[ ])

  return (
    <ProfileUserWrapper>
      <Header />
      <div className="body">
        <div className="ab"></div>
        <div className="redirect-seller">
          <Link to="/seller/overview">CHUYỂN SANG KÊNH NGƯỜI BÁN</Link>
        </div>
        <div className="ab"></div>
        <div className="card">
          <div className="card-header">
            <h1 className="title">Hồ Sơ Của Tôi</h1>
            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
          </div>
          <hr className="hr-top" />
          <CardBody className="card-body">
            <div className="card-content">
              <div className="first-name">
                <span>Họ</span>
                <input
                  type="text"
                  name="fistName"
                  defaultValue={user.firstName}
                  onChange={(e) => {
                    setError("");
                    setFirstName(e.target.value.trim());
                  }}
                />
              </div>
              <div className="error-notify">
                {error === "firstNameEmpty" && (
                  <span>Họ không được để trống</span>
                )}
              </div>
              <div className="last-name">
                <span>Tên</span>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={user.lastName}
                  onChange={(e) => {
                    setError("");
                    setLastName(e.target.value.trim());
                  }}
                />
              </div>
              <div className="error-notify">
                {error === "lastNameEmpty" && (
                  <span>Tên không được để trống</span>
                )}
              </div>
              <div className="email">
                <span className="a">Email</span>
                {user.email ? (
                  <div>
                    <span>{emailHidden}</span>
                    <Link to="/customer/profile/email">Thay đổi</Link>
                  </div>
                ) : (
                  <Link to="/customer/profile/email">Thêm</Link>
                )}
              </div>
              <div className="phone-number">
                <span className="a">Số Điện Thoại</span>
                {user.phoneNumber ? (
                  <div>
                    <span>{phoneNumberHidden}</span>
                    <Link to="/customer/profile/phone-number">Thay đổi</Link>
                  </div>
                ) : (
                  <Link to="/customer/profile/phone-number">Thêm</Link>
                )}
              </div>
              <div className="shop-name">
                <span>Tên Shop</span>
                <input
                  type="text"
                  name="shopName"
                  defaultValue={user.shop.shopName}
                  onChange={(e) => {
                    setError("");
                    setShopName(e.target.value.trim());
                  }}
                />
              </div>
              <div className="address">
                <span>Địa chỉ</span>
                <input
                  type="text"
                  name="address"
                  defaultValue={user.address}
                  onChange={(e) => {
                    setError("");
                    setAddress(e.target.value.trim());
                  }}
                />
              </div>
              <button className="button-save" onClick={handleChangeProfile}>
                Lưu
              </button>
            </div>
            <hr />
            <div className="card-img">
              <div className="img-buyer">
                <span className="h">Ảnh Khách Hàng</span>
                {previewImgBuyer ? (
                  <img src={URL.createObjectURL(previewImgBuyer)} />
                ) : (
                  <img src={user.imgBuyer} />
                )}
                <div>
                  <input
                    id="buyer-img"
                    type="file"
                    onChange={(e) => {
                      setPreviewImgBuyer(e.target.files[0] || "");
                    }}
                  />
                  <button>
                    <label htmlFor="buyer-img">CHỌN ẢNH</label>
                  </button>
                </div>
              </div>
              <div className="img-shop">
                <span className="h">Ảnh Shop</span>
                {previewImgShop ? (
                  <img src={URL.createObjectURL(previewImgShop)} />
                ) : (
                  <img src={user.shop.imgShop} />
                )}
                <div>
                  <input
                    id="shop-img"
                    type="file"
                    onChange={(e) => {
                      setPreviewImgShop(e.target.files[0] || "");
                    }}
                  />
                  <button>
                    <label htmlFor="shop-img">CHỌN ẢNH</label>
                  </button>
                </div>
              </div>
            </div>
          </CardBody>
        </div>
        <div className="ab"></div>
      </div>
      <Footer />
    </ProfileUserWrapper>
  );
}
