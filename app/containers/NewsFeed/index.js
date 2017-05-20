import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NewsItem from 'components/News/listItem';
import Sentiment from 'components/News/sentiment';
import LoadableComponent from 'components/LoadableComponent';
import { load_news_feed } from 'actions/user/news_feed';

const data = [{"headline": "Aldi keeps pressure on Coles, Woolworths by cutting prices ", "date": "14/05/2017", "url": "http://www.afr.com/Page/Uuid/gw2upu", "summary": "German discount grocery chain Aldi is hoping a new brand campaign, store refurbishments and an expanded fresh food offer will drive more customers through its doors as it scraps for its share of the $90 billion sector."}, {"headline": "Meriton to go up in Dee Why: approval given for two 17-storey apartment towers", "date": "12/05/2017", "url": "http://www.afr.com/Page/Uuid/gw3kzb", "summary": "Approval brings 17-level towers to traditional low-rise area on Sydney's northern beaches."}, {"headline": "Woolies' boss Banducci and former QBE boss O'Halloran shake the box for Salvos", "date": "4/05/2017", "url": "http://www.afr.com/Page/Uuid/gvytnt", "summary": "Nothing opens corporate wallets faster than a case of the guilts. Just ask Salvos' spruikers Brad Banducci and Frank O'Halloran."}, {"headline": "Caltex Australia gains ACCC clearance for Milemaker Petroleum deal ", "date": "4/05/2017", "url": "http://www.afr.com/Page/Uuid/gvyfdb", "summary": "Caltex Australia is pressing ahead with its $95 million acquisition of Milemaker Petroleum's retail fuel business after overcoming competition concerns."}, {"headline": "Price war odds rise as Woolworths outpaces Coles ", "date": "3/05/2017", "url": "http://www.afr.com/Page/Uuid/gvy0aa", "summary": "The battle for market share between Woolworths and Coles has reached a dangerous juncture."}, {"headline": "Goodman Fielder factory closure delayed by competition concerns ", "date": "3/05/2017", "url": "http://www.afr.com/Page/Uuid/gvxvri", "summary": "Goodman Fielder has been forced to postpone plans to shut its only WA bakery because of competition concerns over a supply agreement with a major rival. "}, {"headline": "Woolworths' BIG W to lose $160 million before implementing turnaround plan ", "date": "2/05/2017", "url": "http://www.afr.com/Page/Uuid/gvx63r", "summary": "Woolworths has come up with a new turnaround plan to save BIG W but it won't stop losses blowing out to more than $160 million this year."}, {"headline": "Maggie Beer Products shifts online to Melbourne, millennial focus ", "date": "2/05/2017", "url": "http://www.afr.com/Page/Uuid/gvwv10", "summary": "Maggie Beer Products is shifting its online distribution to Melbourne after a review found it needs to focus more on the millennials. "}, {"headline": "No price war, but Woolworths' soaring sales come at a cost", "date": "2/05/2017", "url": "http://www.afr.com/Page/Uuid/gvwzdj", "summary": "If you want a reminder that nothing comes for free, then look past the stunning third-quarter sales growth figures at Woolworths. "}, {"headline": "Woolworths posts strongest food sales growth since 2010 ", "date": "2/05/2017", "url": "http://www.afr.com/Page/Uuid/gvwpmp", "summary": "Woolworths has posted its strongest supermarket sales growth since 2010, with same-store food sales rising 4.5 per cent in the March quarter.\n"}, {"headline": "Amazon to wipe 16pc off retailer earnings: Fund managers ", "date": "1/05/2017", "url": "http://www.afr.com/Page/Uuid/gvw7cq", "summary": "Amazon will wipe 16 per cent off discretionary retailers' earnings within three years of entering Australia, according to surveys of fund managers and brokers by UBS."}, {"headline": "ASX poised to extend bullish run on earnings", "date": "30/04/2017", "url": "http://www.afr.com/Page/Uuid/gvv8xr", "summary": "Despite setbacks and stumbles, global markets have retained a bullish bid since Donald Trump took the oath of office."}, {"headline": "Off-the-plan Woolworths sale to Chinese investors sets new benchmark", "date": "27/04/2017", "url": "http://www.afr.com/Page/Uuid/gvtp9m", "summary": "A mainland Chinese investor has paid $13.5 million to buy a new Woolworth supermarket off-the-plan in Melbourne's inner suburbs."}, {"headline": "Chasing Woolworth down, down is costing Coles", "date": "27/04/2017", "url": "http://www.afr.com/Page/Uuid/gvthh0", "summary": "Coles is having to pay a price to hold its ground in the fight with Woolworths. "}, {"headline": "Woolworths signs 15-year lease at Pellicano's South City Square ", "date": "26/04/2017", "url": "http://www.afr.com/Page/Uuid/gvr4l3", "summary": "Woolworths have agreed to a big new store in Brisbane's next big apartment project, expecting the boom in apartments will create strong trading at its new store."}, {"headline": "HelloFresh, Marley Spoon get the knives out in the fight for customers", "date": "25/04/2017", "url": "http://www.afr.com/Page/Uuid/gvr9mm", "summary": "The knives have come out in the fast-growing meal kit delivery market, where Marley Spoon has accused arch rival HelloFresh of dirty tricks.\n"}, {"headline": "Woolworths to proceed with Masters sale after Lowe's forced to sell back stake", "date": "21/04/2017", "url": "http://www.afr.com/Page/Uuid/gvp8xq", "summary": "An arbitration process in the final stoush with Lowe's has cleared the way for Woolies' $1.5 billion exit plan."}, {"headline": "Retailers step up Amazon defences ", "date": "20/04/2017", "url": "http://www.afr.com/Page/Uuid/gvoelf", "summary": "Loyalty programs, data analytics and in-store experiences will become the weapons of choice as Australian retailers fight to protect sales and earnings from online retail behemoth Amazon."}, {"headline": "Big River boss says detached housing to stay strong ", "date": "20/04/2017", "url": "http://www.afr.com/Page/Uuid/gvocfe", "summary": "Big River eyeing acquisitions as the timber company prepares to list on the ASX later this year. "}, {"headline": "Coles, Woolworths early settlement discounts under scrutiny ", "date": "18/04/2017", "url": "http://www.afr.com/Page/Uuid/gvmwpe", "summary": "Coles and Woolworths are charging small food and grocery suppliers discounts of almost 4 per cent for the privilege of receiving payment for goods in 30 days rather than 60 days."}, {"headline": "Craft beer has moved beyond bearded hipsters but it is getting very crowded", "date": "12/04/2017", "url": "http://www.afr.com/Page/Uuid/gvhf92", "summary": "It started with hipsters, but after doubling to 400 brewers in the past two years, the craft beer market has got very crowded."}, {"headline": "Meet the small supermarket suppliers beating the global consumer giants", "date": "12/04/2017", "url": "http://www.afr.com/Page/Uuid/gvd0ar", "summary": "Small food suppliers are the envy of global conglomerates struggling to grow sales. Supermarket giants love them too."}, {"headline": "Woolworths shareholders to launch class action ", "date": "11/04/2017", "url": "http://www.afr.com/Page/Uuid/gvicyx", "summary": "Shareholders are preparing to launch a $100m class action law suit against Woolworths over a profit warning that sent the shares down almost 14pc. "}, {"headline": "Caltex chief Julian Segal joins queue of CEOs selling stock", "date": "10/04/2017", "url": "http://www.afr.com/Page/Uuid/gvhv9b", "summary": "Julian Segal is just the latest CEO to sell stock in his own story. It's never a great sign. "}, {"headline": "Lowe's still seeking more from Woolworths over Masters ", "date": "5/04/2017", "url": "http://www.afr.com/Page/Uuid/gveho0", "summary": "Lowe's has written down its stake in Masters to just $US103 million but is still seeking a much higher price for its share."}, {"headline": "Metcash to launch Price Match II to protect sales ", "date": "4/04/2017", "url": "http://www.afr.com/Page/Uuid/gvd21y", "summary": "Metcash is working with IGA retailers and suppliers on a new price matching program to stem share loss, which has accelerated since Woolworths turned the corner.\n"}, {"headline": "Citi analysts weigh back into Woolworths debate after 14-month break", "date": "4/04/2017", "url": "http://www.afr.com/Page/Uuid/gvdc3g", "summary": "Citi's equities research team is back in the market with views on one of the bank's blue-chip corporate clients. "}, {"headline": "Goodman Fielder supply agreement 'half-baked'", "date": "30/03/2017", "url": "http://www.afr.com/Page/Uuid/gv9kcu", "summary": "Goodman Fielder's plan to close a bakery in Perth and get bread from its largest rival has sparked competition concerns."}, {"headline": "Patties Foods CEO says ready-made meal market close to $1b ", "date": "30/03/2017", "url": "http://www.afr.com/Page/Uuid/gv9iwd", "summary": "The CEO of Patties Foods says the ready-made meal sector in Australia has moved well beyond \"TV dinners\"."}, {"headline": "Woolworths warns rising energy costs will hit grocery prices ", "date": "28/03/2017", "url": "http://www.afr.com/Page/Uuid/gv7yjl", "summary": "Woolworths CEO Brad Banducci has warned that rising energy costs will eventually force the food giant to increase grocery prices."}]

@connect((store) => {
  return {
    ...store.news_feed,
  };
})
export default class NewsFeed extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    const { uid, dispatch } = this.props;
    load_news_feed(uid, dispatch);
  }

  render () {
    const loaded = true;
    const news = data;

    if (loaded) {
      this.loaded_object = news.map((n) =>
        <Link to={`/news/${btoa(n.url)}`}>
        <NewsItem title={n.headline}
                  content={n.summary}
                  secondComponent={<Sentiment/>}
        />
        </Link>
      );
    }
    return (
      <div>
        <div className='page-title'>News Feeds</div>
        {this.loaded_object}
      </div>
    )
  }
}
