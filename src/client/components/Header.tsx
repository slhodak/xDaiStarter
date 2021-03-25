import '../img/logo.png';

export default (props: { selectPage: Function }) => {
  const { selectPage } = props;
  return (
    <header className="header_container">
      <div className="header_background">
        <div className="header_objects">
          <div onClick={() => selectPage('Home')} className="header_logo">
            <img src="img/logo.png" alt="img"/>
          </div>
          <div className="header_links">
            <a href="#">Pools</a>
            <a href="#">Stake</a>
            <a href="#">Create Pool</a>
            <button>Connect Wallet</button>
          </div>
        </div>
      </div>
    </header>
  )
}
