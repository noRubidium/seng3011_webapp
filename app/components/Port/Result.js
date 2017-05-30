import React, {PropTypes} from 'react';
[
  {oepn_price: 10, price: 20, date: '2015-01-01', company: 'DMP', amount: 2000},
  {oepn_price: 10, price: 20, date: '2015-01-01', company: 'DMP', amount: 2000},
  {oepn_price: 10, price: 20, date: '2015-01-01', company: 'DMP', amount: 2000},
]
export default class PortResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>Result</div>);
  }
}

PortResult.propTypes = {
};
