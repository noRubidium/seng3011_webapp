import React from 'react';

import Loading from 'components/Loading';

export default class LoadableComponent extends React.Component {
  render () {
    return this.props.loading ? <Loading /> : this.loaded_object;
  }
}
