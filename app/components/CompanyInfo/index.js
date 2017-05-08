import React from 'react';
import { connect } from 'react-redux';
import { FacebookButton, FacebookCount } from "react-social";

import LoadableComponent from 'components/LoadableComponent';
import { load_company_info } from 'actions/company';


@connect((store) => {
  return store.company.company_info;
})
export default class CompanyInfo extends LoadableComponent {

  constructor (props) {
    super(props);
    const { company_id, dispatch } = this.props;

    load_company_info(company_id, dispatch);
  }

  render () {
    const url = window.location.toString();
    const appId=314227965674382;
    const fb_share = (
      <FacebookButton appId={appId} >Share on Facebook</FacebookButton>
    );

    this.loaded_object = (<div>
      <h1>
      {this.props.name} <small>{this.props.company_id}</small>
      </h1>
      Name: {this.props.name}
      Code: {this.props.company_id}
      Information: {this.props.info}
      Url: {this.props.url}
      Thumbnail: {this.props.thumbnail}
      Categories: {this.props.categories}
      {fb_share}
    </div>);
    return super.render();
  }
}
