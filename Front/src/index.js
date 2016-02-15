'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react/addons');
var ReactDom = require('react-dom');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;
var Helmet = require('react-helmet');

var Title = require('./title');
var Menu = require('./menu');
var MenuPhone = require('./menu_phone');
var LeftImage = require('./left_image');
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

require('./theme/css/sky.css');


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
                />
                <Title/>
                <LeftImage/>
                <Menu/>
                <MenuPhone/>
                <Router.RouteHandler
                    id="home-main-content"
                />
            </div>
        );
    }
});


//name = slug
var router = (<Router history={Router.browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={ContentHome}/>
        <Route path="archives/:index" component={ContentArchives}/>
        <Route path="tag/:name/:index" component={ContentTag}/>
        <Route path="category/:name/:index" component={ContentCategory}/>
        <Route path="author/:name/:index" component={ContentAuthor}/>
        <Route path="tags/:name" component={ContentTags}/>
        <Route path="authors/:name" component={ContentAuthors}/>
        <Route path="article/:name" component={ContentArticle}/>
        <Route path="*" component={NotFind}/>
    </Route>
</Router>);

ReactDom.render(router, document.getElementById('content'));