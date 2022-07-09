import styled from "styled-components";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../action/productAction";
import { addToCartAction } from "../../action/cartAction";
import { FcCheckmark } from "react-icons/fc";
import { BsFillChatFill } from "react-icons/bs";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import { BsFacebook, BsMessenger } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { GrTwitter } from "react-icons/gr";

const ProductWrapper = styled.div`
  .notify-add-to-cart {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 150;

    .modal {
      width: 16rem;
      height: 5rem;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 5px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;

      .h1 {
        text-align: center;
        color: white;
      }

      .h2 {
        display: flex;
        margin-top: auto;

        span {
          margin: auto;
          height: 1.5rem;
          width: 1.5rem;
          line-height: 1.5rem;
          border-radius: 50%;
          display: flex;
          background: rgb(214, 200, 100);

          svg {
            margin: auto;
          }
        }
      }
    }
  }

  .product-not-found {
    background: rgb(245, 245, 245);
    margin-top: 8rem;
    padding: 2rem;
    min-width: 1200px;

    .a {
      margin-left: auto;
      margin-right: auto;
      width: calc(1200px - 4rem);
      height: 10rem;
      line-height: 10rem;
      text-align: center;
      font-size: 2rem;
      background: white;
    }
  }
`;

const Body = styled.div`
  margin-top: 8rem;
  background: rgb(245, 245, 245);
  min-width: 1200px;
  padding: 2rem;
`;

const BodyContainer = styled.div`
  display: flex;
  width: calc(1200px - 4rem);
  margin-left: auto;
  margin-right: auto;
  background: white;
  padding: 1rem;

  .div-img {
    width: 35%;

    .m {
      width: 100%;
      padding-top: 100%;
      position: relative;

      .g {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;

        img {
          width: 100%;
          margin-top: auto;
          margin-bottom: auto;
          border: 0.1px solid rgb(230, 230, 230);
        }
      }
    }

    .list-img {
      display: flex;
      overflow: auto;
      margin-top: 1rem;
    }
  }

  .detail {
    width: 60%;
    margin-left: auto;
    display: flex;
    flex-direction: column;

    .name {
      display: flex;

      .loading {
        width: 50%;
        height: 2rem;
        background: rgb(230, 230, 230);
      }

      .loaded {
        font-size: 1.2rem;
        font-weight: 500;
      }
    }

    .rate {
      display: flex;
      margin-top: 1rem;

      .loaded {
      }

      .loading {
        height: 3rem;
      }
    }

    .price {
      display: flex;
      margin-top: 1rem;

      .loading {
        height: 2rem;
        width: 30%;
        background: rgb(230, 230, 230);
      }
    }

    .quantity {
      margin-top: 1rem;

      > div {
        margin-top: 1rem;
        display: flex;

        button {
          height: 2rem;
          width: 2rem;
          border: 0.1px solid rgb(219, 219, 219);
        }

        input {
          height: 2rem;
          width: 3rem;
          padding: 0;
          text-align: center;
        }

        div {
          margin-left: 3rem;

          span {
            line-height: 2rem;
          }
        }
      }

      .notify-error {
        height: 2rem;
        align-items: center;
        color: red;
      }
    }

    .share {
      height: 2rem;
      display: flex;
      align-items: center;

      .text {
        color: rgb(110, 110, 110);
        font-size: 1.2rem;
        font-weight: 500;
      }

      div {
        margin-left: 1rem;
        font-size: 1.2rem;
        color: rgb(27, 116, 228);

        button {
          display: block;
          line-height: 0 !important;
        }
      }
    }

    .add-to-cart {
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: auto;
      margin-bottom: 2rem;

      .loading {
        width: 6rem;
        height: 2.5rem;
        background: rgb(230, 230, 230);
      }

      button {
        height: 100%;
        background: rgb(243, 131, 108);
        color: white;
        font-weight: 500;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  }
`;

