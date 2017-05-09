import React from 'react';

import Loading from 'components/Loading';
import Error from 'components/Error';

export default class LoadableComponent extends React.Component {
  render () {
    return this.props.loading ?
      <Loading />
      : (
        this.props.error?
          <Error message={this.props.error_msg}/>
        : this.loaded_object
      );
  }
}
