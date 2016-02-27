'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
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
var ContentHome = require('./content_home');
var ContentTag = require('./content_tag');
var ContentCategory = require('./content_category');
var ContentAuthor = require('./content_author');
var ContentArchives = require('./content_archives');
var ContentTags = require('./content_tags');
var ContentAuthors = require('./content_authors');
var ContentArticle = require('./content_article');
var NotFound = require('./not_found');
var MusicPlayer = require('./music_player');


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
            theme_info: "home",
            can_content_animate: true,
            music_list: []
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
            self.setState({
                theme_info: info
            });
        }
        function fun(){
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
    setMusicList: function(list){
        this.setState({
            music_list: list
        });
    },
    enableContentAnimation: function(){
        this.setState({
            can_content_animate: true
        });
    },
    disableContentAnimation: function(){
        this.setState({
            can_content_animate: false
        });
    },
    returnTop: function(){
        window.scrollTo(0, 0);
    },
    render: function(){
        return (
            <div
                className="full"
            >
                <Helmet
                    title={this.state.head.title}
                    titleTemplate= {"%s"}
                    //base={{"href": Config.site_url}}
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
                <MusicPlayer
                    theme_info={this.state.theme_info}
                    music_list={this.state.music_list}
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
                                    theme_default: this.state.theme_default,
                                    can_content_animate: this.state.can_content_animate,
                                    setMusicList: this.setMusicList,
                                    enableContentAnimation: this.enableContentAnimation,
                                    disableContentAnimation: this.disableContentAnimation
                                }
                            )
                        }
                    </div>
                </div>
                <Footer
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                />
                <div id="return-top">
                    <button onClick={this.returnTop}/>
                </div>
            </div>
        );
    }
});

//name = slug
var router = (
    <Router
        history={ReactRouter.browserHistory}
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