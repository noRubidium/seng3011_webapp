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
  }

  render () {
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
    </div>);
    return super.render();
  }
}
