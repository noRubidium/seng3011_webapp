import React from 'react';

import ComparePopup from 'components/Compare/popup';

export default class CompareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compare: false
    };
  }

  render () {
    const { text = 'Compare', companies = [], related_companies = [] } = this.props;

    return (
      <div>
        <button href='#' className='btn btn-primary compare-button' data-toggle="modal" data-target="#compare-popup"> {text} </button>
        <ComparePopup related_companies={related_companies} companies={companies}/>
      </div>
    );
  }
}
