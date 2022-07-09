import axios from "axios";
import axiosInstance from "../common-middleware/axiosInstance";
import {
  signup,
  signin,
  GET_DATA_SUCCESS,
  LOADING,
  LOAD_END,
  SIGNED_OUT,
  profile,
} from "../const/userConstant";

export function sendPhoneNumberAction(Phone, setStep, setError) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      if (Phone.lastIndexOf("(+84)") !== 0) {
        throw new Error("wrongPhoneNumberFormat");
      }

      const phone = Phone.split("(+84)")[1].trim();

      if (!phone) {
        throw new Error("phoneNumberEmpty");
      }
      const phoneNumber = `+84${phone}`;
      const response = await axios.post("/api/user/signup/send-phone-number", {
        phoneNumber,
      });
      setStep(2);
      setError("");
      dispatch({ type: LOAD_END });
    } catch (error) {
      dispatch({ type: LOAD_END });
      if (error.message === "phoneNumberEmpty") {
        return setError("phoneNumberEmpty");
      }

      if (error.message === "wrongPhoneNumberFormat") {
        return setError("wrongPhoneNumberFormat");
      }

      if (error.response.data.error === "phoneNumberAlreadyUse") {
        return setError("phoneNumberAlreadyUse");
      }

      if (error.response.data.error === "phoneNumber") {
        return setError("invalidPhoneNumber");
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }
    }
  };
}

export const sendCodeAction = async (Phone, code, setStep, setError) => {
  try {
    if (!code) {
      throw new Error("codeEmpty");
    }

    const phone = Phone.split("(+84)")[1].trim();

    const phoneNumber = `+84${phone}`;
    const response = await axios.post("/api/user/signup/send-code", {
      phoneNumber,
      code,
    });

    setStep(3);
    setError("");
  } catch (error) {
    if (error.message === "codeEmpty") {
      return setError("codeEmpty");
    }

    if (error.response.data.error === "codeIncorrect") {
      return setError("codeIncorrect");
    }

    if (error.response.data.error === "timeoutVerifyCode") {
      return setError("timeoutVerifyCode");
    }

    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const resendCodeAction = (Phone, setIsResend) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const phone = Phone.split("(+84)")[1].trim();

    const phoneNumber = `+84${phone}`;
    const response = await axios.post("/api/user/signup/resend-code", {
      phoneNumber,
    });
    setIsResend(true);
    dispatch({ type: LOAD_END });
  } catch (error) {
    dispatch({ type: LOAD_END });
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const sendInfoAction =
  (Phone, firstName, lastName, password, repassword, setError) =>
  async (dispatch) => {
    try {
      if (!firstName) {
        throw new Error("firstNameEmpty");
      }
      if (!lastName) {
        throw new Error("lastNameEmpty");
      }
      if (!password) {
        throw new Error("passwordEmpty");
      }
      if (!repassword) {
        throw new Error("repasswordEmpty");
      }

      if (password !== repassword) {
        throw new Error("passwordNotMatch");
      }

      const phone = Phone.split("(+84)")[1].trim();

      const phoneNumber = `+84${phone}`;
      const response = await axios.post("/api/user/signup", {
        firstName,
        lastName,
        password,
        phoneNumber,
      });

      const { user, accessToken } = response.data;
      dispatch({
        type: signup.SIGNUP_SUCCESS,
        payload: { user, accessToken },
      });

      const date = new Date();
      date.setDate(date.getDate() + 30);
      document.cookie = `accessToken=${accessToken}; expires=${date}; path=/`;
      alert("Đăng ký thành công");
    } catch (error) {
      console.error(error);
      if (error.message === "firstNameEmpty") {
        return setError("firstNameEmpty");
      }

      if (error.message === "lastNameEmpty") {
        return setError("lastNameEmpty");
      }

      if (error.message === "passwordEmpty") {
        return setError("passwordEmpty");
      }

      if (error.message === "repasswordEmpty") {
        return setError("repasswordEmpty");
      }

      if (error.message === "passwordNotMatch") {
        return setError("passwordNotMatch");
      }

      if (error.response.data.error === "password") {
        return setError("invalidPassword");
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }
    }
  };

export const signinAction = (user, password, setError) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    if (!/@/.test(user)) {
      user = "+84" + user.slice(1);
    }
    const response = await axios.post("/api/user/signin", { user, password });

    dispatch({
      type: signin.SIGNIN_SUCCESS,
      payload: {
        user: response.data.user,
        accessToken: response.data.accessToken,
      },
    });
    const date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `accessToken=${response.data.accessToken}; expires=${date}; path=/`;
    dispatch({ type: LOAD_END });
  } catch (error) {
    dispatch({ type: LOAD_END });
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }

    if (error.response.data.error === "signinFail") {
      return setError("signinFail");
    }
  }
};

