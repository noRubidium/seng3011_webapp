import React from 'react';

import ComparePopup from 'components/Compare/popup';

export default class CompareButton extends React.Component {
  constructor(props) {
    super(props);
    const {default_state=[] } = this.props;
    this.state = {
      compare: false,
      value: default_state,
    };
  }

  render () {
    const { text = 'Compare', companies = [], related_companies = [], default_state=[] } = this.props;

    return (
      <div style={{display: 'inline-block'}}>
        <button href='#' className='btn btn-primary compare-button' data-toggle="modal" data-target="#compare-popup"> {text} </button>
        <ComparePopup related_companies={related_companies} companies={companies} default_state={default_state}/>
      </div>
    );
  }
}
