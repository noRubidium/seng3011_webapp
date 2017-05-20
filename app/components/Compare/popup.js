import React from 'react';
import Select from 'react-select';

class PopupContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
		this.setState({ value });
	}

  render () {
    const options = [
      { value: 'MYR', label: 'MYR' },
      { value: 'DMP', label: 'DMP' },
      { value: 'WOW', label: 'WOW' },
      { value: 'WES', label: 'WES' }
    ];

    return (
      <Select multi
            simpleValue
            value={this.state.value}
            placeholder="Select companies"
            options={options}
            onChange={this.handleSelectChange}
      />
    );
  }
}

export default class ComparePopup extends React.Component {  
  render () {
    return (
    <div className='modal fade' id='compare-popup' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
            <h4 className='modal-title'>Compare</h4>
          </div>
          <div className='modal-body'>
            <PopupContent/>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            <button type='button' className='btn btn-primary'>Compare</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
