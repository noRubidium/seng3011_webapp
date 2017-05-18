import { actionTypes } from 'actions/home';

const default_state = {
  loading: false,
  companies: []
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.COMPANIES_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.COMPANIES_LOADED:
      return {
        ...state,
        loading: false,
        loaded: true,
        companies: payload.companies
      };
  }
  return state;
};
