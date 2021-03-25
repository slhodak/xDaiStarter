import React from 'react';
import Home from './Home';
import Litepaper from './Litepaper';
import Application from './Application';
import '../scss/style.scss';

type MyProps = {};
type MyState = { page: string };

export default class XDaiStarter extends React.Component<MyProps, MyState>  {
  constructor(props: any) {
    super(props);

    this.state = {
      page: 'Home'
    };
    this.selectPage = this.selectPage.bind(this);
  }

  selectPage(pageName: string) {
    this.setState({ page: pageName });
  }

  render() {
    const { page } = this.state;
    if (page === 'Home') {
      return(<div className="XDaiStarter">
        <Home selectPage={this.selectPage} />
      </div>)
    } else if (page === 'Litepaper') {
      return(<div className="XDaiStarter">
        <Litepaper selectPage={this.selectPage} />
      </div>)
    } else if (page === 'Application') {
      // Have this open a new tab? Need react router for mpa?
      return(<div className="XDaiStarter">
        <Application />
      </div>)
    }
  }
}
