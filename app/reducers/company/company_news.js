import { actionTypes } from 'actions/company';

const default_state = {
  loading: false,
  error: false,
  /* Stub data for testing display*/
  company_id: 'DMP.AX',
  data: '',
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
  const { type, payload={} } = action;
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
        loaded: true,

        /* a lot of updates */
        news: payload.data,
      };
    case actionTypes.COMPANY_NEWS_FAILED:
      return {
        ...state,
        loading: false,
        /* a lot of updates */
        error: true,
        error_msg: `There is no relevant news for ${state.company_id}`,
      };
  }
  return state;
};
