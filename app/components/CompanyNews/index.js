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
import SummaryPanel from './summary_panel';

@connect((store) => {
  return store.company.company_news;
})
export default class CompanyNews extends LoadableComponent {

  constructor (props) {
    super(props);
    this.state = {
        loading: false,
        loaded: false,
        error: false,
        data: {},
        cid: '',
    }
  }

  load_summary () {
      const { cid } = this.props;
      const url = `${process.env.API_URL}/news/summary/${cid.slice(0, 3)}`;
      this.setState({
          loading: true,
          loaded: false,
          error: false,
          data: [],
          cid
      });

      fetch(url)
        .then((r) => {
            if (!r.ok) return;
            return r.json();
        })
        .then((data) => {
            if (this.state.cid !== cid) return;
            if (!data) {
                this.setState({loading: false, error: true});
                return;
            }

            this.setState({loading: false, loaded: true, data});
        })
  }
  componentWillMount() {
    const { id, cid, dispatch } = this.props;
    if (cid !== id) {
      load_company_news(cid, dispatch);
      this.load_summary();
    }
  }

  componentDidUpdate () {
    const { cid, id, dispatch } = this.props;
    if (cid !== id) {
      load_company_news(cid, dispatch);
      this.load_summary();
    }
  }

  prettifyDate(date_string) {
    const d = new Date(date_string);
    return d.toDateString();
  }

  createContent(date, summary) {
    return (
      <div>
        <div className='news-list-item-date'>{this.prettifyDate(date)}</div>
        <div className='news-list-item-summary'>{summary}</div>
      </div>
    )
  }

  render () {
    const { news=[] } = this.props;
    const newsItems = news.slice(0,3).map((n, i) =>
      <Link to={`/news/${btoa(n.url)}`} key={i}>
        <NewsItem title={n.headline}
                  content={this.createContent(n.date,n.summary)}
                  secondComponent={<Sentiment url={btoa(n.url)}
                  analyse={true}/>}
        />
      </Link>
    );
    this.loaded_object = (
      <div className='row'>
        <div className='col-md-8 col-sm-12'>
        <div className='list-group' className='news-list'>
          { newsItems.length !== 0 ?
            newsItems
            : <Error message='There is no news for this company' />}
        </div>
        </div>
        <div className='col-md-4 col-sm-12'>
            <SummaryPanel {...this.state}/>
        </div>
      </div>);
    return super.render();
  }
}