export const signinGoogleAction = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/user/signin-with-google", { data });
    const { user, accessToken } = response.data;

    dispatch({
      type: signin.SIGNIN_WITH_GOOGLE_SUCCESS,
      payload: { user, accessToken },
    });
    const date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `accessToken=${accessToken}; expires=${date}; path=/`;
  } catch (error) {
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const signinFacebookAction = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/user/signin-with-facebook", {
      data,
    });

    const { user, accessToken } = response.data;

    dispatch({
      type: signin.SIGNIN_WITH_FACEBOOK_SUCCESS,
      payload: { user, accessToken },
    });
    const date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `accessToken=${accessToken}; expires=${date}; path=/`;
  } catch (error) {
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const getDataAction = (setIsLoadingData) => async (dispatch) => {
  try {
    setIsLoadingData(true);

    const arrCookies = document.cookie.split("; ");
    const accessToken = arrCookies.find((x) => /accessToken=/.test(x))
      ? arrCookies.find((x) => /accessToken=/.test(x)).split("accessToken=")[1]
      : "";

    if (accessToken) {
      const response = await axios.get("/api/user/get-data", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const { user } = response.data;
      dispatch({ type: GET_DATA_SUCCESS, payload: { user } });
      setIsLoadingData(false);
    } else {
      setIsLoadingData(false);
      dispatch({ type: SIGNED_OUT });
    }
  } catch (error) {
    setIsLoadingData(false);
    if (error.response.data.error === "verifyFail") {
      return dispatch({ type: SIGNED_OUT });
    }

    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const handleChangeProfileAction =
  (formData, setPreviewImgBuyer, setPreviewImgShop) => async (dispatch) => {
    try {
      const response = await axiosInstance.put(
        "/api/user/profile/update",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      setPreviewImgBuyer("");
      setPreviewImgShop("");
      const { user } = response.data;

      dispatch({ type: profile.UPDATE_PROFILE_SUCCESS, payload: { user } });
      alert("Cập nhật thông tin thành công");
    } catch (error) {
      setPreviewImgBuyer("");
      setPreviewImgShop("");
      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }

      if (error.response.data.error === "verifyFail") {
        return dispatch({ type: SIGNED_OUT });
      }
    }
  };

export const continuousUpdateCookiesAction = () => (dispatch, getState) => {
  let interval = setInterval(() => {
    const oldAccessToken = getState().user.accessToken;

    const arrCookies = document.cookie.split("; ");
    const newAccessToken = arrCookies.find((x) => /accessToken=/.test(x))
      ? arrCookies.find((x) => /accessToken=/.test(x)).split("accessToken=")[1]
      : "";

    if (newAccessToken !== oldAccessToken) {
      dispatch({ type: SIGNED_OUT });
      clearInterval(interval);
    }
  }, 5000);
};

export function sendCodeToEmailAction(
  _id,
  newEmail,
  password,
  setError,
  setStep
) {
  return async (dispatch) => {
    console.log(newEmail);
    try {
      if (!newEmail) {
        return setError("emailEmpty");
      }

      if (!password) {
        return setError("passwordEmpty");
      }
      const response = await axiosInstance.put(
        "/api/user/profile/update/email/send-code",
        {
          _id,
          newEmail,
          password,
        }
      );

      setStep(2);
      setError("");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error === "newEmail") {
        return setError("invalidEmail");
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }

      if (error.response.data.error === "wrongPassword") {
        return setError("wrongPassword");
      }

      if (error.response.data.error === "newEmailAlreadyUse") {
        return setError("newEmailAlreadyUse");
      }
    }
  };
}

export const verifyCodeAction =
  (
    oldEmail,
    codeOldEmail,
    newEmail,
    codeNewEmail,
    setError,
    _id,
    setIsUpdateEmailSuccess
  ) =>
  async (dispatch) => {
    try {
      if ((!codeOldEmail && oldEmail) || !codeNewEmail) {
        return setError("codeEmpty");
      }

      const response = await axiosInstance.put(
        "/api/user/profile/update/email/verify-code",
        { _id, oldEmail, codeOldEmail, newEmail, codeNewEmail }
      );

      dispatch({
        type: profile.UPDATE_EMAIL_SUCCESS,
        payload: { email: newEmail },
      });
      setIsUpdateEmailSuccess(true);
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }

      if (error.response.data.error === "timeoutVerifyCode") {
        return setError("timeoutVerifyCode");
      }

      if (error.response.data.error === "verifyCodeFail") {
        return setError("verifyCodeFail");
      }
    }
  };

export const signoutAction = (navigate) => (dispatch) => {
  dispatch({ type: SIGNED_OUT });
  navigate("/customer/signin")
};
