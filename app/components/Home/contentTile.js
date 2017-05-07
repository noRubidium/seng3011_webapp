import React from 'react';
import { Link } from 'react-router-dom';

export default class HomeContentTile extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    const { id, name, details, alias } = this.props.company;
    const style = {
      backgroundImage: ` url('/static/images/${alias}.png')`,
      backgroundRepeatX: 'no-repeat',
      backgroundRepeatY: 'no-repeat',
      backgroundSize: 'contain'
    };
    return (
      <div className='col-sm-3 col-md-3'>
        <Link to={`/company/${id}/`}>
          <div key={id} className='company-tile' style={style}>
            <div class='overlay'></div>
            <h4 className='name'>{name}</h4>
          </div>
        </Link>
      </div>
    );
  }
}
