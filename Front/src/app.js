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
                    key="helmet"
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
                    key="left-image"
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                />
                <Menu
                    key="menu"
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                    rss={this.state.head.rss}
                    changeTheme={this.changeTheme}
                    setDefaultTheme={this.setDefaultTheme}
                />
                <MenuPhone
                    key="menu-phone"
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                    rss={this.state.head.rss}
                    changeTheme={this.changeTheme}
                    setDefaultTheme={this.setDefaultTheme}
                />
                <MusicPlayer
                    key="music-player"
                    theme_info={this.state.theme_info}
                    music_list={this.state.music_list}
                />
                <div id="home-main">
                    <Title
                        key="title"
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
                    key="footer"
                    theme_info={this.state.theme_info}
                    theme_default={this.state.theme_default}
                />
                <div id="return-top">
                    <button className="home-icon-return" onClick={this.returnTop}/>
                </div>
            </div>
        );
    }
});