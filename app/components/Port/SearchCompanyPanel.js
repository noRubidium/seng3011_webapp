import React, {PropTypes} from 'react';

import SearchBar from 'components/SearchBar';
import StockChartFlag from 'components/StockChart/flag';
import LoadableComponent from 'components/LoadableComponent';

export default class SearchCompanyPanel extends LoadableComponent {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.company !== this.props.company || nextProps.data !== this.props.data;
  }

  render() {
    const { data, company, addCompany=(e)=>console.log } = this.props;
    const chart = data ? (

      <div className='portfolio-chart'>
        <button className='btn btn-primary add-to-portfolio' onClick={data.length > 1 ? addCompany(company,  data[data.length - 1].value, data[0].value) : console.log}>
          Add to my Portfolio
        </button>
        <StockChartFlag financeData={data} company_name={company} newsData={[]}/>
      </div>
    ) : <div className='portfolio-chart'>You haven&apos;t selected a company yet. Please search for a company you are interested in investing.</div>;
    this.loaded_object = chart;

    return (<div className='white-bg'>
      <div className='sub-title'>Find company to invest</div>
      <SearchBar callback={this.props.updateCompany}/>
      {super.render()}
    </div>);
  }
}

SearchCompanyPanel.propTypes = {
};
