'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Helmet = require('react-helmet');

var Title = require('./title');
var Menu = require('./menu');
var MenuPhone = require('./menu_phone');
var LeftImage = require('./left_image');
var Footer = require('./footer');
var MusicPlayer = require('./music_player');

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        this.timeout_id = 0;
        return {
            head: {
                title: "",
                keywords: "",
                description: "",
                author: "",
                rss: ""
            },
            theme_default: "home",
            theme_info: "home",
            can_content_animate: true,
            music_list: []
        };
    },
    ga_start: function(){
        (function(i,s,o,g,r,a,m){
            i['GoogleAnalyticsObject']=r;
            i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)
                };
            i[r].l=1*new Date();a=s.createElement(o);
            m=s.getElementsByTagName(o)[0];
            a.async=1;
            a.src=g;
            m.parentNode.insertBefore(a,m);
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', config.ga_tracking_id, 'auto');
        ga('send', 'pageview');
    },
    handleHead: function(head){
        this.setState({
            head: head
        });
        this.ga_start();
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
                    meta={[
                            {name: "keywords", "content": this.state.head.keywords},
                            {name: "author", "content": this.state.head.author},
                            {name: "description", "content": this.state.head.description}
                    ]}
                    link={[
                        {
                            href: this.state.head.rss,
                            rel:"alternate" ,
                            title: this.state.head.title,
                            type: "application/rss+xml"
                        }
                    ]}
                />
                <LeftImage
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                />
                <Menu
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                    rss={this.state.head.rss}
                    changeTheme={this.changeTheme}
                    setDefaultTheme={this.setDefaultTheme}
                />
                <MenuPhone
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                    rss={this.state.head.rss}
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