import React from 'react';
import { connect } from 'react-redux';

import { inc, dec } from 'actions/counter';

@connect((store) => {
  return {
    counter: store.counter
  };
})
export default class Company extends React.Component {
  constructor (props) {
    super(props);
    this.state = {step: 1};
  }

  updateStep (e) {
    console.log(e);
    this.setState({step: parseInt(e.target.value.replace(/\D/ig, ''))});
  }

  inc () {
    this.props.dispatch(inc(this.state.step));
  }

  render () {
    const { counter } = this.props;
    const { count } = counter;
    return (<div>
      company:{count}
      <input
        onChange={this.updateStep.bind(this)}
        value={this.state.step}
      />
      <button
        onClick={this.inc.bind(this)}>
        HI
      </button>
    </div>);
  }
}
