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
    console.log("HELLOO" + this.props);
  }
  render () {
    const { news } = this.props;
    console.log("THIS IS NEWS:", news);
    this.loaded_object = (<div>
      Latest News
      <div style={{height:"500px"}}>
      <div className="list-group" style={{"height":"100%", overflow:"scroll", "padding-top":"10px", "margin-bottom":"10px"}}>
        {
          this.props.news.map((item) => {
            return(
              <NewsPanel
                item={item}
              />
            );
          })
        }
        </div>
      </div>
    </div>);
    console.log("LOADEDOBJ: ", this.loaded_object);
    return super.render();
  }
}
