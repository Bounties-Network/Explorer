const initialState = {
  loading: true,
  loaded: false,
  error: false,
  currentCategory: {}
};

const LOAD_CATEGORY = 'category/LOAD_CATEGORY';
const LOAD_CATEGORY_SUCCESS = 'category/LOAD_CATEGORY_SUCCESS';
const LOAD_CATEGORY_FAIL = 'category/LOAD_CATEGORY_FAIL';

function loadCategory(id) {
  return { type: LOAD_CATEGORY, id };
}

function loadCategorySuccess(category) {
  return {
    type: LOAD_CATEGORY_SUCCESS,
    currentCategory: category
  };
}

function loadCategoryFail(error) {
  return { type: LOAD_CATEGORY_FAIL, error };
}

function CategoryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORY: {
      return {
        ...state,
        loading: true,
        loaded: false,
        count: 0,
        error: false
      };
    }
    case LOAD_CATEGORY_SUCCESS: {
      const { currentCategory } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        currentCategory
      };
    }
    case LOAD_CATEGORY_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadCategory,
  loadCategorySuccess,
  loadCategoryFail
};

export const actionTypes = {
  LOAD_CATEGORY,
  LOAD_CATEGORY_SUCCESS,
  LOAD_CATEGORY_FAIL
};

export default CategoryReducer;
