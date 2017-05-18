import { actionTypes } from 'actions/industries';

const default_state = {
  loading: false,
  error: false,
  loaded: false,
  industries: []
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.INDUSTRIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.INDUSTRIES_LOADED:
      return {
        ...state,
        loading: false,
        loaded: true,
        industries: payload.companies
      };
    case actionTypes.INDUSTRIES_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      };
  }
  return state;
};
