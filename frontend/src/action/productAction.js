import axios from "axios";
import axiosInstance from "../common-middleware/axiosInstance";
import product from "../const/productConstant";
import { SIGNED_OUT } from "../const/userConstant";

export const getFlashSaleAction = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/api/products/flash-sale", {
      headers: {
        "is-next": true,
      },
    });

    dispatch({
      type: product.GET_FLASH_SALE_SUCCESS,
      payload: {
        productsSale: response.data.productsSale,
      },
    });

    if (response.data.isVerifyFail) {
      dispatch({ type: SIGNED_OUT });
    }
  } catch (error) {
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const getAllProductsSellerAction = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/api/products/seller/get-all", {
      params: {
        userId,
      },
    });

    dispatch({
      type: product.GET_ALL_PRODUCTS_SELLER_SUCCESS,
      payload: {
        productsListSeller: response.data.productsListSeller,
      },
    });
  } catch (error) {
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const addProductAction =
  (form, setError, setIsAddSuccess) => async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        "/api/products/seller/add-product",
        form,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      dispatch({
        type: product.ADD_PRODUCT_SUCCEES,
        payload: { product: response.data.product },
      });
      setIsAddSuccess(true);
    } catch (error) {
      if (error.response.data.error === "verifyFail") {
        return dispatch({ type: SIGNED_OUT });
      }

      if (error.response.data.error === "productName") {
        return setError("productName");
      }

      if (error.response.data.error === "categoryIdSelected") {
        return setError("categoryIdSelected");
      }

      if (error.response.data.error === "price") {
        return setError("price");
      }

      if (error.response.data.error === "quantity") {
        return setError("quantity");
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }
    }
  };

export async function getProductAction(id, setError, setProduct) {
  try {
    const response = await axios.get(`/api/products/${id}`);
    setProduct({ ...response.data.product });
  } catch (error) {
    if (error.response.data.error === "productNotFound") {
      return setError("productNotFound");
    }

    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau!!!")
    }
  }
}

export async function getAllProduct(setAllProducts) {
  try {
    const response = await axios.get(
      "/api/products/get-all-products-customer",
      {
        headers: {
          "is-next": true,
        },
      }
    );
    setAllProducts(response.data.products);
  } catch (error) {
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
}
