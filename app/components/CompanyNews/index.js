import React from 'react';
import { connect } from 'react-redux';
import textToReactMarkup from 'react-markup-text';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_news } from 'actions/company';

import NewsPanel from 'components/CompanyNews/news_panel';

@connect((store) => {
  return store.company.company_news;
})
export default class CompanyNews extends LoadableComponent {

  constructor (props) {
    super(props);

    const { cid, dispatch } = this.props;
    load_company_news(cid, dispatch);
  }
  render () {
    const { news } = this.props;
    this.loaded_object = (<div>
      <div className='latest-news-heading'>Latest News</div>
      <div className='news-container'>
        <div className='list-group' className='news-list'>
          { this.props.news.map((item, i) =>  <NewsPanel key={i} item={item} />) }
        </div>
      </div>
    </div>);
    return super.render();
  }
}
