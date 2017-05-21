import { actionTypes } from 'actions/company';

const default_state = {
  loading: false,
  error: false,
  loaded: false,
  /* Stub data for testing display*/
  company_id: 'DMP.AX',
  name: 'Domino\'s',
  info: 'Pizza Company',
  alias: 'dominos',
  url: 'http://...',
  thumbnail: 'http://...',
  categories: [],
  share_links: [
    {url: 'http://...', logo: 'http://...'}, // Facebook
    {url: 'http://...', logo: 'http://...'}, // twitter
  ],
};

export default (state=default_state, action) => {
  const { type, payload, url } = action;
  switch (type) {
    case actionTypes.COMPANY_DATA_LOADING:
      return {
        ...state,
        loading: true,
        loading_url: url,
        id: payload.company_code,
      };
    case actionTypes.COMPANY_DATA_LOADED:
      if (url !== state.loading_url) {
        return state;
      }
      return {
        ...state,
        ...payload,
        loading: false,
        loaded: true,
      };
    case actionTypes.COMPANY_DATA_FAILED:
      return {
        ...state,
        ...payload,
        loading: false,
        error: true,
        error_msg: 'There is no company data information',
      };
  }
  return state;
};
