import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_price } from 'actions/company/price';

@connect((store) => {
  return store.company.company_price;
})
export default class CompanyPrice extends LoadableComponent {

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    const { cid, dispatch } = this.props;
    load_company_price(cid, dispatch, this.props);
  }

  componentDidUpdate () {
    const { cid, dispatch } = this.props;
    load_company_price(cid, dispatch, this.props);
  }

  render () {
<<<<<<< HEAD
=======
    this.loaded_object = (<div>
>>>>>>> f0486c0f721a3fa4aed94c0139e0938c8a54cb97
      <table className='table table-bordered company-price-table'>
        <tbody>
          <tr>
            <td rowSpan='2'>
              <div className='stock-price'>${this.props.close_price}</div>
              <div className='stock-price-change'>
                Change: <span className={this.props.change_price > 0.0 ? 'green-color glyphicon glyphicon-arrow-up' : 'red-color glyphicon glyphicon-arrow-down'} aria-hidden='true'></span>
                <span className={this.props.change_price > 0.0 ? 'green-color stock-price-change-value' : 'red-color stock-price-change-value'}> {this.props.change_price} ({this.props.change_in_percent})</span>
              </div>
              <div className='stock-close-date'>Closing date: <span className='stock-close-date-value'>{this.props.close_date.slice(0,10)}</span></div>
            </td>
            <td>
              High <div className={this.props.day_high_price > this.props.close_price ? 'green-color other-prices' : 'red-color other-prices'}>${this.props.day_high_price}</div>
            </td>
            <td>
              Prev Close: <div className='other-prices'>${this.props.prev_close_price}</div>
            </td>
          </tr>
          <tr>
            <td>
              Low <div className={this.props.day_low_price < this.props.close_price ? 'red-color other-prices' : 'green-color other-prices'}>${this.props.day_low_price}</div>
            </td>
            <td>
              Volume: <div className='other-prices'>{this.props.volume}</div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>);
    return super.render();
  }
}
