'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react/addons');
var config = require('./utils').config;
var theme_backgroud = config.theme_background;

require('./theme/css/sky.css');


module.exports = React.createClass({
    render: function(){
        var style = {
            backgroundImage: "url(" + theme_backgroud[this.props.theme_info] + ")"
        };
        return (
            <div
                id="home-left"
                style={style}
            >
            </div>
        );
    }
});