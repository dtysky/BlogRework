'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Ga = require('react-ga');

var App = require('./App');
var ContentHome = require('./content_home');
var ContentTag = require('./content_tag');
var ContentCategory = require('./content_category');
var ContentAuthor = require('./content_author');
var ContentArchives = require('./content_archives');
var ContentTags = require('./content_tags');
var ContentAuthors = require('./content_authors');
var ContentArticle = require('./content_article');
var NotFound = require('./not_found');
var config = require('./utils').config;

require('./theme/css/sky.css');

Ga.initialize(config.ga_tracking_id);
function logPageView() {
    Ga.pageview(this.state.location.pathname);
}

module.exports = (
    <Router
        history={ReactRouter.browserHistory}
        onUpdate={logPageView}
        id="home-main-content"
    >
        <Route path="/" component={App}>
            <IndexRoute component={ContentHome}/>
            <Route path="archives(/:index)" component={ContentArchives}/>
            <Route path="tag/:name(/:index)" component={ContentTag}/>
            <Route path="category/:name(/:index)" component={ContentCategory}/>
            <Route path="author/:name(/:index)" component={ContentAuthor}/>
            <Route path="tags" component={ContentTags}/>
            <Route path="authors" component={ContentAuthors}/>
            <Route path="article/:name" component={ContentArticle}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);