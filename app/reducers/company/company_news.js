import { actionTypes } from 'actions/company';

const default_state = {
  loading: false,
  /* Stub data for testing display*/
  company_id: 'DMP',
  news: [
    {
      url: 'http://...',
      keywords:['Good', 'Bad'],
      content: '...',
    }, // Facebook
    {
      url: 'http://...',
      keywords:['Good', 'Bad'],
      content: '...',
    }, // twitter
  ],
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.COMPANY_NEWS_LOADING:
      return {
        ...state,
        loading: true,
        id: payload.company_code,
      };
    case actionTypes.COMPANY_NEWS_LOADED:
      return {
        ...state,
        loading: false,
        /* a lot of updates */
      };
  }
  return state;
};
