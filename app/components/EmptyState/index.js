import React from 'react';
import { Link } from 'react-router-dom';

export default class EmptyState extends React.Component {
  render () {
    const infos = [{label: 'discover', text: '1. Click on discover', lnk: '/discover'}, {label: 'search', text: '2. Search a company directly or base on industry', lnk: '/'}, {label: 'follow', text: '3. On the company page, click follow', lnk: '/company/DMP.AX'}].map((e) =>
      <div className='col-md-4' style={{textAlign: 'center', paddingTop: 150}}>
        <div style={{maxWidth: 200, margin: 'auto', top:50}}>
          <Link to={e.lnk}><img src={`/static/images/${e.label}_black.svg`} className='pref-info' style={{width: 100, marginBottom:10}}/></Link>
          <div>{e.text}</div>
        </div>
      </div>);
    return (<div style={{width: '100%', textAlign: 'center'}}>
      <div className='news-no-preferences' style={{fontSize: 'large', marginTop: 60}}>
        You have no <Link to='/discover'> favourited companies</Link>, please favourite a company to build your news feed!
      </div>
      <div className='row'>
        { infos }
      </div>
    </div>);
  }
}
