import React from 'react';
import { connect } from 'react-redux';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats } from 'actions/company';


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
    load_company_stats(company_id, dispatch);
  }

  render () {
    this.loaded_object = (<div>
      company:{this.props.company_id}
      <FacebookShareButton url={this.props.url}/>
    </div>);
    return super.render();
  }
}
