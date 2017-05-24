import React from 'react';

export default class Playground extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      loaded: false,
      error: false,
      data: [],
    };
  }
  render () {
    return (<div>
      <div>Household Goods</div>

      </div>);
  }
}
