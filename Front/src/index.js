'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react/addons');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Helmet = require('react-helmet');

var Title = require('./title');
var Menu = require('./menu');
var MenuPhone = require('./menu_phone');
var LeftImage = require('./left_image');
var Footer = require('./footer');
var Config = require('./utils').config;
var ContentHome = require('./content_home');
var ContentTag = require('./content_tag');
var ContentCategory = require('./content_category');
var ContentAuthor = require('./content_author');
var ContentArchives = require('./content_archives');
var ContentTags = require('./content_tags');
var ContentAuthors = require('./content_authors');
var ContentArticle = require('./content_article');
var NotFound = require('./not_found');

require('./theme/css/sky.css');

var App = React.createClass({
    getInitialState: function(){
        this.timeout_id = 0;
        return {
            head: {
                title: "",
                keywords: "",
                description: "",
                author: ""
            },
            theme_default: "home",
            theme_info: "home"
        };
    },
    handleHead: function(head){
        this.setState({
            head: head
        });
    },
    setDefaultTheme: function(info){
        if(this.state.theme_default !== info){
            this.setState({
                theme_default: info
            });
        }
    },
    changeTheme: function(info, enter){
        var self = this;
        function update(){
            console.log("update");
            self.setState({
                theme_info: info
            });
        }
        function fun(){
            console.log("fun");
            clearTimeout(self.timeout_id);
            self.timeout_id = setTimeout(
                update,
                500
            );
        }
        if(!enter && info !== this.state.theme_info) {
            fun();
        }
        else if(enter && info !== this.state.theme_info){
            clearTimeout(self.timeout_id);
            update();
        }
    },
    render: function(){
        var self = this;
        return (
            <div
                className="full"
            >
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
                <LeftImage
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                />
                <Menu
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                    changeTheme={this.changeTheme}
                    setDefaultTheme={this.setDefaultTheme}
                />
                <MenuPhone
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                    changeTheme={this.changeTheme}
                    setDefaultTheme={this.setDefaultTheme}
                />
                <div id="home-main">
                    <Title
                        theme_info={this.state.theme_info}
                        theme_default={this.state.theme_default}
                        changeTheme={this.changeTheme}
                        setDefaultTheme={this.setDefaultTheme}
                    />
                    <div
                        className="home-main-content"
                    >
                        {
                            this.props.children && React.cloneElement(
                                this.props.children,
                                {
                                    handleHead: this.handleHead,
                                    setDefaultTheme: this.setDefaultTheme,
                                    changeTheme: this.changeTheme,
                                    theme_info: this.state.theme_info,
                                    theme_default: this.state.theme_default
                        }
                            )
                        }
                    </div>
                </div>
                <Footer
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                />
            </div>
        );
    }
});

//name = slug
var router = (
    <Router
        history={ReactRouter.hashHistory}
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


ReactDom.render(router, document.getElementById('content'));