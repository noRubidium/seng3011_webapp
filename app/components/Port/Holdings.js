import React, {PropTypes} from 'react';

import HoldingPie from './HoldingPie';
import { getCmp } from 'utils/lookup';

export default class Holdings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company, currentHoldings, updateHolding=(i) => console.log, deleteCompany=(i)=>console.log, balance } = this.props;
    let currBalance = balance;
    const holdings = currentHoldings.map((holding, i) => {
      currBalance -= holding.amount * holding.price;

      return (<li key={i}>
        <div className='col-sm-11'>{getCmp(holding.company)}</div>
        <div className='col-sm-1' onClick={deleteCompany(i)}>x</div>
        <div className='col-sm-4'>Current: <input name='i' value={holding.amount} onChange={updateHolding(i)}/></div>
        <div className='col-sm-4'>Total amount: ${holding.amount * holding.price}</div>
        <div className='col-sm-4'>The price {holding.open_price > holding.price? 'dropped' : 'increased'} {(Math.abs(1 - (holding.price / holding.open_price)) * 100).toFixed(2)}%</div>
      </li>);
    })
    return (<div>
      <h3> Panel for result and current management</h3>
      <div>
        current balance: ${currBalance}
      </div>
      <ul>
        {holdings}
      </ul>
      <HoldingPie holdings={currentHoldings} loaded={true}/>
    </div>);
  }
}

Holdings.propTypes = {
};
