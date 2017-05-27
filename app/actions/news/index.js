import async_action from 'utils/asyncAction';

const NEWS_LOADING   = 'NEWS_LOADING';
const NEWS_LOADED    = 'NEWS_LOADED';
const NEWS_FAILED    = 'NEWS_FAILED';

export const actionTypes = {
  NEWS_LOADING,
  NEWS_LOADED,
  NEWS_FAILED,
};

export function load_news (news_url, dispatch) {
  async_action(
    {
      type: NEWS_LOADING,
      payload: { news_url },
    },
    NEWS_LOADED,
    dispatch,
   `${process.env.API_URL}/news/lnk/${news_url}`,
   NEWS_FAILED
  );
}
