import React from 'react';
import '../scss/style.scss';

export default (props: any) => {
  const { selectPage } = props;
  return (
    <header className="header top_bg">
      <div className="container_wrap">
        <div className="header_top">
          <div onClick={() => selectPage('Home')} className="header_logo">
            <img src="img/logo.png" alt="img"/>
          </div>
          <div className="header_links">
            <a onClick={() => selectPage('About')}>About</a>
            <a onClick={() => selectPage('Application')}>Apply</a>
            <a href="#">Pools</a>
            <a href="">Connect wallet</a>
            <button>Login</button>
          </div>
        </div>
      </div>
    </header>
  )
}
