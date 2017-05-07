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
    this.loaded_object = (<div>
      <table class="table table-bordered">
        <thead>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr rowspan="2">
            <th scope="row" colspan="3">
              {this.props.close_price}
              Change {this.props.change_price} ({this.props.change_percentage})
              Close date {this.props.close_date}
            </th>
          </tr>
          <tr>
            <td>
              High
              {this.props.day_high_price}
            </td>
            <td>
              Low
              {this.props.day_low_price}
            </td>
          </tr>
          <tr>
            <td>
              Prev close
              {this.props.prev_close}
            </td>
            <td>
              Volume
              {this.props.volume}
            </td>
          </tr>
        </tbody>
      </table>
    </div>);
    return super.render();
  }
}
