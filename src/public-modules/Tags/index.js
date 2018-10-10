const initialState = {
  loading: true,
  loaded: false,
  error: false,
  count: 0,
  tags: []
};

const LOAD_TAGS = 'tags/LOAD_TAGS';
const LOAD_TAGS_SUCCESS = 'tags/LOAD_TAGS_SUCCESS';
const LOAD_TAGS_FAIL = 'tags/LOAD_TAGS_FAIL';

function loadTags(searchOptions = {}) {
  return { type: LOAD_TAGS, searchOptions };
}

function loadTagsSuccess(tags) {
  return {
    type: LOAD_TAGS_SUCCESS,
    tags: tags.results,
    count: tags.count
  };
}

function loadTagsFail(error) {
  return { type: LOAD_TAGS_FAIL, error };
}

const ADD_TO_TAGS = 'tags/ADD_TO_TAGS';

function addToTags(tag) {
  return {
    type: ADD_TO_TAGS,
    tag: { name: tag, normalized_name: tag.toLowerCase().trim() }
  };
}

function TagsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TAGS: {
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
    case LOAD_TAGS_SUCCESS: {
      const { tags, count, searchOptions } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        tags,
        count,
        searchOptions
      };
    }
    case LOAD_TAGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case ADD_TO_TAGS: {
      const { tag } = action;

      return {
        ...state,
        tags: [...state.tags, tag]
      };
    }
    default:
      return state;
  }
}

export const actions = {
  addToTags,
  loadTags,
  loadTagsSuccess,
  loadTagsFail
};

export const actionTypes = {
  LOAD_TAGS,
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS_FAIL,
  ADD_TO_TAGS
};

export default TagsReducer;
