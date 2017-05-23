import { actionTypes } from 'actions/user/news_feed';

const default_state = {
  loading: 0,
  loaded: 0,
  error: 0,
  /* Stub data for testing display*/
  user: 'blah',
  news: [],
  /* ... add more! */
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.NEWS_FEED_START:
      return {
        ...state,
        loading: 0,
        loaded: 0,
        error: 0,
        news: []

      };
    case actionTypes.NEWS_FEED_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case actionTypes.NEWS_FEED_LOADED:

      if(payload.length == 0){
        return {
          ...state,
          loading: state.loading - 1,
          loaded: state.loaded + 1,
        }
      }
      const cmp_news = (a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      };

      const new_news = state.news.concat(payload.data).sort(cmp_news);

      const news = new_news.filter(function (a) {
        return !this[a.headline] && (this[a.headline] = true);
      }, Object.create(null)).slice(0,20);

      return {
        ...state,
        news: news,
        loading: state.loading - 1,
        loaded: state.loaded + 1,
      };
    case actionTypes.NEWS_FEED_FAILED:
      return {
        ...state,
        loading: state.loading - 1,
        error: state.error + 1,
        error_msg: `There is no correct data`,
      };
  }
  return state;
};
