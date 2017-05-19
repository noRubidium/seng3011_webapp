import { actionTypes } from 'actions/company';

const default_state = {
  loading: 0, // Use a counter since multiple loading
  error: false,
  loaded: false,
  /* Stub data for testing display */
  company_id: 'DMP.AX',
  name: 'Domino\'s',
  url: 'http://...',
  logo: 'http://...',
  financeData: null,
  absData: null,
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.COMPANY_STATS_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
        id: payload.company_code,
      };
    case actionTypes.COMPANY_STATS_LOADED:
      return {
        ...state,
        loaded: state.loading === 1,
        loading: state.loading - 1,
        /* a lot of updates */
        financeData: payload,
      };
    case actionTypes.ABS_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
        id: payload.company_code,
      };
    case actionTypes.ABS_LOADED:
      return {
        ...state,
        loaded: state.loading === 1,
        loading: state.loading - 1,
        absData: payload,
      }
    case actionTypes.ABS_FAILED:
    return {
      ...state,
      loading: state.loading - 1,
      error_msg: 'There is error',
    };
  }
  return state;
};
