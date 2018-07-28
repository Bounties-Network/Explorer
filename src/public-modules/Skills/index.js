const initialState = {
  loading: true,
  loaded: false,
  error: false,
  count: 0,
  skills: []
};

const LOAD_SKILLS = 'skills/LOAD_SKILLS';
const LOAD_SKILLS_SUCCESS = 'skills/LOAD_CATEGORIES_SUCCESS';
const LOAD_SKILLS_FAIL = 'skills/LOAD_CATEGORIES_FAIL';

function loadSkills() {
  return { type: LOAD_SKILLS };
}

function loadSkillsSuccess(skills) {
  return {
    type: LOAD_SKILLS_SUCCESS,
    skills: skills.results,
    count: skills.count
  };
}

function loadSkillsFail(error) {
  return { type: LOAD_SKILLS_FAIL, error };
}

const ADD_TO_SKILLS = 'skills/ADD_TO_SKILLS';

function addToSkills(skill) {
  return {
    type: ADD_TO_SKILLS,
    skill: { name: skill, normalized_name: skill.toLowerCase().trim() }
  };
}

function SkillsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SKILLS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        count: 0,
        error: false
      };
    }
    case LOAD_SKILLS_SUCCESS: {
      const { skills, count } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        skills,
        count
      };
    }
    case LOAD_SKILLS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case ADD_TO_SKILLS: {
      const { skill } = action;

      return {
        ...state,
        skills: [...state.skills, skill]
      };
    }
    default:
      return state;
  }
}

export const actions = {
  addToSkills,
  loadSkills,
  loadSkillsSuccess,
  loadSkillsFail
};

export const actionTypes = {
  LOAD_SKILLS,
  LOAD_SKILLS_SUCCESS,
  LOAD_SKILLS_FAIL,
  ADD_TO_SKILLS
};

export default SkillsReducer;
