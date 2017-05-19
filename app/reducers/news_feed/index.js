import { actionTypes } from 'actions/news';

const default_state = {
  loading: false,
  loaded: false,
  error: false,
  /* Stub data for testing display*/
  user: 'blah',
  news: [],
  /* ... add more! */
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.NEWS_FEED_LOADING:
      return {
        ...state,
        loading: true,
        user: payload,
      };
    case actionTypes.NEWS_FEED_LOADED:
      return {
        ...state,
        news: payload,
        loading: false,
        loaded: true,
      };
    case actionTypes.NEWS_FEED_FAILED:
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
