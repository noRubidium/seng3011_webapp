import { actionTypes } from 'actions/company';

const default_state = {
  loading: 0, // Use a counter since multiple loading
  /* Stub data for testing display */
  company_id: 'DMP.AX',
  name: 'Domino\'s',
  url: 'http://...',
  logo: 'http://...',
  return_data: [],
  abs_data: [],
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.COMPANY_STATS_LOADING:
      return {
        ...state,
        loading: true,
        id: payload.company_id,
      };
    case actionTypes.COMPANY_STATS_LOADED:
      return {
        ...state,
        loading: false,
        /* a lot of updates */
      };
  }
  return state;
};
