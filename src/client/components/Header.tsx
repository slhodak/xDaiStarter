import '../img/logo.png';

export default (props: { selectPage: Function }) => {
  const { selectPage } = props;
  return (
    <header className="header_all">
      <div className="header_center">
        <div onClick={() => selectPage('Home')} className="header_logo">
          <img src="img/logo.png" alt="img"/>
        </div>
        <div className="header_links">
          <a onClick={() => selectPage('About')}>About</a>
          <a href="#">Stake</a>
          <a href="#">Pools</a>
          <a href="">Connect wallet</a>
          <button>Login</button>
        </div>
      </div>
    </header>
  )
}
