import React from 'react';

import Loading from 'components/Loading';
import Error from 'components/Error';

export default class LoadableComponent extends React.Component {
  render () {
    return this.props.loaded ?
      <div>${this.loaded_object}</div>
      : (
        this.props.error?
          <Error message={this.props.error_msg}/>
        : <Loading />
      );
  }
}
