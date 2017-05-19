import { actionTypes } from 'actions/news';

const default_state = {
  loading: false,
  error: false,
  /* Stub data for testing display*/
  url: 'http://...',
  content: '',
  reaction: '',
  /* ... add more! */
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.NEWS_LOADING:
      return {
        ...state,
        loading: true,
        url: payload,
      };
    case actionTypes.NEWS_LOADED:
      return {
        ...state,
        ...payload,
        loading: false,
        loaded: true,
      };
    case actionTypes.NEWS_FAILED:
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
