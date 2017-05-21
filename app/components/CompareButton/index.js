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
    const { text = 'Compare', companies } = this.props;
    
    return (
      <div>
        <button href='#' className='btn btn-default compare-button' data-toggle="modal" data-target="#compare-popup"> {text} </button>
        <ComparePopup companies={companies ? companies : []}/>
      </div>
    );
  }
}
