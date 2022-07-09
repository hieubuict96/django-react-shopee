import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { CartWrapper, CartBody } from "./cartDiv";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartAction,
  increaseQttAction,
  reduceQttAction,
  deleteProductAction,
  orderAction,
} from "../../action/cartAction";
import { Link } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import cartConst from "../../const/cart";

export default function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const cart = useSelector((s) => s.cart);
  const [isLoadingChangeQtt, setIsLoadingChangeQtt] = useState(false);
  const [isOrder, setIsOrder] = useState(false);

  let totalPrice = 0;

  if (cart.products.length) {
    cart.products.forEach((value) => {
      totalPrice += value.quantity * value.productId.price;
    });
  }

  function handleDeleteItem(productId) {
    dispatch(deleteProductAction(user._id, productId));
  }

  function handleReduceQtt(productId) {
    setIsLoadingChangeQtt(true);
    dispatch(reduceQttAction(user._id, productId, setIsLoadingChangeQtt));
  }

  function handleIncreaseQtt(productId) {
    setIsLoadingChangeQtt(true);
    dispatch(increaseQttAction(user._id, productId, setIsLoadingChangeQtt));
  }

  function handleOrder() {
    dispatch(orderAction(user._id, setIsOrder));
  }

  useEffect(() => {
      dispatch(getCartAction(user._id));
  }, []);

  return (
    <CartWrapper className="cart-wrapper">
      <Header />
      {cart.isGetCart ? (
        cart.products.length > 0 ? (
          <CartBody className="cart-body">
            <div className="cart-content">
              {isOrder && (
                <div
                  onClick={() => {
                    setIsOrder(false);
                    dispatch(() =>
                      ((dispatch) => {
                        dispatch({ type: cartConst.ORDER_SUCCESS });
                      })()
                    );
                  }}
                  className="notify-order"
                >
                  <div className="modal">
                    <div className="h1">Đặt Hàng Thành Công</div>
                    <div className="h2">
                      <span>
                        <FcCheckmark />
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="top">
                <span className="top-1">Sản Phẩm</span>
                <span className="top-2">Đơn Giá</span>
                <span className="top-3">Số Lượng</span>
                <span className="top-4">Số Tiền</span>
                <span className="top-5">Thao Tác</span>
              </div>
              {cart.products.map((value, key) => (
                <div key={key} className="product">
                  <div className="product-1">
                    <Link
                      className="a"
                      to={`/customer/products/${value.productId._id}`}
                    >
                      <img src={value.productId.productImages[0]} />
                    </Link>
                    <Link
                      className="b"
                      to={`/customer/products/${value.productId._id}`}
                    >
                      <span>{value.productId.name}</span>
                    </Link>
                  </div>
                  <div className="product-2">{value.productId.price}</div>
                  <div className="product-3">
                    <div className="t1">
                      <button
                        disabled={
                          isLoadingChangeQtt || value.quantity <= 1
                            ? true
                            : false
                        }
                        onClick={() => {
                          handleReduceQtt(value.productId._id);
                        }}
                      >
                        -
                      </button>
                      <span>{value.quantity}</span>
                      <button
                        disabled={
                          isLoadingChangeQtt ||
                          value.quantity >= value.productId.quantity
                            ? true
                            : false
                        }
                        onClick={() => {
                          handleIncreaseQtt(value.productId._id);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="t2">
                      Còn {value.productId.quantity} sản phẩm
                    </div>
                  </div>
                  <div className="product-4">
                    {value.quantity * value.productId.price} đ
                  </div>
                  <div className="product-5">
                    <button
                      onClick={() => handleDeleteItem(value.productId._id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
              <div className="total">
                <span className="s1">Tổng Thanh Toán:</span>
                <span className="s2">{totalPrice} đ</span>
                <button onClick={handleOrder}>MUA HÀNG</button>
              </div>
            </div>
          </CartBody>
        ) : (
          <CartBody className="cart-body">
            <div className="cart-empty">
              <span>Giỏ Hàng Trống</span>
            </div>
          </CartBody>
        )
      ) : (
        <CartBody className="cart-body">
          <div className="cart-loading">
            <div className="top">
              <span className="top-1"></span>
              <span className="top-2"></span>
              <span className="top-3"></span>
              <span className="top-4"></span>
            </div>
            <div className="product">
              <span className="product-1"></span>
              <span className="product-2"></span>
              <span className="product-3"></span>
              <span className="product-4"></span>
            </div>
            <div className="product">
              <span className="product-1"></span>
              <span className="product-2"></span>
              <span className="product-3"></span>
              <span className="product-4"></span>
            </div>
            <div className="product">
              <span className="product-1"></span>
              <span className="product-2"></span>
              <span className="product-3"></span>
              <span className="product-4"></span>
            </div>
          </div>
        </CartBody>
      )}
      <Footer />
    </CartWrapper>
  );
}
