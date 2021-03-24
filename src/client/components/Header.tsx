import ActionCall from './ActionCall';
import '../img/logo.png';

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
            <a href="#">Stake</a>
            <a href="#">Pools</a>
            <a href="">Connect wallet</a>
            <button>Login</button>
          </div>
        </div>
        <ActionCall top={true} selectPage={selectPage} />
      </div>
    </header>
  )
}
