import React from 'react';

export default class Playground extends React.Component {
  constructor (props) {
    super(props);
    const { dispatch } = this.props;
    load_abs_stats(dispatch, industry, getType(industry));
  }
  render () {
    return (<div>
      <div>Household Goods</div>

      </div>);
  }
}
