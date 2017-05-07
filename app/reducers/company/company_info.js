import { actionTypes } from 'actions/company';

const default_state = {
  loading: false,
  /* Stub data for testing display*/
  company_id: 'DMP.AX',
  name: 'Domino\'s',
  info: 'Pizza Company',
  url: 'http://...',
  thumbnail: 'http://...',
  categories: [],
  share_links: [
    {url: 'http://...', logo: 'http://...'}, // Facebook
    {url: 'http://...', logo: 'http://...'}, // twitter
  ],
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.COMPANY_DATA_LOADING:
      return {
        ...state,
        loading: true,
        company_id: payload.company_id,
      };
    case actionTypes.COMPANY_DATA_LOADED:
      console.log('PAYLOAD',payload);
      return {
        ...state,
        ...payload,
        loading: false
      };
  }
  return state;
};
