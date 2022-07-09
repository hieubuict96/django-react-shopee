import {
  signup,
  signin,
  GET_DATA_SUCCESS,
  LOADING,
  LOAD_END,
  SIGNED_OUT,
  profile,
} from "../const/userConstant";

const arrCookies = document.cookie.split("; ");
let accessToken = "";
arrCookies.forEach((value) => {
  accessToken = value.split("accessToken=")[1] || "";
});

const initialUserState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  imgBuyer: "",
  shop: {},
  isLoading: false,
  accessToken,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case signup.SIGNUP_SUCCESS:
      state = {
        ...state,
        _id: action.payload.user._id,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        phoneNumber: action.payload.user.phoneNumber,
        accessToken: action.payload.accessToken,
      };
      break;
    case signin.SIGNIN_SUCCESS:
      {
        const { user, accessToken } = action.payload;
        state = {
          ...state,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          imgBuyer: user.imgBuyer,
          shop: user.shop,
          accessToken,
        };
      }
      break;
    case signin.SIGNIN_WITH_GOOGLE_SUCCESS:
      {
        const { user, accessToken } = action.payload;
        state = {
          ...state,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          imgBuyer: user.imgBuyer,
          shop: user.shop,
          accessToken,
        };
      }
      break;
    case signin.SIGNIN_WITH_FACEBOOK_SUCCESS:
      {
        const { user, accessToken } = action.payload;
        state = {
          ...state,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          imgBuyer: user.imgBuyer,
          shop: user.shop,
          accessToken,
        };
      }
      break;
    case GET_DATA_SUCCESS:
      {
        const { user } = action.payload;
        state = {
          ...state,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          imgBuyer: user.imgBuyer,
          shop: user.shop,
        };
      }
      break;
    case LOADING:
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case LOAD_END:
      state = {
        ...state,
        isLoading: false,
      };
      break;
    case SIGNED_OUT:
      state = { ...initialUserState };
      const date = new Date(null);
      document.cookie = `accessToken=; expires=${date}; path=/`;
      break;
    case profile.UPDATE_PROFILE_SUCCESS:
      {
        const { user } = action.payload;
        state = {
          ...state,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          imgBuyer: user.imgBuyer,
          shop: user.shop,
        };
      }
      break;
    case profile.UPDATE_EMAIL_SUCCESS:
      state = {
        ...state,
        email: action.payload.email,
      };
      break;
  }

  return state;
};

export default userReducer;
