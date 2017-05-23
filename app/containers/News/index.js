import React from 'react';
import { connect } from 'react-redux';

import CompareButton from 'components/CompareButton';
import NewsArticle from 'components/News';
import SentimentEmotion from 'components/News/sentimentEmotion';
import CompareChart from 'components/CompareChart';
import LoadableComponent from 'components/LoadableComponent';
import { load_news } from 'actions/news';
import csv2json from 'utils/csv2json';
import { getCmp } from 'utils/lookup';
import { getReturn } from 'utils/companyReturn';


@connect((store) => {
  return {
    ...store.news,
  };
})
export default class News extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    const { dispatch } = this.props;
    const { news_url } = this.props.match.params;
    this.state = {
      started: false,
      loading: 0,
      finished: 0,
      loaded: 0,
      error: false,
      data: [],
    };
    load_news(news_url, dispatch);
  }

  componentDidUpdate() {
    this.loadCompareData();
  }

  loadCompareData() {
    const { started } = this.state;
    const companies = this.getCompanies();
    if (started || companies.length === 0) {
      return;
    }
    const { date: date_string } = this.props;
    const date = new Date(date_string);
    const days = 15;
    const start = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    const end = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    this.setState({started: true, data: [], loading: companies.length});
    companies.map((cid) => {
      fetch(`http://api.kaiworship.xyz/cmp/${cid}/${start}/${end}`)
      .then((response) => {
        return response.ok ? response.text():null;
      })
      .then((d) => {
        if (!d) {
          this.setState({
            error: true,
            error_msg: `Company: ${cid} data not found`
          });
          return;
        }
        const result = csv2json(d);
        const { finished, data, loading } = this.state;

        this.setState({
          finished: finished + 1,
          loading: loading - 1,
          data: data.concat([getReturn(result, cid)])
        });
        if (finished === companies.length - 1) {
          this.setState({loaded: true});
        }
      });
    });
  }

  getCompanies () {
    const { involved_companies=[] } = this.props;
    return involved_companies.map((e) => `${e}.AX`);
  }

  render () {
    const { loading, error, loaded, emotion={}, sentiment={}, headline, date, image, url, text, involved_companies } = this.props;

    if (loaded) {
      const companies = involved_companies.map((e) => {
        return {id: e, name: getCmp(e)};
      });
      if (date.getDay > 4) {
        date.setDate(date.getDate() - 2);
      }
      this.loaded_object = (<div>
        <div className='row'>
          <div className='col-sm-7 white-bg-container'>
            <NewsArticle  title={headline}
                          date={date}
                          involved_companies={involved_companies}
                          image={image}
                          content={text}
                          url={url}/>
          </div>
          <div className='col-sm-5 white-bg-container'>
            <SentimentEmotion emotion={emotion} sentiment={sentiment} loading={loading} error={error} loaded={loaded}/>
            <div className='news-analysis white-bg'>
              <div className='sub-title'>Impact Analysis</div>
              <CompareChart {...this.state} date={date}/>
              <div className='news-compare'>
                <CompareButton text={'Compare involved companies'} companies={companies}
                related_companies={involved_companies}/>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return super.render();
  }
}
