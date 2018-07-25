const initialState = {
  loading: true,
  loaded: false,
  error: false,
  count: 0,
  categories: []
};

const LOAD_CATEGORIES = 'categories/LOAD_CATEGORIES';
const LOAD_CATEGORIES_SUCCESS = 'categories/LOAD_CATEGORIES_SUCCESS';
const LOAD_CATEGORIES_FAIL = 'categories/LOAD_CATEGORIES_FAIL';

function loadCategories(searchOptions = {}) {
  return { type: LOAD_CATEGORIES, searchOptions };
}

function loadCategoriesSuccess(categories) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    categories: categories.results,
    count: categories.count
  };
}

function loadCategoriesFail(error) {
  return { type: LOAD_CATEGORIES_FAIL, error };
}

const ADD_TO_CATEGORIES = 'categories/ADD_TO_CATEGORIES';

function addToCategories(category) {
  return {
    type: ADD_TO_CATEGORIES,
    category: { name: category, normalized_name: category.toLowerCase().trim() }
  };
}

function CategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      const { searchOptions } = action;
      return {
        ...state,
        loading: true,
        loaded: false,
        count: 0,
        error: false,
        searchOptions
      };
    }
    case LOAD_CATEGORIES_SUCCESS: {
      const { categories, count, searchOptions } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        categories,
        count,
        searchOptions
      };
    }
    case LOAD_CATEGORIES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case ADD_TO_CATEGORIES: {
      const { category } = action;

      return {
        ...state,
        categories: [...state.categories, category]
      };
    }
    default:
      return state;
  }
}

export const actions = {
  addToCategories,
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFail
};

export const actionTypes = {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAIL,
  ADD_TO_CATEGORIES
};

export default CategoriesReducer;
