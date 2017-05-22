import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NewsItem from 'components/News/listItem';
import Sentiment from 'components/News/sentiment';
import LoadableComponent from 'components/LoadableComponent';
import { load_news_feed } from 'actions/user/news_feed';

@connect((store) => {
  return {
    ...store.news_feed,
    following: store.user.following,
  };
})
export default class NewsFeed extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    const { following, dispatch } = this.props;
    load_news_feed(following, dispatch);
  }

  render () {
    const { loading, loaded, news } = this.props;
    if (loaded) {

      this.loaded_object = news.map((n, i) =>
        <Link to={`/news/${btoa(n.url)}`} key={i}>
          <NewsItem title={n.headline}
                    content={n.summary}
                    secondComponent={<Sentiment url={btoa(n.url)}
                    analyse={loading === 0}/>}
          />
        </Link>
      );
    }
    return (
      <div>
        <div className='page-title'>News Feeds</div>
        {super.render()}
      </div>
    )
  }
}
