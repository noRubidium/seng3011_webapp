import { actionTypes } from 'actions/company_list';

const default_state = {
  loading: false,
  error: false,
  industries: []
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.INDUSTRY_COMPANIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.INDUSTRY_COMPANIES_LOADED:
      return {
        ...state,
        loading: false,
        industries: payload.companies
      };
    case actionTypes.INDUSTRY_COMPANIES_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      };
  }
  return state;
};
