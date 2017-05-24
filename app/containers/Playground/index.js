import React from 'react';
import { connect } from 'react-redux';

import StockChartFlag from 'components/StockChart/flag.js';
import IndustryChart from 'components/Industry/chart';
import { getCmp, getType } from 'utils/lookup';
import { load_companies, load_abs_stats } from 'actions/company_list';
import { load_company_stats } from 'actions/company/stats';

const question_style = {
  'text-align': 'center',
}

const ans_button_style = {
  'margin': '1em',
  'min-width': '2em',
}

@connect((store) => {
  return {
    ...store.company.company_stats,
    news: store.company.company_news,
  };
})
export default class Playground extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      answer: false,
    }
    const { dispatch } = this.props;
    const industry = 'DepartmentStores';
    load_abs_stats(dispatch, industry, getType(industry));
    load_company_stats('MYR.AX', dispatch, this.props);

  }
  setAns () {
    this.setState({answer: true});
  }
  render () {
    const qa = this.state.answer ? (<div style={question_style}>
      <div>Sorry, the stock price will go down, as the growth of the household goods section is nearly zero, the industry is currently experiencing a recession.</div>
      <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>Next Question</button>
    </div>) : (<div style={question_style}>
      <div> Do you think Myer&apos;s stock price will go up or down in the next 5 months? </div>
      <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>Yes</button>
      <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>No</button>
    </div>);
    const { industry:category } = this.props;
    return (<div style={{'text-align': 'center', 'font-size': 'medium'}}>
      <div style={{'font-size': 'larger', 'margin': '1em'}}><strong>Long Term Investment Training Platform</strong></div>
      <div className='row white-bg'>
        <div className='col-sm-6'>
          AUSTRALIAN DEPARTMENT STORES TURNOVER
          <IndustryChart industry={category}/>
        </div>
        <div className='col-sm-6'>
        MYER STOCK PRICE
        <StockChartFlag financeData={this.props.financeData || []}
        company_name={'MYER'} newsData={[]}/>
        </div>
      </div>
        {qa}
      </div>);
  }
}
