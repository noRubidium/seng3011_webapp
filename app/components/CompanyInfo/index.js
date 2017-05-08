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
    this.loaded_object = (
      <div>
        <div className='col-md-2'><img className='img-responsive' src={'https://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/052013/dominos_logo.png?itok=rfMA20SQ'} /></div>
        <div className='col-md-10'>
          <h1>
          {this.props.name} <small>{this.props.company_id}</small>
          </h1>
          <div>{this.props.info}</div>
          <a class='white-text' href={this.props.url} target='_blank'>{this.props.url}</a>
        </div>
      </div>);
    return super.render();
  }
}
