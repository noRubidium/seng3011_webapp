import React from 'react';
import { connect } from 'react-redux';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_info } from 'actions/company';
import { load_company_price } from 'actions/company';


const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton
} = ShareButtons;

@connect((store) => {
  return store.company.company_info;
})
export default class CompanyInfo extends LoadableComponent {

  constructor (props) {
    super(props);
    const { company_id, dispatch } = this.props;
    load_company_info(company_id, dispatch);
    load_company_price(company_id, dispatch);
    console.log('AFTER price',this);
  }

  render () {
    this.loaded_object = (<div>
      <h1>
      {this.props.name} <small>{this.props.company_id}</small>
      </h1>
      Close: {this.props.close} Volume: {this.props.volume}
      Name: {this.props.name} Code: {this.props.company_id}
      Information: {this.props.info}
    </div>);
    return super.render();
  }
}
