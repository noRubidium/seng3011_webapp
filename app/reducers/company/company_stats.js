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
};

export default (state=default_state, action) => {
  const { type, payload, url } = action;
  switch (type) {
    case actionTypes.COMPANY_STATS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        id: payload.company_code,
        url,
      };
    case actionTypes.COMPANY_STATS_LOADED:
      return {
        ...state,
        loaded: true,
        loading: false,
        /* a lot of updates */
        financeData: payload,
      };
  }
  return state;
};
