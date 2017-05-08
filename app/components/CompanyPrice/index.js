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
    const { company_id, dispatch } = this.props;
    load_company_price(company_id, dispatch);
  }

  render () {
    this.loaded_object = (<div className="container">
      <table className="table table-bordered" className="table table-bordered">
        <tbody>
          <tr>
            <td rowSpan="2">
              {this.props.close_price}
              {this.props.change_price} ({this.props.change_in_percent})
              Close date {this.props.close_date}
            </td>
            <td>
              High: {this.props.day_high_price}
            </td>
            <td>
            Prev Close: {this.props.prev_close_price}
            </td>
          </tr>
          <tr>
            <td>
              Low: {this.props.day_low_price}
            </td>
            <td>
              Volume: {this.props.volume}
            </td>
          </tr>
        </tbody>
      </table>

    </div>);
    return super.render();
  }
}
