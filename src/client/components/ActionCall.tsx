import { Link } from 'react-router-dom';

export default (props: { top: boolean }) => {
  const { top } = props;
  return (
    <div className="call_to_action_container">
      {top ?
        <section className="call_to_action top">
          <div className="large_title">
            <h1>Community <span className="highlighted_title_text">Governed Fund </span>
              Raising For xDai Chain</h1>
            <p>Filter through the messy landscape where rugs overshadow the great potential.</p>
          </div>
          <div className="action_call_btns">
            <div className="btns_container">
              <a target="_blank" href="https://app.honeyswap.org/#/swap"><button className="btn">Buy XDST</button></a>
              <Link to="/litepaper"><button className="btn btn_scnd">Litepaper</button></Link>
            </div>
          </div>
        </section> :
        <section className="call_to_action btm">
          <div className="large_title">
            <h1>Subscribe to <span className="highlighted_title_text">Get Alerts </span>For New Pools</h1>
            <p>
              Subscribe to get notified about new pools and other relevant events.</p>
          </div>
          <div className="action_call_btns">
            <div className="btns_container">
              <a href="">
                <button className="btn">Subscribe Now</button>
              </a>
            </div>
          </div>
        </section>
      }
    </div>
  )
}
