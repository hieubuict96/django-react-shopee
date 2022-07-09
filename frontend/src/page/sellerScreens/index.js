import styled from "styled-components";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AllProduct from "./AllProduct";
import AddProduct from "./AddProduct";
import Order from "./order";

const SellerScreenWrapper = styled.div`
  background: rgb(240, 240, 240);
`;

const BodySeller = styled.div`
  margin-top: 8rem;
  min-width: 1200px;
  background: rgb(240, 240, 240);
  padding-top: 2rem;
  padding-bottom: 2rem;

  .t {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .content-overview {
    margin-left: 3rem;
    background: white;
    flex-grow: 1;
  }
`;

const SideBar = styled.div`
  background: white;
  width: 15rem;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  border-radius: 3px;
  padding: 0.5rem;
  margin-bottom: auto;

  > div.title {
    height: 3rem;
    line-height: 3rem;
    display: flex;
    padding-left: 0.5rem;

    > a {
      width: 100%;
      color: rgb(153, 153, 166);
      font-weight: 500;
      font-size: 1rem;
    }

    &:hover {
      background: rgb(240, 240, 240);
      cursor: pointer;
    }
  }

  .one {
    background: ${(props) => {
      if (props.id === "overview") {
        return "rgb(245, 245, 245);";
      }
    }};
  }

  .two {
    background: ${(props) => {
      if (props.id === "order") {
        return "rgb(245, 245, 245);";
      }
    }};
  }

  .three {
    background: ${(props) => {
      if (props.id === "chat") {
        return "rgb(245, 245, 245);";
      }
    }};
  }

  > div.div-manage-products {
    display: flex;
    flex-direction: column;
    position: relative;

    .title {
      padding-left: 0.5rem;
      background: transparent;
      flex-grow: 1;
      height: 3rem;
      text-align: left;

      span {
        color: rgb(153, 153, 166);
        font-weight: 500;
        font-size: 1rem;
      }

      &:hover {
        background: rgb(240, 240, 240);
        cursor: pointer;
      }
    }

    .arrow-up {
      position: absolute;
      right: 1rem;
      top: 1.2rem;
      width: 0.6rem;
      height: 0.6rem;
      border-top: 0.15rem solid rgb(153, 153, 166);
      border-left: 0.15rem solid rgb(153, 153, 166);
      transform: rotate(45deg);
    }

    .arrow-down {
      position: absolute;
      right: 1rem;
      top: 1.2rem;
      width: 0.6rem;
      height: 0.6rem;
      border-top: 0.15rem solid rgb(153, 153, 166);
      border-left: 0.15rem solid rgb(153, 153, 166);
      transform: rotate(225deg);
    }

    .dropdown {
      display: flex;
      flex-direction: column;

      > div {
        height: 2rem;
        display: flex;
        line-height: 2rem;
        font-size: 0.9rem;

        &:hover {
          background: rgb(240, 240, 240);
        }
        a {
          width: 100%;
          padding-left: 2rem;
          color: black;
        }
      }

      .all-products {
        background: ${(props) => {
          if (props.id === "products" && props.type === "all-products") {
            return "rgb(245, 245, 245);";
          }
        }};
      }

      .add-products {
        background: ${(props) => {
          if (props.id === "products" && props.type === "add-products") {
            return "rgb(245, 245, 245);";
          }
        }};
      }
    }
  }
`;

const Content = styled.div`
  background: white;
  margin-left: auto;
  padding: 1.5rem;
  width: 55rem;
`;

export default function SellerScreens(props) {
  const { id } = useParams();
  const [query, setQuery] = useSearchParams();
  const type = query.get("type");
  const [isOpenProducts, setIsOpenProducts] = useState(
    id === "products" ? true : false
  );

  useEffect(() => {
    document.title = "Shopee - Kênh bán hàng"
  }, [])

  return (
    <SellerScreenWrapper className="seller-screen-wrapper">
      <Header />
      <BodySeller className="body-seller-screen">
        <div className="t">
          <SideBar className="side-bar" id={id} type={type}>
            <div className="title one">
              <Link to="/seller/overview">Tổng Quan Tài Khoản</Link>
            </div>
            <div className="div-manage-products">
              <button
                onClick={() => {
                  if (isOpenProducts) {
                    setIsOpenProducts(false);
                  } else {
                    setIsOpenProducts(true);
                  }
                }}
                className="title"
              >
                <span>Sản Phẩm</span>
              </button>
              {isOpenProducts ? (
                <span className="arrow-up"></span>
              ) : (
                <span className="arrow-down"></span>
              )}
              <div
                style={{ ...(!isOpenProducts && { display: "none" }) }}
                className="dropdown"
              >
                <div className="all-products">
                  <Link to="/seller/products?type=all-products">
                    Tất Cả Sản Phẩm
                  </Link>
                </div>
                <div className="add-products">
                  <Link to="/seller/products?type=add-products">
                    Thêm Sản Phẩm
                  </Link>
                </div>
              </div>
            </div>
            <div className="title two">
              <Link to="/seller/order">Quản Lý Đơn Hàng</Link>
            </div>
            <div className="title three">
              <Link to="/seller/chat">Chat Với Khách Hàng</Link>
            </div>
          </SideBar>
          <Content className="content">
            {id === "overview" && (
              <div className="content-overview">
                <h1>TỔNG QUAN TÀI KHOẢN</h1>
                <hr />
                <div>Đây là phần content</div>
              </div>
            )}
            {id === "products" && type === "all-products" && <AllProduct />}
            {id === "products" && type === "add-products" && <AddProduct />}
            {id === "order" && <Order />}
            {id === "chat" && <div className="chat"></div>}
          </Content>
        </div>
      </BodySeller>
      <Footer />
    </SellerScreenWrapper>
  );
}
