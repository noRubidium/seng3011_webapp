import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';

@connect((store) => {
  return {
    ...store.user,
  };
})
export default class News extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
  }

  render () {
    const { following } = this.props;

    if (user.loaded) {
      this.loaded_object = (<div>
        Some news detail which get distributed...
        </div>);
    }
    return super.render();
  }
}
