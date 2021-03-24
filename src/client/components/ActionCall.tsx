export default (props: { top: boolean, selectPage: Function }) => {
  const { top, selectPage } = props;
  return (
    <div>
      {top ?
        <section className="call_to_action">
          <div className="header_title">
            <h1>Community-<span className="highlighted_header_text">Governed Fund</span>
              Raising For xDai Chain</h1>
            <p>Filter through the messy landscape where rug pulls overshadow the great potential.</p>
          </div>
          <div className="header_btns">
            <button className="btn">View pools</button>
            <button className="btn btn_scnd" onClick={() => selectPage('Application')}>Get Started</button>
          </div>
        </section> :
        <section className="call_to_action btm">
          <div className="header_title">
            <h1>Subscribe to <span className="highlighted_header_text">Get Alerts</span>
              For New Pools</h1>
            <p>
              Subscribe to get notified about new pools and other relevant events.</p>
          </div>
          <div className="header_btns">
            <button className="btn">Subscribe Now</button>
          </div>
        </section>
      }
    </div>
  )
}
