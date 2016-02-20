'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


require('velocity-animate');
require('velocity-animate/velocity.ui');

var React = require('react/addons');
var VelocityComponent = require('velocity-react').VelocityComponent;
var velocityHelpers = require('velocity-react').velocityHelpers;
var config = require('./utils').config;
var theme_backgrouds = config.theme_background;
var animation_default_duration = config.animation_default_duration;

require('./theme/css/sky.css');


module.exports = React.createClass({
    getInitialState: function(){
        this.theme_now = this.props.theme_info;
        this.flag = true;
        return {};
    },
    componentDidUpdate: function(){
        this.theme_now = this.props.theme_info;
    },
    imageEffectMiddle: function(){
        this.flag = !this.flag;
        return velocityHelpers.registerEffect({
            defaultDuration: animation_default_duration,
            calls:[
                [
                    {
                        left: ["100%", "50%"]
                    },
                    1,
                    {
                        delay: 0,
                        easing: "ease-in"
                    }
                ]
            ]
        });
    },
    imageEffectLeft: function(){
        return velocityHelpers.registerEffect({
            defaultDuration: animation_default_duration,
            calls:[
                [{
                    left: ["50%", "0%"]
                },
                1,
                {
                    delay: 0,
                    easing: "ease-in"
                }]
            ]
        });
    },
    render: function(){
        var image_list = [
            {
                animation: this.flag ? this.imageEffectLeft : this.imageEffectMiddle,
                key: "bk1",
                backgroundImage: this.flag ?
                    "url(" + theme_backgrouds[this.props.theme_info] + ")" :
                    "url(" + theme_backgrouds[this.theme_now] + ")"
            },
            {
                animation: this.flag ? this.imageEffectMiddle : this.imageEffectLeft,
                key: "bk2",
                backgroundImage: this.flag ?
                    "url(" + theme_backgrouds[this.theme_now] + ")" :
                    "url(" + theme_backgrouds[this.props.theme_info] + ")"
            }
        ];
        return (
            <div id="home-left">
                {
                    image_list.map(function(e){
                        return (
                        <VelocityComponent
                            key={e.key}
                            animation={e.animation()}
                        >
                            <div
                                className="home-left-image"
                                style={{
                                    backgroundImage: e.backgroundImage
                                }}
                            >
                            </div>
                        </VelocityComponent>
                        );
                    })
                }
            </div>
        );
    }
});