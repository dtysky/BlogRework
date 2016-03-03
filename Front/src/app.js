'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Helmet = require('react-helmet');

var Title = require('./components/title');
var Menu = require('./components/menu');
var MenuPhone = require('./components/menu_phone');
var LeftImage = require('./components/left_image');
var Footer = require('./components/footer');
var MusicPlayer = require('./components/music_player');

require('./theme/css/sky.css');


var EasterEgg =
    "　　　　　　　 　/　　 /　　　　　　　ヽ　　　　　　ヽ　　　　　ヽ: . : l\n　　　　　 　　 / /　/　　　 /　　　　　､　　　　　　ヽ　　　　　l: . . |\n　　　　　 　 /イ 　 l　　　/ |　　　　　　､　　　　　　l　　|　l 　 l: . .|\n　　　　　　　　| :.　.:| 　 /　 l　　　　　 　､　　　　　 :l　　l: :|＼ﾊ: ﾊ\n　　　　　　 　 ﾚ|: 　|　/　￣ |　　　 　　　!:.　　　　　l: : : ト| ー } |\n　　　　　　　 　 |: . l　| '￣ﾋぅ| 　 l　　　　:.:..　　　l:　 .:| /ﾚ　ｊ: / {\n　　　　　　　　　VヽN　` ー　ｊﾊノ ＼|:　 :.:.|:.　l:.:.ﾊ:.:./ﾚ ﾉ ノ /. :ﾄ\n　　　　　　　 　 　 　 |　 　 　l　　　　 ヽ/ソﾄﾊﾚ　 ﾝ　　 ´ ノ〃 |\n　　　　　　　　　　　　l　　　 l　　　　　　　　　　　　　　　fl : ..　 |\n　　　　　　　　　　　　 l　　　ヽ　 _　　　　　　　　　　　　l　|ﾊ/|ﾉ＿\n　　　　　　　　　　　　　､　　　　　　　　　　　　　　　　 　　　　|　7 |\n　　　　　　　　　　　　　 ヽ　　　 　　　　　_　　　　　 /　　　　 ／　 l\n　　　　　　　　　　,.. -─‐`‐-､ヽ二二二ノ　　　　／　　　 ／\n　　　　　　 ＿_L´-､　ノ　　　　　｀丶､　　　　,　'´ 　 　 ／\n　　　　 /´　　{_ 　.::}　　　　　. : . : . : .|_,.. - ´　　　　／\n\n\n\n" +
    "没有想到少女居然是个大叔吧哈哈哈哈？";

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
    componentDidMount: function(){
        console.log(EasterEgg);
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