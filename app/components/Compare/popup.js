import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { getCmp } from 'utils/lookup';

class PopupContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
    this.addValue = this.addValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  addValue(e) {
    const newValue = [e.currentTarget.value];
    const { parent } = this.props;
    parent.setState({ value: parent.state.value.concat(newValue) });
  }

  handleSelectChange(value) {
		this.props.parent.setState({ value });
	}

  render () {
    const { companies, parent, related_companies } = this.props;
    const { value } = parent.state;

    const options = companies ? companies.map((e)=>{
      return {label: `${e.id} - ${e.name}`, value: `${e.id}.AX`};
    }) : [];

    const filteredRelated = related_companies.filter((d) => (value.indexOf(`${d}.AX`) == -1));
    const relatedList = filteredRelated.map((d) =>
      <button value={`${d}.AX`} onClick={this.addValue} className='btn btn-default compare-related'>
        {d} - {getCmp(d)}
      </button>
    );

    return (
      <div>
        <Select multi
              simpleValue
              value={parent.state.value}
              placeholder="Select companies"
              options={options}
              onChange={this.handleSelectChange}
        />
        { related_companies ?
          <div className='related-company-compare'>
            <div className='related-company-compare-title'>
              Related Companies
            </div>
            {relatedList}
          </div>
          :
          ''
        }
      </div>
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
    const { companies, related_companies } = this.props;

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
            <PopupContent parent={this}
                          companies={companies}
                          related_companies={related_companies}/>
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
