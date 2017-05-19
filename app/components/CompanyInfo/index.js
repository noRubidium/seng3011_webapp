import React from 'react';
import { connect } from 'react-redux';

import FollowButton from 'components/FollowButton';
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
          <FollowButton cid={cid}/>
          <div className='company-info-details'>{info}</div>
          <span className="glyphicon glyphicon-globe" aria-hidden="true"></span> <a className='white-text' href={url} target='_blank'>{url}</a>
          <span style={{marginLeft: '15px'}} className="glyphicon glyphicon-bullhorn" aria-hidden="true"></span> <a className='white-text' href={`http://www.asx.com.au/asx/statistics/announcements.do?by=asxCode&asxCode=${this.props.cid.slice(0,3)}&timeframe=D&period=M6`} target='_blank'>Company Announcements</a>
        </div>
      </div>);
    return super.render();
  }
}
