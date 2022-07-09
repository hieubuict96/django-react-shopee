import axiosInstance from "../common-middleware/axiosInstance";
import cart from "../const/cart";
import { SIGNED_OUT } from "../const/userConstant";

export function addToCartAction(quantityBuy, productId, setIsAddedToCart) {
  return async (dispatch, getState) => {
    try {
      const userId = getState().user._id;
      const response = await axiosInstance.post("/api/cart/add-to-cart", {
        userId,
        quantityBuy,
        productId,
      });

      setIsAddedToCart(true);
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
    } catch (error) {
      if (error.response.data.error === "verifyFail") {
        return dispatch({ type: SIGNED_OUT });
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }
    }
  };
}

export function getCartAction(id) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/api/cart/get-cart`, {
        params: {
          userId: id,
        },
      });

      dispatch({
        type: cart.GET_CART_SUCCESS,
        payload: { cart: response.data.doc },
      });
    } catch (error) {
      if (error.response.data.error === "verifyFail") {
        return dispatch({ type: SIGNED_OUT });
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }
    }
  };
}

export const reduceQttAction =
  (userId, productId, setIsLoadingChangeQtt) => async (dispatch) => {
    try {
      const response = await axiosInstance.put("/api/cart/reduce-qtt", {
        userId,
        productId,
      });

      dispatch({ type: cart.REDUCE_SUCCESS, payload: { productId } });
      setIsLoadingChangeQtt(false);
    } catch (error) {
      if (error.response.data.error === "verifyFail") {
        return dispatch({ type: SIGNED_OUT });
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }
    }
  };

export const increaseQttAction =
  (userId, productId, setIsLoadingChangeQtt) => async (dispatch) => {
    try {
      const response = await axiosInstance.put("/api/cart/increase-qtt", {
        userId,
        productId,
      });

      dispatch({ type: cart.INCREASE_SUCCESS, payload: { productId } });
      setIsLoadingChangeQtt(false);
    } catch (error) {
      if (error.response.data.error === "verifyFail") {
        return dispatch({ type: SIGNED_OUT });
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }
    }
  };

export const deleteProductAction = (userId, productId) => async (dispatch) => {
  try {
    const response = await axiosInstance.delete("/api/cart/delete-product", {
      params: { userId, productId },
    });

    dispatch({ type: cart.DELETE_PRODUCT_SUCCESS, payload: { productId } });
  } catch (error) {
    if (error.response.data.error === "verifyFail") {
      return dispatch({ type: SIGNED_OUT });
    }

    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const orderAction = (userId, setIsOrder) => async (dispatch) => {
  try {
    const response = await axiosInstance.put("/api/cart/add-to-order", {
      userId,
    });

    setIsOrder(true);
    setTimeout(() => {
    setIsOrder(false);
    dispatch({ type: cart.ORDER_SUCCESS });
    }, 2000);
  } catch (error) {
    if (error.response.data.error === "verifyFail") {
      return dispatch({ type: SIGNED_OUT });
    }

    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};
