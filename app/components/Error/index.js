import React from 'react';

export default class Error extends React.Component {
  render () {
    return (<div>There is an error {this.props.message ? this.props.message : 'Not found'}</div>);
  }
}
