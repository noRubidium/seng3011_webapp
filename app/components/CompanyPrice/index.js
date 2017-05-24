import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_price } from 'actions/company/price';
import InfoButton from 'components/InfoButton';

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

    this.loaded_object = (<div>
      <table className='table table-bordered company-price-table'>
        <tbody>
          <tr>
            <td rowSpan='2'>
              <div className='stock-price'>${this.props.last_price}</div>
              <div className='stock-price-change'>
                Change: <span className={this.props.last_price - this.props.previous_close_price > 0.0 ? 'green-color glyphicon glyphicon-arrow-up' : 'red-color glyphicon glyphicon-arrow-down'} aria-hidden='true'></span>
                <span className={this.props.last_price - this.props.previous_close_price > 0.0 ? 'green-color stock-price-change-value' : 'red-color stock-price-change-value'}> {(this.props.last_price - this.props.previous_close_price).toFixed(3)} ({this.props.previous_day_percentage_change})</span>
              </div>
              <div className='stock-close-date'>Closing date: <span className='stock-close-date-value'>{this.props.last_trade_date.slice(0,10)}</span></div>
            </td>
            <td>
              Year Change
              <InfoButton text={'Change in the stock price over the previous year'}/>
              <div className={this.props.year_change_price < 0 ? 'red-color other-prices' : 'green-color other-prices'}>{this.props.year_change_in_percentage}</div>
            </td>
            <td>
              P/E Ratio
              <InfoButton text={'The stock price to company earnings ratio. An indicator of how under/over valued the stock is. The higher the P/E ratio, the more overvalued the company is, and vice versa.'}/>
              <div className='other-prices'>{this.props.pe}</div>
            </td>
          </tr>
          <tr>
            <td>
              EPS <InfoButton text={'Earnings Per Share - the portion of a company\'s profit allocated to each outstanding share of common stock'}/>
              <div className='other-prices'>{this.props.eps}</div>
            </td>
            <td>
              DY:
              <InfoButton text={'Annual Dividend Yield. The ratio of how much the company pays shareholders in dividends, relative to its share price. A high DY indicates a company that is prioritising shareholder wealth, whereas a low one indicates a company that is prioritising growth.'}/>
              <div className='other-prices'>{this.props.annual_dividend_yield}</div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>);
    return super.render();
  }
}
