import createHistory from 'history/lib/createHashHistory';
import React from 'react';
import {Route, Router} from 'react-router';

require('./utils/StoreMixinConfig');

import Application from './components/Application';
import EnforceStage from './components/EnforceStage';
import Begin from './pages/Begin';
import Deploy from './pages/Deploy';
import NotFound from './pages/NotFound';
import Postflight from './pages/Postflight';
import Preflight from './pages/Preflight';
import Setup from './pages/Setup';
import Success from './pages/Success';

let history = createHistory({
  queryKey: false
});

React.render((
  <Router history={history}>
    <Route component={EnforceStage}>
      <Route path="/" component={Begin} />
      <Route path="/" component={Application}>
        <Route path="setup" display="Setup" component={Setup} />
        <Route path="pre-flight" display="Pre-Flight" component={Preflight} />
        <Route path="deploy" display="Deploy" component={Deploy} />
        <Route path="post-flight" display="Post-Flight" component={Postflight} />
        <Route path="success" display="Success" component={Success} />
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
  </Router>
), document.getElementById('application'));
