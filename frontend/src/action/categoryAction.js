import { category } from "../const/categoryConstant";
import axiosInstance from "../common-middleware/axiosInstance";
import { SIGNED_OUT } from "../const/userConstant";

export const getCategoryAction = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/api/category/get-category", {
      headers: {
        "is-next": true,
      },
    });

    dispatch({
      type: category.GET_CATEGORY_SUCCESS,
      payload: {
        categories: response.data.categories,
      },
    });

    if (response.data.isVerifyFail) {
      dispatch({ type: SIGNED_OUT })
    }
  } catch (error) {
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};
