import React, {PropTypes} from 'react';

import HoldingPie from './HoldingPie';
import { getCmp } from 'utils/lookup';

export default class Holdings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { company, currentHoldings, updateHolding=(i) => console.log, deleteCompany=(i)=>console.log, balance, nextStep } = this.props;
    let currBalance = balance;
    const holdings = currentHoldings.map((holding, i) => {
      currBalance -= holding.amount * holding.price;

      return (<li key={i} className='list-group-item holding-item'>
          <div className='col-sm-11 details'>
            <div className='company-name'>{getCmp(holding.company)}</div>
            <div className='col-sm-4 input-group-sm current'>
              Current Stock <input name='i' value={holding.amount} onChange={updateHolding(i)} className='form-control'/>
            </div>
            <div className='col-sm-4 amount'>
              Total Amount <br/> ${(holding.amount * holding.price).toFixed(2)}
            </div>
            <div className='col-sm-4 info'>
              The price&nbsp;
                <span className={holding.open_price > holding.price ? 'red-color' : 'green-color'}>
                  {holding.open_price > holding.price? 'dropped -' : 'increased +'}{(Math.abs(1 - (holding.price / holding.open_price)) * 100).toFixed(2)}%
                </span>
              &nbsp;during past year
            </div>
          </div>
          <div className='col-sm-1 button'>
            <button
              type='button'
              className='btn btn-danger remove-button'
              onClick={deleteCompany(i)}
              >
              <span className='glyphicon glyphicon-remove'></span>
            </button>
          </div>
      </li>);
    })
    return (<div>
      <div className='sub-title'> Result and Current Management</div>
        Current balance: ${currBalance.toFixed(2)}
      <ul className='result-management list-group'>
        {holdings}
      </ul>
      <HoldingPie holdings={currentHoldings} loaded={true}/>
      <button onClick={nextStep} className='btn btn-success'>Go to next period</button>
    </div>);
  }
}

Holdings.propTypes = {
};
