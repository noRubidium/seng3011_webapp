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
    console.log(this);
    const { company_id, dispatch } = this.props;
    load_company_news(company_id, dispatch);
  }
  render () {
    const { news } = this.props;
    console.log('THIS IS NEWS:', news);
    this.loaded_object = (<div>
      Latest News
      <div className='news-container'>
      <div className='list-group' className='news-list'>
        { this.props.news.map((item) =>  <NewsPanel item={item} />) }
        </div>
      </div>
    </div>);
    return super.render();
  }
}
