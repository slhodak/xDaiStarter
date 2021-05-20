import React from 'react';
import Home from './Home';
import Header from './Header'
import Litepaper from './Litepaper';
import Application from './Application';
import DetailCard from './DetailCard';
import Dev from './Dev';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import '../scss/style.scss';

type MyProps = {};
type MyState = {};

export default class XDaiStarter extends React.Component<MyProps, MyState>  {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className='XDaiStarter'>
          <Switch>
            <Route exact path='/'>
              <Header />
              <Home />
            </Route>
            <Route path='/apply'>
              <Application />
            </Route>
            <Route path='/litepaper'>
              <Header />
              <Litepaper />
            </Route>
            <Route path='/pooldetail'>
              <Header />
              <DetailCard />
            </Route>
            <Route path='/dev'>
              <Header />
              <Dev />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
