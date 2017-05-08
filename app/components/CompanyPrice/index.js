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
              <div style={{'font-size':'36px', 'font-weight':'bold'}}>${this.props.close_price}</div>
              <div style={{'font-size':'18px'}}>Change <span style={{color:this.props.change_price > 0.0 ? 'Green' : 'Red'}}>{this.props.change_price}({this.props.change_in_percent})</span></div>
              <div style={{'font-size':'18px'}}>{this.props.close_date.slice(0,10)}</div>
            </td>
            <td>
              High <div style={{color:this.props.day_high_price > this.props.close_price ? 'Green' : 'Red'}}>${this.props.day_high_price}</div>
            </td>
            <td>
              Prev Close: <div>${this.props.prev_close_price}</div>
            </td>
          </tr>
          <tr>
            <td>
              Low <div style={{color:this.props.day_low_price < this.props.close_price ? 'Red' : 'Green'}}>${this.props.day_low_price}</div>
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
