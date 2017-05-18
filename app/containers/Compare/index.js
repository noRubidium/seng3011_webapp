import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
// import { load_compare } from 'actions/news';

@connect((store) => {
  return {
    ...store.compare,
  };
})
export default class News extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
  }

  render () {
    const { news } = this.props;

    // if (!(news.loading || news.error)) {
    //
    //   this.loaded_object = (<div>
    //     Some news detail which get distributed...
    //     </div>);
    // }
    return super.render();
  }
}
