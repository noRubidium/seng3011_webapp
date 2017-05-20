import React from 'react';
import { connect } from 'react-redux';

import CompareButton from 'components/CompareButton';
import NewsArticle from 'components/News';
import SentimentEmotion from 'components/News/sentimentEmotion';
import Chart from 'components/Industry/chart';
import LoadableComponent from 'components/LoadableComponent';
import { load_news } from 'actions/news';

const data = {"emotion": {"anger": 0.143198, "joy": 0.526753, "sadness": 0.537889, "fear": 0.128797, "disgust": 0.080995}, "sentiment": {"score": 0.0322361, "label": "positive"}, "headline": "No price war, but Woolworths' soaring sales come at a cost", "text": "Share on twitter James Thomson by If you want a reminder that nothing comes for free, then look past the stunning sales growth figures at the top of Woolworths' third-quarter results announcement and down to the section called \"outlook\". That's the bit where chief executive Brad Banducci reminds investors that there is a bill to be paid for the impressive improvement \u2013 and it won't be cheap. \"As outlined at our H117 results, the second half of FY17 will continue to reflect the financial impact of higher costs in key areas,\" Banducci says, before rattling through a decent list. There are team incentives and team training. There's depreciation. There are higher costs in meat (particularly lamb) and fresh produce. And then the most important (and likely biggest) cost of all \u2013 Woolworths \"continued response to ongoing competition and promotional intensity\".\n\nLike-for-like-sales growth, which ran at a seven-year high of 4.3 per cent in the third quarter, adjusted for a later Easter, is impressive. But costs are rising, margins are under pressure, and Banducci is making it clear that profitability will be affected.\n\nGiven Coles chief executive John Durkan delivered another \"we will fight them on the beaches\" type of statement on discounting last week, making it clear he won't be backing down on price, there will be some investors wondering just how intense this battle will be. Discount picture 'unclear' Banducci told analysts on Tuesday that the discounting picture across the sector was unclear in the run-up to the end of the financial year. \"It would be fair to say that we did see some increased promotional activity from our key competitor in the third quarter, which we responded to,\" he said. \"There's a bit of uncertainty as to how that plays out in the last eight weeks of the financial year.\"\n\nBut so far, it doesn't seem there is an \"irrational\" price war breaking out. Coles and Woolworths are covering each others moves \u2013 Woolies chased Coles' fresh produce price cuts in the third quarter, for example \u2013 but we aren't seeing anything radical, like $1-a-litre milk. Banducci confirmed again on Tuesday that his goal is to be \"no more expensive\" than Coles \u2013 that is, importantly, not cheaper. He also said the number of promotions in-store had fallen by 9 per cent, which certainly doesn't scream \"irrational\".\n\nInvestor support Investors are likely to support the current approach from both retailers. And they're also likely to support investments in things like employee training and incentives, areas in which Banducci says Woolworths is in catch-up mode. But there will come a time \u2013 perhaps as soon as the 2018 financial year \u2013 when the market will start to demand cost cuts to help pay for this discounting. Stay tuned. Banducci also provided a clear message on Big W, which continues to struggle. Losses for the June half will be $115 million to $135 million, up from February's prediction of $88 million.", "summary": "Investor support Investors are likely to support the current approach from both retailers.\nAnd then the most important (and likely biggest) cost of all \u2013 Woolworths \"continued response to ongoing competition and promotional intensity\".\nLosses for the June half will be $115 million to $135 million, up from February's prediction of $88 million.\nAnd they're also likely to support investments in things like employee training and incentives, areas in which Banducci says Woolworths is in catch-up mode.\nColes and Woolworths are covering each others moves \u2013 Woolies chased Coles' fresh produce price cuts in the third quarter, for example \u2013 but we aren't seeing anything radical, like $1-a-litre milk.", "date": "2017-05-02T04:10:55+10:00", "involved_companies": ["WOW"]}


@connect((store) => {
  return {
    ...store.news,
  };
})
export default class News extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    const { dispatch, news_url } = this.props;
    load_news(news_url, dispatch);
  }

  render () {
    const loaded = true;
    const news = data;

    if (loaded) {

      this.loaded_object = (<div>
        <div className='row'>
          <div className='col-sm-7'>
            <NewsArticle title={news.headline} content={news.text}/>
          </div>
          <div className='col-sm-5'>
            <SentimentEmotion/>
            <div className='news-analysis'>
              <div className='sub-title'>Impact Analysis</div>
              <Chart/>
            </div>
            <div className='news-compare'>
              <CompareButton text={'Compare with other company'}/>
            </div>
          </div>
        </div>

      </div>);
    }
    return this.loaded_object;
  }
}
