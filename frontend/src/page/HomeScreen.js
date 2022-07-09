import Header from "../component/Header";
import styled from "styled-components";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlashSaleAction, getAllProduct } from "../action/productAction";
import { CardLoaded, CardLoading } from "../component/Card";
import { useState } from "react";

const HomeScreenWrapper = styled.div``;

const Body = styled.div`
  min-width: 1200px;
  margin-top: 8rem;
  background: rgb(240, 240, 240);
  display: flex;
  flex-direction: column;

  .container {
    width: 1200px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    margin: 2rem auto 2rem auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Category = styled.div`
  background: white;

  .title {
    color: rgb(161, 117, 117);
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  .list-card {
    display: flex;
    margin-top: 1rem;
    overflow-x: auto;
    padding: 0.5px;

    .text {
      span {
        color: rgb(100, 100, 100);
      }
    }
  }
`;

const FlashSale = styled.div`
  margin-top: 2rem;
  background: white;

  .title {
    color: rgb(161, 117, 117);
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  .list-card {
    display: flex;
    margin-top: 1rem;
    overflow-x: auto;
    padding: 0.5px;
  }
`;

const AllProduct = styled.div`
  margin-top: 2rem;
  background: white;

  .title {
    color: rgb(161, 117, 117);
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  .list-card {
    display: flex;
    margin-top: 1rem;
    overflow-x: auto;
    padding: 0.5px;

    > a {
      border-radius: 3px;
      border: 0.1px solid rgb(245, 245, 245);
    }

    .card {
      height: 13rem;
      width: 10rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      color: rgb(100, 100, 100);


      &:hover {
        transition: 0.3s 0s all linear;
        box-shadow: 0px 0px 5px 1px rgb(200, 200, 200);
      }

      .img {
        width: 80%;
        padding-top: 80%;
        position: relative;

        div {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }

      .name-product {
        margin-top: 0.5rem;
      }

      .price {
        width: 100%;
        margin-top: auto;
      }
    }
  }
`;

export default function HomeScreen() {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.categories);
  const products = useSelector((s) => s.product);
  const [allProducts, setAllProducts] = useState();

  useEffect(() => {
    if (!products.customer.isGetProductsSale) {
      dispatch(getFlashSaleAction());
    }

    document.title = "Shopee - Trang Chủ";
    getAllProduct(setAllProducts);
  }, []);

  return (
    <HomeScreenWrapper className="home">
      <Header />
      <Body className="home-body">
        <div className="container">
          <Category className="list-category">
            <div className="title">
              <span>DANH MỤC</span>
              <hr />
            </div>
            <div className="list-card">
              {categories.length !== 0
                ? categories.map((value, key) => (
                    <CardLoaded
                      key={key}
                      src={value.categoryImage}
                      to={`/categories/${value._id}`}
                      name={value.name}
                      height="10rem"
                      width="8rem"
                    />
                  ))
                : ["", "", "", "", "", "", "", "", ""].map((value, key) => (
                    <CardLoading key={key} height="10rem" width="8rem" />
                  ))}
            </div>
          </Category>
          <FlashSale className="flash-sale">
            <div className="title">
              <span>FLASH SALE HÔM NAY</span>
            </div>
            <div className="list-card">
              {products.customer.productsSale.map((value, key) => (
                <CardLoaded
                  key={key}
                  src={value.productImages[0]}
                  to={`/customer/products/${value._id}`}
                  name={value.name}
                  height="10rem"
                  width="8rem"
                />
              ))}
            </div>
          </FlashSale>
          <AllProduct className="all-products">
            <div className="title">
              <span>TẤT CẢ SẢN PHẨM</span>
            </div>
            <div className="list-card">
              {allProducts ? (
                <>
                  {allProducts.map((value, key) => (
                    <Link key={key} to={`/customer/products/${value._id}`}>
                      <div className="card">
                        <div className="img">
                          <div>
                            <img src={value.productImages[0]} />
                          </div>
                        </div>
                        <div className="name-product">
                          <span>{value.name}</span>
                        </div>
                        <div className="price">
                          <span>{value.price} đ</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <div></div>
              )}
            </div>
          </AllProduct>
        </div>
      </Body>
      <Footer />
    </HomeScreenWrapper>
  );
}
