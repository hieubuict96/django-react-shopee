import cart from "../const/cart";

const initialState = {
  isGetCart: false,
  products: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cart.GET_CART_SUCCESS:
      state = {
        ...state,
        isGetCart: true,
        ...(action.payload.cart && {
          products: [...action.payload.cart.products],
        }),
      };
      break;
    case cart.REDUCE_SUCCESS:
      state = {
        ...state,
      };

      state.products.forEach((e, key) => {
        if (e.productId._id == action.payload.productId) {
          state.products[key].quantity -= 1;
        }
      });
      break;
    case cart.INCREASE_SUCCESS:
      state = {
        ...state,
      };

      state.products.forEach((e, key) => {
        if (e.productId._id == action.payload.productId) {
          state.products[key].quantity += 1;
        }
      });
      break;
    case cart.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
      };

      state.products.forEach((value, key) => {
        if (value.productId._id == action.payload.productId) {
          state.products.splice(key, 1);
        }
      });
      break;
    case cart.ORDER_SUCCESS:
      state = {
        ...initialState,
        isGetCart: true,
      };
      break;
  }

  return state;
}
