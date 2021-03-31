import React from 'react';
import Home from './Home';
import Litepaper from './Litepaper';
import Application from './Application';
import DetailCard from './DetailCard';
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
              <Home />
            </Route>
            <Route path='/litepaper'>
              <Litepaper />
            </Route>
            <Route path='/apply'>
              <Application />
            </Route>
            <Route path='/pooldetail'>
              <DetailCard />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
