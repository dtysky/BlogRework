'use strict';
/**
 * Created by dtysky on 16/2/3.
 */
require('velocity-animate');
require('velocity-animate/velocity.ui');

var React = require('react/addons');
var VelocityComponent = require('velocity-react').VelocityComponent;
var APlayer = require('./aplayer/aplayer');
var config = require('./utils').config;
var colorNextEffect = require('./utils').colorNextEffect;

require('./aplayer/aplayer.css');
require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        this.url = config.default_music.url;
        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        return {};
    },
    getMusicInfo: function(list){
        var self = this;
        var data;
        if(list.length === 0){
            data = config.default_music.info;
        }else{
            data = config.default_music.info.filter(function(e){
                console.log(list, e, list.indexOf(e.slug));
                return list.indexOf(e.slug) === -1 ? null : e;
            });
        }
        return data.map(function(info){
            return {
                title: info.title,
                author: info.author,
                url: self.url + "/" + info.slug + info.format,
                pic: self.url + "/" + info.slug + ".jpg"
            };
        });
    },
    initPlayer: function(){
        if(this.isMobile){
            this.player.init(false);
        }else{
            this.player.init(true);
        }
    },
    componentDidMount: function(){
        this.player = new APlayer({
            element: document.getElementById('player1'),
            narrow: false,
            autoplay: false,
            showlrc: false,
            theme: '#ffffff',
            music: this.getMusicInfo([])
        });
        this.initPlayer();
    },
    shouldComponentUpdate: function(nextProps, nextState){
        console.log(nextProps, this.props);
        if(nextProps.music_list.toString() !== this.props.music_list.toString()){
            this.player.pause();
            this.player.option.music =
                this.getMusicInfo(
                    nextProps.music_list
                );
            this.initPlayer();
        }
        return true;
    },
    render: function() {
        return (
            <div id="music-player">
                <div id="player-hr"></div>
                <VelocityComponent animation={colorNextEffect(this.props.theme_info)}>
                    <div
                        id="player1"
                        className="aplayer"
                    >
                    </div>
                </VelocityComponent>
            </div>
        );
    }
});