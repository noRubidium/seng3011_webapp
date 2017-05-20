import React from 'react';

export default class ListItem extends React.Component {
  getFirstColumn(title, content) {
    return(
      <div>
        <h4 className='list-item-title'>{title}</h4>
        {content}
      </div>
    );
  }

  getSecondColumn(content) {
    return(
      <div>{content}</div>
    );
  }

  render () {
    const { title, content, column, second } = this.props;

    const oneColumn = (
      <div className='col-sm-12'>
        {this.getFirstColumn(title, content)}
      </div>
    );

    const twoColumn = (
      <div>
        <div className='col-sm-11'>
          {this.getFirstColumn(title, content)}
        </div>
        <div className='col-sm-1'>
          {this.getSecondColumn(second)}
        </div>
      </div>
    );

    return (
      <div className='list-item panel panel-default'>
		    <div className='panel-body'>
          <div className='row'>
            {
              column == 1 ? oneColumn : twoColumn
            }
          </div>
		    </div>
		  </div>
    );
  }
}
