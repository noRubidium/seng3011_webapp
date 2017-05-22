import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import textToReactMarkup from 'react-markup-text';

import LoadableComponent from 'components/LoadableComponent';
import NewsItem from 'components/News/listItem';
import Sentiment from 'components/News/sentiment';
import { load_company_news } from 'actions/company/news';

import Error from 'components/Error';
import NewsPanel from './news_panel';

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
    const { news=[] } = this.props;
    const newsItems = news.slice(0,3).map((n, i) =>
      <Link to={`/news/${btoa(n.url)}`} key={i}>
        <NewsItem title={n.headline}
                  content={n.summary}
                  secondComponent={<Sentiment url={btoa(n.url)}
                  analyse={true}/>}
        />
      </Link>
    );
    this.loaded_object = (<div style={{float:'left'}}>
      <div className='latest-news-heading'>Latest News</div>
      <div>
      <div className='list-group' className='news-list'>
        { newsItems.length !== 0 ?
          newsItems
          : <Error message='There is no news for this company' />}
        </div>
      </div>
    </div>);
    return super.render();
  }
}
