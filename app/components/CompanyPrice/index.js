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
    console.log('heree',this);
  }

  render () {
    this.loaded_object = (<div class="container">
      <table className="table table-striped">
        <tbody>
          <tr>
            <td rowspan="2">
              {this.props.close_price}
              Change {this.props.change_price} ({this.props.change_in_percent})
              Close date {this.props.close_date}
            </td>
            <td rowspan="2">
              High: {this.props.day_high_price}
            </td>
            <td>
              Prev close: {this.props.prev_close_price}
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
