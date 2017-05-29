import React, {PropTypes} from 'react';

import SearchBar from 'components/SearchBar';
import StockChartFlag from 'components/StockChart/flag';

export default class SearchCompanyPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, company, addStock=(e)=>e } = this.props;
    const chart = data ? (<StockChartFlag  financeData={data}
    company_name={company} newsData={[]}/>) : <div>Please search for a company you are interested in investing</div>;
    return (
      <div>
        <SearchBar callback={this.props.updateCompany}/>
        <button onClick={addStock} > add to my Portfolio </button> 
        {chart}
      </div>
    );
  }
}

SearchCompanyPanel.propTypes = {
};
