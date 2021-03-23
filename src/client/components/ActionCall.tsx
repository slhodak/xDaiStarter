import React from 'react';

export default (props: { top: boolean }) => {
  const { top } = props;
  return (
    <div>
      {top ?
        <section className="top_section">
          <div className="container">
            <div className="header_title">
              <h1>Community <span>Governed Fund</span>
                Raising For Chain</h1>
              <p>Filter through the messy landscape where rugs overshadow the great potential.</p>
            </div>
            <div className="header_btns">
              <button className="btn">View pools</button>
              <button className="btn btn_scnd">Get Started</button>
            </div>
          </div>
        </section> :
        <section className="btm_section">
          <div className="container">
            <div className="header_title">
              <h1>Subscribe to <span>Get Alerts</span>
                For New Pools</h1>
              <p>
                Subscribe to get notified about new pools and other relevant events.</p>
            </div>
            <div className="header_btns">
              <button className="btn">View pools</button>
            </div>
          </div>
        </section>
      }
    </div>
  )
}
