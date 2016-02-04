/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;
var Helmet = require('react-helmet');

var Title = require('./title');
var MenuTop = require('./menu-top');
var MenuButtom = require('./menu-buttom');
var LeftImage = require('./left-image');
var Config = require('./utils').config;
var ContentHome = require('./content_home');
var ContentTag = require('./content_tag');
var ContentCategory = require('./content_category');
var ContentAuthor = require('./content_author');
var ContentArchives = require('./content_archives');
var ContentTags = require('./content_tags');
var ContentAuthors = require('./content_authors');
var ContentArticle = require('./content_article');
var NotFind = require('./not_find');


var App = React.createClass({
    getInitialState: function(){
        return {
            head: {
                title: "",
                keywords: "",
                description: "",
                author: ""
            }
        };
    },
    handleHead: function(head){
        this.setState({
            head: head
        });
    },
    render: function(){
        'use strict';
        return (
            <div>
                <Helmet
                    title={this.state.head.title}
                    titleTemplate= {"%s"}
                    base={{"target": "_blank", "href": Config.site_url}}
                    meta={[
                            {name: "keywords", "content": this.state.head.keywords},
                            {name: "author", "content": this.state.head.author},
                            {name: "description", "content": this.state.head.description}
                    ]}
                    onChangeClientState={function(newState){console.log(newState)}}
                />
                <Title/>
                <LeftImage/>
                <MenuTop/>
                <MenuButtom/>
                <ReactRouter.RouteHandler/>
            </div>
        );
    }
});

var router = (<Router history={Router.browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={ContentHome}/>
        <Route path="archives/:name/:index" component={ContentArchives}/>
        <Route path="tag/:name/:index" component={ContentTag}/>
        <Route path="category/:name/:index" component={ContentCategory}/>
        <Route path="Author/:name/:index" component={ContentAuthor}/>
        <Route path="tags/:name/:index" component={ContentTags}/>
        <Route path="authors/:name/:index" component={ContentAuthors}/>
        <Route path="article/:name/:index" component={ContentArticle}/>
        <Route path="*" component={NotFind}/>
    </Route>
</Router>);

ReactDom.render(router, document.getElementById('content'));