const BodyContainer2 = styled.div`
  width: calc(1200px - 4rem);
  margin-left: auto;
  margin-right: auto;

  .shop {
    margin-top: 3rem;
    height: 7rem;
    display: flex;
    background: white;
    align-items: center;

    .img-shop {
      height: 4rem;
      width: 4rem;
      margin-left: 2rem;

      a {
        display: block;
        height: 100%;
        width: 100%;
        line-height: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }

    .shop-contact {
      margin-left: 2rem;

      span {
      }

      div {
        margin-top: 1rem;
        display: flex;

        .chat-a {
          height: 2rem;
          padding-left: 1rem;
          padding-right: 1rem;
          border: 0.1px solid rgb(230, 230, 230);
          display: flex;
          align-items: center;
          justify-content: center;

          .t {
            color: rgb(248, 73, 46);
            line-height: 0;
          }

          .g {
            margin-left: 0.3rem;
            color: rgb(156, 85, 85);
          }
        }

        .aaaa {
          height: 2rem;
          margin-left: 1rem;
          line-height: 2rem;
          border: 0.1px solid rgb(230, 230, 230);
          padding-left: 1rem;
          padding-right: 1rem;
          color: rgb(156, 85, 85);
        }
      }
    }
  }

  .desc-product {
    margin-top: 2rem;
    background: white;
    min-height: 5rem;
    padding: 1rem;

    h1 {
      margin: 0;
      font-weight: 500;
      font-size: 1.2rem;
    }

    div {
      margin-top: 1.5rem;
    }
  }

  .rate-list {
    background: white;
    padding: 1rem;
    margin-top: 2rem;

    h1 {
      margin: 0;
      font-weight: 500;
      font-size: 1.2rem;
    }

    ul {
      list-style-type: none;
      margin: 0;
      margin-top: 1rem;
      padding: 0;

      .review {
        padding-left: 2rem;
        border: 0.1px solid rgb(230, 230, 230);
        span {
          display: block;
        }

        .a {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .c {
          margin-top: 1rem;
        }
      }
    }
  }
`;

