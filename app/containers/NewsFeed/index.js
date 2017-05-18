import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_news_feed } from 'actions/user/news_feed';

@connect((store) => {
  return {
    ...store.news_feed,
  };
})
export default class NewsFeed extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    load_news_feed(cid, dispatch);
  }

  render () {
    const { news_feed } = this.props;

    if (!(news_feed.loading || news_feed.error)) {

      this.loaded_object = this.news_feed.map((i) =>(<div>
        Some news detail which get distributed...
        </div>));
    }
    return super.render();
  }
}
