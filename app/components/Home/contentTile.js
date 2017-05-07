import React from 'react';

export default class HomeContentTile extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    const { id, name, details } = this.props.company;
    return (
      <div key={id} className='company-tile col-md-3'>{name}</div>
    );
  }
}
