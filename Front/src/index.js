'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Ga = require('react-ga');
var config = require('./utils').config;
var routes = require('./routes');

Ga.initialize(config.ga_tracking_id);
function logPageView() {
    Ga.pageview(this.state.location.pathname);
}

ReactDom.render(
    <Router
        routes={routes}
        history={ReactRouter.browserHistory}
        onUpdate={logPageView}
        id="home-main-content"
    />, document.getElementById('content')
);