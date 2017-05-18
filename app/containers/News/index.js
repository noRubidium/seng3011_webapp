import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_news } from 'actions/news';

@connect((store) => {
  return {
    ...store.news,
  };
})
export default class News extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    const { dispatch, news_url } = this.props;
    load_news(news_url, dispatch);
  }

  render () {
    const { loaded } = this.props;

    if (loaded) {

      this.loaded_object = (<div>
        Some news detail which get distributed...
        </div>);
    }
    return super.render();
  }
}
