import { actionTypes } from 'actions/company_list';

const default_state = {
  loading: false,
  error: false,
  loaded: true,
  industry: 'Total',
  companies: [],
  abs: {
    loading: false,
    error: false,
    loaded: false,
    data: [],
  }
};

export default (state=default_state, action) => {
  const { type, payload, url } = action;
  const { abs } = state;
  switch (type) {
    case actionTypes.INDUSTRY_COMPANIES_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
        industry: payload,
        url,
      };
    case actionTypes.INDUSTRY_COMPANIES_LOADED:
      if (url !== state.url) {
        return state;
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        companies: payload.companies
      };
    case actionTypes.INDUSTRY_COMPANIES_FAILED:
      if (url !== state.url) {
        return state;
      }
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
      };
    case actionTypes.ABS_LOADING:
      return {
        ...state,
        abs: {
          ...abs,
          url,
          loading: true,
          loaded: false,
          error: false,
        }
      };
    case actionTypes.ABS_LOADED:
      if (abs.url !== url) {
        return state;
      }
      return {
        ...state,
        abs: {
          ...abs,
          data: payload,
          loading: false,
          loaded: true,
          error: false,
        }
      };
    case actionTypes.ABS_FAILED:
      if (abs.url !== url) {
        return state;
      }
      return {
        ...state,
        abs: {
          ...abs,
          url,
          loading: false,
          loaded: false,
          error: true,
        }
      };
  }
  return state;
};
