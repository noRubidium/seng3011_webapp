import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_price } from 'actions/company';

@connect((store) => {
  return store.company.company_price;
})
export default class CompanyPrice extends LoadableComponent {

  constructor (props) {
    super(props);
    const { code, dispatch } = this.props;
    load_company_price(code, dispatch);
  }

  render () {
    this.loaded_object = (<div class="container">
      <table class="table table-bordered" className="table table-bordered">
        <tbody>
          <tr>
            <td rowSpan="2">
              <div className='stock-price'>${this.props.close_price}</div>
              <div className='stock-price-change'>Change <span className={this.props.change_price > 0.0 ? 'green-color' : 'red-color'}>{this.props.change_price}({this.props.change_in_percent})</span></div>
              <div className='stock-close-date'>{this.props.close_date.slice(0,10)}</div>
            </td>
            <td>
              High <div className={this.props.day_high_price > this.props.close_price ? 'green-color' : 'red-color'}>${this.props.day_high_price}</div>
            </td>
            <td>
              Prev Close: <div>${this.props.prev_close_price}</div>
            </td>
          </tr>
          <tr>
            <td>
              Low <div className={this.props.day_low_price < this.props.close_price ? 'red-color' : 'green-color'}>${this.props.day_low_price}</div>
            </td>
            <td>
              Volume: <div>{this.props.volume}</div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>);
    return super.render();
  }
}
