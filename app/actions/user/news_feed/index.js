import async_action from 'utils/asyncAction';

const NEWS_FEED_START     = 'NEWS_FEED_START';
const NEWS_FEED_LOADING   = 'NEWS_FEED_LOADING';
const NEWS_FEED_LOADED    = 'NEWS_FEED_LOADED';
const NEWS_FEED_FAILED    = 'NEWS_FEED_FAILED';

export const actionTypes = {
  NEWS_FEED_LOADING,
  NEWS_FEED_LOADED,
  NEWS_FEED_FAILED,
  NEWS_FEED_START,
};

export function load_news_feed (following, dispatch) {
  dispatch ({type: NEWS_FEED_START});

  if(following.length == 0){
    dispatch({type: NEWS_FEED_LOADED, payload:[]});
  }
  
  following.map((cid) => {
    async_action(
      {
        type: NEWS_FEED_LOADING,
        payload: cid,
      },
      NEWS_FEED_LOADED,
      dispatch,
     `http://api.kaiworship.xyz/news/cmp/${cid.substr(0, 3)}`,
     NEWS_FEED_FAILED
    );
  });

}