const CardImg = styled.div`
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  border: ${(props) => {
    if (props.isSelected) {
      return "2px solid rgb(150, 150, 150);";
    } else {
      return "0.1px solid rgb(245, 245, 245);";
    }
  }}

  &:hover {
    cursor: pointer;
  }

  img {
    width: 100%;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [product, setProduct] = useState();
  const [imgSelect, setImgSelect] = useState(0);
  const [quantityBuy, setQuantityBuy] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  let rate = "Chưa có đánh giá";
  let newPrice = "";

  if (product) {
    if (product.reviews.length > 0) {
      let totalRate = 0;
      product.reviews.forEach((value) => {
        totalRate += value.rate;
      });

      rate = totalRate / product.reviews.length;
    }

    const length = product.price.toString().length;

    if (length <= 3) {
      newPrice = product.price.toString();
    } else {
      for (let i = 1; i <= Math.floor(length / 3); i++) {
        if (i == 1) {
          newPrice = `${product.price.toString().slice(length - 3, length)}`;
        } else {
          newPrice = `${product.price
            .toString()
            .slice(length - 3 * i, length - 3 * i + 3)}.${newPrice}`;
        }
      }

      if (length % 3 !== 0) {
        newPrice = `${product.price
          .toString()
          .slice(0, length - 3 * Math.floor(length / 3))}.${newPrice}`;
      }
    }
  }

  function handleAddToCart() {
    if (quantityBuy > product.quantity) {
      setError("InvalidQuantityBuy");
    } else {
      dispatch(addToCartAction(quantityBuy, product._id, setIsAddedToCart));
    }
  }

  useEffect(() => {
    getProductAction(id, setError, setProduct);

  }, []);

  useEffect(() => {
    if (product) {
      document.title = `Shopee - ${product.name}`;
    }
  }, [product])

  return (
    <ProductWrapper className="product-wrapper">
      <Header />
      {isAddedToCart && (
        <div
          onClick={() => setIsAddedToCart(false)}
          className="notify-add-to-cart"
        >
          <div className="modal">
            <div className="h1">Thêm Vào Giỏ Hàng Thành Công</div>
            <div className="h2">
              <span>
                <FcCheckmark />
              </span>
            </div>
          </div>
        </div>
      )}
      {error === "productNotFound" ? (
        <div className="product-not-found">
          <div className="a">Không Tìm Thấy Sản Phẩm Yêu Cầu</div>
        </div>
      ) : (
        <Body className="product-body">
          <BodyContainer className="body-container">
            <div className="div-img">
              <div
                style={{
                  ...(!product && { background: "rgb(230, 230, 230)" }),
                }}
                className="m"
              >
                {product && (
                  <div className="g">
                    <img src={product.productImages[imgSelect]} />
                  </div>
                )}
              </div>
              <div className="list-img">
                {product ? (
                  <>
                    {product.productImages.map((value, key) => (
                      <CardImg
                        key={key}
                        className="card-img"
                        onClick={() => setImgSelect(key)}
                        isSelected={imgSelect === key ? true : false}
                      >
                        <img src={value} />
                      </CardImg>
                    ))}
                  </>
                ) : (
                  <>
                    {["", "", "", ""].map((value, key) => (
                      <CardImg
                        key={key}
                        style={{ background: "rgb(230, 230, 230)" }}
                        className="card-img"
                      ></CardImg>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="detail">
              <div className="name">
                {product ? (
                  <span className="loaded">{product.name}</span>
                ) : (
                  <span className="loading"></span>
                )}
              </div>
              <div className="rate">
                {product ? (
                  <span className="loaded">{rate} Sao</span>
                ) : (
                  <span className="loading"></span>
                )}
              </div>
              <div className="price">
                {product ? (
                  <span className="loaded">{newPrice} đ</span>
                ) : (
                  <span className="loading"></span>
                )}
              </div>
              <div className="quantity">
                {product && (
                  <>
                    <span>Số Lượng</span>
                    <div>
                      <button
                        disabled={quantityBuy <= 1 ? true : false}
                        onClick={() => {
                          setError("");
                          setQuantityBuy(quantityBuy - 1);
                        }}
                      >
                        -
                      </button>
                      <input
                        value={quantityBuy}
                        onChange={(e) => {
                          setError("");
                          setQuantityBuy(e.target.value);
                        }}
                      />
                      <button
                        disabled={
                          quantityBuy >= product.quantity ? true : false
                        }
                        onClick={() => {
                          setError("");
                          setQuantityBuy(quantityBuy + 1);
                        }}
                      >
                        +
                      </button>
                      <div>
                        <span>{product.quantity} sản phẩm có sẵn</span>
                      </div>
                    </div>
                    <div className="notify-error">
                      {error === "InvalidQuantityBuy" && (
                        <span>Số lượng phải nhỏ hơn số sản phẩm có sẵn</span>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="share">
                <span className="text">Chia Sẻ</span>
                <div>
                  <FacebookShareButton url={window.location.href}>
                    <BsFacebook />
                  </FacebookShareButton>
                </div>
                <div>
                  <FacebookMessengerShareButton url={window.location.href} appId="698283444511343" >
                    <BsMessenger />
                  </FacebookMessengerShareButton>
                </div>
                <div>
                  <EmailShareButton url={window.location.href}>
                    <SiGmail />
                  </EmailShareButton>
                </div>
              </div>
              <div className="add-to-cart">
                {product ? (
                  <button className="loaded" onClick={handleAddToCart}>
                    THÊM VÀO GIỎ HÀNG
                  </button>
                ) : (
                  <div className="loading"></div>
                )}
              </div>
            </div>
          </BodyContainer>
          {product && (
            <BodyContainer2 className="container-2">
              <div className="shop">
                <div className="img-shop">
                  <Link to={`/seller/${product.shop._id}`}>
                    <img src={product.shop.shop.imgShop} />
                  </Link>
                </div>
                <div className="shop-contact">
                  <span>{product.shop.shop.shopName}</span>
                  <div>
                    <Link className="chat-a" to={`/chat/${product.shop._id}`}>
                      <span className="t">
                        <BsFillChatFill />
                      </span>
                      <span className="g">Chat Ngay</span>
                    </Link>
                    <Link className="aaaa" to={`/seller/${product.shop._id}`}>
                      Xem Shop
                    </Link>
                  </div>
                </div>
              </div>
              <div className="desc-product">
                <h1>MÔ TẢ SẢN PHẨM</h1>
                <div>{product.description}</div>
              </div>
              <div className="rate-list">
                <h1>ĐÁNH GIÁ SẢN PHẨM</h1>
                {product.reviews.length > 0 ? (
                  <ul>
                    {product.reviews.map((value, key) => 
                      (
                      <li
                        className="review"
                        key={key}
                        style={{ ...(key > 0 && { marginTop: "1rem" }) }}
                      >
                        <span className="a">{`${value.userId.firstName} ${value.userId.lastName}`}</span>
                        <span className="b">{value.rate} sao</span>
                        <span className="c">{value.review}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>Chưa có đánh giá cho sản phẩm này</div>
                )}
              </div>
            </BodyContainer2>
          )}
        </Body>
      )}
      <Footer />
    </ProductWrapper>
  );
}
