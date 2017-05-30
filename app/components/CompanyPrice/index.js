import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_price } from 'actions/company/price';
import InfoButton from 'components/InfoButton';

import industryPEs from './industryPE.json';
import data from 'components/SearchBar/data.json';

const companies = data.data;

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

  getDyStatus(dy) {
    if (dy > 4.59) {
      return 'High';
    } else if (dy < 3.59) {
      return 'Low';
    } else {
      return 'Average';
    }
  }

  getDyStatusClassName(dy) {
    if (dy > 4.59) {
      return 'green-color';
    } else if (dy < 3.59) {
      return 'red-color';
    } else {
      return 'yellow-color';
    }
  }

  getDyRelation(dy) {
    if (dy > 4.59) {
      return 'higher than';
    } else if (dy < 3.59) {
      return 'lower than';
    } else {
      if (dy === 4.09) {
        return 'equal to';
      }
      return 'close to';
    }
  }

  render () {

    const companyInfo = companies.filter(x => x.id === this.props.cid.slice(0,3));
    const gicsIndustry = companyInfo[0].industry;
    const industryPE = industryPEs[gicsIndustry];
    const peDifference = this.props.pe - industryPE;
    const higherLower = peDifference > 0.0 ? 'higher' : 'lower';
    const underOver = peDifference > 0.0 ? 'over' : 'under';

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
              <div>
                <span className='other-prices'>{this.props.pe} </span>
                - <span className={peDifference > 0.0 ? 'red-color' : 'green-color' }>{peDifference > 0.0 ? 'Overvalued' : 'Undervalued'}</span>
                <InfoButton text={'This company\'s P/E ratio of ' + this.props.pe + ' is ' + higherLower + ' than the ' + gicsIndustry + ' industry P/E ratio of ' + industryPE + ', suggesting that it is ' + underOver + 'valued.'}/>
              </div>
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
              <div>
                <span className='other-prices'>{this.props.annual_dividend_yield} </span>
                - <span className={this.getDyStatusClassName(this.props.annual_dividend_yield)}>{this.getDyStatus(this.props.annual_dividend_yield)}</span>
                <InfoButton text={'This company\'s Annual Dividend Yield of ' + this.props.annual_dividend_yield + ' is ' + this.getDyRelation(this.props.annual_dividend_yield) + ' the All Ordinaries Index\'s current annual dividend yield of 4.09'}/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>);
    return super.render();
  }
}
