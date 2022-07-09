import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSellerAction } from "../../action/productAction";
import { CardLoaded, CardLoading } from "../../component/Card";

const AllProductWrapper = styled.div`
  h1 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }
  
  .list-products {
    display: flex;
    flex-wrap: wrap;
  }
`;

export default function AllProduct() {
  const products = useSelector((s) => s.product);
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.seller.isGetProductsSeller) {
      dispatch(getAllProductsSellerAction(user._id));
    }

    document.title = "Shopee - Tất cả sản phẩm"
  }, []);

  return (
    <AllProductWrapper className="all-products-wrapper">
      <h1>TẤT CẢ SẢN PHẨM</h1>
      <hr />
      <div className="list-products">
        {products.seller.isGetProductsSeller
          ? products.seller.productsSeller.map((value, key) => (
              <div style={{ margin: "1rem" }}>
                <CardLoaded
                  key={key}
                  height="10rem"
                  width="8rem"
                  src={value.productImages[0]}
                  to={`/seller/products/${value._id}`}
                  name={value.name}
                />
              </div>
            ))
          : ["", "", "", "", ""].map((value, key) => (
              <div style={{ margin: "1rem" }}>
                <CardLoading key={key} height="10rem" width="8rem" />
              </div>
            ))}
      </div>
    </AllProductWrapper>
  );
}
