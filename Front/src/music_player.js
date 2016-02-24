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
        return {};
    },
    getMusicInfo: function(json){
        var self = this;
        return json.map(function(info){
            return {
                title: info.title,
                author: info.author,
                url: self.url + "/" + info.title + info.format,
                pic: self.url + "/" + info.title + ".jpg"
            };
        });
    },
    componentDidMount: function(){
        var self = this;
        this.player = new APlayer({
            element: document.getElementById('player1'),
            narrow: false,
            autoplay: false,
            showlrc: false,
            theme: '#e6d0b2',
            music: []
        });
        self.player.option.music = self.getMusicInfo(
            config.default_music.info
        );
        self.player.init();
    },
    render: function() {
        return (
            <div>
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