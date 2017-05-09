import React from 'react';
import { connect } from 'react-redux';
import { FacebookButton, FacebookCount } from "react-social";

import LoadableComponent from 'components/LoadableComponent';
import { load_company_info } from 'actions/company/info';
import { load_company_price } from 'actions/company/price';


@connect((store) => {
  return store.company.company_info;
})
export default class CompanyInfo extends LoadableComponent {

  constructor (props) {
    super(props);
    const { cid, dispatch } = this.props;
    load_company_info(cid, dispatch);
  }

  render () {
    const { name, cid, info, url } = this.props;
    this.loaded_object = (
      <div className='col-md-12 company-info'>
        <div className='col-md-2 thumbnail company-info-thumbnail'><img className='img-responsive' src={`/static/images/logo/${this.props.alias}.jpg`} /></div>
        <div className='col-md-10'>
          <h1 className='company-info-name'>
          {name} <small>{cid}</small>
          </h1>
          <div className='company-info-details'>{info}</div>
          <span className="glyphicon glyphicon-globe" aria-hidden="true"></span> <a className='white-text' href={url} target='_blank'>{url}</a>
        </div>
      </div>);
    return super.render();
  }
}
