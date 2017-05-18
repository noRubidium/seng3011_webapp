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
    load_company_stats(cid, dispatch);
  }

  render () {
    const { news } = this.props;

    if (!(news.loading || news.error)) {

      this.loaded_object = (<div>
        Some news detail which get distributed...
        </div>);
    }
    return super.render();
  }
}
