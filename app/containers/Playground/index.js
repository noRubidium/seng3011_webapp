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
      question: 1,
    }
    const { dispatch } = this.props;
    const industry = 'DepartmentStores';
    load_abs_stats(dispatch, industry, getType(industry));
    load_company_stats('MYR.AX', dispatch, this.props);

  }

  nextQuestion () {

      if (this.state.question == 1) {
          this.setState({question: 2, answer: false});
          load_abs_stats(this.props.dispatch, 'FoodAndLiveAnimals',getType('FoodAndLiveAnimals'));
          load_company_stats('AAC.AX',this.props.dispatch, this.props);
      }else if(this.state.question == 2) {
          this.setState({question: 3, answer: false});
          load_abs_stats(this.props.dispatch, 'Food',getType('Food'));
          load_company_stats('FNP.AX',this.props.dispatch, this.props);
      }
  }

  setAns () {
    this.setState({answer: true});

  }
  render () {

      console.log('WHAT STATE IS IT', this.state);
      var qa = this.state.answer ? (<div style={question_style}>
        <div>Sorry, the stock price will go down, as the growth of the household goods section is nearly zero, the industry is currently experiencing a recession.</div>
        <button style={ans_button_style} className='btn btn-success' onClick={this.nextQuestion.bind(this)}>Next Question</button>
      </div>) : (<div style={question_style}>
        <div> Do you think Myer&apos;s stock price will go up or down in the next 5 months? </div>
        <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>Up</button>
        <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>Down</button>
      </div>);
      var company_industry = 'AUSTRALIAN DEPARTMENT STORES TURNOVER';
      var company_name = 'MYER';

     if (this.state.question == 2) {
         qa = this.state.answer ? (<div style={question_style}>
           <div>In our opinion, the stock price will go up, as the growth of the food and live animal exports is significant, the industry is currently experiencing a growth phase. This could possibly be a company to invest in.</div>
           <button style={ans_button_style} className='btn btn-success' onClick={this.nextQuestion.bind(this)}>Next Question</button>
         </div>) : (<div style={question_style}>
           <div> Do you think Australian Agricultural Company&apos;s stock price will go up or down in the next 5 months? </div>
           <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>Up</button>
           <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>Down</button>
         </div>);
         company_industry = 'AUSTRALIAN MERCHANDISE FOOD AND LIVE ANIMALS EXPORTS';
         company_name = 'Australian Agricultural Company';

     } else if(this.state.question == 3) {
         qa = this.state.answer ? (<div style={question_style}>
           <div>In our opinion the stock price will go up, as the growth of the retail food is significant each year, the industry is currently experiencing a boom.</div>
           <button style={ans_button_style} className='btn btn-success' onClick={this.nextQuestion.bind(this)}>Next Question</button>
         </div>) : (<div style={question_style}>
           <div> Do you think Freedom Food Group&apos;s stock price will go up or down in the next 5 months? </div>
           <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>Up</button>
           <button style={ans_button_style} className='btn btn-success' onClick={this.setAns.bind(this)}>Down</button>
         </div>);
         company_industry = 'AUSTRALIAN FOOD TURNOVER';
         company_name = 'Freedom Foods Group';
     }

    const { industry:category } = this.props;
    return (<div style={{'text-align': 'center', 'font-size': 'medium'}}>
      <div style={{'font-size': 'larger', 'margin': '1em'}}><strong>Long Term Investment Training Platform</strong></div>
      <div className='row white-bg'>
        <div className='col-sm-6'>
          {company_industry}
          <IndustryChart industry={category}/>
        </div>
        <div className='col-sm-6'>
        {company_name} STOCK PRICE
        <StockChartFlag financeData={this.props.financeData || []}
        company_name={'MYER'} newsData={[]}/>
        </div>
      </div>
        {qa}
      </div>);
  }
}
