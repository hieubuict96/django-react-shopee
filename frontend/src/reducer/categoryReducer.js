import { category } from "../const/categoryConstant";

const initialCategoryState = [];

const categoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case category.GET_CATEGORY_SUCCESS:
      state = [...state, ...action.payload.categories];
      break;
  }

  return state;
};

export default categoryReducer;
