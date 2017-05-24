import React from 'react';
import { Link } from 'react-router-dom';

const data_man = [
    {label: 'line', text: 'Long term investment', lnk: '/learning-centre/long'},
    {label: 'bar', text: 'Short term trading', lnk: '/learning-centre/short'},
    {label: 'pie', text: 'Portfolio management', lnk: '/learning-centre/port'}];

const main_style= {
    textAlign: 'center',
    paddingTop: 50,
};

const inner_align = {
    maxWidth: 200,
    margin: 'auto',
    top: 50
};

const outer_style = {
    width: '100%',
    textAlign: 'center'
};

const info_img = {
    width: 95,
    marginBottom: 15
};


export default class Training extends React.Component {
  interactive () {
      const infos = data_man.map((e) =>
          <div className='col-md-4' style={main_style}>
            <div style={inner_align}>
              <Link to={e.lnk}><img src={`/static/images/${e.label}-chart.svg`} className='pref-info' style={info_img}/></Link>
              <div>{e.text}</div>
            </div>
          </div>);
      return (<div style={outer_style}>
        <div className='row'>
            { infos }
        </div>
      </div>);
  }

  render () {
    return (<div className='learning-centre'>
      <div className='page-title'>Learning Centre</div>
      <div className='learning-centre-text'>
        New to investing or trading? You&apos;ve come to the right place! Here in learning centre,
        we are trying to help you getting started!
      </div>
      <div className='sub-title' data-toggle='collapse' href='#investing'>
        <span className='caret'></span> What is investing?
      </div>
      <div className='collapse' id='investing'>
        <div className='well'>
          <p>
            Investing is the act of committing money or capital to an endeavor with the expectation of obtaining an additional income or profit. The goal of investing is to
            put your money to work in one or more types of investment vehicles in the hopes of growing your money over time.
          </p>
        </div>
      </div>
      <div className='sub-title' data-toggle='collapse' href='#trading'>
        <span className='caret'></span> What is a trade and trading?
      </div>
      <div className='collapse' id='trading'>
        <div className='well'>
          <p>
            Trade is a basic economic concept involving the buying and selling of goods and services, with compensation paid by a buyer to a seller, or the exchange
            of goods or services between parties. The most common medium of exchange for these transactions is money, but trade may also be executed with the exchange
            of goods or services between both parties, referred to as a barter, or payment with virtual currency, the most popular of which is bitcoin.
            In financial markets, trading refers to the buying and selling of securities, such as the purchase of stock on the floor of the Australian Stock Exchange (ASX).
          </p>
        </div>
      </div>
      <div className='sub-title' data-toggle='collapse' href='#difference'>
        <span className='caret'></span> What is the difference between investing and trading?
      </div>
      <div className='collapse' id='difference'>
        <div className='well'>
          <p>
              Investing and trading are two very different methods of attempting to profit in the financial markets.
          </p>
          <p>
              The goal of investing is to gradually build wealth over an extended period of time through the buying and holding of a portfolio of stocks, baskets of stocks, mutual funds,
              bonds and other investment instruments. Investments are often held for a period of years, taking advantage of perks like interest along the way. While markets inevitably fluctuate,
              investors will 'ride out' the downtrends with the expectation that prices will rebound and any losses will eventually be recovered.
          </p>
          <p>
              Trading, on the other hand, involves the more frequent buying and selling of stock, commodities, currency pairs or other instruments, with the goal of generating returns that
              outperform buy-and-hold investing. While investors may be content with a 10 to 15% annual return, traders might seek a 10% return each month. Traders
              often employ technical analysis tools, such as moving averages and stochastic oscillators, to find high-probability trading setups.
          </p>
        </div>
      </div>
      <div className='page-title' style={{marginTop: '20px'}}>Interactive Playground</div>
        {this.interactive()}
    </div>);
  }
}
