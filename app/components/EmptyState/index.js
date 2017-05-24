import React from 'react';
import { Link } from 'react-router-dom';

const data_man = [{label: 'discover', text: '1. Click on discover', lnk: '/discover'}, {label: 'search', text: '2. Search a company directly or based on industry', lnk: '/'}, {label: 'follow', text: '3. On the company page, click follow', lnk: '/company/DMP.AX'}];

const main_style= {
  textAlign: 'center',
  paddingTop: 100,
};

const inner_align = {
  maxWidth: 200,
  margin: 'auto',
  top: 50
};

const outer_style = {
  width: '100%',
  textAlign: 'center',
  marginTop: 40
};

const info_img = {
  width: 95,
  marginBottom: 15
};

export default class EmptyState extends React.Component {
  render () {
    const infos = data_man.map((e) =>
      <div className='col-md-4' style={main_style}>
        <div style={inner_align}>
          <Link to={e.lnk}><img src={`/static/images/${e.label}_black.svg`} className='pref-info' style={info_img}/></Link>
          <div>{e.text}</div>
        </div>
      </div>);
    return (<div style={outer_style}>
      <div className='news-no-preferences'>
        You have no <Link to='/discover'> favourited companies</Link>, please favourite a company to build your news feed!
      </div>
      <div className='row'>
        { infos }
      </div>
    </div>);
  }
}
