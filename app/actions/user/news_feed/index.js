import async_action from 'utils/asyncAction';

const NEWS_FEED_LOADING   = 'NEWS_FEED_LOADING';
const NEWS_FEED_LOADED    = 'NEWS_FEED_LOADED';
const NEWS_FEED_FAILED    = 'NEWS_FEED_FAILED';

export const actionTypes = {
  NEWS_FEED_LOADING,
  NEWS_FEED_LOADED,
  NEWS_FEED_FAILED,
};

export function load_news_feed (user, dispatch) {
  async_action(
    {
      type: NEWS_FEED_LOADING,
      payload: { user },
    },
    NEWS_FEED_LOADED,
    dispatch,
   `http://api.kaiworship.xyz/news_feed/${user}`,
   NEWS_FEED_FAILED
  );
}
