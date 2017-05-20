import React from 'react';
import { Link } from 'react-router-dom';
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
		this.props.parent.setState({ value });
	}

  render () {
    const options = [
      { value: 'MYR.AX', label: 'MYR' },
      { value: 'DMP.AX', label: 'DMP' },
      { value: 'WOW.AX', label: 'WOW' },
      { value: 'WES.AX', label: 'WES' }
    ];

    const { parent } = this.props;

    return (
      <Select multi
            simpleValue
            value={parent.state.value}
            placeholder="Select companies"
            options={options}
            onChange={this.handleSelectChange}
      />
    );
  }
}

export default class ComparePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
    this.compare = this.compare.bind(this);
  }

  compare() {
    $('.modal-backdrop').hide();
  }

  render () {
    const compareLink = `/compare/${this.state.value}`;

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
            <PopupContent parent={this}/>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            <Link to={compareLink} onClick={this.compare}>
              <button type='submit' className='btn btn-primary compare-popup-button'>Compare</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
