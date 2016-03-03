'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./App');
var ContentHome = require('./components/content_home');
var ContentTag = require('./components/content_tag');
var ContentCategory = require('./components/content_category');
var ContentAuthor = require('./components/content_author');
var ContentArchives = require('./components/content_archives');
var ContentTags = require('./components/content_tags');
var ContentAuthors = require('./components/content_authors');
var ContentArticle = require('./components/content_article');
var NotFound = require('./components/not_found');

require('./theme/css/sky.css');

module.exports = (
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
);