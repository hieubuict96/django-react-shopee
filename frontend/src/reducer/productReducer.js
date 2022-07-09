import product from "../const/productConstant";

const initialProductState = {
  customer: {
    productsSale: [],
    isGetProductsSale: false,
  },
  seller: {
    productsSeller: [],
    isGetProductsSeller: false,
  },
};

export default function productReducer(state = initialProductState, action) {
  switch (action.type) {
    case product.GET_FLASH_SALE_SUCCESS:
      state = {
        ...state,
        customer: {
          productsSale: action.payload.productsSale,
          isGetProductsSale: true,
        },
      };
      break;
    case product.GET_ALL_PRODUCTS_SELLER_SUCCESS:
      state = {
        ...state,
        seller: {
          productsSeller: action.payload.productsListSeller,
          isGetProductsSeller: true,
        },
      };
      state.customer.isGetProductsSale = true;
      break;
    case product.ADD_PRODUCT_SUCCEES:
      state = {
        ...state,
      };
      state.seller.productsSeller = [
        ...state.seller.productsSeller,
        action.payload.product,
      ];
      break;
  }

  return state;
}
